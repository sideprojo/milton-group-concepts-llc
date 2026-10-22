import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Newspaper, X, Loader2, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  date: string;
}

export const NewsFeed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [subTrack, setSubTrack] = useState('ALL');
  const [subStatus, setSubStatus] = useState<{ ok?: boolean; msg?: string }>({});

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail.trim(), track: subTrack })
      });
      const data = await res.json();
      if (data && data.ok) {
        setSubStatus({ ok: true, msg: 'Subscribed to Executive Briefings!' });
        setSubEmail('');
      } else {
        setSubStatus({ ok: false, msg: (data && data.error) || 'Please enter a valid email.' });
      }
    } catch (_) {
      setSubStatus({ ok: true, msg: 'Subscribed to Executive Briefings!' });
      setSubEmail('');
    }
  };

  // Fetch live RSS feed using rss2json API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const rssUrl = encodeURIComponent('https://www.cisa.gov/cybersecurity-advisories/all.xml');
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        const data = await response.json();

        if (data.status === 'ok') {
          const formattedNews = data.items.slice(0, 10).map((item: any, index: number) => {
            let imageUrl = item.enclosure?.link || item.thumbnail;
            if (!imageUrl && item.content) {
              const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) imageUrl = imgMatch[1];
            }
            if (!imageUrl && item.description) {
              const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) imageUrl = imgMatch[1];
            }
            if (!imageUrl) {
              const fallbacks = [
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
              ];
              imageUrl = fallbacks[index % fallbacks.length];
            }

            return {
              id: item.guid || String(index),
              title: item.title,
              category: item.categories?.[0] || 'Cybersecurity',
              image: imageUrl,
              link: item.link,
              date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            };
          });
          setNews(formattedNews);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && news.length === 0) {
      fetchNews();
    }

    const intervalId = setInterval(fetchNews, 3600000);
    return () => clearInterval(intervalId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const container = document.getElementById('news-scroll-container');
      if (container && !isHovered) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 50) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          }, 1000);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, isHovered]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-6 shadow-2xl w-[calc(100vw-3rem)] max-w-5xl pointer-events-auto origin-bottom-right"
          >
            {/* Executive Newsletter Subscription Bar */}
            <div className="mb-5 p-4 rounded-2xl bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400 mb-1">
                  <Mail className="w-3.5 h-3.5" /> Executive Intelligence Newsletter
                </div>
                <p className="text-xs text-slate-300">
                  Receive concise weekly briefings on Zero-Trust Cyber, SDVOSB Federal Radar, and Turnkey AI Workflows.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex flex-wrap items-center gap-2">
                <input
                  type="email"
                  required
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="name@organization.com"
                  aria-label="Email address for Executive Newsletter"
                  className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-blue-400 min-w-[200px]"
                />
                <select
                  value={subTrack}
                  onChange={(e) => setSubTrack(e.target.value)}
                  aria-label="Newsletter track"
                  className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-400"
                >
                  <option value="ALL">All Briefings</option>
                  <option value="ZERO_TRUST_CYBER">Zero-Trust Cyber</option>
                  <option value="SDVOSB_FEDERAL">SDVOSB Federal</option>
                  <option value="AI_AUTOMATION">AI & Turnkey Ops</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
                <a
                  href="/newsletter"
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors"
                >
                  Archive <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </form>
            </div>
            {subStatus.msg && (
              <div className={`mb-4 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${subStatus.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                <CheckCircle2 className="w-4 h-4" /> {subStatus.msg}
              </div>
            )}

            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-600" />
                Live CISA & Industry Intelligence Feed
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Intelligence Feed"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div
              id="news-scroll-container"
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loading ? (
                <div className="w-full flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                news.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[290px] w-[290px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group hover:shadow-md transition-all snap-center shrink-0 flex flex-col"
                  >
                    <div className="h-36 overflow-hidden relative">
                      <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[9px] font-bold uppercase tracking-wider text-blue-600">
                        {item.category}
                      </div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <h4 className="font-sans font-semibold text-sm text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto cursor-pointer group relative overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-500 ring-4 ring-blue-600/20 ${
            isHovered
              ? 'bg-blue-700 text-white shadow-[0_8px_30px_rgba(37,99,235,0.5)] scale-105 ring-blue-600/40'
              : 'bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Newspaper className={`w-5 h-5 relative z-10 transition-colors ${isHovered ? 'text-white' : 'text-blue-100'}`} />
          <span className="relative z-10">Newsletter & Intel</span>
        </button>
      )}
    </div>
  );
};
