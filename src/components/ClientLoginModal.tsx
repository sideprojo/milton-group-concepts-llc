import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, CheckCircle2, ExternalLink, UserCheck, Building2 } from 'lucide-react';
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
    // Clear any legacy local session bypass keys
    localStorage.removeItem('mgc_onboarded_session');
    const targetUrl = `${getInternalPortalUrl()}?sso=workspace&source=miltongroupsecurity.org`;
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 450);
  };

  const handleAccessRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !orgName.trim()) {
      setError('Please complete all required fields to submit an access request.');
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
      message: 'Client/Partner Portal Access Request submitted (Pending Security Review & Workspace SSO Provisioning)'
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
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-white/98 backdrop-blur-2xl rounded-[2.25rem] shadow-[0_30px_100px_-15px_rgba(2,6,23,0.45)] border border-slate-200 p-8 md:p-10 overflow-hidden z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors z-20 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                    SDVOSB Secure Gateway
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    ZERO-TRUST SSO
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Client Portal &amp; Access Request
                </h2>
              </div>
            </div>

            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6 border border-slate-200/80">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Lock className="w-4 h-4" /> Partner / Client Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('request'); setError(''); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'request'
                    ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4" /> Access Request
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {activeTab === 'login' ? (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700">
                      Identity Provider Enforcement
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      NIST 800-171 / CMMC L2
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    Static access keys are disabled for security compliance. Client and Partner authentication is strictly enforced via federated <strong>Workspace SSO</strong> and redirects directly to the authenticated Internal Command Portal.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isAuthenticatingSSO}
                  onClick={handleWorkspaceSSO}
                  className="w-full py-4 px-6 bg-slate-900 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.18em] text-xs rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>{isAuthenticatingSSO ? 'Authenticating & Redirecting to Internal Portal...' : 'Workspace SSO — Authenticate & Redirect'}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-200">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" /> EIN: 92-1370285 • SDVOSB • Trust-But-Verify
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('request')}
                    className="font-extrabold text-blue-700 hover:underline"
                  >
                    Request Access &rarr;
                  </button>
                </div>
              </div>
            ) : requestReceipt ? (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        Access Request Logged — Pending Security Verification
                      </h3>
                      <p className="text-[11px] font-bold text-emerald-700">
                        Receipt ID: {requestReceipt.receiptId} • {requestReceipt.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    Thank you, <strong>{requestReceipt.fullName}</strong> ({requestReceipt.organization}). Your request has been logged with Milton Group Concepts LLC security operations (<strong>contact@miltongroupsecurity.org</strong>). View access is never auto-granted; once verified, your Workspace SSO identity (<strong>{requestReceipt.email}</strong>) will be provisioned.
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
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-xs font-extrabold uppercase tracking-wider text-white rounded-xl transition-colors"
                >
                  Return to Partner / Client Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleAccessRequest} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-700 mb-1.5">
                      Full Name &amp; Title
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Col. Jane Doe / Contracting Officer"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-700 mb-1.5">
                      Official Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.doe@va.gov"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-700 mb-1.5">
                      Organization / Agency
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Department of Veterans Affairs / DoD"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-700 mb-1.5">
                      Mission Track
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option>Federal / Defense (SDVOSB)</option>
                      <option>Regulated Data Commerce &amp; Privacy (CIPP / SAS)</option>
                      <option>Cloud Agent &amp; LangGraph Automation</option>
                      <option>Enterprise Logistics &amp; Supply Chain</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.2em] text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" /> Request Access
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
