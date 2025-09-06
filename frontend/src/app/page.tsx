'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useWallet } from '@/hooks/useWallet'

export default function HomePage() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState<'welcome' | 'how-it-works' | 'about'>('welcome')
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    {
      title: "Create Your Identity",
      description: "Register your zero-knowledge identity with customizable verification levels",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: "Generate ZK Proofs",
      description: "Create mathematical proofs that verify claims without revealing sensitive data",
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Build Reputation",
      description: "Establish cross-platform reputation while maintaining complete privacy",
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  const teamMembers = [
    {
      name: "Martins O Jojolola",
      role: "Founder & CEO",
      bio: "Software Engineer and Blockchain FullStack Engineer",
      avatar: "👨‍💻"
    },
    // {
    //   name: "Sarah Rodriguez", 
    //   role: "Chief Technology Officer",
    //   bio: "Blockchain architect and former lead engineer at Ethereum Foundation",
    //   avatar: "👩‍💻"
    // },
    // {
    //   name: "Marcus Johnson",
    //   role: "Head of Security",
    //   bio: "Cybersecurity expert with extensive background in privacy-preserving technologies",
    //   avatar: "🔒"
    // },
    // {
    //   name: "Dr. Emily Watson",
    //   role: "Chief Scientist",
    //   bio: "PhD in Applied Cryptography, published researcher in zero-knowledge proofs",
    //   avatar: "🔬"
    // }
  ]

  const technicalConcepts = [
    {
      title: "Zero-Knowledge Proofs",
      description: "Mathematical methods that allow one party to prove they know a value without revealing the value itself",
      details: [
        "Based on advanced cryptographic primitives like zk-SNARKs and zk-STARKs",
        "Enables verification of age, location, credentials without revealing specific details",
        "Computationally sound - impossible to forge without knowing the secret",
        "Generated in under 1 second using optimized proving systems"
      ]
    },
    {
      title: "Decentralized Verification",
      description: "Distributed verification network ensuring no single point of failure",
      details: [
        "Built on Sonic blockchain for high throughput and low latency",
        "Immutable proof storage with instant finality",
        "Distributed validator network for decentralized verification",
        "Sub-second confirmation times with 99.9% uptime guarantee"
      ]
    },
    {
      title: "Identity Aggregation",
      description: "Unified identity layer that works across all platforms and applications",
      details: [
        "Single identity that works everywhere - no more multiple accounts",
        "Cross-platform reputation that travels with you",
        "API-first design for easy integration",
        "Backwards compatible with existing systems"
      ]
    },
    {
      title: "Privacy-Preserving Architecture",
      description: "Designed from the ground up to protect user privacy at every layer",
      details: [
        "No personal data stored on our servers",
        "Client-side proof generation keeps secrets local", 
        "Differential privacy for aggregated analytics",
        "GDPR compliant by design"
      ]
    }
  ]

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight">
            Welcome to SonicID
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            The future of digital identity verification through zero-knowledge technology and decentralized infrastructure.
          </p>
          
          {isConnected ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href="/identity-demo"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Try Interactive Demo
              </a>
              <a 
                href="/demo"
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-200"
              >
                E-commerce Demo
              </a>
            </div>
          ) : (
            <div className="text-center mb-12">
              <div className="bg-slate-50 border border-slate-200 px-8 py-6 rounded-xl max-w-md mx-auto">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Connect Your Wallet</h3>
                <p className="text-slate-600 text-sm">
                  Connect your wallet to access interactive demos and experience SonicID's zero-knowledge verification.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-1.5 shadow-xl border border-white/30">
            <button
              onClick={() => setActiveTab('welcome')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'welcome'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
              }`}
            >
              Welcome
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'how-it-works'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white/60'
              }`}
            >
              About Us
            </button>
          </div>
        </div>

        {/* Welcome Tab Content */}
        {activeTab === 'welcome' && (
          <div className="space-y-20">
            {/* Problem & Solution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
                <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  The Problem
                </h2>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Traditional identity systems expose sensitive personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Centralized platforms create single points of failure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Users have no control over their personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Reputation doesn't transfer between platforms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-8 rounded-2xl border border-green-200">
                <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  SonicID Solution
                </h2>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Zero-knowledge proofs verify claims without revealing data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Decentralized on Sonic blockchain for security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You own and control your digital identity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Build portable reputation across all platforms</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* How It Works Steps */}
            <div>
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">How SonicID Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      currentStep === index + 1
                        ? 'bg-blue-50 border-blue-300 shadow-lg scale-105'
                        : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-md'
                    }`}
                    onClick={() => setCurrentStep(index + 1)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                        currentStep === index + 1 ? 'bg-blue-100' : 'bg-slate-100'
                      }`}>
                        {step.icon}
                      </div>
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4 ${
                        currentStep === index + 1 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-300 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-300 transform -translate-y-1/2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Sub-Second Verification</h3>
                <p className="text-slate-600 text-sm">Lightning-fast proof generation and verification</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Complete Privacy</h3>
                <p className="text-slate-600 text-sm">Your data never leaves your control</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-3.414l-2.172-2.172a1 1 0 00-.707-.293H12a1 1 0 00-1 1v4.586a1 1 0 00.293.707l5.414 5.414a1 1 0 001.414 0l4.172-4.172a1 1 0 000-1.414z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Cross-Platform</h3>
                <p className="text-slate-600 text-sm">Use your identity anywhere on the web</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Open Source</h3>
                <p className="text-slate-600 text-sm">Transparent, auditable, and community-driven</p>
              </div>
            </div>
          </div>
        )}

        {/* How It Works Tab Content */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Technical Deep Dive</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Understanding the cryptography and architecture behind SonicID
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {technicalConcepts.map((concept, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{concept.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{concept.description}</p>
                  <ul className="space-y-3">
                    {concept.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-2xl border border-slate-200">
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">SonicID Architecture</h2>
              
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800">User Device</h4>
                  <p className="text-sm text-slate-600 text-center">Generates ZK proofs<br/>locally and securely</p>
                </div>

                <div className="flex items-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-3.414l-2.172-2.172a1 1 0 00-.707-.293H12a1 1 0 00-1 1v4.586a1 1 0 00.293.707l5.414 5.414a1 1 0 001.414 0l4.172-4.172a1 1 0 000-1.414z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800">Sonic Blockchain</h4>
                  <p className="text-sm text-slate-600 text-center">Verifies proofs and<br/>stores attestations</p>
                </div>

                <div className="flex items-center">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800">Applications</h4>
                  <p className="text-sm text-slate-600 text-center">Consume verified<br/>identity proofs</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-20">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To democratize identity verification by giving individuals complete control over their personal data while enabling trusted interactions in the digital world.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We believe privacy is a fundamental right, and verification shouldn't come at the cost of exposing sensitive information.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  A world where digital identity verification is instant, private, and universally trusted across all platforms and applications.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We envision a future where your reputation and credentials seamlessly travel with you, protected by mathematics rather than centralized authorities.
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div>
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Meet Our Team</h2>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 gap-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-white/20 text-center">
                      <div className="text-4xl mb-4">{member.avatar}</div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Privacy First</h3>
                  <p className="text-slate-600">Your data belongs to you. We design every feature with privacy as the foundation, not an afterthought.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.586-3.414l-2.172-2.172a1 1 0 00-.707-.293H12a1 1 0 00-1 1v4.586a1 1 0 00.293.707l5.414 5.414a1 1 0 001.414 0l4.172-4.172a1 1 0 000-1.414z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Transparency</h3>
                  <p className="text-slate-600">Open source code, published research, and clear communication about how our technology works.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">User Empowerment</h3>
                  <p className="text-slate-600">We build tools that give users control, not convenience that comes at the cost of autonomy.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl border border-blue-200 mt-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            {isConnected 
              ? "Experience the future of digital identity verification with our interactive demos"
              : "Connect your wallet to access our interactive demos and experience zero-knowledge verification"
            }
          </p>
          
          {isConnected ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/identity-demo"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Try Identity Demo
              </a>
              <a 
                href="/demo"
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-200"
              >
                E-commerce Demo
              </a>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm px-8 py-6 rounded-xl border border-white/30 max-w-lg mx-auto">
              <div className="flex items-center justify-center gap-3 text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="font-semibold">Wallet connection required to access demos</p>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Click "Connect Wallet" in the header above to get started
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}