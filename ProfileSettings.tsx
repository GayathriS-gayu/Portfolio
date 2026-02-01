
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  profile: { name: string; headline: string; additionalHeadlines: string[] };
  update: (p: { name: string; headline: string; additionalHeadlines: string[] }) => void;
}

const ProfileSettings: React.FC<Props> = ({ profile, update }) => {
  const [local, setLocal] = useState(profile);
  const [newHeadline, setNewHeadline] = useState('');

  const handleSave = () => {
    update(local);
    alert('Profile updated successfully!');
  };

  const addHeadline = () => {
    if (newHeadline.trim()) {
      setLocal({ ...local, additionalHeadlines: [...local.additionalHeadlines, newHeadline.trim()] });
      setNewHeadline('');
    }
  };

  const removeHeadline = (idx: number) => {
    const next = local.additionalHeadlines.filter((_, i) => i !== idx);
    setLocal({ ...local, additionalHeadlines: next });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to clear your profile?')) {
      const reset = { name: '', headline: '', additionalHeadlines: [] };
      setLocal(reset);
      update(reset);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Profile Settings</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Manage your basic identity and professional tagline.</p>

      <div className="space-y-8 bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02]">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 block uppercase tracking-[0.2em]">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
            value={local.name}
            onChange={e => setLocal({ ...local, name: e.target.value })}
            placeholder="e.g. Jane Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 block uppercase tracking-[0.2em]">Professional Headline</label>
          <input 
            type="text" 
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
            value={local.headline}
            onChange={e => setLocal({ ...local, headline: e.target.value })}
            placeholder="e.g. Senior Full Stack Engineer"
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-400 block uppercase tracking-[0.2em]">Additional Headlines / Focus Tags</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
              value={newHeadline}
              onChange={e => setNewHeadline(e.target.value)}
              placeholder="e.g. Open Source Contributor"
            />
            <button onClick={addHeadline} className="px-6 py-3 bg-white border border-black/20 text-black rounded-xl hover:bg-gray-50 transition-colors font-bold text-xs uppercase tracking-widest shadow-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {local.additionalHeadlines.map((h, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-black/5 rounded-full text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                <span>{h}</span>
                <button onClick={() => removeHeadline(i)} className="text-red-500 font-bold hover:text-red-700 ml-1">×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <button onClick={handleDelete} className="px-6 py-3 text-red-500 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all">
            Clear Data
          </button>
          <button onClick={handleSave} className="px-8 py-3 bg-white border border-amber-500/30 text-amber-600 font-black rounded-xl hover:bg-amber-50 transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-amber-500/5">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
