
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Achievement } from '../types';

const Achievements: React.FC<{ achievements: Achievement[]; update: (a: Achievement[]) => void }> = ({ achievements, update }) => {
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');

  const add = () => {
    if (newItem.trim()) {
      update([...achievements, { id: Date.now().toString(), title: newItem.trim() }]);
      setNewItem('');
    }
  };

  const remove = (id: string) => {
    update(achievements.filter(a => a.id !== id));
  };

  const filtered = achievements.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-left">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Achievements</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Manage your awards, honors, and professional milestones.</p>

      <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] mb-8">
        <label className="text-[10px] font-black text-gray-400 block mb-3 uppercase tracking-[0.2em]">Add New Achievement</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="e.g. Winner of Global Hackathon 2024"
            onKeyDown={e => e.key === 'Enter' && add()}
          />
          <button onClick={add} className="px-8 py-3 bg-white border border-black/20 text-black font-black rounded-xl hover:bg-gray-50 transition-all uppercase text-[10px] tracking-widest shadow-sm">Add</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search achievements..." 
          className="w-full bg-white border border-black/10 rounded-2xl px-6 py-4 outline-none focus:border-amber-500 text-black font-medium shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filtered.map(ach => (
          <div key={ach.id} className="flex justify-between items-center p-6 bg-white border border-black/5 rounded-2xl group hover:border-amber-500 transition-all shadow-sm">
            <span className="text-black font-bold text-lg">{ach.title}</span>
            <button onClick={() => remove(ach.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="text-left py-16 px-10 border-2 border-dashed border-black/10 rounded-[2.5rem] bg-white/50">
            <p className="text-gray-400 italic font-medium">
              {search ? `No results for "${search}"` : "No achievements listed yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
