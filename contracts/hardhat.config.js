require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    sonic: {
      url: "https://rpc.sonic.fantom.network/", // Sonic RPC endpoint
      chainId: 146, // Sonic chain ID
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 gwei
    },
    "sonic-testnet": {
      url: "https://rpc.testnet.soniclabs.com/", // Sonic testnet RPC
      chainId: 64165, // Sonic testnet chain ID  
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000,
    }
  },
  etherscan: {
    apiKey: {
      sonic: "your-sonic-api-key-here",
      "sonic-testnet": "your-sonic-testnet-api-key-here"
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};