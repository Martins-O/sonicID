'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [currentNetwork, setCurrentNetwork] = useState('')
  const [isOnSonicTestnet, setIsOnSonicTestnet] = useState(false)

  const SONIC_TESTNET_CONFIG = {
    chainId: '0x3909', // 64165 in decimal
    chainName: 'Sonic Testnet',
    nativeCurrency: {
      name: 'Sonic',
      symbol: 'S',
      decimals: 18
    },
    rpcUrls: ['https://rpc.testnet.soniclabs.com'],
    blockExplorerUrls: ['https://testnet.soniclabs.com']
  }

  const checkNetwork = async () => {
    if (!window.ethereum) return

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      const isOnSonic = chainId === SONIC_TESTNET_CONFIG.chainId
      setIsOnSonicTestnet(isOnSonic)
      
      if (isOnSonic) {
        setCurrentNetwork('Sonic Testnet')
      } else {
        // Map common chain IDs to network names
        const networkNames: { [key: string]: string } = {
          '0x1': 'Ethereum Mainnet',
          '0x89': 'Polygon',
          '0xa86a': 'Avalanche',
          '0x38': 'BSC Mainnet',
          '0xaa36a7': 'Ethereum Sepolia',
          '0x13881': 'Polygon Mumbai'
        }
        setCurrentNetwork(networkNames[chainId] || 'Unknown Network')
      }
    } catch (error) {
      console.error('Failed to check network:', error)
    }
  }

  const addSonicTestnet = async () => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [SONIC_TESTNET_CONFIG]
      })
    } catch (error) {
      console.error('Failed to add Sonic Testnet:', error)
      alert('Failed to add Sonic Testnet to your wallet')
    }
  }

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to connect your wallet!')
      return
    }

    setIsConnecting(true)

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      setWalletAddress(accounts[0])
      setIsConnected(true)
      await checkNetwork()
      
    } catch (error: any) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet: ' + error.message)
    } finally {
      setIsConnecting(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setIsConnected(false)
          setWalletAddress('')
        } else if (accounts[0] !== walletAddress) {
          // User switched accounts
          setWalletAddress(accounts[0])
        }
      }

      const handleChainChanged = async () => {
        // Check network when chain changes
        await checkNetwork()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum?.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [walletAddress])

  const handleDisconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
  }

  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">SonicID</h1>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-6">
              <a href="/" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">Demo</a>
              <a href="/welcome" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">Welcome</a>
              <a href="/how-it-works" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">How It Works</a>
              <a href="/about" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">About</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              {isConnected && (
                <div className="flex items-center space-x-3 text-sm">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${isOnSonicTestnet ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                    <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75 ${isOnSonicTestnet ? 'bg-emerald-500' : 'bg-yellow-500'}`}></div>
                  </div>
                  <span className={`font-semibold ${isOnSonicTestnet ? 'text-emerald-700' : 'text-yellow-700'}`}>
                    {currentNetwork}
                  </span>
                </div>
              )}
              
              {isConnected && !isOnSonicTestnet && (
                <button
                  onClick={addSonicTestnet}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-200 text-sm"
                >
                  Add Sonic Testnet
                </button>
              )}
            </div>
            
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                  <span className="text-xs font-semibold text-slate-600">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </span>
                </div>
                <button 
                  onClick={handleDisconnectWallet}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnectWallet}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
              >
                {isConnecting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  'Connect Wallet'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}