'use client'

import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'

type VerificationLevel = 'BASIC' | 'GOVERNMENT_ID' | 'BIOMETRIC' | 'MULTI_SOURCE' | 'INSTITUTIONAL'

interface Identity {
  exists: boolean
  level: VerificationLevel
  reputationScore: number
  timestamp: number
  attributes: string[]
}

export default function IdentityWallet() {
  const { isConnected } = useWallet()
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<VerificationLevel>('BASIC')
  const [selectedProofType, setSelectedProofType] = useState('age_over_18')
  const [isGeneratingProof, setIsGeneratingProof] = useState(false)
  const [generatedProof, setGeneratedProof] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const verificationLevels = [
    { level: 'BASIC', name: 'Basic Humanity', description: 'Captcha-like proof of humanity' },
    { level: 'GOVERNMENT_ID', name: 'Government ID', description: 'Official government identification' },
    { level: 'BIOMETRIC', name: 'Biometric', description: 'Fingerprint or facial recognition' },
    { level: 'MULTI_SOURCE', name: 'Multi-Source', description: 'Multiple credential verification' },
    { level: 'INSTITUTIONAL', name: 'Institutional', description: 'Bank or employer verification' },
  ]

  const handleRegisterIdentity = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to register your identity.')
      return
    }

    setIsRegistering(true)
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIdentity({
      exists: true,
      level: selectedLevel,
      reputationScore: 100,
      timestamp: Date.now(),
      attributes: ['verified_human']
    })
    
    setShowSuccess(true)
    setIsRegistering(false)
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleUpgradeLevel = async (newLevel: VerificationLevel) => {
    if (!identity) return
    
    if (!isConnected) {
      alert('Please connect your wallet to upgrade your verification level.')
      return
    }
    
    setIsRegistering(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIdentity({
      ...identity,
      level: newLevel,
      reputationScore: identity.reputationScore + 50,
      timestamp: Date.now()
    })
    
    setIsRegistering(false)
  }

  const handleGenerateZKProof = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to generate zero-knowledge proofs.')
      return
    }

    setIsGeneratingProof(true)
    setGeneratedProof(null)
    
    // Simulate ZK proof generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const proofData = {
      type: selectedProofType,
      timestamp: Date.now(),
      proof: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      nullifierHash: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      merkleRoot: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    }
    
    setGeneratedProof(JSON.stringify(proofData, null, 2))
    setIsGeneratingProof(false)
  }

  const proofTypes = [
    { value: 'age_over_18', label: 'Age over 18 (without revealing exact age)' },
    { value: 'us_resident', label: 'US resident (without revealing full address)' },
    { value: 'income_bracket', label: 'Income bracket (without revealing salary)' },
    { value: 'professional_credential', label: 'Professional credential (without personal info)' }
  ]

  return (
    <div className="space-y-8 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-slide-in-right">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold">Identity registered successfully!</span>
        </div>
      )}
      {/* Identity Status Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Digital Identity</h2>
        
        {identity ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="font-bold text-emerald-700 text-lg">Verified Identity</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Level: {verificationLevels.find(l => l.level === identity.level)?.name}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{identity.reputationScore}</div>
                <div className="text-sm font-semibold text-slate-500">Reputation Score</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-500">Registration Date</div>
                <div className="font-medium">
                  {new Date(identity.timestamp).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Verified Attributes</div>
                <div className="font-medium">{identity.attributes.length} attributes</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">No Identity Registered</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">Create your zero-knowledge identity to get started with secure, privacy-preserving verification</p>
            
            <div className="max-w-sm mx-auto mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Verification Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as VerificationLevel)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {verificationLevels.map((level) => (
                  <option key={level.level} value={level.level}>
                    {level.name} - {level.description}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={handleRegisterIdentity}
              disabled={isRegistering || !isConnected}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg transform ${
                isConnected && !isRegistering
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRegistering ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </div>
              ) : !isConnected ? 'Connect Wallet to Register' : 'Register Identity'}
            </button>
          </div>
        )}
      </div>

      {/* Verification Levels */}
      {identity && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Upgrade Verification Level</h2>
          <div className="space-y-3">
            {verificationLevels.map((level) => {
              const isCurrentLevel = level.level === identity.level
              const isLowerLevel = verificationLevels.findIndex(l => l.level === identity.level) >= 
                                  verificationLevels.findIndex(l => l.level === level.level)
              
              return (
                <div key={level.level} className={`p-4 rounded-lg border ${
                  isCurrentLevel 
                    ? 'border-blue-200 bg-blue-50' 
                    : isLowerLevel 
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{level.name}</div>
                      <div className="text-sm text-gray-600">{level.description}</div>
                    </div>
                    <div>
                      {isCurrentLevel ? (
                        <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                          Current Level
                        </span>
                      ) : isLowerLevel ? (
                        <span className="px-3 py-1 bg-gray-400 text-white text-sm rounded-full">
                          Completed
                        </span>
                      ) : (
                        <button
                          onClick={() => handleUpgradeLevel(level.level as VerificationLevel)}
                          disabled={isRegistering || !isConnected}
                          className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 shadow-lg transform ${
                            isConnected && !isRegistering
                              ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 hover:shadow-xl hover:scale-105'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {isRegistering ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </div>
                          ) : !isConnected ? 'Connect Wallet' : 'Upgrade'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Demo ZK Proof Generation */}
      {identity && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Generate Zero-Knowledge Proof</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">
                Proof Type
              </label>
              <select 
                value={selectedProofType}
                onChange={(e) => setSelectedProofType(e.target.value)}
                className="w-full p-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-slate-700 bg-white/50"
              >
                {proofTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleGenerateZKProof}
              disabled={isGeneratingProof || !isConnected}
              className={`w-full px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg transform ${
                isConnected && !isGeneratingProof
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isGeneratingProof ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating ZK Proof...</span>
                </div>
              ) : !isConnected ? 'Connect Wallet to Generate Proof' : 'Generate ZK Proof'}
            </button>
            
            {generatedProof && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-green-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Zero-Knowledge Proof Generated
                  </h4>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Proof Type
                    </h5>
                    <p className="text-slate-600 font-medium">
                      {proofTypes.find(p => p.value === selectedProofType)?.label}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-100">
                    <h5 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Privacy Level
                    </h5>
                    <p className="text-slate-600 font-medium">Zero Knowledge</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-green-100 mb-4">
                  <h5 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Cryptographic Proof Data
                  </h5>
                  
                  <div className="space-y-3 text-sm">
                    {JSON.parse(generatedProof) && Object.entries(JSON.parse(generatedProof)).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="font-semibold text-slate-600 capitalize mb-1">
                          {key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <div className="bg-slate-50 p-2 rounded font-mono text-xs text-slate-700 break-all border">
                          {typeof value === 'string' ? value : JSON.stringify(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigator.clipboard.writeText(generatedProof)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Proof
                  </button>
                  
                  <button 
                    onClick={() => setGeneratedProof(null)}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-all duration-200 font-semibold text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>🔒 Privacy Preserved:</strong> This proof mathematically verifies your claim without revealing any sensitive personal information. The verifier can confirm the validity of your statement while your actual data remains completely private.
                  </p>
                </div>
              </div>
            )}
            
            <div className="text-sm text-slate-600 text-center leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-200">
              <svg className="w-5 h-5 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <strong>Zero-knowledge proofs</strong> allow verification without revealing sensitive information. The proof confirms your claim while keeping your personal data completely private.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}