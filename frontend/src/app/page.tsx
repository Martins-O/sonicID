'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import IdentityWallet from '@/components/IdentityWallet'
import VerificationDashboard from '@/components/VerificationDashboard'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'dashboard'>('wallet')

  return (
    <div className="min-h-screen w-full bg-transparent">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-3xl -z-10 shadow-xl"></div>
          <div className="relative z-10 py-12 px-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Live on Sonic Mainnet</span>
            </div>
            
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
              SonicID
            </h1>
            
            <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Zero-Knowledge Identity Verification on 
              <span className="font-semibold text-blue-600"> Sonic Blockchain</span>
            </p>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Instant, privacy-preserving verification that protects your identity while building cross-platform reputation
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-gray-700">&lt; 3 second verification</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Privacy-preserving</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700">Cross-platform reputation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'wallet'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Identity Wallet
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              Verification Dashboard
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'wallet' && <IdentityWallet />}
          {activeTab === 'dashboard' && <VerificationDashboard />}
        </div>
      </main>
    </div>
  )
}