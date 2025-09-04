'use client'

import Header from '@/components/Header'
import { useState } from 'react'

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState('overview')

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

  const useCases = [
    {
      title: "Age Verification",
      scenario: "Prove you're over 18 without revealing your exact age or birthdate",
      example: "Alice wants to access age-restricted content. Instead of providing her full birthdate, she generates a ZK proof that cryptographically proves she's over 18.",
      benefits: ["No identity theft risk", "No data storage by verifier", "Instant verification"]
    },
    {
      title: "Income Verification",
      scenario: "Prove you meet income requirements without revealing salary details",
      example: "Bob applies for a loan requiring $50k+ income. His ZK proof confirms he earns above the threshold without disclosing his actual $75k salary.",
      benefits: ["Salary privacy maintained", "Reduces discrimination", "Streamlined approval process"]
    },
    {
      title: "Geographic Verification", 
      scenario: "Prove residency or location without revealing exact address",
      example: "Carol wants to access region-locked content. Her proof confirms she's in the authorized country without revealing her city or address.",
      benefits: ["Location privacy", "Prevents stalking", "Compliance with regulations"]
    },
    {
      title: "Professional Credentials",
      scenario: "Verify qualifications without exposing personal employment details",
      example: "David proves he's a licensed doctor for telemedicine without revealing his workplace, specialty, or personal information to patients.",
      benefits: ["Professional privacy", "Credential verification", "Reduced identity exposure"]
    }
  ]

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight">
            How SonicID Works
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            Deep dive into the technology behind privacy-preserving identity verification
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-xl border border-white/30">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Technical Overview
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'process'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Verification Process
            </button>
            <button
              onClick={() => setActiveTab('usecases')}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeTab === 'usecases'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              Use Cases
            </button>
          </div>
        </div>

        {/* Technical Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
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

        {/* Verification Process Tab */}
        {activeTab === 'process' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Step-by-Step Verification Process</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Follow the journey of how a zero-knowledge proof is generated and verified
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Identity Registration",
                  description: "User creates their SonicID identity with chosen verification level",
                  technical: "Private key generation, commitment to identity attributes, merkle tree construction"
                },
                {
                  step: 2,
                  title: "Credential Verification",
                  description: "External verification of user's claims through trusted oracles",
                  technical: "Oracle attestation, cryptographic signatures, tamper-proof credential binding"
                },
                {
                  step: 3,
                  title: "Proof Generation",
                  description: "User generates ZK proof for specific claim without revealing underlying data",
                  technical: "Circuit compilation, witness generation, proving key application, proof construction"
                },
                {
                  step: 4,
                  title: "Blockchain Verification",
                  description: "Sonic network validators verify the mathematical proof",
                  technical: "Verifying key validation, proof verification algorithm, consensus confirmation"
                },
                {
                  step: 5,
                  title: "Application Integration",
                  description: "Third-party applications consume the verified proof",
                  technical: "API endpoint queries, proof validation, integration with existing systems"
                }
              ].map((processStep, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {processStep.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{processStep.title}</h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">{processStep.description}</p>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <p className="text-sm text-slate-700">
                          <strong>Technical:</strong> {processStep.technical}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Tab */}
        {activeTab === 'usecases' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Real-World Applications</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                See how SonicID solves privacy challenges across different industries and use cases
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{useCase.title}</h3>
                  <p className="text-slate-600 mb-6 font-medium">{useCase.scenario}</p>
                  
                  <div className="bg-blue-50 p-6 rounded-xl mb-6">
                    <h4 className="font-bold text-blue-800 mb-2">Example:</h4>
                    <p className="text-blue-700 text-sm leading-relaxed">{useCase.example}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-700 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-700 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Industry Applications */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-12 rounded-2xl border border-slate-200">
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Industry Applications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Financial Services</h4>
                  <p className="text-slate-600 text-sm">KYC compliance, loan verification, and fraud prevention</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Healthcare</h4>
                  <p className="text-slate-600 text-sm">Medical credential verification and patient privacy protection</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">Digital Platforms</h4>
                  <p className="text-slate-600 text-sm">Age verification, content access, and reputation systems</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl border border-blue-200 mt-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Experience ZK Identity?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Try our interactive demo to see zero-knowledge proofs in action
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Try Interactive Demo
            </a>
            <a 
              href="/about"
              className="text-slate-600 hover:text-slate-800 font-semibold transition-colors"
            >
              Learn About Our Team →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}