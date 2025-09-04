'use client'

import { useState, useEffect } from 'react'

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
  const [metrics, setMetrics] = useState<VerificationMetrics>({
    totalVerifications: 12847,
    successRate: 94.2,
    averageTime: 2.3,
    fraudDetected: 15
  })

  const [recentVerifications, setRecentVerifications] = useState<RecentVerification[]>([
    { id: '1', user: '0x1234...5678', type: 'Age Verification', status: 'success', timestamp: Date.now() - 300000, riskScore: 15 },
    { id: '2', user: '0xabcd...efgh', type: 'Identity Verification', status: 'success', timestamp: Date.now() - 600000, riskScore: 8 },
    { id: '3', user: '0x5678...9012', type: 'Location Verification', status: 'pending', timestamp: Date.now() - 900000, riskScore: 45 },
    { id: '4', user: '0xijkl...mnop', type: 'Credential Verification', status: 'failed', timestamp: Date.now() - 1200000, riskScore: 78 },
    { id: '5', user: '0x9876...5432', type: 'Age Verification', status: 'success', timestamp: Date.now() - 1500000, riskScore: 12 }
  ])

  const [isRealTime, setIsRealTime] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          totalVerifications: prev.totalVerifications + Math.floor(Math.random() * 3),
          successRate: Math.max(90, Math.min(98, prev.successRate + (Math.random() - 0.5) * 2)),
          averageTime: Math.max(1.5, Math.min(3.5, prev.averageTime + (Math.random() - 0.5) * 0.2))
        }))

        // Add new verification occasionally
        if (Math.random() < 0.3) {
          const newVerification: RecentVerification = {
            id: Date.now().toString(),
            user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
            type: ['Age Verification', 'Identity Verification', 'Location Verification'][Math.floor(Math.random() * 3)],
            status: Math.random() > 0.1 ? 'success' : 'failed',
            timestamp: Date.now(),
            riskScore: Math.floor(Math.random() * 100)
          }
          
          setRecentVerifications(prev => [newVerification, ...prev.slice(0, 9)])
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRealTime])

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
      {/* Real-time Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Verification Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Real-time updates</span>
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full $&#123;
              isRealTime ? 'bg-blue-600' : 'bg-gray-200'
            &#125; transition-colors`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition $&#123;
                isRealTime ? 'translate-x-6' : 'translate-x-1'
              &#125;`}
            />
          </button>
        </div>
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
              {recentVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {verification.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {verification.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full $&#123;getStatusColor(verification.status)&#125;`}>
                      {verification.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full $&#123;getRiskColor(verification.riskScore)&#125;`}>
                      {verification.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatTimeAgo(verification.timestamp)}
                  </td>
                </tr>
              ))}
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