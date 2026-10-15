import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowUpRight, UserPlus } from 'lucide-react';
import { ShieldLogo } from './UI';
import { dispatchWorkspaceLead } from '../lib/workspaceWebhook';

const HOSTED_INTERNAL_PORTAL = 'https://mgc-external-site-254657731107.us-west1.run.app/onboarding-portal.html';
const LOCAL_INTERNAL_PORTAL = 'http://localhost:8090/onboarding-portal.html';

const getInternalPortalUrl = () => {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return LOCAL_INTERNAL_PORTAL;
  }
  return HOSTED_INTERNAL_PORTAL;
};

export const ClientLoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'request'>('login');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [sector, setSector] = useState('Federal / Defense (SDVOSB)');
  const [error, setError] = useState('');
  const [isAuthenticatingSSO, setIsAuthenticatingSSO] = useState(false);
  const [requestReceipt, setRequestReceipt] = useState<{
    receiptId: string;
    fullName: string;
    email: string;
    organization: string;
    sector: string;
    timestamp: string;
  } | null>(null);

  const handleWorkspaceSSO = () => {
    setError('');
    setIsAuthenticatingSSO(true);
    localStorage.removeItem('mgc_onboarded_session');
    const targetUrl = `${getInternalPortalUrl()}?sso=workspace&source=miltongroupsecurity.org`;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 400);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !orgName.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    const leadRes = await dispatchWorkspaceLead({
      sourceSite: 'Milton Group Concepts LLC',
      formType: 'Client/Partner Onboarding',
      fullName: fullName.trim(),
      email: email.trim(),
      organization: orgName.trim(),
      sectorOrService: sector,
      message: 'Portal Request Access submitted (Pending Security Review & Workspace SSO Provisioning)'
    });

    setRequestReceipt({
      receiptId: leadRes.receiptId,
      fullName: fullName.trim(),
      email: email.trim(),
      organization: orgName.trim(),
      sector,
      timestamp: new Date().toLocaleString()
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-gradient-to-b from-white/98 to-slate-50/98 backdrop-blur-2xl rounded-[2rem] shadow-[0_35px_90px_-15px_rgba(2,6,23,0.5)] border border-white/90 p-8 md:p-9 overflow-hidden z-10"
          >
            {/* Subtle top architectural accent bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-slate-100/80 hover:bg-slate-900 hover:text-white rounded-full transition-colors z-20 text-slate-600"
              aria-label="Close portal modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Clean Thematic Header with MGC 3D Shield */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                <ShieldLogo className="w-14 h-14" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-blue-800">
                  Milton Group Concepts
                </p>
                <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-none mt-1">
                  Client Portal
                </h2>
              </div>
            </div>

            {/* Two-Tab Switcher: Partner Sign In | Request Access */}
            <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl mb-6 border border-slate-300/60">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Partner Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('request'); setError(''); }}
                className={`py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'request'
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Request Access
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {activeTab === 'login' ? (
              <div className="space-y-5">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-inner border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-amber-400">
                      Federated Workspace SSO
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Authenticate with your verified organization credentials to enter the Internal Command Portal.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isAuthenticatingSSO}
                  onClick={handleWorkspaceSSO}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.2em] text-xs rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAuthenticatingSSO ? 'Redirecting to Internal Portal...' : 'Continue with Workspace SSO'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : requestReceipt ? (
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        Request Logged for Review
                      </h3>
                      <p className="text-[11px] font-semibold text-amber-400">
                        {requestReceipt.receiptId} • {requestReceipt.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Thank you, <strong className="text-white">{requestReceipt.fullName}</strong> ({requestReceipt.organization}). Once verified by security operations, your Workspace SSO identity (<strong className="text-white">{requestReceipt.email}</strong>) will be provisioned.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRequestReceipt(null);
                    setFullName('');
                    setEmail('');
                    setOrgName('');
                    setActiveTab('login');
                  }}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-xs font-extrabold uppercase tracking-[0.18em] text-white rounded-xl transition-colors cursor-pointer"
                >
                  Back to Partner Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestAccess} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Full Name &amp; Title
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Col. Jane Doe"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.doe@va.gov"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Organization / Agency
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Dept. of Veterans Affairs"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Mission Track
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    >
                      <option>Federal / Defense (SDVOSB)</option>
                      <option>Regulated Data Commerce &amp; Privacy</option>
                      <option>Cloud Agent &amp; LangGraph Automation</option>
                      <option>Enterprise Logistics &amp; Supply Chain</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 mt-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.2em] text-xs rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> Request Access
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

