
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

const Projects: React.FC<{ projects: Project[]; update: (p: Project[]) => void }> = ({ projects, update }) => {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<Partial<Project>>({ title: '', description: '', imageUrl: '', tags: [] });
  const [tagInput, setTagInput] = useState('');

  const add = () => {
    if (form.title && form.description) {
      const newProj: Project = {
        id: Date.now().toString(),
        title: form.title!,
        description: form.description!,
        imageUrl: form.imageUrl || '',
        tags: form.tags || []
      };
      update([...projects, newProj]);
      setForm({ title: '', description: '', imageUrl: '', tags: [] });
      setShowAdd(false);
    }
  };

  const remove = (id: string) => {
    if (confirm('Delete this project?')) {
      update(projects.filter(p => p.id !== id));
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] });
      setTagInput('');
    }
  };

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 pb-32">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Projects</h1>
          <p className="text-gray-500 font-medium">Manage your professional work samples.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className={`px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${showAdd ? 'bg-white border border-black/10 text-black shadow-sm' : 'bg-white border border-amber-500/30 text-amber-600 shadow-lg shadow-amber-500/5'}`}
        >
          {showAdd ? 'Close Editor' : 'Add New Project'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/5 mb-12 space-y-8">
          <h3 className="text-[11px] font-black text-black uppercase tracking-[0.3em]">Project Details</h3>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Title</label>
                <input 
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium" 
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Cover Image URL</label>
                <input 
                  className="w-full bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium" 
                  value={form.imageUrl}
                  onChange={e => setForm({...form, imageUrl: e.target.value})}
                  placeholder="https://..."
                />
                <div className="mt-4 border-2 border-dashed border-black/5 rounded-[2rem] overflow-hidden bg-white flex items-center justify-center min-h-[180px] shadow-inner">
                  {form.imageUrl ? (
                    <img 
                      src={form.imageUrl} 
                      alt="Preview" 
                      className="w-full h-44 object-cover" 
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  ) : (
                    <span className="text-[9px] text-gray-400 uppercase font-black tracking-[0.2em]">Image Preview</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Tech Stack Tags</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    className="flex-1 bg-white border border-black/10 rounded-xl px-5 py-4 outline-none focus:border-amber-500 text-black font-medium" 
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                    placeholder="e.g. TypeScript"
                  />
                  <button onClick={addTag} className="bg-white border border-black/20 text-black px-6 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags?.map((t, i) => (
                    <span key={i} className="text-[9px] font-black bg-white text-amber-600 px-3 py-1.5 rounded-lg border border-black/10 uppercase tracking-widest shadow-sm">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Description</label>
              <textarea 
                rows={12}
                className="w-full bg-white border border-black/10 rounded-[2rem] px-6 py-5 outline-none focus:border-amber-500 text-black font-medium resize-none leading-relaxed" 
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                placeholder="Describe the scope, challenges and solutions..."
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
             <button onClick={add} className="px-12 py-5 bg-white border border-amber-500/40 text-amber-600 font-black rounded-2xl hover:bg-amber-50 transition-all uppercase text-[11px] tracking-widest shadow-xl shadow-amber-500/5">Save Project</button>
          </div>
        </div>
      )}

      <div className="mb-12">
        <input 
          type="text" 
          placeholder="Search by name or technology..." 
          className="w-full bg-white border border-black/10 rounded-[2rem] px-8 py-5 outline-none focus:border-amber-500 text-black font-medium shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(proj => (
          <div key={proj.id} className="bg-white border border-black/5 rounded-[2.5rem] overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[4/3] bg-gray-50 relative overflow-hidden">
               {proj.imageUrl && <img src={proj.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />}
               <button onClick={() => remove(proj.id)} className="absolute top-4 right-4 p-2 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-lg">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h4 className="text-xl font-bold text-black mb-3 uppercase tracking-tight">{proj.title}</h4>
              <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">{proj.description}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {proj.tags.map((t, i) => (
                  <span key={i} className="text-[9px] font-black text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-black/10 uppercase tracking-widest shadow-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white/50 border-2 border-dashed border-black/10 rounded-[3rem]">
            <p className="text-gray-400 font-medium italic">
              {search ? `No projects match "${search}"` : "Your portfolio is currently empty."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
