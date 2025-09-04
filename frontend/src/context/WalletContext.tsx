'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WalletContextType {
  isConnected: boolean
  walletAddress: string
  isConnecting: boolean
  currentNetwork: string
  isOnSonicTestnet: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  addSonicTestnet: () => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
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

  const connectWallet = async () => {
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

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress('')
  }

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) return

      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_accounts' 
        })
        
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
          await checkNetwork()
        }
      } catch (error) {
        console.error('Failed to check wallet connection:', error)
      }
    }

    checkConnection()
  }, [])

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
          setIsConnected(true)
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

  const value = {
    isConnected,
    walletAddress,
    isConnecting,
    currentNetwork,
    isOnSonicTestnet,
    connectWallet,
    disconnectWallet,
    addSonicTestnet
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}