import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springTrail = { damping: 28, stiffness: 360, mass: 0.18 };
  const xTrail = useSpring(cursorX, springTrail);
  const yTrail = useSpring(cursorY, springTrail);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isClickable =
        target.tagName?.toLowerCase() === 'a' ||
        target.tagName?.toLowerCase() === 'button' ||
        target.tagName?.toLowerCase() === 'input' ||
        target.tagName?.toLowerCase() === 'select' ||
        target.tagName?.toLowerCase() === 'textarea' ||
        target.closest?.('a') !== null ||
        target.closest?.('button') !== null ||
        target.classList?.contains('cursor-pointer') ||
        target.closest?.('.cursor-pointer') !== null ||
        target.hasAttribute?.('onclick');

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
      {/* Subtle Trailing Tri-Color Halo (Red, White & Blue) */}
      <motion.div
        className="absolute top-0 left-0 w-9 h-9 flex items-center justify-center"
        style={{ x: xTrail, y: yTrail, translateX: '-35%', translateY: '-35%' }}
        animate={{
          scale: isClicking ? 0.75 : isHovering ? 1.35 : 0.9,
          opacity: isHovering ? 0.95 : 0.45,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full overflow-visible">
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="28 66"
            strokeLinecap="round"
          />
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="28 66"
            strokeDashoffset="-31"
            strokeLinecap="round"
          />
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="28 66"
            strokeDashoffset="-62"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Main Red, White & Blue Sculpted Mouse Pointer (Tip anchored at exact cursorX, cursorY) */}
      <motion.div
        className="absolute top-0 left-0 w-7 h-7"
        style={{ x: cursorX, y: cursorY, translateX: '-2px', translateY: '-2px' }}
        animate={{
          scale: isClicking ? 0.86 : isHovering ? 1.12 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.12 }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_3px_8px_rgba(2,6,23,0.55)]"
        >
          <defs>
            <linearGradient id="mgcCursorRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="mgcCursorWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="mgcCursorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>

          {/* Outer Dark Precision Bevel */}
          <path
            d="M 2 2 L 27 12.5 L 16.5 16.5 L 22 26.5 L 17.5 28.5 L 12 18.5 L 5.5 26 Z"
            fill="#0f172a"
            stroke="#0f172a"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Top-Right Wing: Crimson Red Facet */}
          <path
            d="M 2.5 2.5 L 26.5 12.5 L 16 15.8 Z"
            fill="url(#mgcCursorRed)"
          />

          {/* Bottom-Left Wing: Royal Blue Facet */}
          <path
            d="M 2.5 2.5 L 16 15.8 L 5.8 25.5 Z"
            fill="url(#mgcCursorBlue)"
          />

          {/* Center Spine & Tail: Crisp White Facet */}
          <path
            d="M 2.5 2.5 L 17.2 14.8 L 21.5 26.2 L 17.8 28 L 12.5 17.2 Z"
            fill="url(#mgcCursorWhite)"
          />

          {/* Crisp Inner Highlight Line */}
          <path
            d="M 2.5 2.5 L 26.5 12.5 L 16.5 16.2 L 21.5 26.2 L 17.8 28 L 12.2 17.8 L 5.8 25.5 Z"
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
};

