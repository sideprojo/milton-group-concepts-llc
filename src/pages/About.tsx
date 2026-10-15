import React, { useState, useEffect } from 'react';
import { ShieldLogo } from '../components/UI';
import { Code2, RefreshCw, ShoppingCart, ShieldCheck, Scale, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Skyscraper } from '../components/Skyscraper';

const About = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections = [
    {
      title: 'Software Development',
      icon: Code2,
      description: 'Custom-engineered software solutions designed for mission-critical operations. We blend agile methodologies with military-grade security standards.',
      sellingPoints: [
        'Custom Enterprise Application Development',
        'Secure Cloud Infrastructure & Migration',
        'AI & Machine Learning Integration',
        'Legacy System Modernization'
      ],
      compliance: 'All software development adheres to SDLC best practices and NIST cybersecurity frameworks.',
      position: { top: '75%', left: '20%' },
      delay: 0
    },
    {
      title: 'Technology Life Cycling',
      icon: RefreshCw,
      description: 'Strategic management of technology assets from acquisition to decommissioning. We ensure your infrastructure remains cutting-edge and cost-effective.',
      sellingPoints: [
        'Hardware & Software Procurement',
        'Asset Tracking & Management',
        'Secure Data Destruction (DoD 5220.22-M)',
        'E-Waste Recycling & Sustainability'
      ],
      compliance: 'Compliant with environmental regulations (EPA) and data destruction standards (NIST SP 800-88).',
      position: { top: '75%', left: '50%' },
      delay: 0.2
    },
    {
      title: 'Sourcing & Procurement',
      icon: ShoppingCart,
      description: 'Streamlined acquisition of critical resources. We leverage global networks to deliver the right assets, on time, under budget.',
      sellingPoints: [
        'Strategic Sourcing & Vendor Management',
        'Contract Negotiation & Administration',
        'Supply Chain Risk Management (SCRM)',
        'Logistics & Distribution'
      ],
      compliance: 'Strict adherence to Federal Acquisition Regulation (FAR) and Defense Federal Acquisition Regulation Supplement (DFARS).',
      position: { top: '75%', left: '80%' },
      delay: 0.4
    }
  ];

  return (
    <div className="w-full relative bg-transparent pt-24 viewing-angle">
      {/* Fixed Skyscraper so it stays in view */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Skyscraper />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-32">
        {/* Title */}
        <div className="w-full text-left pt-12 pb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] text-slate-900 font-sans font-black max-w-5xl leading-[1.05] tracking-tighter drop-shadow-xl mix-blend-multiply"
          >
            CREATIVITY
          </motion.h1>
        </div>

        {/* Vertical Cards */}
        <div className="flex flex-col gap-8 max-w-3xl relative z-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full transition-all duration-500 ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01] cursor-pointer'}`}
                onClick={() => !isActive && setActiveSection(index)}
              >
                {!isActive ? (
                  // Collapsed State - Enhanced Clarity & Contrast
                  <div className="bg-white/85 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/90 flex items-center gap-6 hover:bg-white/95 transition-colors group">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-inner shrink-0 border border-blue-100">
                      <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{section.title}</h3>
                      <p className="text-sm text-slate-700 font-medium line-clamp-1 mt-1">{section.description}</p>
                    </div>
                  </div>
                ) : (
                  // Expanded State
                  <div className="bg-white/95 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 shadow-[0_30px_100px_-15px_rgba(0,0,0,0.25)] border border-white/80 relative overflow-hidden">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveSection(null); }}
                      className="absolute top-8 right-8 w-12 h-12 bg-slate-100/50 hover:bg-red-50 rounded-full flex items-center justify-center hover:text-red-600 transition-colors z-20"
                    >
                      <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6 relative z-10 mb-10">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] shrink-0">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-sans font-bold text-slate-900 tracking-tight">{section.title}</h3>
                        <p className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Strategic Framework 0{index + 1}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Marketability & Value</h4>
                        <p className="text-slate-700 font-sans text-base leading-relaxed mb-8">
                          {section.description}
                        </p>
                        <ul className="space-y-4">
                          {section.sellingPoints.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                              <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-200/50">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                          <Scale className="w-4 h-4" /> Legal & Compliance
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-mono">
                          {section.compliance}
                        </p>
                        <div className="mt-8 pt-6 border-t border-slate-200/50 flex gap-4">
                          <div className="px-3 py-1 bg-blue-50/50 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100">ISO 9001</div>
                          <div className="px-3 py-1 bg-green-50/50 rounded-full text-[10px] font-bold text-green-600 uppercase tracking-widest border border-green-100">NIST SP 800-171</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* New Professional Section */}
        <div className="mt-40 max-w-4xl bg-white/80 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem] border border-white/50 shadow-2xl relative z-20">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">Driving Global IT & Logistics Excellence</h2>
          <div className="w-20 h-1 bg-blue-600 mb-8 rounded-full" />
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6 font-medium">
            Milton Group Concepts (MGC) is a premier Service-Disabled Veteran-Owned Small Business (SDVOSB) specializing in enterprise IT solutions, strategic procurement, and mission-critical logistics. We architect robust, scalable frameworks that empower government agencies and commercial enterprises to achieve operational superiority.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our commitment to precision, security, and innovation ensures that every contract we execute delivers measurable value and enduring success. Partner with MGC to navigate complex operational landscapes with confidence and clarity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
