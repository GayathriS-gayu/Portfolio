
import React, { useState } from 'react';

const Contact: React.FC<{ email: string }> = ({ email }) => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-tighter leading-none">Let's Talk.</h1>
        <p className="text-gray-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">Available for interesting projects and creative collaborations.</p>
        {email && (
          <p className="mt-8 text-amber-600 font-black text-[10px] uppercase tracking-[0.4em]">{email}</p>
        )}
      </div>

      <div className="bg-white border border-black/5 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-black/[0.03]">
        {sent ? (
          <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-3xl font-black text-black mb-3 uppercase tracking-tight">Sent Successfully.</h3>
            <p className="text-gray-500 font-medium italic">I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Name</label>
                <input 
                  required
                  className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 outline-none focus:border-amber-500 text-black font-medium transition-all shadow-sm"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="John Smith"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full bg-white border border-black/10 rounded-2xl px-6 py-5 outline-none focus:border-amber-500 text-black font-medium transition-all shadow-sm"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message</label>
              <textarea 
                required
                rows={6}
                className="w-full bg-white border border-black/10 rounded-3xl px-8 py-6 outline-none focus:border-amber-500 text-black font-medium transition-all resize-none shadow-sm leading-relaxed"
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                placeholder="What are you thinking?"
              />
            </div>
            <button type="submit" className="w-full py-6 bg-white border border-black/20 text-black font-black rounded-2xl hover:bg-gray-50 transition-all uppercase text-[11px] tracking-[0.4em] shadow-xl shadow-black/5 active:scale-[0.98]">
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
