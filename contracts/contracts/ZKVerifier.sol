// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract ZKVerifier is Ownable, Pausable {
    
    struct ProofData {
        bytes32 proofHash;
        bytes32 publicSignalsHash;
        uint256 timestamp;
        address verifier;
        bool isValid;
    }
    
    struct VerificationCircuit {
        string name;
        bytes32 verificationKeyHash;
        bool isActive;
        uint256 timestamp;
    }
    
    // Events
    event ProofVerified(
        bytes32 indexed proofHash,
        address indexed user,
        string circuitName,
        bool isValid,
        uint256 timestamp
    );
    event CircuitRegistered(
        string indexed name,
        bytes32 verificationKeyHash,
        uint256 timestamp
    );
    event CircuitUpdated(
        string indexed name,
        bytes32 newVerificationKeyHash,
        uint256 timestamp
    );
    
    // State variables
    mapping(bytes32 => ProofData) public proofs;
    mapping(string => VerificationCircuit) public circuits;
    mapping(address => bool) public authorizedVerifiers;
    
    string[] public circuitNames;
    
    modifier onlyAuthorizedVerifier() {
        require(
            authorizedVerifiers[msg.sender] || msg.sender == owner(),
            "Not authorized to verify proofs"
        );
        _;
    }
    
    constructor() Ownable(msg.sender) {
        authorizedVerifiers[msg.sender] = true;
        
        // Register default verification circuits
        _registerCircuit("age_verification", bytes32(0)); // Placeholder
        _registerCircuit("identity_verification", bytes32(0)); // Placeholder
        _registerCircuit("location_verification", bytes32(0)); // Placeholder
        _registerCircuit("credential_verification", bytes32(0)); // Placeholder
    }
    
    function registerCircuit(
        string calldata _name,
        bytes32 _verificationKeyHash
    ) external onlyOwner {
        _registerCircuit(_name, _verificationKeyHash);
    }
    
    function updateCircuit(
        string calldata _name,
        bytes32 _newVerificationKeyHash
    ) external onlyOwner {
        require(circuits[_name].timestamp > 0, "Circuit does not exist");
        
        circuits[_name].verificationKeyHash = _newVerificationKeyHash;
        circuits[_name].timestamp = block.timestamp;
        
        emit CircuitUpdated(_name, _newVerificationKeyHash, block.timestamp);
    }
    
    // Simplified ZK proof verification (for demo purposes)
    // In production, this would integrate with actual ZK libraries like circomlib
    function verifyProof(
        bytes32 _proofHash,
        bytes32 _publicSignalsHash,
        string calldata _circuitName,
        address _user
    ) external onlyAuthorizedVerifier whenNotPaused returns (bool) {
        require(circuits[_circuitName].isActive, "Circuit not active");
        require(proofs[_proofHash].timestamp == 0, "Proof already processed");
        
        // For demo: simplified verification logic
        // In production: implement actual zk-SNARK verification
        bool isValid = _simulateZKVerification(_proofHash, _publicSignalsHash, _circuitName);
        
        proofs[_proofHash] = ProofData({
            proofHash: _proofHash,
            publicSignalsHash: _publicSignalsHash,
            timestamp: block.timestamp,
            verifier: msg.sender,
            isValid: isValid
        });
        
        emit ProofVerified(_proofHash, _user, _circuitName, isValid, block.timestamp);
        return isValid;
    }
    
    // Batch verification for efficiency on Sonic's high-throughput network
    function batchVerifyProofs(
        bytes32[] calldata _proofHashes,
        bytes32[] calldata _publicSignalsHashes,
        string[] calldata _circuitNames,
        address[] calldata _users
    ) external onlyAuthorizedVerifier whenNotPaused returns (bool[] memory) {
        require(
            _proofHashes.length == _publicSignalsHashes.length &&
            _proofHashes.length == _circuitNames.length &&
            _proofHashes.length == _users.length,
            "Array lengths must match"
        );
        
        bool[] memory results = new bool[](_proofHashes.length);
        
        for (uint i = 0; i < _proofHashes.length; i++) {
            results[i] = this.verifyProof(
                _proofHashes[i],
                _publicSignalsHashes[i],
                _circuitNames[i],
                _users[i]
            );
        }
        
        return results;
    }
    
    // Generate proof request for frontend
    function generateProofChallenge(
        string calldata _circuitName,
        address _user
    ) external view returns (bytes32) {
        require(circuits[_circuitName].isActive, "Circuit not active");
        
        return keccak256(
            abi.encodePacked(
                _circuitName,
                _user,
                block.timestamp,
                block.difficulty
            )
        );
    }
    
    // View functions
    function getProofData(bytes32 _proofHash) external view returns (
        bytes32 proofHash,
        bytes32 publicSignalsHash,
        uint256 timestamp,
        address verifier,
        bool isValid
    ) {
        ProofData storage proof = proofs[_proofHash];
        return (
            proof.proofHash,
            proof.publicSignalsHash,
            proof.timestamp,
            proof.verifier,
            proof.isValid
        );
    }
    
    function getCircuitInfo(string calldata _name) external view returns (
        string memory name,
        bytes32 verificationKeyHash,
        bool isActive,
        uint256 timestamp
    ) {
        VerificationCircuit storage circuit = circuits[_name];
        return (
            _name,
            circuit.verificationKeyHash,
            circuit.isActive,
            circuit.timestamp
        );
    }
    
    function getAllCircuits() external view returns (string[] memory) {
        return circuitNames;
    }
    
    function isProofValid(bytes32 _proofHash) external view returns (bool) {
        return proofs[_proofHash].isValid && proofs[_proofHash].timestamp > 0;
    }
    
    // Admin functions
    function addAuthorizedVerifier(address _verifier) external onlyOwner {
        authorizedVerifiers[_verifier] = true;
    }
    
    function removeAuthorizedVerifier(address _verifier) external onlyOwner {
        authorizedVerifiers[_verifier] = false;
    }
    
    function deactivateCircuit(string calldata _name) external onlyOwner {
        circuits[_name].isActive = false;
    }
    
    function activateCircuit(string calldata _name) external onlyOwner {
        require(circuits[_name].timestamp > 0, "Circuit does not exist");
        circuits[_name].isActive = true;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // Internal functions
    function _registerCircuit(
        string memory _name,
        bytes32 _verificationKeyHash
    ) internal {
        require(circuits[_name].timestamp == 0, "Circuit already exists");
        
        circuits[_name] = VerificationCircuit({
            name: _name,
            verificationKeyHash: _verificationKeyHash,
            isActive: true,
            timestamp: block.timestamp
        });
        
        circuitNames.push(_name);
        emit CircuitRegistered(_name, _verificationKeyHash, block.timestamp);
    }
    
    // Simplified ZK verification simulation for demo
    // In production, replace with actual zk-SNARK verification logic
    function _simulateZKVerification(
        bytes32 _proofHash,
        bytes32 _publicSignalsHash,
        string calldata _circuitName
    ) internal view returns (bool) {
        // Demo logic: proof is valid if it meets basic criteria
        // Real implementation would use libraries like verifier.sol generated by circom
        
        bytes32 expectedHash = keccak256(
            abi.encodePacked(_proofHash, _publicSignalsHash, _circuitName, circuits[_circuitName].verificationKeyHash)
        );
        
        // Simple validation: check if proof components create expected pattern
        return uint256(expectedHash) % 10 > 2; // 80% success rate for demo
    }
}