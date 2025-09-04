// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract IdentityRegistry is Ownable, Pausable, ReentrancyGuard {
    enum VerificationLevel {
        NONE, // 0 - No verification
        BASIC, // 1 - Basic humanity proof
        GOVERNMENT_ID, // 2 - Government ID verification
        BIOMETRIC, // 3 - Biometric confirmation
        MULTI_SOURCE, // 4 - Multi-source credential verification
        INSTITUTIONAL // 5 - Institutional backing
    }

    struct Identity {
        bool exists;
        VerificationLevel level;
        uint256 timestamp;
        uint256 reputationScore;
        bytes32 zkProofHash; // Hash of zero-knowledge proof
        mapping(string => bool) attributes; // Verified attributes (age_over_18, location_US, etc.)
        address[] endorsers; // List of addresses that have endorsed this identity
    }

    struct VerificationRequest {
        address user;
        VerificationLevel requestedLevel;
        bytes32 proofHash;
        uint256 timestamp;
        bool processed;
        bool approved;
    }

    // Events
    event IdentityRegistered(
        address indexed user,
        VerificationLevel level,
        uint256 timestamp
    );
    event IdentityUpdated(
        address indexed user,
        VerificationLevel newLevel,
        uint256 timestamp
    );
    event AttributeVerified(
        address indexed user,
        string attribute,
        uint256 timestamp
    );
    event IdentityEndorsed(
        address indexed user,
        address indexed endorser,
        uint256 timestamp
    );
    event VerificationRequested(
        address indexed user,
        VerificationLevel level,
        bytes32 proofHash
    );
    event VerificationProcessed(
        address indexed user,
        bool approved,
        VerificationLevel level
    );
    event ReputationUpdated(
        address indexed user,
        uint256 newScore,
        uint256 timestamp
    );

    // State variables
    mapping(address => Identity) private identities;
    mapping(bytes32 => bool) private usedProofs; // Prevent proof reuse
    mapping(address => bool) private verifiers; // Authorized verifiers
    mapping(uint256 => VerificationRequest) private verificationRequests;

    uint256 private requestCounter;
    uint256 public constant MIN_REPUTATION_SCORE = 0;
    uint256 public constant MAX_REPUTATION_SCORE = 1000;

    modifier onlyVerifier() {
        require(
            verifiers[msg.sender] || msg.sender == owner(),
            "Not authorized verifier"
        );
        _;
    }

    modifier identityExists(address user) {
        require(identities[user].exists, "Identity does not exist");
        _;
    }

    constructor() Ownable(msg.sender) {
        verifiers[msg.sender] = true; // Owner is default verifier
    }

    function registerIdentity(
        bytes32 _zkProofHash,
        VerificationLevel _level
    ) external whenNotPaused nonReentrant {
        require(!identities[msg.sender].exists, "Identity already exists");
        require(!usedProofs[_zkProofHash], "Proof already used");
        require(_level != VerificationLevel.NONE, "Invalid verification level");

        // Mark proof as used
        usedProofs[_zkProofHash] = true;

        // Create new identity
        Identity storage newIdentity = identities[msg.sender];
        newIdentity.exists = true;
        newIdentity.level = _level;
        newIdentity.timestamp = block.timestamp;
        newIdentity.reputationScore = 100; // Starting reputation
        newIdentity.zkProofHash = _zkProofHash;

        emit IdentityRegistered(msg.sender, _level, block.timestamp);
    }

    function requestVerification(
        bytes32 _proofHash,
        VerificationLevel _requestedLevel
    ) external whenNotPaused returns (uint256) {
        require(identities[msg.sender].exists, "Must register identity first");
        require(!usedProofs[_proofHash], "Proof already used");
        require(
            uint8(_requestedLevel) > uint8(identities[msg.sender].level),
            "Cannot downgrade verification level"
        );

        uint256 requestId = requestCounter++;
        verificationRequests[requestId] = VerificationRequest({
            user: msg.sender,
            requestedLevel: _requestedLevel,
            proofHash: _proofHash,
            timestamp: block.timestamp,
            processed: false,
            approved: false
        });

        emit VerificationRequested(msg.sender, _requestedLevel, _proofHash);
        return requestId;
    }

    function processVerification(
        uint256 _requestId,
        bool _approved
    ) external onlyVerifier whenNotPaused {
        VerificationRequest storage request = verificationRequests[_requestId];
        require(!request.processed, "Request already processed");
        require(request.user != address(0), "Invalid request");

        request.processed = true;
        request.approved = _approved;

        if (_approved) {
            Identity storage identity = identities[request.user];
            identity.level = request.requestedLevel;
            identity.timestamp = block.timestamp;
            identity.zkProofHash = request.proofHash;

            // Mark proof as used
            usedProofs[request.proofHash] = true;

            // Boost reputation for successful verification
            identity.reputationScore = _min(
                identity.reputationScore + 50,
                MAX_REPUTATION_SCORE
            );

            emit IdentityUpdated(
                request.user,
                request.requestedLevel,
                block.timestamp
            );
        }

        emit VerificationProcessed(
            request.user,
            _approved,
            request.requestedLevel
        );
    }

    function verifyAttribute(
        address _user,
        string calldata _attribute
    ) external onlyVerifier whenNotPaused identityExists(_user) {
        identities[_user].attributes[_attribute] = true;
        emit AttributeVerified(_user, _attribute, block.timestamp);
    }

    function endorseIdentity(
        address _user
    ) external whenNotPaused identityExists(_user) {
        require(
            identities[msg.sender].exists,
            "Endorser must have verified identity"
        );
        require(
            identities[msg.sender].level >= VerificationLevel.GOVERNMENT_ID,
            "Insufficient verification level to endorse"
        );
        require(_user != msg.sender, "Cannot endorse self");

        // Check if already endorsed
        address[] storage endorsers = identities[_user].endorsers;
        for (uint i = 0; i < endorsers.length; i++) {
            require(endorsers[i] != msg.sender, "Already endorsed");
        }

        endorsers.push(msg.sender);
        identities[_user].reputationScore = _min(
            identities[_user].reputationScore + 10,
            MAX_REPUTATION_SCORE
        );

        emit IdentityEndorsed(_user, msg.sender, block.timestamp);
    }

    // TODO(human) - Implement reputation calculation logic
    function updateReputationScore(
        address _user,
        int256 _change
    ) external onlyVerifier identityExists(_user) {
        // This function should implement sophisticated reputation calculation
        // considering factors like:
        // - Transaction history
        // - Time since verification
        // - Number of endorsements
        // - Cross-platform activity
        // - Fraud indicators
        Identity storage identity = identities[_user];
        if (_change < 0) {
            uint256 decrease = uint256(-_change);
            if (decrease > identity.reputationScore) {
                identity.reputationScore = MIN_REPUTATION_SCORE;
            } else {
                identity.reputationScore -= decrease;
            }
        } else {
            uint256 increase = uint256(_change);
            if (increase > MAX_REPUTATION_SCORE - identity.reputationScore) {
                identity.reputationScore = MAX_REPUTATION_SCORE;
            } else {
                identity.reputationScore += increase;
            }
        }

        emit ReputationUpdated(
            _user,
            identity.reputationScore,
            block.timestamp
        );
        emit IdentityUpdated(_user, identity.level, block.timestamp);
    }

    // View functions
    function getIdentity(
        address _user
    )
        external
        view
        returns (
            bool exists,
            VerificationLevel level,
            uint256 timestamp,
            uint256 reputationScore,
            uint256 endorsementCount
        )
    {
        Identity storage identity = identities[_user];
        return (
            identity.exists,
            identity.level,
            identity.timestamp,
            identity.reputationScore,
            identity.endorsers.length
        );
    }

    function hasAttribute(
        address _user,
        string calldata _attribute
    ) external view returns (bool) {
        return identities[_user].attributes[_attribute];
    }

    function getVerificationRequest(
        uint256 _requestId
    )
        external
        view
        returns (
            address user,
            VerificationLevel requestedLevel,
            uint256 timestamp,
            bool processed,
            bool approved
        )
    {
        VerificationRequest storage request = verificationRequests[_requestId];
        return (
            request.user,
            request.requestedLevel,
            request.timestamp,
            request.processed,
            request.approved
        );
    }

    function isVerified(
        address _user,
        VerificationLevel _minLevel
    ) external view returns (bool) {
        return
            identities[_user].exists &&
            uint8(identities[_user].level) >= uint8(_minLevel);
    }

    // Admin functions
    function addVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = true;
    }

    function removeVerifier(address _verifier) external onlyOwner {
        verifiers[_verifier] = false;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // Internal helper functions
    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
