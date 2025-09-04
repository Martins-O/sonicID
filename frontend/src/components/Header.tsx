'use client'

import { useWallet } from '@/hooks/useWallet'
import SonicIDLogo from './SonicIDLogo'

export default function Header() {
  const { 
    isConnected, 
    walletAddress, 
    isConnecting, 
    currentNetwork, 
    isOnSonicTestnet,
    connectWallet,
    disconnectWallet,
    addSonicTestnet
  } = useWallet()

  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="hover:scale-105 transition-transform duration-200">
                <SonicIDLogo showText={true} />
              </a>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-6">
              {isConnected && (
                <>
                  <a href="/identity-demo" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">Identity Demo</a>
                  <a href="/demo" className="text-slate-600 hover:text-slate-900 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/50">E-commerce Demo</a>
                </>
              )}
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
                  onClick={disconnectWallet}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
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