import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, CheckCircle2 } from 'lucide-react';

export const ShieldLogo = ({ className = "w-24 h-24" }: { className?: string; showSplash?: boolean }) => (
  <motion.div 
    className={`relative flex items-center justify-center rounded-2xl border border-amber-400/60 bg-slate-950/90 p-1.5 shadow-[0_12px_32px_rgba(2,6,23,0.7),0_0_20px_rgba(197,179,88,0.28)] overflow-hidden ${className}`}
    animate={{ y: [-3, 3, -3], scale: [0.99, 1.01, 0.99] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <img
      src="/assets/mgc-crest.png"
      alt="Milton Group Concepts Crest"
      className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
    />
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
