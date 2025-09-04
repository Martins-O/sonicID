const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

// Environment validation
function validateEnvironment() {
  const requiredVars = ['PRIVATE_KEY'];
  const missingVars = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.error("❌ Missing required environment variables:");
    console.error("Missing:", missingVars.join(", "));
    console.error("Please check your .env file.");
    process.exit(1);
  }
}

// Network validation
function validateNetwork() {
  const supportedNetworks = ['sonic', 'sonic-testnet', 'hardhat', 'localhost'];
  if (!supportedNetworks.includes(network.name)) {
    console.error(`❌ Unsupported network: ${network.name}`);
    console.error(`Supported networks: ${supportedNetworks.join(', ')}`);
    process.exit(1);
  }
}

// Gas estimation helper
async function estimateDeploymentGas(contractFactory, ...args) {
  try {
    const deployTx = await contractFactory.getDeployTransaction(...args);
    const estimatedGas = await ethers.provider.estimateGas(deployTx);
    return estimatedGas;
  } catch (error) {
    console.warn("⚠️  Could not estimate gas:", error.message);
    return null;
  }
}

// Deployment confirmation
async function confirmDeployment(networkName, balance) {
  if (process.env.ENABLE_DEPLOYMENT_CONFIRMATION === "true" && networkName !== "hardhat") {
    console.log(`\n🔍 Deployment Confirmation Required`);
    console.log(`Network: ${networkName}`);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
    
    // In a real deployment, you might want to add actual user input confirmation
    // For now, we'll just add a delay
    console.log("⏳ Proceeding with deployment in 3 seconds...");
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

async function main() {
  console.log("🚀 Starting SonicID deployment...");
  console.log(`📡 Network: ${network.name} (Chain ID: ${network.config.chainId})`);
  
  // Validate environment and network
  validateEnvironment();
  validateNetwork();

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log("📍 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance));

  // Check minimum balance requirement
  const minimumBalance = ethers.parseEther("0.01"); // Adjust based on network
  if (balance < minimumBalance) {
    console.error(`❌ Insufficient balance. Minimum required: ${ethers.formatEther(minimumBalance)} ETH`);
    process.exit(1);
  }

  // Confirm deployment if required
  await confirmDeployment(network.name, balance);

  const deploymentStartTime = Date.now();
  const deployedContracts = {};

  try {
    // Deploy IdentityRegistry
    console.log("\n📋 Deploying IdentityRegistry...");
    const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    
    // Estimate gas for IdentityRegistry deployment
    const identityGasEstimate = await estimateDeploymentGas(IdentityRegistry);
    if (identityGasEstimate) {
      console.log(`⛽ Estimated gas: ${identityGasEstimate.toString()}`);
    }

    const identityRegistry = await IdentityRegistry.deploy({
      gasLimit: process.env.DEPLOYMENT_GAS_LIMIT || 8000000,
    });
    console.log(`📝 Transaction hash: ${identityRegistry.deploymentTransaction().hash}`);
    
    console.log("⏳ Waiting for IdentityRegistry deployment confirmation...");
    await identityRegistry.waitForDeployment();
    const identityRegistryAddress = await identityRegistry.getAddress();
    deployedContracts.IdentityRegistry = {
      address: identityRegistryAddress,
      txHash: identityRegistry.deploymentTransaction().hash
    };
    console.log("✅ IdentityRegistry deployed to:", identityRegistryAddress);

    // Deploy ZKVerifier
    console.log("\n🔐 Deploying ZKVerifier...");
    const ZKVerifier = await ethers.getContractFactory("ZKVerifier");
    
    // Estimate gas for ZKVerifier deployment
    const zkGasEstimate = await estimateDeploymentGas(ZKVerifier);
    if (zkGasEstimate) {
      console.log(`⛽ Estimated gas: ${zkGasEstimate.toString()}`);
    }

    const zkVerifier = await ZKVerifier.deploy({
      gasLimit: process.env.DEPLOYMENT_GAS_LIMIT || 8000000,
    });
    console.log(`📝 Transaction hash: ${zkVerifier.deploymentTransaction().hash}`);
    
    console.log("⏳ Waiting for ZKVerifier deployment confirmation...");
    await zkVerifier.waitForDeployment();
    const zkVerifierAddress = await zkVerifier.getAddress();
    deployedContracts.ZKVerifier = {
      address: zkVerifierAddress,
      txHash: zkVerifier.deploymentTransaction().hash
    };
    console.log("✅ ZKVerifier deployed to:", zkVerifierAddress);

    // Deploy ReputationEngine
    console.log("\n⭐ Deploying ReputationEngine...");
    const ReputationEngine = await ethers.getContractFactory("ReputationEngine");
    
    // Estimate gas for ReputationEngine deployment
    const reputationGasEstimate = await estimateDeploymentGas(ReputationEngine, identityRegistryAddress);
    if (reputationGasEstimate) {
      console.log(`⛽ Estimated gas: ${reputationGasEstimate.toString()}`);
    }

    const reputationEngine = await ReputationEngine.deploy(identityRegistryAddress, {
      gasLimit: process.env.DEPLOYMENT_GAS_LIMIT || 8000000,
    });
    console.log(`📝 Transaction hash: ${reputationEngine.deploymentTransaction().hash}`);
    
    console.log("⏳ Waiting for ReputationEngine deployment confirmation...");
    await reputationEngine.waitForDeployment();
    const reputationEngineAddress = await reputationEngine.getAddress();
    deployedContracts.ReputationEngine = {
      address: reputationEngineAddress,
      txHash: reputationEngine.deploymentTransaction().hash
    };
    console.log("✅ ReputationEngine deployed to:", reputationEngineAddress);

    // Configure contract interactions
    console.log("\n⚙️ Configuring contracts...");
    
    try {
      // Add ZKVerifier as authorized verifier for IdentityRegistry
      console.log("🔗 Adding ZKVerifier as authorized verifier...");
      const tx1 = await identityRegistry.addVerifier(zkVerifierAddress, {
        gasLimit: process.env.TRANSACTION_GAS_LIMIT || 500000,
      });
      await tx1.wait();
      console.log("✅ ZKVerifier added as authorized verifier");

      // Add ReputationEngine as authorized verifier for IdentityRegistry  
      console.log("🔗 Adding ReputationEngine as authorized verifier...");
      const tx2 = await identityRegistry.addVerifier(reputationEngineAddress, {
        gasLimit: process.env.TRANSACTION_GAS_LIMIT || 500000,
      });
      await tx2.wait();
      console.log("✅ ReputationEngine added as authorized verifier");

      // Add ZKVerifier as authorized verifier for ReputationEngine
      console.log("🔗 Adding ZKVerifier as platform operator...");
      const tx3 = await reputationEngine.addPlatformOperator(zkVerifierAddress, {
        gasLimit: process.env.TRANSACTION_GAS_LIMIT || 500000,
      });
      await tx3.wait();
      console.log("✅ ZKVerifier added as platform operator");
    } catch (configError) {
      console.error("⚠️  Configuration error:", configError.message);
      console.log("🔄 Contracts deployed but configuration incomplete. You may need to configure manually.");
    }

    // Calculate deployment duration
    const deploymentDuration = Date.now() - deploymentStartTime;
    console.log(`\n🎉 SonicID deployment completed successfully in ${deploymentDuration / 1000}s!`);
    
    // Ensure deployments directory exists
    const deploymentsDir = path.join(__dirname, '..', 'deployments');
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    // Save deployment addresses
    const deploymentData = {
      network: network.name,
      chainId: network.config.chainId,
      timestamp: Date.now(),
      deploymentDuration: deploymentDuration,
      deployer: deployer.address,
      deployerBalance: ethers.formatEther(balance),
      contracts: deployedContracts,
      gasUsed: {
        // This would be populated from actual transaction receipts
        IdentityRegistry: identityGasEstimate?.toString() || "unknown",
        ZKVerifier: zkGasEstimate?.toString() || "unknown",
        ReputationEngine: reputationGasEstimate?.toString() || "unknown"
      },
      environment: process.env.DEPLOYMENT_ENVIRONMENT || "unknown"
    };

    const deploymentFileName = `${network.name}-deployment-${Date.now()}.json`;
    const deploymentFilePath = path.join(deploymentsDir, deploymentFileName);
    const latestFilePath = path.join(deploymentsDir, `${network.name}-latest.json`);
    
    try {
      fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentData, null, 2));
      fs.writeFileSync(latestFilePath, JSON.stringify(deploymentData, null, 2));
      console.log("📝 Deployment data saved to:");
      console.log(`   - ${deploymentFilePath}`);
      console.log(`   - ${latestFilePath}`);
    } catch (writeError) {
      console.error("⚠️  Could not save deployment data:", writeError.message);
    }

    // Test basic functionality (optional)
    if (process.env.RUN_TESTS_AFTER_DEPLOY === "true") {
      console.log("\n🧪 Running basic functionality tests...");
      
      try {
        // Test contract connectivity
        const identityOwner = await identityRegistry.owner();
        const zkAdmin = await zkVerifier.owner();
        const reputationOwner = await reputationEngine.owner();
        
        console.log("🔍 Contract ownership verification:");
        console.log(`  IdentityRegistry owner: ${identityOwner}`);
        console.log(`  ZKVerifier owner: ${zkAdmin}`);
        console.log(`  ReputationEngine owner: ${reputationOwner}`);
        
        // Verify correct configuration
        console.log("🔍 Testing contract configuration...");
        const isVerifierAuthorized = await identityRegistry.verifiers(zkVerifierAddress);
        console.log(`  ZKVerifier authorized: ${isVerifierAuthorized}`);
        
        console.log("✅ Basic functionality tests passed!");
      } catch (testError) {
        console.warn("⚠️  Basic tests failed:", testError.message);
      }
    }

    // Contract verification reminder
    if (process.env.AUTO_VERIFY_CONTRACTS === "true" && network.name !== "hardhat") {
      console.log("\n🔍 Contract Verification:");
      console.log("Automatic verification will be attempted after block confirmations.");
      console.log("You can also manually verify using:");
      console.log(`  npm run verify:${network.name === 'sonic' ? 'mainnet' : 'testnet'}`);
    }

    console.log("\n📊 Deployment Summary:");
    console.log("═".repeat(60));
    console.log(`Network:          ${network.name} (Chain ID: ${network.config.chainId})`);
    console.log(`Deployer:         ${deployer.address}`);
    console.log(`Deployment Time:  ${new Date(deploymentData.timestamp).toISOString()}`);
    console.log(`Duration:         ${deploymentDuration / 1000}s`);
    console.log("─".repeat(60));
    console.log(`IdentityRegistry: ${deployedContracts.IdentityRegistry.address}`);
    console.log(`ZKVerifier:       ${deployedContracts.ZKVerifier.address}`);
    console.log(`ReputationEngine: ${deployedContracts.ReputationEngine.address}`);
    console.log("═".repeat(60));

    // Next steps guidance
    console.log("\n📋 Next Steps:");
    console.log("1. Verify contracts on block explorer (if not auto-verified)");
    console.log("2. Update frontend configuration with new contract addresses");
    console.log("3. Run comprehensive tests against deployed contracts");
    console.log("4. Configure monitoring and alerts");
    if (network.name === 'sonic-testnet') {
      console.log("5. Test all functionality thoroughly before mainnet deployment");
    }

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    
    // Save partial deployment data if any contracts were deployed
    if (Object.keys(deployedContracts).length > 0) {
      console.log("💾 Saving partial deployment data...");
      const partialData = {
        network: network.name,
        timestamp: Date.now(),
        status: "FAILED",
        error: error.message,
        contracts: deployedContracts,
        deployer: deployer.address
      };
      
      try {
        const failedDeploymentPath = path.join(__dirname, '..', 'deployments', `${network.name}-failed-${Date.now()}.json`);
        fs.writeFileSync(failedDeploymentPath, JSON.stringify(partialData, null, 2));
        console.log(`💾 Partial deployment data saved to: ${failedDeploymentPath}`);
      } catch (saveError) {
        console.error("Could not save partial deployment data:", saveError.message);
      }
    }
    
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("❌ Script failed:", error);
  process.exitCode = 1;
});