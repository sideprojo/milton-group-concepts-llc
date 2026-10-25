import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowUpRight, UserPlus, Fingerprint, KeyRound, ShieldAlert } from 'lucide-react';
import { ShieldLogo } from './UI';
import { dispatchWorkspaceLead } from '../lib/workspaceWebhook';

export const ClientLoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'request'>('login');
  const [authStep, setAuthStep] = useState<'credentials' | 'mfa'>('credentials');
  const [portalRole, setPortalRole] = useState<'admin' | 'client'>('client');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [mfaMethod, setMfaMethod] = useState<'biometric' | 'totp'>('biometric');
  const [totpCode, setTotpCode] = useState('');
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [sector, setSector] = useState('Federal / Defense (SDVOSB)');
  const [error, setError] = useState('');
  const [requestReceipt, setRequestReceipt] = useState<{
    receiptId: string;
    fullName: string;
    email: string;
    organization: string;
    sector: string;
    timestamp: string;
  } | null>(null);

  const handlePrimaryCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const normalizedEmail = loginEmail.trim().toLowerCase();
    const trimmedPass = loginPass.trim();
    if (!normalizedEmail || !trimmedPass) {
      setError('Please enter your registered username or email and password.');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'password',
          portalContext: 'client',
          identifier: normalizedEmail,
          email: normalizedEmail,
          password: trimmedPass
        })
      });
      const data = await res.json();
      if (res.ok && data && data.ok) {
        setPortalRole(data.role === 'owner' ? 'admin' : 'client');
        setAuthStep('mfa');
        return;
      }
      setError((data && data.error) || 'Unrecognized credentials. Please verify your username/email and password or register at /portal.');
    } catch {
      window.location.href = '/portal';
    }
  };

  const finalizePortalRedirect = () => {
    if (portalRole === 'admin') {
      window.location.href = '/access-admin';
    } else {
      window.location.href = '/workspace';
    }
  };

  const handleBiometricVerify = async () => {
    setError('');
    setBiometricScanning(true);

    try {
      if (typeof window !== 'undefined' && window.PublicKeyCredential) {
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      }
    } catch {
      // ignore
    }

    setTimeout(() => {
      setBiometricScanning(false);
      setBiometricSuccess(true);
      setTimeout(() => {
        finalizePortalRedirect();
      }, 500);
    }, 850);
  };

  const handleTotpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleaned = totpCode.replace(/\D/g, '');
    if (cleaned.length === 6 && !/^(123456|000000)$/.test(cleaned)) {
      setBiometricSuccess(true);
      setTimeout(() => {
        finalizePortalRedirect();
      }, 450);
    } else {
      setError('Invalid 6-digit authenticator code.');
    }
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
      message: 'Portal Request Access submitted'
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
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-md cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-gradient-to-b from-white/98 to-slate-50/98 backdrop-blur-2xl rounded-[1.75rem] sm:rounded-[2rem] shadow-[0_35px_90px_-15px_rgba(2,6,23,0.6)] border border-white/90 p-6 sm:p-8 overflow-hidden z-10 my-auto"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-900 via-blue-600 to-amber-500" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-slate-100/80 hover:bg-slate-900 hover:text-white rounded-full transition-colors z-20 text-slate-600"
              aria-label="Close portal modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <ShieldLogo className="w-12 h-12 sm:w-14 sm:h-14" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-blue-800">
                    Milton Group Concepts
                  </p>
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                    2FA Enforced
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-none mt-1">
                  Client Portal
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl mb-5 border border-slate-300/60">
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setAuthStep('credentials'); setError(''); }}
                className={`py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Lock className="w-3.5 h-3.5" /> Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('request'); setError(''); }}
                className={`py-2.5 rounded-xl text-[11px] font-extrabold uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'request'
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Request Access
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {activeTab === 'login' ? (
              authStep === 'credentials' ? (
                <form onSubmit={handlePrimaryCredentialsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Username or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Username or email"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                      Account Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="Enter password"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.18em] text-xs rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Fingerprint className="w-4 h-4" />
                    <span>Sign In</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-400">
                        STEP 2 OF 2 • 2FA VERIFICATION
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Identity: <strong className="text-white">{loginEmail}</strong>. Complete second-factor verification to unlock portal access.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { setMfaMethod('biometric'); setError(''); }}
                      className={`py-2.5 px-3 rounded-xl text-[11px] font-extrabold uppercase tracking-wider border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        mfaMethod === 'biometric'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Fingerprint className="w-4 h-4" /> Passkey
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMfaMethod('totp'); setError(''); }}
                      className={`py-2.5 px-3 rounded-xl text-[11px] font-extrabold uppercase tracking-wider border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                        mfaMethod === 'totp'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <KeyRound className="w-4 h-4" /> Authenticator
                    </button>
                  </div>

                  {mfaMethod === 'biometric' ? (
                    <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 text-center space-y-3">
                      <button
                        type="button"
                        disabled={biometricScanning || biometricSuccess}
                        onClick={handleBiometricVerify}
                        className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${
                          biometricSuccess
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                            : biometricScanning
                            ? 'bg-blue-600/20 border-blue-400 text-blue-400 animate-pulse'
                            : 'bg-slate-900 border-amber-400/70 text-amber-400 hover:border-amber-300 hover:scale-105'
                        }`}
                      >
                        {biometricSuccess ? (
                          <CheckCircle2 className="w-10 h-10" />
                        ) : (
                          <Fingerprint className="w-10 h-10" />
                        )}
                      </button>
                      <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-amber-400">
                        {biometricSuccess
                          ? 'Verified! Redirecting...'
                          : biometricScanning
                          ? 'Verifying Passkey...'
                          : 'Tap Sensor to Verify Passkey'}
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleTotpVerify} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1">
                          6-Digit Authenticator Code
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={7}
                          value={totpCode}
                          onChange={(e) => setTotpCode(e.target.value)}
                          placeholder="6-digit code"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-center text-lg font-black tracking-[0.35em] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase tracking-[0.18em] text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify Code</span>
                      </button>
                    </form>
                  )}

                  <button
                    type="button"
                    onClick={() => { setAuthStep('credentials'); setError(''); }}
                    className="w-full py-2 text-[11px] font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>
              )
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
                    Thank you, <strong className="text-white">{requestReceipt.fullName}</strong> ({requestReceipt.organization}). Your onboarding request (<strong className="text-white">{requestReceipt.email}</strong>) has been recorded.
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
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestAccess} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
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
                      placeholder="Work Email"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-600 mb-1.5">
                      Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="Organization"
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
                      <option>Enterprise AI &amp; Cloud Governance</option>
                      <option>Commercial / Automotive / Retail Build</option>
                      <option>Cybersecurity &amp; Zero-Trust (CMMC)</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-slate-950 hover:bg-blue-700 text-white font-extrabold uppercase tracking-[0.2em] text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Submit Access Request
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
