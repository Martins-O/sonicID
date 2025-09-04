# SonicID Platform Deployment Guide

## Overview
This guide covers the secure deployment of SonicID smart contracts to Sonic networks, including environment setup, security best practices, and deployment procedures.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Security Best Practices](#security-best-practices)
- [Network Configuration](#network-configuration)
- [Deployment Process](#deployment-process)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Post-Deployment](#post-deployment)

## Prerequisites

### Software Requirements
- Node.js (v18.0.0 or higher)
- npm or yarn package manager
- Git
- A secure wallet for deployment

### Sonic Network Details
- **Sonic Mainnet**: RPC `https://rpc.sonic.fantom.network/`, Chain ID `146`
- **Sonic Testnet**: RPC `https://sonic-blaze-rpc.publicnode.com`, Chain ID `57054`

## Environment Setup

### 1. Clone and Install Dependencies
```bash
cd contracts/
npm install
```

### 2. Environment Configuration
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Required Environment Variables
Fill in the `.env` file with your specific values:

```bash
# CRITICAL: Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# Public address of the deploying account
DEPLOYER_ADDRESS=0xYourDeployerAddressHere

# Network API keys for contract verification
SONIC_TESTNET_API_KEY=your_testnet_api_key
SONIC_MAINNET_API_KEY=your_mainnet_api_key

# Deployment environment
DEPLOYMENT_ENVIRONMENT=development
```

### 4. Validate Environment
```bash
# Check your environment configuration
npm run check-env
```

## Security Best Practices

### Wallet Security
1. **Use Dedicated Deployment Wallet**: Create a separate wallet exclusively for contract deployment
2. **Minimal Funding**: Keep only necessary funds for gas costs
3. **Private Key Management**: Never share or commit private keys
4. **Hardware Wallet**: Consider using a hardware wallet for mainnet deployments

### Environment Security
1. **Git Ignore**: Ensure `.env` is in `.gitignore`
2. **Access Control**: Limit access to deployment credentials
3. **Backup Strategy**: Securely backup private keys and mnemonic phrases
4. **Multi-Factor Authentication**: Use 2FA on all related accounts

### Code Security
1. **Contract Audits**: Have contracts professionally audited before mainnet
2. **Test Coverage**: Maintain >95% test coverage
3. **Static Analysis**: Use security analysis tools
4. **Pause Mechanisms**: Implement emergency pause functionality

## Network Configuration

### Testnet Deployment (Recommended First)
```bash
# Compile contracts
npm run compile

# Run tests
npm run test

# Deploy to testnet
npm run deploy:testnet

# Verify contracts
npm run verify:testnet
```

### Mainnet Deployment
```bash
# Final pre-deployment checks
npm run check-env
npm run test

# Deploy to mainnet
npm run deploy:mainnet

# Verify contracts
npm run verify:mainnet
```

## Deployment Process

### Step-by-Step Deployment

1. **Pre-deployment Validation**
   ```bash
   # Validate environment
   npm run check-env
   
   # Compile contracts
   npm run compile
   
   # Run comprehensive tests
   npm run test:coverage
   ```

2. **Gas Estimation and Analysis**
   ```bash
   # Generate gas report
   npm run test:gas
   ```

3. **Deploy Contracts**
   ```bash
   # For testnet
   npm run deploy:testnet
   
   # For mainnet (when ready)
   npm run deploy:mainnet
   ```

4. **Contract Verification**
   ```bash
   # Verify on block explorer
   npm run verify:testnet  # or verify:mainnet
   ```

### Deployment Script Features
The deployment script includes:
- Environment validation
- Gas estimation
- Transaction monitoring
- Error handling and recovery
- Deployment data backup
- Configuration verification
- Post-deployment testing

### Expected Gas Costs (Approximate)
- **IdentityRegistry**: ~2,500,000 gas
- **ZKVerifier**: ~1,800,000 gas  
- **ReputationEngine**: ~2,200,000 gas
- **Configuration**: ~300,000 gas (total)
- **Total**: ~6,800,000 gas

## Verification

### Automatic Verification
Contracts are automatically verified on the block explorer if:
- `AUTO_VERIFY_CONTRACTS=true` in `.env`
- Valid API keys are configured
- Network supports verification

### Manual Verification
If automatic verification fails:
```bash
# Individual contract verification
npx hardhat verify --network sonic-testnet CONTRACT_ADDRESS [CONSTRUCTOR_ARGS]
```

### Verification Status Check
Check verification status in deployment outputs or on the block explorer.

## Troubleshooting

### Common Issues

#### 1. Insufficient Funds
**Error**: "insufficient funds for gas"
**Solution**: Add more ETH to deployment wallet

#### 2. Gas Price Too Low
**Error**: Transaction stuck/failing
**Solution**: Increase gas price in `.env`:
```bash
SONIC_MAINNET_GAS_PRICE=30000000000  # 30 gwei
```

#### 3. Private Key Format
**Error**: "invalid private key"
**Solution**: Ensure private key is 64 characters (without 0x) or 66 characters (with 0x)

#### 4. Network Connection
**Error**: "network request failed"
**Solution**: Check RPC URL or use backup:
```bash
SONIC_MAINNET_RPC_BACKUP=https://backup-rpc.sonic.network
```

#### 5. Verification Failure
**Error**: "verification failed"
**Solutions**:
- Wait for more block confirmations
- Check constructor arguments
- Ensure compiler version matches
- Try manual verification

### Debug Mode
Enable detailed logging:
```bash
DEBUG_ENABLED=true
VERBOSE_LOGGING=true
```

## Post-Deployment

### 1. Update Frontend Configuration
Update frontend with new contract addresses from deployment output.

### 2. Configure Monitoring
Set up monitoring for:
- Contract events
- Transaction volume
- Error rates
- Gas usage patterns

### 3. Test Functionality
Run comprehensive tests against deployed contracts:
```bash
# Test with deployed addresses
npm run test -- --network sonic-testnet
```

### 4. Documentation Updates
- Update README with contract addresses
- Document any configuration changes
- Update API documentation

### 5. Backup Deployment Data
Deployment data is automatically saved to:
- `deployments/[network]-latest.json`
- `deployments/[network]-deployment-[timestamp].json`

### 6. Security Measures
- Transfer ownership to multi-sig wallet
- Set up emergency pause mechanisms  
- Configure access controls
- Implement monitoring alerts

## Emergency Procedures

### Contract Pause
If issues are discovered:
```bash
# Connect to deployed contract and pause
npx hardhat run scripts/emergency-pause.js --network [network]
```

### Recovery Process
1. Identify the issue
2. Pause affected contracts
3. Assess impact and develop fix
4. Deploy fixed contracts (if needed)
5. Migrate state (if possible)
6. Resume operations

## Support and Resources

### Documentation
- [Hardhat Documentation](https://hardhat.org/docs)
- [Sonic Network Documentation](https://docs.sonic.fantom.network/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

### Community
- Sonic Discord/Telegram
- SonicID GitHub Issues
- Smart Contract Security Communities

### Professional Services
Consider professional audit services before mainnet deployment:
- Trail of Bits
- OpenZeppelin
- Consensys Diligence
- Certik

---

## Quick Reference

### Essential Commands
```bash
# Environment validation
npm run check-env

# Compilation and testing
npm run compile
npm run test
npm run test:coverage

# Deployment
npm run deploy:testnet
npm run deploy:mainnet

# Verification
npm run verify:testnet
npm run verify:mainnet

# Gas analysis
npm run test:gas
```

### Important Files
- `.env` - Environment configuration (DO NOT COMMIT)
- `.env.example` - Template for environment setup
- `hardhat.config.js` - Network and compiler configuration
- `scripts/deploy.js` - Main deployment script
- `scripts/verify.js` - Contract verification script
- `deployments/` - Deployment artifacts and addresses

### Security Checklist
- [ ] Private key secured and backed up
- [ ] .env file not committed to git
- [ ] Dedicated deployment wallet with minimal funds
- [ ] All tests passing with >95% coverage
- [ ] Contracts audited (for mainnet)
- [ ] Emergency procedures documented
- [ ] Monitoring and alerts configured