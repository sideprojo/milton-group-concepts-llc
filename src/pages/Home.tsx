import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

import { Skyscraper } from '../components/Skyscraper';
import { ContactModal } from '../components/ContactModal';

const Home = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const triggerFireworks = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // American colors: Red, White, Blue
      const colors = ['#ff0000', '#ffffff', '#0000ff'];

      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors }));
    }, 250);
  };

  return (
    <div className="min-h-[115vh] relative flex flex-col items-center justify-center overflow-hidden viewing-angle">
      {/* Fixed Skyscraper so it stays in view */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Skyscraper />
      </div>

      {/* Floating Elements - Antigravity Effect (Enhanced Clarity & Contrast) */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [-3, 3, -3], x: [-15, 15, -15] }}
        transition={{ duration: 16, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-[15%] left-[3%] xl:left-[8%] max-w-xs p-8 bg-gradient-to-br from-white/88 to-white/75 backdrop-blur-2xl border border-white/90 rounded-[2rem] shadow-[0_14px_40px_0_rgba(15,23,42,0.16)] hidden lg:block"
      >
        <h2 className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-blue-800 mb-3 drop-shadow-sm">Scale & Precision</h2>
        <p className="text-sm text-slate-900 font-semibold leading-relaxed">Engineered for the Modern Global Enterprise. We architect solutions that scale seamlessly across borders.</p>
      </motion.div>

      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [3, -3, 3], x: [15, -15, 15] }}
        transition={{ duration: 18, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
        className="absolute bottom-[15%] right-[3%] xl:right-[8%] max-w-xs p-8 bg-gradient-to-br from-white/88 to-white/75 backdrop-blur-2xl border border-white/90 rounded-[2rem] shadow-[0_14px_40px_0_rgba(15,23,42,0.16)] hidden lg:block"
      >
        <div className="w-12 h-0.5 bg-blue-600 mb-5 shadow-sm" />
        <p className="text-sm text-slate-900 font-semibold leading-relaxed">Strategic architecture for complex operational landscapes with absolute precision and data-driven insights.</p>
      </motion.div>

      {/* Hero Section - Center Focused */}
      <section className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 relative z-10 mt-24 md:mt-20 pb-20 md:pb-0">
        <div className="max-w-7xl flex flex-col items-center justify-center w-full">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={triggerFireworks}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-slate-950 font-sans font-black max-w-5xl mx-auto mb-5 md:mb-8 leading-[1.08] md:leading-[1.05] tracking-tighter mix-blend-multiply md:cursor-none select-none relative"
            style={{
              textShadow: `
                0px 1px 0px #cbd5e1,
                0px 2px 0px #cbd5e1,
                0px 3px 0px #94a3b8,
                0px 4px 0px #94a3b8,
                0px 5px 0px #64748b,
                0px 6px 0px #64748b,
                0px 7px 0px #475569,
                0px 8px 15px rgba(0,0,0,0.3),
                0px 15px 30px rgba(0,0,0,0.2)
              `
            }}
          >
            Harnessing change and insights for solutions.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl md:text-3xl text-blue-900 font-extrabold max-w-3xl mx-auto mb-8 md:mb-16 tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.95)] px-2"
          >
            We make complex operations simpler.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center justify-center gap-3.5 md:gap-6 w-full sm:w-auto px-2"
          >
            <Link 
              to="/services" 
              className="w-full sm:w-auto justify-center px-8 py-4 bg-blue-600 text-white font-extrabold text-sm hover:bg-blue-700 transition-all duration-300 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.65)] hover:-translate-y-1 flex items-center gap-2 group"
            >
              Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="w-full sm:w-auto justify-center px-8 py-4 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-300 font-extrabold text-sm hover:bg-white transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Request Consultation
            </button>
          </motion.div>

          {/* Mobile & Tablet Stacked Value Cards (lg:hidden — Zero PC Interference) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-xl text-left px-1">
            <div className="p-5 bg-white/92 backdrop-blur-2xl border border-white/95 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.14)]">
              <h2 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-blue-800 mb-1.5">Scale & Precision</h2>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                Engineered for the Modern Global Enterprise. We architect solutions that scale seamlessly across borders.
              </p>
            </div>
            <div className="p-5 bg-white/92 backdrop-blur-2xl border border-white/95 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.14)]">
              <div className="w-8 h-0.5 bg-blue-600 mb-2.5" />
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                Strategic architecture for complex operational landscapes with absolute precision and data-driven insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Home;
