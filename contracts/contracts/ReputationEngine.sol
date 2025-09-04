// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./IdentityRegistry.sol";

contract ReputationEngine is Ownable, Pausable {
    
    struct ReputationData {
        uint256 totalScore;
        uint256 transactionCount;
        uint256 lastActivity;
        mapping(string => uint256) platformScores; // platform -> score
        mapping(string => uint256) categoryScores; // category -> score (finance, gaming, etc.)
        string[] activePlatforms;
        string[] activeCategories;
    }
    
    struct Platform {
        string name;
        address operator;
        bool isActive;
        uint256 weight; // 1-100, affects reputation calculation
        uint256 registeredAt;
    }
    
    struct ReputationEvent {
        address user;
        string platform;
        string category;
        int256 scoreChange;
        string eventType;
        uint256 timestamp;
    }
    
    // Events
    event ReputationUpdated(
        address indexed user,
        string platform,
        string category,
        int256 scoreChange,
        uint256 newTotalScore,
        uint256 timestamp
    );
    event PlatformRegistered(
        string indexed name,
        address indexed operator,
        uint256 weight,
        uint256 timestamp
    );
    event FraudDetected(
        address indexed user,
        string reason,
        uint256 penaltyScore,
        uint256 timestamp
    );
    
    // State variables
    IdentityRegistry public immutable identityRegistry;
    mapping(address => ReputationData) private reputations;
    mapping(string => Platform) public platforms;
    mapping(address => bool) public platformOperators;
    
    string[] public platformNames;
    ReputationEvent[] public reputationHistory;
    
    uint256 public constant MAX_PLATFORM_SCORE = 1000;
    uint256 public constant FRAUD_PENALTY = 100;
    uint256 public constant INACTIVITY_DECAY_DAYS = 30;
    uint256 public constant DECAY_RATE = 5; // 5 points per month of inactivity
    
    modifier onlyPlatformOperator() {
        require(platformOperators[msg.sender] || msg.sender == owner(), "Not authorized platform operator");
        _;
    }
    
    modifier validPlatform(string calldata _platform) {
        require(platforms[_platform].isActive, "Platform not active");
        _;
    }
    
    constructor(address _identityRegistry) Ownable(msg.sender) {
        identityRegistry = IdentityRegistry(_identityRegistry);
        platformOperators[msg.sender] = true;
        
        // Register default platforms
        _registerPlatform("sonicid_core", msg.sender, 100);
        _registerPlatform("defi_protocols", msg.sender, 90);
        _registerPlatform("gaming_platforms", msg.sender, 80);
        _registerPlatform("nft_marketplaces", msg.sender, 75);
        _registerPlatform("social_networks", msg.sender, 70);
    }
    
    function registerPlatform(
        string calldata _name,
        address _operator,
        uint256 _weight
    ) external onlyOwner {
        _registerPlatform(_name, _operator, _weight);
    }
    
    function updateReputation(
        address _user,
        string calldata _platform,
        string calldata _category,
        int256 _scoreChange,
        string calldata _eventType
    ) external onlyPlatformOperator validPlatform(_platform) whenNotPaused {
        // Verify user has registered identity
        (bool exists,,,,) = identityRegistry.getIdentity(_user);
        require(exists, "User must have registered identity");
        
        ReputationData storage userRep = reputations[_user];
        
        // Apply time decay before updating
        _applyTimeDecay(_user);
        
        // Update platform-specific score
        uint256 currentPlatformScore = userRep.platformScores[_platform];
        uint256 newPlatformScore = _calculateNewScore(currentPlatformScore, _scoreChange);
        userRep.platformScores[_platform] = newPlatformScore;
        
        // Update category score
        uint256 currentCategoryScore = userRep.categoryScores[_category];
        uint256 newCategoryScore = _calculateNewScore(currentCategoryScore, _scoreChange);
        userRep.categoryScores[_category] = newCategoryScore;
        
        // Track active platforms and categories
        _trackActivePlatform(_user, _platform);
        _trackActiveCategory(_user, _category);
        
        // Update global reputation score
        userRep.totalScore = _calculateGlobalScore(_user);
        userRep.transactionCount++;
        userRep.lastActivity = block.timestamp;
        
        // Record event
        reputationHistory.push(ReputationEvent({
            user: _user,
            platform: _platform,
            category: _category,
            scoreChange: _scoreChange,
            eventType: _eventType,
            timestamp: block.timestamp
        }));
        
        // Fraud detection
        _detectFraud(_user, _scoreChange, _eventType);
        
        emit ReputationUpdated(_user, _platform, _category, _scoreChange, userRep.totalScore, block.timestamp);
    }
    
    function getRiskScore(address _user) external view returns (uint256) {
        (bool exists,, uint256 identityTimestamp, uint256 identityReputation,) = identityRegistry.getIdentity(_user);
        if (!exists) return 1000; // Maximum risk for unverified users
        
        ReputationData storage userRep = reputations[_user];
        
        // Calculate risk based on multiple factors
        uint256 riskScore = 0;
        
        // Identity age factor (newer accounts = higher risk)
        uint256 accountAge = block.timestamp - identityTimestamp;
        if (accountAge < 30 days) riskScore += 200;
        else if (accountAge < 90 days) riskScore += 100;
        else if (accountAge < 180 days) riskScore += 50;
        
        // Reputation factor (lower reputation = higher risk)
        if (identityReputation < 100) riskScore += 300;
        else if (identityReputation < 300) riskScore += 150;
        else if (identityReputation < 500) riskScore += 75;
        
        // Activity factor (inactive accounts = moderate risk)
        uint256 timeSinceActivity = block.timestamp - userRep.lastActivity;
        if (timeSinceActivity > 90 days) riskScore += 100;
        else if (timeSinceActivity > 30 days) riskScore += 50;
        
        // Transaction count factor (very few transactions = higher risk)
        if (userRep.transactionCount < 5) riskScore += 100;
        else if (userRep.transactionCount < 20) riskScore += 50;
        
        // Platform diversity (single platform usage = moderate risk)
        if (userRep.activePlatforms.length == 1) riskScore += 50;
        
        return riskScore > 1000 ? 1000 : riskScore;
    }
    
    function getReputationSummary(address _user) external view returns (
        uint256 totalScore,
        uint256 transactionCount,
        uint256 lastActivity,
        string[] memory activePlatforms,
        string[] memory activeCategories,
        uint256 riskScore
    ) {
        ReputationData storage userRep = reputations[_user];
        return (
            userRep.totalScore,
            userRep.transactionCount,
            userRep.lastActivity,
            userRep.activePlatforms,
            userRep.activeCategories,
            this.getRiskScore(_user)
        );
    }
    
    function getPlatformScore(address _user, string calldata _platform) external view returns (uint256) {
        return reputations[_user].platformScores[_platform];
    }
    
    function getCategoryScore(address _user, string calldata _category) external view returns (uint256) {
        return reputations[_user].categoryScores[_category];
    }
    
    // Admin functions
    function addPlatformOperator(address _operator) external onlyOwner {
        platformOperators[_operator] = true;
    }
    
    function removePlatformOperator(address _operator) external onlyOwner {
        platformOperators[_operator] = false;
    }
    
    function updatePlatformWeight(string calldata _platform, uint256 _newWeight) external onlyOwner {
        require(_newWeight <= 100, "Weight must be <= 100");
        platforms[_platform].weight = _newWeight;
    }
    
    function deactivatePlatform(string calldata _platform) external onlyOwner {
        platforms[_platform].isActive = false;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // Internal functions
    function _registerPlatform(string memory _name, address _operator, uint256 _weight) internal {
        require(_weight <= 100, "Weight must be <= 100");
        require(platforms[_name].registeredAt == 0, "Platform already exists");
        
        platforms[_name] = Platform({
            name: _name,
            operator: _operator,
            isActive: true,
            weight: _weight,
            registeredAt: block.timestamp
        });
        
        platformNames.push(_name);
        platformOperators[_operator] = true;
        
        emit PlatformRegistered(_name, _operator, _weight, block.timestamp);
    }
    
    function _calculateNewScore(uint256 _currentScore, int256 _change) internal pure returns (uint256) {
        if (_change >= 0) {
            uint256 increase = uint256(_change);
            return _currentScore + increase > MAX_PLATFORM_SCORE ? MAX_PLATFORM_SCORE : _currentScore + increase;
        } else {
            uint256 decrease = uint256(-_change);
            return _currentScore > decrease ? _currentScore - decrease : 0;
        }
    }
    
    function _calculateGlobalScore(address _user) internal view returns (uint256) {
        ReputationData storage userRep = reputations[_user];
        uint256 weightedSum = 0;
        uint256 totalWeight = 0;
        
        for (uint i = 0; i < userRep.activePlatforms.length; i++) {
            string memory platform = userRep.activePlatforms[i];
            uint256 platformScore = userRep.platformScores[platform];
            uint256 weight = platforms[platform].weight;
            
            weightedSum += platformScore * weight;
            totalWeight += weight;
        }
        
        return totalWeight > 0 ? weightedSum / totalWeight : 0;
    }
    
    function _trackActivePlatform(address _user, string calldata _platform) internal {
        ReputationData storage userRep = reputations[_user];
        
        for (uint i = 0; i < userRep.activePlatforms.length; i++) {
            if (keccak256(bytes(userRep.activePlatforms[i])) == keccak256(bytes(_platform))) {
                return; // Platform already tracked
            }
        }
        
        userRep.activePlatforms.push(_platform);
    }
    
    function _trackActiveCategory(address _user, string calldata _category) internal {
        ReputationData storage userRep = reputations[_user];
        
        for (uint i = 0; i < userRep.activeCategories.length; i++) {
            if (keccak256(bytes(userRep.activeCategories[i])) == keccak256(bytes(_category))) {
                return; // Category already tracked
            }
        }
        
        userRep.activeCategories.push(_category);
    }
    
    function _applyTimeDecay(address _user) internal {
        ReputationData storage userRep = reputations[_user];
        
        if (userRep.lastActivity == 0) return; // First transaction
        
        uint256 daysSinceActivity = (block.timestamp - userRep.lastActivity) / 1 days;
        if (daysSinceActivity >= INACTIVITY_DECAY_DAYS) {
            uint256 monthsInactive = daysSinceActivity / 30;
            uint256 decayAmount = monthsInactive * DECAY_RATE;
            
            userRep.totalScore = userRep.totalScore > decayAmount ? userRep.totalScore - decayAmount : 0;
        }
    }
    
    function _detectFraud(address _user, int256 _scoreChange, string calldata _eventType) internal {
        // Simple fraud detection patterns
        if (_scoreChange < -50) {
            emit FraudDetected(_user, "Large negative score change", uint256(-_scoreChange), block.timestamp);
        }
        
        // More sophisticated fraud detection could be added here
        // - Velocity checks (too many transactions in short time)
        // - Pattern recognition (suspicious behavior patterns)
        // - Cross-platform anomaly detection
    }
}