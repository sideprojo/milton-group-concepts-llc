import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configs for different "weights" of antigravity
  const springMedium = { damping: 25, stiffness: 250, mass: 0.2 };
  const springIntermediate = { damping: 22, stiffness: 200, mass: 0.3 };
  const springHeavy = { damping: 20, stiffness: 150, mass: 0.4 };
  const springLight = { damping: 30, stiffness: 400, mass: 0.1 };

  const xMedium = useSpring(cursorX, springMedium);
  const yMedium = useSpring(cursorY, springMedium);

  const xIntermediate = useSpring(cursorX, springIntermediate);
  const yIntermediate = useSpring(cursorY, springIntermediate);

  const xHeavy = useSpring(cursorX, springHeavy);
  const yHeavy = useSpring(cursorY, springHeavy);

  const xLight = useSpring(cursorX, springLight);
  const yLight = useSpring(cursorY, springLight);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') !== null ||
        target.hasAttribute('onclick');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Main Reticle - Instant Follow */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center drop-shadow-md"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isClicking ? 0.7 : isHovering ? 1.3 : 1 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" className="w-full h-full drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]">
          {/* Eagle Eyebrow */}
          <path d="M 1 8 L 9 3 H 15 L 23 8" stroke="white" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          {/* Eagle Eye */}
          <path d="M2 12L9 5H15L22 12C22 12 18 19 12 19C6 19 2 12 2 12Z" stroke="white" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="3" fill="#facc15" stroke="#facc15" />
          <circle cx="12" cy="11" r="1" fill="#000000" stroke="#000000" />
        </svg>
      </motion.div>

      {/* Antigravity Ring 1 (Medium - White) */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        style={{ x: xMedium, y: yMedium, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isClicking ? 0.5 : isHovering ? 1.5 : 1 }}
      />

      {/* Antigravity Ring 1.5 (Intermediate - Red) */}
      <motion.div
        className="absolute top-0 left-0 w-14 h-14 rounded-full border-2 border-red-600/70 border-dotted shadow-[0_0_8px_rgba(220,38,38,0.5)]"
        style={{ x: xIntermediate, y: yIntermediate, translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: -360, scale: isHovering ? 1.35 : 1 }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" } }}
      />

      {/* Antigravity Ring 2 (Heavy/Slow - Blue) */}
      <motion.div
        className="absolute top-0 left-0 w-16 h-16 rounded-full border-2 border-blue-600/60 border-dashed shadow-[0_0_10px_rgba(37,99,235,0.4)]"
        style={{ x: xHeavy, y: yHeavy, translateX: '-50%', translateY: '-50%' }}
        animate={{ rotate: 360, scale: isHovering ? 1.2 : 1 }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
      />

      {/* Floating Debris (Light/Fast) */}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: xLight, y: yLight }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_6px_rgba(220,38,38,0.8)]" style={{ transform: 'translate(25px, -25px)' }} />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: xMedium, y: yMedium }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_6px_rgba(37,99,235,0.8)]" style={{ transform: 'translate(-25px, 25px)' }} />
      </motion.div>
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: xHeavy, y: yHeavy }}
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" style={{ transform: 'translate(-25px, -25px)' }} />
      </motion.div>
    </div>
  );
};
