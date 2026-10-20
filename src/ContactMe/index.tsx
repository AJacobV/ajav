import { motion } from 'framer-motion';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Terminal, Mail } from 'lucide-react';

const CONTACT_URL = import.meta.env.VITE_CONTACT_URL as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactMe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!CONTACT_URL) {
      console.error('VITE_CONTACT_URL is not set. Add it to .env and restart the dev server (or set it in your host and redeploy).');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      // text/plain keeps this a "simple" request so Apps Script doesn't need a CORS preflight
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ email, message, website }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setStatus('sent');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  };

  const fieldClass = 'w-full bg-white/20 border-2 border-gray-800 p-4 text-black font-bold focus:outline-none focus:bg-gray-100 transition-colors uppercase text-sm shadow-[4px_4px_0_0_#1f2937]';

  return (
    <section data-index="4" className="snap-start snap-always w-full h-screen flex flex-col justify-center relative">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">Secure Channel</h2>
          <p className="text-sm font-bold text-gray-500 tracking-widest uppercase">Establish connection with operator</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="SECURE COMM LINK (EMAIL)"
            className={fieldClass}
          />
          <textarea
            required
            maxLength={5000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="PAYLOAD / MESSAGE"
            rows={4}
            className={`${fieldClass} resize-none`}
          />
          {/* Honeypot: hidden from people, bots fill it in */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="absolute left-[-9999px] w-0 h-0 opacity-0"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-black text-white font-black uppercase tracking-widest py-4 mt-2 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#1f2937] hover:shadow-none hover:translate-y-1 hover:translate-x-1 active:translate-y-2 active:translate-x-2 disabled:opacity-60 disabled:cursor-wait"
          >
            <Terminal size={18} /> {status === 'sending' ? 'Transmitting...' : 'Execute Transmission'}
          </button>
          <p role="status" className={`text-center text-xs font-bold uppercase tracking-widest h-4 ${status === 'error' ? 'text-red-700' : 'text-gray-700'}`}>
            {status === 'sent' && 'Transmission received. Standby for response.'}
            {status === 'error' && 'Transmission failed. Try again later.'}
          </p>
        </form>

        <div className="flex justify-center gap-8 mt-12">
          <a href="#" className="text-gray-800 hover:text-black transition-colors font-black text-sm">[ GITHUB ]</a>
          <a href="#" className="text-gray-800 hover:text-black transition-colors font-black text-sm">[ LINKEDIN ]</a>
          <a href="#" className="text-gray-800 hover:text-black transition-colors"><Mail size={24} strokeWidth={3} /></a>
        </div>
      </motion.div>
    </section>
  );
}
