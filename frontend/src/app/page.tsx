'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import IdentityWallet from '@/components/IdentityWallet'
import VerificationDashboard from '@/components/VerificationDashboard'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'dashboard'>('wallet')

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SonicID
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Zero-Knowledge Identity Verification on Sonic Blockchain
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              &lt; 3 second verification
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Privacy-preserving
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Cross-platform reputation
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-6 py-2 rounded-md font-medium transition-colors $&#123;
                activeTab === 'wallet'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              &#125;`}
            >
              Identity Wallet
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-md font-medium transition-colors $&#123;
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              &#125;`}
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