
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SocialLinks: React.FC<{ links: { github: string; linkedin: string; twitter: string }; update: (l: { github: string; linkedin: string; twitter: string }) => void }> = ({ links, update }) => {
  const [local, setLocal] = useState(links);

  const handleSave = () => {
    update(local);
    alert('Social links updated!');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Social Presence</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Link your external professional profiles.</p>

      <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-[0.2em]">
            GitHub Profile
          </label>
          <input 
            className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium"
            value={local.github}
            onChange={e => setLocal({...local, github: e.target.value})}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-[0.2em]">
            LinkedIn Profile
          </label>
          <input 
            className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium"
            value={local.linkedin}
            onChange={e => setLocal({...local, linkedin: e.target.value})}
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-2 tracking-[0.2em]">
            X (formerly Twitter)
          </label>
          <input 
            className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium"
            value={local.twitter}
            onChange={e => setLocal({...local, twitter: e.target.value})}
            placeholder="https://twitter.com/..."
          />
        </div>

        <button onClick={handleSave} className="w-full py-5 bg-white border border-black/20 text-black font-black rounded-2xl hover:bg-gray-50 transition-all uppercase text-[11px] tracking-[0.3em] shadow-lg shadow-black/5">
          Sync Socials
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;
