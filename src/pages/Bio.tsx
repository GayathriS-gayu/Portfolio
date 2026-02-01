
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Bio: React.FC<{ bio: { text: string; email: string }; update: (b: { text: string; email: string }) => void }> = ({ bio, update }) => {
  const [local, setLocal] = useState(bio);

  const handleSave = () => {
    update(local);
    alert('Bio updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Bio & Professional Info</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Tell your story and set your primary contact point.</p>

      <div className="space-y-8 bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02]">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 block uppercase tracking-[0.2em]">Professional Bio</label>
          <textarea 
            rows={8}
            className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 focus:border-amber-500 outline-none text-black font-medium resize-none leading-relaxed"
            value={local.text}
            onChange={e => setLocal({ ...local, text: e.target.value })}
            placeholder="Write a compelling narrative about your professional journey..."
          />
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">This appears in the 'The Narrative' section on your home page.</p>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 block uppercase tracking-[0.2em]">Contact Email</label>
          <input 
            type="email" 
            className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
            value={local.email}
            onChange={e => setLocal({ ...local, email: e.target.value })}
            placeholder="hello@example.com"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button onClick={handleSave} className="px-10 py-4 bg-white border border-black/20 text-black font-black rounded-xl hover:bg-gray-50 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-black/5">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
