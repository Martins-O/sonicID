'use client'

interface SonicIDLogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
  variant?: 'default' | 'white' | 'dark'
}

export default function SonicIDLogo({ 
  className = "", 
  width = 40, 
  height = 40, 
  showText = true,
  variant = 'default'
}: SonicIDLogoProps) {
  const getGradientId = () => `sonic-gradient-${variant}`
  const getTextColor = () => {
    switch (variant) {
      case 'white': return 'text-white'
      case 'dark': return 'text-slate-900'
      default: return 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
    }
  }
  
  const getStrokeColor = () => {
    switch (variant) {
      case 'white': return '#94a3b8'
      case 'dark': return '#475569'
      default: return '#2563eb'
    }
  }
  
  const getDotColor = () => {
    switch (variant) {
      case 'white': return '#64748b'
      case 'dark': return '#475569'
      default: return '#4338ca'
    }
  }
  
  const getSpeedLineColor = () => {
    switch (variant) {
      case 'white': return '#e2e8f0'
      case 'dark': return '#64748b'
      default: return '#3b82f6'
    }
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className="relative">
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 40 40" 
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="100%">
              {variant === 'white' ? (
                <>
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </>
              ) : variant === 'dark' ? (
                <>
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#4338ca" />
                </>
              )}
            </linearGradient>
            
            {/* Glow effect for default variant */}
            {variant === 'default' && (
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Background Circle */}
          <circle 
            cx="20" 
            cy="20" 
            r="18" 
            fill={`url(#${getGradientId()})`}
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Identity Shield Shape */}
          <path 
            d="M20 4 L28 8 L28 20 C28 26 24 30 20 32 C16 30 12 26 12 20 L12 8 Z" 
            fill="white"
            fillOpacity="0.9"
            stroke={getStrokeColor()}
            strokeWidth="0.5"
          />

          {/* Sonic Wave Lines (representing speed/sound) */}
          <g opacity="0.8">
            <path 
              d="M15 16 Q20 14 25 16" 
              stroke={getStrokeColor()}
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M15 20 Q20 18 25 20" 
              stroke={getStrokeColor()}
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M15 24 Q20 22 25 24" 
              stroke={getStrokeColor()}
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Zero-Knowledge Dots (representing privacy/encryption) */}
          <g opacity="0.7">
            <circle cx="17" cy="13" r="1" fill={getDotColor()}/>
            <circle cx="20" cy="11" r="1" fill={getDotColor()}/>
            <circle cx="23" cy="13" r="1" fill={getDotColor()}/>
          </g>

          {/* Speed Lines (external) */}
          <g opacity="0.4" className="animate-pulse" style={{ animationDuration: '2s' }}>
            <path d="M2 15 L8 15" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 20 L6 20" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 25 L8 25" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
            
            <path d="M32 15 L38 15" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
            <path d="M34 20 L38 20" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
            <path d="M32 25 L38 25" stroke={getSpeedLineColor()} strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`text-2xl font-black tracking-tight ${getTextColor()}`}>
            SonicID
          </span>
          <span className="text-xs font-medium text-slate-500 -mt-1 tracking-wide">
            ZERO-KNOWLEDGE
          </span>
        </div>
      )}
    </div>
  )
}