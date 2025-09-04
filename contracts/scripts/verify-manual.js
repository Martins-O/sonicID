const { run } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🔍 Manual Contract Verification on Sonic Testnet");
  
  // Read deployment data
  const deploymentFiles = fs.readdirSync('./deployments').filter(f => f.endsWith('.json'));
  if (deploymentFiles.length === 0) {
    console.error("❌ No deployment files found");
    return;
  }
  
  const latestDeployment = deploymentFiles.sort().pop();
  const deploymentData = JSON.parse(fs.readFileSync(`./deployments/${latestDeployment}`, 'utf8'));
  
  console.log(`📄 Using deployment: ${latestDeployment}`);
  console.log(`🌐 Network: ${deploymentData.network} (Chain ID: ${deploymentData.chainId})`);
  
  const contracts = deploymentData.contracts;
  
  try {
    // Verify IdentityRegistry
    console.log("\\n📋 Verifying IdentityRegistry...");
    await run("verify:verify", {
      address: contracts.IdentityRegistry.address,
      constructorArguments: [],
      network: "sonic-testnet"
    });
    console.log("✅ IdentityRegistry verified successfully");
    
  } catch (error) {
    console.log(`❌ IdentityRegistry verification failed: ${error.message}`);
    
    // Alternative verification using block explorer API directly
    console.log("🔄 Attempting alternative verification method...");
    await manualVerification(contracts.IdentityRegistry.address, "IdentityRegistry", []);
  }
  
  try {
    // Verify ZKVerifier
    console.log("\\n🔐 Verifying ZKVerifier...");
    await run("verify:verify", {
      address: contracts.ZKVerifier.address,
      constructorArguments: [],
      network: "sonic-testnet"
    });
    console.log("✅ ZKVerifier verified successfully");
    
  } catch (error) {
    console.log(`❌ ZKVerifier verification failed: ${error.message}`);
    await manualVerification(contracts.ZKVerifier.address, "ZKVerifier", []);
  }
  
  try {
    // Verify ReputationEngine
    console.log("\\n⭐ Verifying ReputationEngine...");
    await run("verify:verify", {
      address: contracts.ReputationEngine.address,
      constructorArguments: [contracts.IdentityRegistry.address],
      network: "sonic-testnet"
    });
    console.log("✅ ReputationEngine verified successfully");
    
  } catch (error) {
    console.log(`❌ ReputationEngine verification failed: ${error.message}`);
    await manualVerification(contracts.ReputationEngine.address, "ReputationEngine", [contracts.IdentityRegistry.address]);
  }
  
  console.log("\\n🎉 Verification process completed!");
  console.log("\\n📊 Contract Summary:");
  console.log("═════════════════════════════════════════════════");
  console.log(`IdentityRegistry: ${contracts.IdentityRegistry.address}`);
  console.log(`ZKVerifier:       ${contracts.ZKVerifier.address}`);
  console.log(`ReputationEngine: ${contracts.ReputationEngine.address}`);
  console.log("═════════════════════════════════════════════════");
  
  // Explorer links
  console.log("\\n🔗 Block Explorer Links:");
  const explorerBase = "https://testnet.sonicscan.org/address";
  console.log(`IdentityRegistry: ${explorerBase}/${contracts.IdentityRegistry.address}`);
  console.log(`ZKVerifier:       ${explorerBase}/${contracts.ZKVerifier.address}`);
  console.log(`ReputationEngine: ${explorerBase}/${contracts.ReputationEngine.address}`);
}

async function manualVerification(address, contractName, constructorArgs) {
  console.log(`🔧 Manual verification for ${contractName} at ${address}`);
  
  // This would typically involve direct API calls to the block explorer
  // For now, we'll provide the information needed for manual verification
  console.log(`📝 Manual verification details:`);
  console.log(`   Contract Address: ${address}`);
  console.log(`   Contract Name: ${contractName}`);
  console.log(`   Constructor Args: ${JSON.stringify(constructorArgs)}`);
  console.log(`   Compiler Version: 0.8.27`);
  console.log(`   Optimization: Enabled (1000 runs)`);
  console.log(`   Chain ID: 14601 (Sonic Testnet)`);
  
  return true;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification script failed:", error);
    process.exit(1);
  });