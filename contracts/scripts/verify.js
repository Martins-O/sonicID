const { run } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔍 Starting contract verification...");

  // Get network name
  const network = hre.network.name;
  console.log(`📡 Network: ${network}`);

  // Load deployment data
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  const latestFilePath = path.join(deploymentsDir, `${network}-latest.json`);

  if (!fs.existsSync(latestFilePath)) {
    console.error(`❌ No deployment data found for ${network}`);
    console.error(`Expected file: ${latestFilePath}`);
    process.exit(1);
  }

  let deploymentData;
  try {
    deploymentData = JSON.parse(fs.readFileSync(latestFilePath, 'utf8'));
  } catch (error) {
    console.error("❌ Failed to read deployment data:", error.message);
    process.exit(1);
  }

  const contracts = deploymentData.contracts;
  
  if (!contracts) {
    console.error("❌ No contract addresses found in deployment data");
    process.exit(1);
  }

  console.log("📋 Found contracts to verify:");
  Object.entries(contracts).forEach(([name, data]) => {
    console.log(`  - ${name}: ${data.address}`);
  });

  // Verification timeout
  const verificationTimeout = parseInt(process.env.VERIFICATION_TIMEOUT) || 120000;

  try {
    // Verify IdentityRegistry
    if (contracts.IdentityRegistry) {
      console.log("\n📋 Verifying IdentityRegistry...");
      try {
        await run("verify:verify", {
          address: contracts.IdentityRegistry.address,
          constructorArguments: [],
        });
        console.log("✅ IdentityRegistry verified successfully");
      } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
          console.log("✅ IdentityRegistry already verified");
        } else {
          console.error("❌ IdentityRegistry verification failed:", error.message);
        }
      }
    }

    // Wait between verifications to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Verify ZKVerifier
    if (contracts.ZKVerifier) {
      console.log("\n🔐 Verifying ZKVerifier...");
      try {
        await run("verify:verify", {
          address: contracts.ZKVerifier.address,
          constructorArguments: [],
        });
        console.log("✅ ZKVerifier verified successfully");
      } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
          console.log("✅ ZKVerifier already verified");
        } else {
          console.error("❌ ZKVerifier verification failed:", error.message);
        }
      }
    }

    // Wait between verifications
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Verify ReputationEngine
    if (contracts.ReputationEngine) {
      console.log("\n⭐ Verifying ReputationEngine...");
      try {
        await run("verify:verify", {
          address: contracts.ReputationEngine.address,
          constructorArguments: [contracts.IdentityRegistry.address],
        });
        console.log("✅ ReputationEngine verified successfully");
      } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
          console.log("✅ ReputationEngine already verified");
        } else {
          console.error("❌ ReputationEngine verification failed:", error.message);
        }
      }
    }

    console.log("\n🎉 Contract verification process completed!");
    
    // Update deployment data with verification status
    deploymentData.verificationCompleted = true;
    deploymentData.verificationTimestamp = Date.now();
    
    try {
      fs.writeFileSync(latestFilePath, JSON.stringify(deploymentData, null, 2));
      console.log("📝 Updated deployment data with verification status");
    } catch (writeError) {
      console.warn("⚠️  Could not update deployment data:", writeError.message);
    }

  } catch (error) {
    console.error("❌ Verification process failed:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("❌ Verification script failed:", error);
  process.exitCode = 1;
});