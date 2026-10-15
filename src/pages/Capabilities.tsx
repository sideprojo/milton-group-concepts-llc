import React, { useState, useEffect } from 'react';
import { ShieldLogo } from '../components/UI';
import { ShieldCheck, Globe, Building2, Truck, Zap, Activity, BarChart3, X, ArrowRight, CheckCircle2, Database, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Skyscraper } from '../components/Skyscraper';
import { CascadeWrapper } from '../components/UI';
import { ContactModal } from '../components/ContactModal';

const Capabilities = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

  const capabilities = [
    { 
      title: 'Project Management', 
      icon: ShieldCheck, 
      description: 'AI-enhanced execution for complex infrastructure. We manage the details so you can focus on the vision.',
      sellingPoints: [
        'Real-time risk assessment & mitigation',
        'Cross-functional team synchronization',
        'Milestone-driven accountability',
        'Resource allocation optimization'
      ],
      stats: [
        { label: 'AI Predictive Accuracy', value: '99.9%', icon: Zap },
        { label: 'Automated Resolution', value: '85%', icon: Activity }
      ],
      position: { top: '75%', left: '15%' },
      delay: 0
    },
    { 
      title: 'Data Centers', 
      icon: Globe, 
      description: 'Next-generation facility design and deployment. Scalable, secure, and sustainable infrastructure.',
      sellingPoints: [
        'High-density cooling & power solutions',
        'Physical & logical security integration',
        'Disaster recovery architecture',
        'Energy efficiency optimization (PUE)'
      ],
      stats: [
        { label: 'Global Node Latency', value: '< 10ms', icon: ShieldCheck },
        { label: 'Energy Optimization', value: '-35%', icon: BarChart3 }
      ],
      position: { top: '75%', left: '38%' },
      delay: 0.2
    },
    { 
      title: 'Cybersecurity', 
      icon: Building2, 
      description: 'Proactive defense against evolving threats. We protect your most critical digital assets.',
      sellingPoints: [
        'Zero-trust architecture implementation',
        'Continuous threat monitoring & response',
        'Vulnerability assessments & penetration testing',
        'Compliance & regulatory alignment'
      ],
      stats: [
        { label: 'Threat Detection', value: '< 1s', icon: Zap },
        { label: 'Zero-Day Mitigation', value: '100%', icon: Activity }
      ],
      position: { top: '75%', left: '62%' },
      delay: 0.4
    },
    { 
      title: 'Logistics', 
      icon: Truck, 
      description: 'Precision supply chain management. Delivering critical assets securely, globally, and on time.',
      sellingPoints: [
        'End-to-end supply chain visibility',
        'Secure transport & chain of custody',
        'Customs & import/export compliance',
        'Rapid deployment capabilities'
      ],
      stats: [
        { label: 'Predictive Routing', value: '99.8%', icon: Activity },
        { label: 'Global Reach', value: '150+ Nodes', icon: Globe }
      ],
      delay: 0.3
    },
    { 
      title: 'Quality Assurance & Compliance', 
      icon: CheckCircle2, 
      description: 'Rigorous adherence to international standards. We ensure every deliverable meets the highest benchmarks of quality and security.',
      sellingPoints: [
        'ISO 9001 Quality Management Systems',
        'NIST SP 800-171 & CMMC Compliance',
        'Continuous Auditing & Improvement',
        'Defect Prevention Methodologies'
      ],
      stats: [
        { label: 'Compliance Rate', value: '100%', icon: ShieldCheck },
        { label: 'Audit Success', value: 'Flawless', icon: Activity }
      ],
      delay: 0.4
    },
    { 
      title: 'Advanced Data Analytics', 
      icon: Database, 
      description: 'Transforming raw data into actionable intelligence. We leverage AI to drive strategic decision-making and operational efficiency.',
      sellingPoints: [
        'Predictive Modeling & Forecasting',
        'Real-time Dashboarding & Visualization',
        'Machine Learning Integration',
        'Data Governance & Security'
      ],
      stats: [
        { label: 'Insight Generation', value: 'Real-time', icon: Zap },
        { label: 'Data Accuracy', value: '99.99%', icon: BarChart3 }
      ],
      delay: 0.5
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
            CAPABILITIES
          </motion.h1>
        </div>

        {/* Vertical Cards */}
        <div className="flex flex-col gap-6 max-w-4xl relative z-20">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
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
                  <div className="bg-white/85 backdrop-blur-xl p-5 rounded-3xl shadow-md border border-white/90 flex items-center gap-6 hover:bg-white/95 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-inner shrink-0 border border-blue-100">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">{capability.title}</h3>
                      <p className="text-sm text-slate-700 font-medium line-clamp-1 mt-0.5">{capability.description}</p>
                    </div>
                  </div>
                ) : (
                  // Expanded State - Higher Quality, Less Gray
                  <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white/60 relative overflow-hidden">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveSection(null); }}
                      className="absolute top-6 right-6 w-10 h-10 bg-slate-100/50 hover:bg-red-50 rounded-full flex items-center justify-center hover:text-red-600 transition-colors z-20"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 mb-8 pr-12">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 tracking-tight leading-tight">{capability.title}</h3>
                        <p className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.4em] mt-1.5">Operational Capability Matrix</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                      <div className="flex flex-col h-full">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Strategic Advantage</h4>
                        <p className="text-slate-700 font-sans text-sm leading-relaxed mb-5">
                          {capability.description}
                        </p>
                        <ul className="space-y-2 mb-6 flex-grow">
                          {capability.sellingPoints.map((point: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium leading-snug">
                              <Zap className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-2">
                          <Link to="/contact" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors group/link">
                            Request Technical Briefing <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                          </Link>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 content-start">
                        {capability.stats.map((stat: any, i: number) => (
                          <div key={i} className="bg-white/50 rounded-2xl p-5 border border-white/60 flex items-center justify-between hover:bg-white/80 transition-colors shadow-sm">
                            <div>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                              <p className="text-xl font-sans font-bold text-slate-800 tracking-tight">{stat.value}</p>
                            </div>
                            <stat.icon className="w-6 h-6 text-slate-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating Quote Button (Bottom Right) */}
      <div className="fixed bottom-12 right-12 z-20">
        <CascadeWrapper delay={0.4}>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-4 px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            <MessageSquare className="w-5 h-5 text-blue-600" />
            Contact MGC
          </button>
        </CascadeWrapper>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default Capabilities;
