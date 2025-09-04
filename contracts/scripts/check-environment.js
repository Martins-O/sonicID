#!/usr/bin/env node
require("dotenv").config();

/**
 * Environment validation script for SonicID deployment
 * Run this before deploying to ensure all required variables are set
 */

const chalk = require('chalk');

// Required environment variables
const REQUIRED_VARS = [
  'PRIVATE_KEY',
  'DEPLOYER_ADDRESS',
];

// Recommended environment variables
const RECOMMENDED_VARS = [
  'SONIC_TESTNET_API_KEY',
  'SONIC_MAINNET_API_KEY',
  'DEPLOYMENT_ENVIRONMENT',
  'REPORT_GAS',
];

// Optional but useful variables
const OPTIONAL_VARS = [
  'COINMARKETCAP_API_KEY',
  'ETHERSCAN_API_KEY',
  'MONITORING_ENABLED',
  'AUTO_VERIFY_CONTRACTS',
  'ENABLE_DEPLOYMENT_CONFIRMATION',
];

function checkEnvironment() {
  console.log('🔍 SonicID Environment Validation\n');
  
  let hasErrors = false;
  let hasWarnings = false;

  // Check required variables
  console.log('📋 Required Variables:');
  for (const varName of REQUIRED_VARS) {
    if (process.env[varName]) {
      if (varName === 'PRIVATE_KEY') {
        // Validate private key format
        const key = process.env[varName];
        if (key.length === 64 || (key.startsWith('0x') && key.length === 66)) {
          console.log(`  ✅ ${varName}: Set (${key.substring(0, 6)}...)`);
        } else {
          console.log(`  ❌ ${varName}: Invalid format (should be 64 chars without 0x or 66 chars with 0x)`);
          hasErrors = true;
        }
      } else if (varName === 'DEPLOYER_ADDRESS') {
        // Validate address format
        const addr = process.env[varName];
        if (addr.match(/^0x[a-fA-F0-9]{40}$/)) {
          console.log(`  ✅ ${varName}: ${addr}`);
        } else {
          console.log(`  ❌ ${varName}: Invalid address format`);
          hasErrors = true;
        }
      } else {
        console.log(`  ✅ ${varName}: Set`);
      }
    } else {
      console.log(`  ❌ ${varName}: Missing`);
      hasErrors = true;
    }
  }

  // Check recommended variables
  console.log('\n💡 Recommended Variables:');
  for (const varName of RECOMMENDED_VARS) {
    if (process.env[varName]) {
      console.log(`  ✅ ${varName}: Set`);
    } else {
      console.log(`  ⚠️  ${varName}: Not set`);
      hasWarnings = true;
    }
  }

  // Check optional variables
  console.log('\n🔧 Optional Variables:');
  for (const varName of OPTIONAL_VARS) {
    if (process.env[varName]) {
      console.log(`  ✅ ${varName}: Set`);
    } else {
      console.log(`  ➖ ${varName}: Not set`);
    }
  }

  // Network-specific checks
  console.log('\n🌐 Network Configuration:');
  
  // Check Sonic URLs
  const sonicMainnetUrl = process.env.SONIC_MAINNET_RPC_URL || "https://rpc.sonic.fantom.network/";
  const sonicTestnetUrl = process.env.SONIC_TESTNET_RPC_URL || "https://sonic-blaze-rpc.publicnode.com";
  
  console.log(`  📡 Sonic Mainnet RPC: ${sonicMainnetUrl}`);
  console.log(`  📡 Sonic Testnet RPC: ${sonicTestnetUrl}`);

  // Gas configuration
  const mainnetGasPrice = process.env.SONIC_MAINNET_GAS_PRICE || "25000000000";
  const testnetGasPrice = process.env.SONIC_TESTNET_GAS_PRICE || "20000000000";
  
  console.log(`  ⛽ Mainnet Gas Price: ${mainnetGasPrice} wei (${mainnetGasPrice / 1e9} gwei)`);
  console.log(`  ⛽ Testnet Gas Price: ${testnetGasPrice} wei (${testnetGasPrice / 1e9} gwei)`);

  // Security checks
  console.log('\n🔒 Security Validation:');
  
  // Check if .env is in gitignore
  const fs = require('fs');
  const path = require('path');
  
  try {
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
      if (gitignoreContent.includes('.env') && !gitignoreContent.includes('!.env.example')) {
        console.log('  ✅ .env file properly ignored in git');
      } else {
        console.log('  ⚠️  .env may not be properly ignored in git');
        hasWarnings = true;
      }
    }
  } catch (error) {
    console.log('  ➖ Could not check .gitignore');
  }

  // Check private key security
  if (process.env.PRIVATE_KEY) {
    console.log('  ✅ Private key detected');
    console.log('  ⚠️  Ensure this is a dedicated deployment wallet with minimal funds');
  }

  // Environment-specific advice
  const env = process.env.DEPLOYMENT_ENVIRONMENT;
  if (env) {
    console.log(`\n🎯 Environment: ${env}`);
    if (env === 'production') {
      console.log('  🚨 Production deployment - extra caution required!');
      console.log('  📋 Pre-deployment checklist:');
      console.log('    - Smart contracts audited');
      console.log('    - Testnet deployment successful');
      console.log('    - All tests passing');
      console.log('    - Backup and recovery procedures ready');
    }
  }

  // Final summary
  console.log('\n📊 Validation Summary:');
  
  if (hasErrors) {
    console.log('  ❌ Errors found - deployment will fail');
    console.log('  📝 Create .env file from .env.example and fill in required values');
    process.exit(1);
  } else {
    console.log('  ✅ All required variables present');
  }

  if (hasWarnings) {
    console.log('  ⚠️  Warnings found - deployment may proceed but consider addressing');
  } else {
    console.log('  ✅ No warnings');
  }

  console.log('\n🚀 Environment validation complete - ready for deployment!');
  
  // Display next steps
  console.log('\n📋 Next Steps:');
  console.log('  1. npm run compile          - Compile contracts');
  console.log('  2. npm run test              - Run tests');
  console.log('  3. npm run deploy:testnet    - Deploy to testnet');
  console.log('  4. npm run verify:testnet    - Verify on testnet');
  console.log('  5. npm run deploy:mainnet    - Deploy to mainnet (when ready)');
}

// Run the check
try {
  checkEnvironment();
} catch (error) {
  console.error('❌ Environment check failed:', error.message);
  process.exit(1);
}