'use client'

export default function SonicIDFavicon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="favicon-gradient-component" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>

      {/* Background Circle (matching main logo proportions) */}
      <circle 
        cx="16" 
        cy="16" 
        r="14.4" 
        fill="url(#favicon-gradient-component)"
      />

      {/* Identity Shield Shape (exact match to main logo) */}
      <path 
        d="M16 3.2 L22.4 6.4 L22.4 16 C22.4 20.8 19.2 24 16 25.6 C12.8 24 9.6 20.8 9.6 16 L9.6 6.4 Z" 
        fill="white"
        fillOpacity="0.9"
        stroke="#3b82f6"
        strokeWidth="0.4"
      />

      {/* Sonic Wave Lines (matching main logo curves) */}
      <g opacity="0.8">
        <path d="M12 12.8 Q16 11.2 20 12.8" stroke="#2563eb" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M12 16 Q16 14.4 20 16" stroke="#2563eb" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M12 19.2 Q16 17.6 20 19.2" stroke="#2563eb" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>

      {/* Zero-Knowledge Dots (matching main logo positions) */}
      <g opacity="0.7">
        <circle cx="13.6" cy="10.4" r="0.8" fill="#4338ca"/>
        <circle cx="16" cy="8.8" r="0.8" fill="#7c3aed"/>
        <circle cx="18.4" cy="10.4" r="0.8" fill="#2563eb"/>
      </g>

      {/* Speed Lines (simplified for favicon) */}
      <g opacity="0.4">
        <path d="M1.6 12 L6.4 12" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M1.6 16 L4.8 16" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M1.6 20 L6.4 20" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
        
        <path d="M25.6 12 L30.4 12" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M27.2 16 L30.4 16" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M25.6 20 L30.4 20" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round"/>
      </g>
    </svg>
  )
}