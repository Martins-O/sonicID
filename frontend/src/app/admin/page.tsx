'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'

interface AdminMetrics {
  totalUsers: number
  totalVerifications: number
  fraudAttempts: number
  revenueGenerated: number
  platformsIntegrated: number
  averageVerificationTime: number
}

interface FraudAlert {
  id: string
  user: string
  type: 'suspicious_pattern' | 'high_risk_score' | 'multiple_attempts' | 'location_mismatch'
  severity: 'low' | 'medium' | 'high'
  timestamp: number
  details: string
}

interface PlatformStats {
  name: string
  verifications: number
  successRate: number
  revenue: number
  trend: 'up' | 'down' | 'stable'
}

export default function AdminPage() {
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalUsers: 15847,
    totalVerifications: 89421,
    fraudAttempts: 127,
    revenueGenerated: 245890,
    platformsIntegrated: 34,
    averageVerificationTime: 2.1
  })

  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([
    { id: '1', user: '0x1234...abcd', type: 'high_risk_score', severity: 'high', timestamp: Date.now() - 300000, details: 'Risk score: 89/100 - Multiple failed attempts' },
    { id: '2', user: '0x5678...efgh', type: 'suspicious_pattern', severity: 'medium', timestamp: Date.now() - 600000, details: 'Unusual verification timing pattern detected' },
    { id: '3', user: '0x9012...ijkl', type: 'location_mismatch', severity: 'medium', timestamp: Date.now() - 900000, details: 'VPN usage detected during verification' },
    { id: '4', user: '0xabcd...mnop', type: 'multiple_attempts', severity: 'low', timestamp: Date.now() - 1200000, details: '5+ verification attempts in 1 hour' }
  ])

  const [platformStats] = useState<PlatformStats[]>([
    { name: 'Crypto Exchanges', verifications: 23445, successRate: 96.2, revenue: 89234, trend: 'up' },
    { name: 'Gaming Platforms', verifications: 18932, successRate: 94.8, revenue: 67891, trend: 'up' },
    { name: 'DeFi Protocols', verifications: 15678, successRate: 97.1, revenue: 52345, trend: 'stable' },
    { name: 'NFT Marketplaces', verifications: 12234, successRate: 93.5, revenue: 36420, trend: 'down' },
    { name: 'E-commerce Sites', verifications: 8932, successRate: 95.7, revenue: 28901, trend: 'up' }
  ])

  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('24h')
  const [isLiveMode, setIsLiveMode] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          totalVerifications: prev.totalVerifications + Math.floor(Math.random() * 5),
          revenueGenerated: prev.revenueGenerated + Math.floor(Math.random() * 50),
          fraudAttempts: prev.fraudAttempts + (Math.random() < 0.1 ? 1 : 0)
        }))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isLiveMode])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      case 'down':
        return <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      default:
        return <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    }
  }

  const formatTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Monitor SonicID platform performance and security</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value as any)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            {/* Live Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Live Mode</span>
              <button
                onClick={() => setIsLiveMode(!isLiveMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isLiveMode ? 'bg-green-600' : 'bg-gray-200'
                } transition-colors`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isLiveMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {isLiveMode && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-lg font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Verifications</p>
                <p className="text-lg font-bold text-gray-900">{metrics.totalVerifications.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Fraud Attempts</p>
                <p className="text-lg font-bold text-gray-900">{metrics.fraudAttempts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-lg font-bold text-gray-900">${metrics.revenueGenerated.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Platforms</p>
                <p className="text-lg font-bold text-gray-900">{metrics.platformsIntegrated}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Avg Time</p>
                <p className="text-lg font-bold text-gray-900">{metrics.averageVerificationTime}s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fraud Alerts & Platform Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Fraud Alerts */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Security Alerts</h2>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  {fraudAlerts.filter(a => a.severity === 'high').length} High Priority
                </span>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {fraudAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600">{alert.type.replace('_', ' ').toUpperCase()}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{alert.user}</p>
                      <p className="text-sm text-gray-600">{alert.details}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{formatTimeAgo(alert.timestamp)}</p>
                      <button className="mt-1 text-xs text-blue-600 hover:text-blue-800">
                        Investigate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Platform Performance</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {platformStats.map((platform, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{platform.name}</h3>
                        {getTrendIcon(platform.trend)}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{platform.verifications.toLocaleString()} verifications</span>
                        <span>{platform.successRate}% success</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${platform.revenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Sonic Network</h3>
              <p className="text-sm text-green-600">Operational</p>
              <p className="text-xs text-gray-500 mt-1">99.9% uptime</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">ZK Verifier</h3>
              <p className="text-sm text-green-600">Operational</p>
              <p className="text-xs text-gray-500 mt-1">2.1s avg response</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">Reputation Engine</h3>
              <p className="text-sm text-yellow-600">High Load</p>
              <p className="text-xs text-gray-500 mt-1">85% capacity</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900">API Gateway</h3>
              <p className="text-sm text-green-600">Operational</p>
              <p className="text-xs text-gray-500 mt-1">15ms avg latency</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}