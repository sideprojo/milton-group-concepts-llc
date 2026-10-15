import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, CheckCircle2 } from 'lucide-react';

export const ShieldLogo = ({ className = "w-24 h-24", showSplash = false }: { className?: string; showSplash?: boolean }) => (
  <motion.div 
    className={`relative flex items-center justify-center ${className}`}
    animate={{ y: [-4, 4, -4], rotate: [-1, 1, -1], scale: [0.98, 1.02, 0.98] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#fcd34d" />
          <stop offset="75%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="blueMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="50%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="redMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="50%" stopColor="#450a0a" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="greenMetal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="50%" stopColor="#052e16" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <filter id="bevel3D" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.6" result="shadow" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="20" lightingColor="#fff" result="specOut">
            <fePointLight x="-5000" y="-10000" z="20000" />
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litGraphic" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="litGraphic" />
          </feMerge>
        </filter>

        <filter id="inkSplash" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="over" />
        </filter>

        <filter id="smokeBlur">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        
        <clipPath id="shieldClip">
          <path d="M 200 40 Q 280 60 350 70 L 340 230 C 340 320 200 390 200 390 C 200 390 60 320 50 230 L 40 70 Q 120 60 200 40 Z" />
        </clipPath>
      </defs>

      {/* Massive Background Splash Bleed - Black Ink Splash Effect */}
      <g filter="url(#inkSplash)" opacity="0.95">
        <circle cx="200" cy="230" r="100" fill="#000000" opacity="0.9" className="animate-pulse" style={{ animationDuration: '6s' }} />
        <circle cx="130" cy="240" r="80" fill="#111111" opacity="0.8" className="animate-pulse" style={{ animationDuration: '7s' }} />
        <circle cx="270" cy="240" r="80" fill="#0a0a0a" opacity="0.8" className="animate-pulse" style={{ animationDuration: '8s' }} />
        {/* Additional irregular ink splatters - tighter around text */}
        <path d="M 100 180 Q 150 150 200 170 T 300 180 T 330 240 T 300 300 T 200 310 T 100 300 T 70 240 Z" fill="#000000" opacity="0.8" />
      </g>

      {/* Letters M, C, G - 3D Block Style Graffiti */}
      <g style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}>
        {/* 3D Block Extrusion (Shadow) */}
        <g fill="#1e293b" stroke="#1e293b" strokeWidth="8" strokeLinejoin="round" transform="translate(12, 12)">
          <text x="115" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">M</text>
          <text x="285" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">C</text>
          <text x="200" y="260" fontSize="160" fontWeight="900" textAnchor="middle" letterSpacing="-2">G</text>
        </g>
        <g fill="#1e293b" stroke="#1e293b" strokeWidth="8" strokeLinejoin="round" transform="translate(6, 6)">
          <text x="115" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">M</text>
          <text x="285" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">C</text>
          <text x="200" y="260" fontSize="160" fontWeight="900" textAnchor="middle" letterSpacing="-2">G</text>
        </g>
        
        {/* Main Text Face */}
        <g fill="#ffffff" stroke="#000000" strokeWidth="4" strokeLinejoin="round">
          <text x="115" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">M</text>
          <text x="285" y="260" fontSize="150" fontWeight="900" textAnchor="middle" letterSpacing="-2">C</text>
          <text x="200" y="260" fontSize="160" fontWeight="900" textAnchor="middle" letterSpacing="-2">G</text>
        </g>
      </g>
    </svg>
  </motion.div>
);

export const BrandLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center justify-center text-center ${className}`}>
    <ShieldLogo className="w-[24rem] h-[24rem] mb-6" showSplash={true} />
    <div className="space-y-3">
      <h1 className="text-3xl md:text-5xl font-black tracking-widest text-slate-800 uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        Milton Group Concepts
      </h1>
      <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-slate-600 uppercase">
        Commercial • Defense • Government • Public Sectors
      </p>
    </div>
  </div>
);

export const CascadeWrapper: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export const TrustBadge = ({ label, sublabel }: { label: string; sublabel?: string }) => (
  <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm">
    <Award className="w-4 h-4 text-blue-600" />
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-800 leading-none">{label}</p>
      {sublabel && <p className="text-[8px] text-slate-500 font-medium uppercase tracking-tighter mt-0.5">{sublabel}</p>}
    </div>
  </div>
);

export const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode; subtitle?: string; light?: boolean }) => (
  <div className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className={`text-4xl md:text-6xl font-sans font-bold tracking-tight mb-6 ${light ? 'text-white' : 'text-slate-900'}`}>
        {children}
      </h2>
      {subtitle && <p className={`text-xl max-w-2xl font-sans leading-relaxed ${light ? 'text-slate-200' : 'text-slate-600'}`}>{subtitle}</p>}
      <div className="h-0.5 w-32 mt-10 bg-gradient-to-r from-blue-600 via-green-500 to-transparent" />
    </motion.div>
  </div>
);
