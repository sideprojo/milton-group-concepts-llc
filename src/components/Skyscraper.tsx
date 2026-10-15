import React from 'react';
import { motion } from 'motion/react';

export const Skyscraper = () => {
  return (
    <div className="absolute bottom-0 right-[15%] w-64 h-[95vh] z-10 pointer-events-none flex flex-col items-center justify-end">
      {/* Flag Pole & Flag - Very Visible */}
      <div className="relative w-1 h-24 bg-slate-300 z-20 -mb-2">
        <motion.div 
          className="absolute top-1 left-1 w-24 h-14 shadow-md z-30 opacity-100"
          animate={{ skewY: [0, 3, -2, 0], scaleX: [1, 0.92, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'left center' }}
        >
          {/* High Quality American Flag */}
          <svg viewBox="0 0 60 40" className="w-full h-full rounded-sm overflow-hidden drop-shadow-lg">
            <rect width="60" height="40" fill="#fff"/>
            <rect width="60" height="3.07" y="0" fill="#b22234"/>
            <rect width="60" height="3.07" y="6.15" fill="#b22234"/>
            <rect width="60" height="3.07" y="12.3" fill="#b22234"/>
            <rect width="60" height="3.07" y="18.46" fill="#b22234"/>
            <rect width="60" height="3.07" y="24.61" fill="#b22234"/>
            <rect width="60" height="3.07" y="30.76" fill="#b22234"/>
            <rect width="60" height="3.07" y="36.92" fill="#b22234"/>
            <rect width="24" height="21.5" fill="#3c3b6e"/>
            <g fill="#fff">
              <circle cx="3" cy="3" r="0.8"/><circle cx="7" cy="3" r="0.8"/><circle cx="11" cy="3" r="0.8"/><circle cx="15" cy="3" r="0.8"/><circle cx="19" cy="3" r="0.8"/>
              <circle cx="5" cy="5" r="0.8"/><circle cx="9" cy="5" r="0.8"/><circle cx="13" cy="5" r="0.8"/><circle cx="17" cy="5" r="0.8"/>
              <circle cx="3" cy="7" r="0.8"/><circle cx="7" cy="7" r="0.8"/><circle cx="11" cy="7" r="0.8"/><circle cx="15" cy="7" r="0.8"/><circle cx="19" cy="7" r="0.8"/>
              <circle cx="5" cy="9" r="0.8"/><circle cx="9" cy="9" r="0.8"/><circle cx="13" cy="9" r="0.8"/><circle cx="17" cy="9" r="0.8"/>
              <circle cx="3" cy="11" r="0.8"/><circle cx="7" cy="11" r="0.8"/><circle cx="11" cy="11" r="0.8"/><circle cx="15" cy="11" r="0.8"/><circle cx="19" cy="11" r="0.8"/>
              <circle cx="5" cy="13" r="0.8"/><circle cx="9" cy="13" r="0.8"/><circle cx="13" cy="13" r="0.8"/><circle cx="17" cy="13" r="0.8"/>
              <circle cx="3" cy="15" r="0.8"/><circle cx="7" cy="15" r="0.8"/><circle cx="11" cy="15" r="0.8"/><circle cx="15" cy="15" r="0.8"/><circle cx="19" cy="15" r="0.8"/>
              <circle cx="5" cy="17" r="0.8"/><circle cx="9" cy="17" r="0.8"/><circle cx="13" cy="17" r="0.8"/><circle cx="17" cy="17" r="0.8"/>
              <circle cx="3" cy="19" r="0.8"/><circle cx="7" cy="19" r="0.8"/><circle cx="11" cy="19" r="0.8"/><circle cx="15" cy="19" r="0.8"/><circle cx="19" cy="19" r="0.8"/>
            </g>
          </svg>
        </motion.div>
      </div>
      
      {/* Building Silhouette - Blends with background */}
      <div className="w-6 h-16 bg-slate-800/90 mix-blend-multiply" />
      <div className="w-16 h-20 bg-slate-800/90 mix-blend-multiply" />
      <div className="w-32 h-32 bg-slate-800/90 mix-blend-multiply" />
      <div className="w-48 h-40 bg-slate-800/90 mix-blend-multiply" />
      <div className="w-64 flex-grow bg-slate-800/95 mix-blend-multiply relative overflow-hidden border-t border-slate-700/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
      </div>
    </div>
  );
};
