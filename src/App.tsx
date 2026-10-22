/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Layout } from './components/Layout';
import { CustomCursor } from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Capabilities from './pages/Capabilities';
import Contact from './pages/Contact';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.995 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.998 }}
    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Capabilities /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  useEffect(() => {
    // Enforce Mobile-Only Minimalist Control & Workflow Experience when accessed on mobile
    const checkMobileRedirect = () => {
      try {
        const qs = new URLSearchParams(window.location.search);
        if (qs.get('desktop') === '1') return;
        const ua = navigator.userAgent || '';
        const isMobileUa = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS|FxiOS/i.test(ua);
        const isMobileViewport = window.innerWidth > 0 && window.innerWidth < 768;
        if ((isMobileUa || isMobileViewport) && !window.location.pathname.startsWith('/mobile')) {
          window.location.replace('/mobile');
        }
      } catch (_) {}
    };
    checkMobileRedirect();
    window.addEventListener('resize', checkMobileRedirect, { passive: true });
    return () => window.removeEventListener('resize', checkMobileRedirect);
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <CustomCursor />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}
