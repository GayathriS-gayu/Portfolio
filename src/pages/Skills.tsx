
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Skills: React.FC<{ skills: { frontend: string[]; backend: string[] }; update: (s: { frontend: string[]; backend: string[] }) => void }> = ({ skills, update }) => {
  const [frontInput, setFrontInput] = useState('');
  const [backInput, setBackInput] = useState('');

  const addSkill = (category: 'frontend' | 'backend') => {
    const input = category === 'frontend' ? frontInput : backInput;
    if (input.trim()) {
      update({
        ...skills,
        [category]: [...skills[category], input.trim()]
      });
      category === 'frontend' ? setFrontInput('') : setBackInput('');
    }
  };

  const removeSkill = (category: 'frontend' | 'backend', idx: number) => {
    const next = skills[category].filter((_, i) => i !== idx);
    update({ ...skills, [category]: next });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Technical Skills</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Manage your tech stack categories.</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Frontend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col h-full">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
            Frontend
          </h3>
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-amber-500 outline-none text-black font-medium"
              value={frontInput}
              onChange={e => setFrontInput(e.target.value)}
              placeholder="e.g. React"
              onKeyDown={e => e.key === 'Enter' && addSkill('frontend')}
            />
            <button onClick={() => addSkill('frontend')} className="px-5 py-2 bg-white border border-black/20 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 shadow-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 flex-1 content-start">
            {skills.frontend.map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-gray-600 group uppercase tracking-wider shadow-sm">
                <span>{s}</span>
                <button onClick={() => removeSkill('frontend', i)} className="text-red-400 hover:text-red-600 transition-colors font-black ml-1 text-lg">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col h-full">
          <h3 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
            <span className="w-3 h-3 bg-black rounded-full"></span>
            Backend
          </h3>
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 text-sm focus:border-amber-500 outline-none text-black font-medium"
              value={backInput}
              onChange={e => setBackInput(e.target.value)}
              placeholder="e.g. Node.js"
              onKeyDown={e => e.key === 'Enter' && addSkill('backend')}
            />
            <button onClick={() => addSkill('backend')} className="px-5 py-2 bg-white border border-black/20 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 shadow-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 flex-1 content-start">
            {skills.backend.map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-bold text-gray-600 group uppercase tracking-wider shadow-sm">
                <span>{s}</span>
                <button onClick={() => removeSkill('backend', i)} className="text-red-400 hover:text-red-600 transition-colors font-black ml-1 text-lg">×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
