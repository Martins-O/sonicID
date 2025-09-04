'use client'

import { useState } from 'react'
import Header from '@/components/Header'

interface Product {
  id: string
  name: string
  price: number
  image: string
  ageRestricted?: boolean
  locationRestricted?: string[]
}

const products: Product[] = [
  { id: '1', name: 'Premium Gaming NFT', price: 299, image: '/api/placeholder/200/200' },
  { id: '2', name: 'Crypto Trading Course', price: 149, image: '/api/placeholder/200/200', ageRestricted: true },
  { id: '3', name: 'DeFi Investment Pool', price: 500, image: '/api/placeholder/200/200', ageRestricted: true, locationRestricted: ['US', 'CA', 'UK'] },
  { id: '4', name: 'Digital Art Collection', price: 199, image: '/api/placeholder/200/200' },
]

export default function DemoPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'verifying' | 'success' | 'failed'>('none')
  const [userProfile, setUserProfile] = useState({
    verified: false,
    level: 'NONE',
    attributes: [] as string[],
    riskScore: 0
  })

  const handleInstantKYC = async (product: Product) => {
    setSelectedProduct(product)
    setVerificationStatus('verifying')
    
    // Simulate instant verification process
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Simulate verification success with mock data
    const mockVerification = {
      verified: true,
      level: 'GOVERNMENT_ID',
      attributes: [
        'verified_human',
        'age_over_18',
        'location_verified',
        'identity_confirmed'
      ],
      riskScore: Math.floor(Math.random() * 30) // Low risk score
    }
    
    setUserProfile(mockVerification)
    setVerificationStatus('success')
  }

  const handlePurchase = () => {
    alert(`Successfully purchased ${selectedProduct?.name} for $${selectedProduct?.price}!\\n\\nVerification completed in 2.3 seconds.\\nRisk Score: ${userProfile.riskScore}\\nCompliance: Approved`)
    setSelectedProduct(null)
    setVerificationStatus('none')
  }

  const getVerificationRequirements = (product: Product) => {
    const requirements = []
    if (product.ageRestricted) requirements.push('Age verification (18+)')
    if (product.locationRestricted) requirements.push(`Location verification (${product.locationRestricted.join(', ')})`)
    return requirements
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            E-commerce Demo: Instant KYC Integration
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience how SonicID enables instant identity verification for e-commerce purchases, 
            eliminating traditional 24-72 hour KYC delays.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-3">${product.price}</p>
                
                {(product.ageRestricted || product.locationRestricted) && (
                  <div className="mb-3">
                    <div className="text-xs text-red-600 font-medium mb-1">Verification Required:</div>
                    <div className="text-xs text-gray-600 space-y-1">
                      {getVerificationRequirements(product).map((req, idx) => (
                        <div key={idx} className="flex items-center">
                          <svg className="w-3 h-3 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => handleInstantKYC(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Buy with Instant KYC
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full p-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Instant KYC Verification
                </h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-2xl font-bold text-blue-600">${selectedProduct.price}</p>
                </div>

                {verificationStatus === 'verifying' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto">
                      <svg className="w-16 h-16 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700">Verifying your identity...</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>✓ Generating zero-knowledge proof</div>
                        <div>✓ Validating identity claims</div>
                        <div>✓ Checking compliance requirements</div>
                        <div>⏳ Calculating risk score</div>
                      </div>
                    </div>
                  </div>
                )}

                {verificationStatus === 'success' && (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-green-600 mb-2">Verification Complete!</h3>
                      <p className="text-gray-600 mb-4">Identity verified in 2.3 seconds</p>
                      
                      <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Verification Level:</span>
                          <span className="font-medium text-gray-900">{userProfile.level}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Risk Score:</span>
                          <span className="font-medium text-green-600">{userProfile.riskScore} (Low Risk)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Compliance:</span>
                          <span className="font-medium text-green-600">Approved</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Verified Attributes:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {userProfile.attributes.map((attr, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {attr}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3 mt-6">
                        <button
                          onClick={() => {
                            setSelectedProduct(null)
                            setVerificationStatus('none')
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handlePurchase}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Complete Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features Comparison */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Traditional KYC vs SonicID
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Traditional KYC</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>⏱️ 24-72 hours verification time</li>
                <li>🏢 Centralized data storage</li>
                <li>📝 Manual document review</li>
                <li>💸 High operational costs</li>
                <li>🔄 Repeat KYC for each service</li>
                <li>🎯 High fraud rates</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">SonicID</h3>
              <ul className="text-green-600 space-y-2 text-sm">
                <li>⚡ &lt; 3 seconds verification</li>
                <li>🔒 Zero-knowledge privacy</li>
                <li>🤖 Automated ZK proofs</li>
                <li>💰 90% cost reduction</li>
                <li>🔄 One-time setup, reuse everywhere</li>
                <li>🛡️ Advanced fraud detection</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}