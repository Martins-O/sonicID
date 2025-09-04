require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Validation function for required environment variables
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
    console.error("Please copy .env.example to .env and fill in the required values.");
    process.exit(1);
  }
}

// Only validate in non-test environments and when not just compiling
if (process.env.NODE_ENV !== "test" && !process.argv.includes("compile")) {
  validateEnvironment();
}

// Helper function to get accounts array
function getAccounts() {
  if (process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "your_private_key_here_without_0x_prefix") {
    // Validate private key length (64 characters)
    const cleanKey = process.env.PRIVATE_KEY.replace('0x', '');
    if (cleanKey.length === 64 && /^[a-fA-F0-9]{64}$/.test(cleanKey)) {
      const privateKey = cleanKey.startsWith('0x') ? cleanKey : `0x${cleanKey}`;
      return [privateKey];
    }
  }
  
  if (process.env.MNEMONIC && process.env.MNEMONIC !== "your twelve word mnemonic phrase here") {
    return {
      mnemonic: process.env.MNEMONIC,
      path: "m/44'/60'/0'/0",
      initialIndex: 0,
      count: 20,
      passphrase: "",
    };
  }
  
  // Return empty array for compilation or when no valid keys provided
  return [];
}

// Network configuration helper
function createNetworkConfig(rpcUrl, chainId, gasPrice) {
  const config = {
    url: rpcUrl,
    chainId: chainId,
    accounts: getAccounts(),
    timeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
    httpHeaders: {},
  };

  if (gasPrice) {
    config.gasPrice = gasPrice;
  }

  if (process.env.DEPLOYMENT_GAS_LIMIT) {
    config.gas = parseInt(process.env.DEPLOYMENT_GAS_LIMIT);
  }

  return config;
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: process.env.SOLIDITY_OPTIMIZER_ENABLED === "true" || true,
        runs: parseInt(process.env.SOLIDITY_OPTIMIZER_RUNS) || 1000,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
          },
        },
      },
      viaIR: true, // Enable intermediate representation for better optimization
      metadata: {
        bytecodeHash: "none", // Remove metadata hash for deterministic builds
      },
    },
    overrides: {
      // Specific optimization for different contracts if needed
      "contracts/IdentityRegistry.sol": {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          }
        }
      }
    }
  },

  networks: {
    // Local development network
    hardhat: {
      chainId: 1337,
      gas: 12000000,
      gasPrice: 20000000000,
      blockGasLimit: 12000000,
      allowUnlimitedContractSize: false,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      loggingEnabled: process.env.VERBOSE_LOGGING === "true",
    },

    // Local development with forking (optional)
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      accounts: getAccounts(),
      timeout: 60000,
    },

    // Sonic Mainnet
    sonic: createNetworkConfig(
      process.env.SONIC_MAINNET_RPC_URL || "https://rpc.sonic.fantom.network/",
      parseInt(process.env.SONIC_MAINNET_CHAIN_ID) || 146,
      parseInt(process.env.SONIC_MAINNET_GAS_PRICE) || 25000000000
    ),

    // Sonic Testnet
    "sonic-testnet": createNetworkConfig(
      process.env.SONIC_TESTNET_RPC_URL || "https://rpc.testnet.soniclabs.com",
      parseInt(process.env.SONIC_TESTNET_CHAIN_ID) || 14601,
      parseInt(process.env.SONIC_TESTNET_GAS_PRICE) || 20000000000
    ),
  },

  // Contract verification configuration
  etherscan: {
    apiKey: {
      sonic: process.env.SONIC_MAINNET_API_KEY || "your-sonic-api-key-here",
      "sonic-testnet": process.env.SONIC_TESTNET_API_KEY || "A3RMBRUDIEN3QAUYE11W571G9S5TQAZHX7",
    },
    customChains: [
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org/"
        }
      },
      {
        network: "sonic-testnet",
        chainId: 14601, // Updated to match actual Sonic testnet chain ID
        urls: {
          apiURL: "https://api-testnet.sonicscan.org/api", 
          browserURL: "https://testnet.sonicscan.org/"
        }
      }
    ]
  },

  // Gas reporter configuration
  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: process.env.GAS_REPORTER_CURRENCY || "USD",
    gasPrice: 25, // gwei
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    showTimeSpent: true,
    showMethodSig: true,
    maxMethodDiff: 10,
    excludeContracts: ["Migrations", "Mock"],
    src: "./contracts",
    outputFile: "./reports/gas-report.txt",
    noColors: false,
  },

  // Test coverage configuration
  solidity_coverage: {
    skipFiles: ["test/", "migrations/", "mock/"],
    measureStatementCoverage: true,
    measureBranchCoverage: true,
    measureFunctionCoverage: true,
    measureModifierCoverage: true,
  },

  // Contract size limit
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: process.env.CHECK_CONTRACT_SIZE === "true",
    strict: true,
    only: [],
  },

  // Mocha test configuration
  mocha: {
    timeout: parseInt(process.env.TEST_TIMEOUT) || 60000,
    slow: 10000,
    reporter: 'spec',
    parallel: false,
  },

  // Path configuration
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: "./deploy",
    deployments: "./deployments",
    imports: "./imports",
  },

  // Tenderly configuration (optional)
  tenderly: {
    project: process.env.TENDERLY_PROJECT || "sonicid-platform",
    username: process.env.TENDERLY_USERNAME || "",
    privateVerification: true,
    deploymentsDir: "deployments",
  },

  // Dodoc documentation generation (optional)
  dodoc: {
    runOnCompile: false,
    debugMode: false,
    keepFileStructure: true,
    freshOutput: true,
    outputDir: "./docs",
    include: ["contracts"],
  },

  // TypeChain configuration for type generation
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
    alwaysGenerateOverloads: false,
    discriminateTypes: true,
  },
};