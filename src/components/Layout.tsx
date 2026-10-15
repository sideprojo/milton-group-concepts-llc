import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldLogo } from './UI';
import { Menu, X, Phone, Mail, MapPin, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsFeed } from './NewsFeed';
import { ClientLoginModal } from './ClientLoginModal';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
    <div className="min-h-screen flex flex-col bg-slate-50 relative perspective-1000">
      {/* Seamless City Background - Propagates across all pages and footer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-900">
        <motion.div 
          animate={{ scale: [1.1, 1.15, 1.1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 mix-blend-luminosity"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2500")',
            filter: 'blur(1px) contrast(1.2) brightness(0.9)'
          }}
        />
        {/* Sunset Effect */}
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-orange-500/50 via-rose-500/30 to-transparent mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-amber-300/30 to-transparent mix-blend-color-dodge" />
        
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/55 to-slate-50/95" />
      </div>

      {/* Top Left Logo — PC Desktop Only (Unchanged on PC) */}
      <div className={`hidden md:block fixed top-6 left-8 z-50 transition-all duration-500 ${location.pathname === '/contact' ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <Link to="/">
          <ShieldLogo className="w-20 h-20 drop-shadow-lg hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>

      {/* Rocket Dock Navigation — PC Desktop Only (Unchanged on PC) */}
      <header 
        className={`hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <nav className="bg-white/88 hover:bg-white/98 transition-colors duration-500 backdrop-blur-2xl border border-slate-300/80 shadow-[0_10px_35px_rgba(15,23,42,0.12)] px-8 py-3 rounded-full flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[11px] font-extrabold uppercase tracking-[0.2em] transition-all relative group ${
                  location.pathname === link.path ? 'text-blue-700' : 'text-slate-800 hover:text-blue-700'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-0.5 w-full rounded-full bg-blue-600 transition-all duration-300 ${
                  location.pathname === link.path ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                }`} />
              </Link>
            ))}

            <div className="h-4 w-px bg-slate-300" />

            <button
              onClick={() => setIsPortalModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-blue-700 text-white text-[10px] font-extrabold uppercase tracking-[0.18em] transition-all shadow-sm"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              Client Portal
            </button>
          </div>
        </nav>
      </header>

      {/* Dedicated Mobile Top Header Bar (< 768px Only — Zero PC Interference) */}
      <header
        className={`md:hidden fixed top-0 inset-x-0 z-[100] px-4 pt-3 pb-2 transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-2xl border border-slate-300/90 shadow-[0_8px_25px_rgba(15,23,42,0.14)] rounded-2xl px-3.5 py-2.5 flex items-center justify-between">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5">
            <ShieldLogo className="w-10 h-10 drop-shadow" />
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-black tracking-[0.14em] text-slate-950 uppercase leading-none">Milton Group</span>
              <span className="text-[9px] font-bold tracking-[0.18em] text-blue-700 uppercase mt-0.5">Concepts LLC</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setIsMenuOpen(false); setIsPortalModalOpen(true); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm active:scale-95 transition-transform"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              Portal
            </button>
            <button
              aria-label="Toggle Menu"
              className="p-2 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              className="mt-2 w-full bg-white/98 backdrop-blur-2xl border border-slate-300 shadow-2xl rounded-2xl overflow-hidden"
            >
              <div className="p-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-xs font-extrabold uppercase tracking-[0.22em] flex items-center justify-between ${
                      location.pathname === link.path
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[10px] opacity-75">→</span>
                  </Link>
                ))}
                <a
                  href="https://mgc-external-site-254657731107.us-west1.run.app/saas-apps-and-lms-showcase.html"
                  className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-xs font-extrabold uppercase tracking-[0.16em] flex items-center justify-between shadow-md"
                >
                  <span>Apps, Courses & Showcase</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">LIVE</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dedicated Mobile Bottom Thumb Bar (< 768px Only) */}
      <nav className="md:hidden fixed bottom-3 inset-x-3 z-[95] bg-slate-950/95 backdrop-blur-2xl border border-white/15 shadow-[0_12px_32px_rgba(2,6,23,0.45)] rounded-2xl px-2 py-2 flex items-center justify-around">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <button
          onClick={() => setIsPortalModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1"
        >
          <Lock className="w-2.5 h-2.5" /> SSO
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {children}
      </main>

      {/* News Feed Section */}
      {location.pathname !== '/contact' && <NewsFeed />}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/15 pt-8 pb-12 mt-auto">
        {/* Footer Background Blend - Seamlessly continues the page background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Darkening overlay to ensure text readability while letting the page background show through */}
          <div className="absolute inset-0 bg-slate-950/85" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <ShieldLogo className="w-24 h-24 drop-shadow-2xl" />
              </div>
              <p className="text-slate-100 max-w-md mb-10 leading-relaxed text-sm font-medium">
                Providing integrated project management, strategic procurement, and organizational 
                development solutions for commercial and government sectors worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-100 backdrop-blur-md shadow-lg">Project Management</div>
                <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-100 backdrop-blur-md shadow-lg">Strategic Sourcing</div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-300 backdrop-blur-md shadow-lg">Enterprise Solutions</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white">Navigation</h3>
              <ul className="flex flex-col gap-5 text-sm text-slate-200 font-medium">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="hover:text-blue-400 transition-colors flex items-center gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/0 group-hover:bg-blue-400 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setIsPortalModalOpen(true)}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-emerald-300 font-semibold"
                  >
                    <Lock className="w-3.5 h-3.5" /> Client & Partner Portal
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white">Operations</h3>
              <address className="not-italic text-sm text-slate-200 flex flex-col gap-6 font-medium">
                <div className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-slate-100 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <span className="leading-relaxed">8401 Mayland Dr #10286<br />Richmond, VA 23294</span>
                </div>
                <div className="flex gap-4 items-center group">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all shrink-0">
                    <Phone className="w-4 h-4 text-slate-100 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <span>804-760-5797</span>
                </div>
                <div className="flex gap-4 items-center group">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all shrink-0">
                    <Mail className="w-4 h-4 text-slate-100 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <span>contact@miltongroupsecurity.org</span>
                </div>
              </address>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
            <p>© 2026 Milton Group Concepts LLC. All Rights Reserved.</p>
            <div className="flex gap-8">
              <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms</Link>
              <Link to="#" className="hover:text-white transition-colors">Compliance</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>

    {/* Secure Client & Partner Login / Onboarding Modal (Outside perspective-1000 for true viewport fixed centering) */}
    <ClientLoginModal isOpen={isPortalModalOpen} onClose={() => setIsPortalModalOpen(false)} />
    </>
  );
};
