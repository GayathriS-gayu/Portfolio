
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Certificate } from '../types';

const Certificates: React.FC<{ certificates: Certificate[]; update: (c: Certificate[]) => void }> = ({ certificates, update }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const add = () => {
    if (title.trim() && url.trim()) {
      update([...certificates, { id: Date.now().toString(), title, imageUrl: url }]);
      setTitle('');
      setUrl('');
    }
  };

  const remove = (id: string) => {
    update(certificates.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/admin" className="text-amber-600 text-sm font-bold hover:underline mb-8 block uppercase tracking-widest">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Certificates</h1>
      <p className="text-gray-500 mb-10 border-b border-black/5 pb-4">Manage your professional certifications and credentials.</p>

      <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] mb-12 space-y-6">
        <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">Add New Certificate</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Title</label>
              <input 
                type="text" 
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. AWS Solutions Architect"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Image URL</label>
              <input 
                type="text" 
                className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:border-amber-500 outline-none text-black font-medium"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/cert.png"
              />
            </div>
            <button onClick={add} className="w-full py-4 bg-white border border-black/20 text-black font-black rounded-xl hover:bg-gray-50 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-black/5">
              Add Certificate
            </button>
          </div>
          
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-[2rem] p-4 bg-white shadow-inner">
            <span className="text-[9px] font-black text-gray-400 uppercase mb-4 tracking-widest">Live Preview</span>
            {url ? (
              <img 
                src={url} 
                alt="Preview" 
                className="max-h-40 rounded-xl object-contain shadow-2xl border border-black/5 bg-white"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <div className="text-gray-400 text-center text-[10px] font-bold uppercase tracking-widest py-10">
                Awaiting Image URL
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {certificates.map(cert => (
          <div key={cert.id} className="bg-white border border-black/5 rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="aspect-video bg-gray-50 relative overflow-hidden">
              <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <button 
                onClick={() => remove(cert.id)}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-black font-bold uppercase tracking-tight text-lg">{cert.title}</h4>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-2 text-center py-20 bg-white/50 border-2 border-dashed border-black/10 rounded-[2.5rem]">
            <p className="text-gray-400 italic font-medium">Your wall of honor is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
