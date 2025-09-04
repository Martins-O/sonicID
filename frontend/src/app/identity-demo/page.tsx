'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import IdentityWallet from '@/components/IdentityWallet'
import VerificationDashboard from '@/components/VerificationDashboard'

export default function IdentityDemoPage() {
  const [activeTab, setActiveTab] = useState<'wallet' | 'dashboard'>('wallet')

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20"></div>
          <div className="relative z-10 py-16 px-8 md:px-12">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 rounded-full mb-8 shadow-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse shadow-sm"></div>
              <span className="text-sm font-semibold text-emerald-700">Live on Sonic Testnet</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
              Identity Demo
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-6 leading-relaxed font-medium">
              Experience Zero-Knowledge Identity Verification
            </p>
            
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Try our interactive demo to see how zero-knowledge proofs work in practice. Register an identity, generate proofs, and explore the verification dashboard.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-2xl mx-auto mb-12">
              <div className="flex items-center gap-2 text-blue-800 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-sm">Interactive Demo</span>
              </div>
              <p className="text-blue-700 text-sm">
                Try the Identity Wallet to register your identity, or check the Verification Dashboard to see real-time verification activity.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center bg-white/70 backdrop-blur-sm px-5 py-3 rounded-full shadow-md border border-white/30 hover:shadow-lg transition-all duration-200">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-semibold text-slate-700 text-sm">Sub-second verification</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm px-5 py-3 rounded-full shadow-md border border-white/30 hover:shadow-lg transition-all duration-200">
                <svg className="w-4 h-4 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-semibold text-slate-700 text-sm">Privacy-preserving</span>
              </div>
              <div className="flex items-center bg-white/70 backdrop-blur-sm px-5 py-3 rounded-full shadow-md border border-white/30 hover:shadow-lg transition-all duration-200">
                <svg className="w-4 h-4 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-semibold text-slate-700 text-sm">Cross-platform reputation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-1.5 shadow-xl border border-white/30">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 relative ${
                activeTab === 'wallet'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
              }`}
            >
              <span className="relative z-10">Identity Wallet</span>
              {activeTab === 'wallet' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-sm"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 relative ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
              }`}
            >
              <span className="relative z-10">Verification Dashboard</span>
              {activeTab === 'dashboard' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-sm"></div>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'wallet' && <IdentityWallet />}
          {activeTab === 'dashboard' && <VerificationDashboard />}
        </div>
      </main>
    </div>
  )
}