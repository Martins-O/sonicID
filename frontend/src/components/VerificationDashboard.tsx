'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@/hooks/useWallet'

interface VerificationMetrics {
  totalVerifications: number
  successRate: number
  averageTime: number
  fraudDetected: number
}

interface RecentVerification {
  id: string
  user: string
  type: string
  status: 'success' | 'failed' | 'pending'
  timestamp: number
  riskScore: number
}

export default function VerificationDashboard() {
  const { isConnected } = useWallet()
  const [metrics, setMetrics] = useState<VerificationMetrics>({
    totalVerifications: 0,
    successRate: 0,
    averageTime: 0,
    fraudDetected: 0
  })

  const [recentVerifications, setRecentVerifications] = useState<RecentVerification[]>([])

  const [isRealTime, setIsRealTime] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const startDemo = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to start the verification dashboard demo.')
      return
    }

    setIsSimulating(true)
    setHasStarted(true)
    
    // Initial setup with some base metrics
    setMetrics({
      totalVerifications: 1,
      successRate: 100,
      averageTime: 2.1,
      fraudDetected: 0
    })
    
    // Add first verification
    const firstVerification: RecentVerification = {
      id: '1',
      user: '0x1234...5678',
      type: 'Age Verification',
      status: 'success',
      timestamp: Date.now(),
      riskScore: 15
    }
    setRecentVerifications([firstVerification])
    setIsSimulating(false)
  }

  const addNewVerification = async () => {
    if (!isConnected) {
      alert('Please connect your wallet to add new verification.')
      return
    }

    setIsSimulating(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const verificationTypes = ['Age Verification', 'Identity Verification', 'Location Verification', 'Credential Verification']
    const isSuccess = Math.random() > 0.15 // 85% success rate
    
    const newVerification: RecentVerification = {
      id: Date.now().toString(),
      user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
      type: verificationTypes[Math.floor(Math.random() * verificationTypes.length)],
      status: isSuccess ? 'success' : 'failed',
      timestamp: Date.now(),
      riskScore: isSuccess ? Math.floor(Math.random() * 30) : Math.floor(Math.random() * 50 + 50)
    }
    
    setRecentVerifications(prev => [newVerification, ...prev].slice(0, 10))
    
    setMetrics(prev => {
      const newTotal = prev.totalVerifications + 1
      const successCount = recentVerifications.filter(v => v.status === 'success').length + (isSuccess ? 1 : 0)
      const newSuccessRate = (successCount / newTotal) * 100
      const fraudIncrement = !isSuccess && newVerification.riskScore > 70 ? 1 : 0
      
      return {
        totalVerifications: newTotal,
        successRate: newSuccessRate,
        averageTime: Math.max(1.5, Math.min(3.5, prev.averageTime + (Math.random() - 0.5) * 0.3)),
        fraudDetected: prev.fraudDetected + fraudIncrement
      }
    })
    
    setIsSimulating(false)
  }

  // Real-time simulation
  useEffect(() => {
    if (isRealTime && hasStarted) {
      const interval = setInterval(() => {
        addNewVerification()
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isRealTime, hasStarted, recentVerifications])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRiskColor = (score: number) => {
    if (score <= 20) return 'text-green-600 bg-green-100'
    if (score <= 50) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Verification Dashboard</h2>
        
        {!hasStarted ? (
          <button
            onClick={startDemo}
            disabled={isSimulating || !isConnected}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg transform ${
              isConnected && !isSimulating
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSimulating ? 'Starting Demo...' : !isConnected ? 'Connect Wallet to Start' : 'Start Demo'}
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={addNewVerification}
              disabled={isSimulating || isRealTime || !isConnected}
              className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 text-sm ${
                isConnected && !isSimulating && !isRealTime
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSimulating ? 'Processing...' : !isConnected ? 'Connect Wallet' : 'Add Verification'}
            </button>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-slate-600">Auto-simulate</span>
              <button
                onClick={() => setIsRealTime(!isRealTime)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isRealTime ? 'bg-blue-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isRealTime ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Verifications</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalVerifications.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.successRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Time</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.averageTime.toFixed(1)}s</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fraud Detected</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.fraudDetected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Verifications</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVerifications.length > 0 ? (
                recentVerifications.map((verification) => (
                  <tr key={verification.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {verification.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {verification.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(verification.status)}`}>
                        {verification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(verification.riskScore)}`}>
                        {verification.riskScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatTimeAgo(verification.timestamp)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-slate-700 mb-2">No Verifications Yet</h3>
                      <p className="text-slate-500 mb-4">Start the demo or add verifications to see activity here</p>
                      {!hasStarted && (
                        <button
                          onClick={startDemo}
                          disabled={!isConnected}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                            isConnected
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {!isConnected ? 'Connect Wallet to Start' : 'Start Demo'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sonic Network</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ZK Verifier</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reputation Engine</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-yellow-600 font-medium">High Load</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Gateway</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Operational</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Network TPS</span>
              <span className="text-sm font-medium text-gray-900">387,432</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Gas Price</span>
              <span className="text-sm font-medium text-gray-900">0.02 gwei</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Block Time</span>
              <span className="text-sm font-medium text-gray-900">0.9s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Verifiers</span>
              <span className="text-sm font-medium text-gray-900">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}