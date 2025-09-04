'use client'

import { useState } from 'react'

type VerificationLevel = 'BASIC' | 'GOVERNMENT_ID' | 'BIOMETRIC' | 'MULTI_SOURCE' | 'INSTITUTIONAL'

interface Identity {
  exists: boolean
  level: VerificationLevel
  reputationScore: number
  timestamp: number
  attributes: string[]
}

export default function IdentityWallet() {
  const [identity, setIdentity] = useState<Identity | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<VerificationLevel>('BASIC')

  const verificationLevels = [
    { level: 'BASIC', name: 'Basic Humanity', description: 'Captcha-like proof of humanity' },
    { level: 'GOVERNMENT_ID', name: 'Government ID', description: 'Official government identification' },
    { level: 'BIOMETRIC', name: 'Biometric', description: 'Fingerprint or facial recognition' },
    { level: 'MULTI_SOURCE', name: 'Multi-Source', description: 'Multiple credential verification' },
    { level: 'INSTITUTIONAL', name: 'Institutional', description: 'Bank or employer verification' },
  ]

  const handleRegisterIdentity = async () => {
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
    
    setIsRegistering(false)
  }

  const handleUpgradeLevel = async (newLevel: VerificationLevel) => {
    if (!identity) return
    
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

  return (
    <div className="space-y-6">
      {/* Identity Status Card */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Digital Identity</h2>
        
        {identity ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-700">Verified Identity</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Level: {verificationLevels.find(l => l.level === identity.level)?.name}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{identity.reputationScore}</div>
                <div className="text-sm text-gray-500">Reputation Score</div>
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
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Identity Registered</h3>
            <p className="text-gray-600 mb-6">Create your zero-knowledge identity to get started</p>
            
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
              disabled={isRegistering}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRegistering ? 'Registering...' : 'Register Identity'}
            </button>
          </div>
        )}
      </div>

      {/* Verification Levels */}
      {identity && (
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upgrade Verification Level</h2>
          <div className="space-y-3">
            {verificationLevels.map((level) => {
              const isCurrentLevel = level.level === identity.level
              const isLowerLevel = verificationLevels.findIndex(l => l.level === identity.level) >= 
                                  verificationLevels.findIndex(l => l.level === level.level)
              
              return (
                <div key={level.level} className={`p-4 rounded-lg border $&#123;
                  isCurrentLevel 
                    ? 'border-blue-200 bg-blue-50' 
                    : isLowerLevel 
                      ? 'border-gray-200 bg-gray-50' 
                      : 'border-gray-200 hover:border-blue-300'
                &#125;`}>
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
                          disabled={isRegistering}
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                          {isRegistering ? 'Processing...' : 'Upgrade'}
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
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Zero-Knowledge Proof</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proof Type
              </label>
              <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Age over 18 (without revealing exact age)</option>
                <option>US resident (without revealing full address)</option>
                <option>Income bracket (without revealing salary)</option>
                <option>Professional credential (without personal info)</option>
              </select>
            </div>
            
            <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Generate ZK Proof
            </button>
            
            <div className="text-xs text-gray-500 text-center">
              Zero-knowledge proofs allow verification without revealing sensitive information
            </div>
          </div>
        </div>
      )}
    </div>
  )
}