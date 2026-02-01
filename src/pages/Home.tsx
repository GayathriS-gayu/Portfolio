
import React from 'react';
import { PortfolioData } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  data: PortfolioData;
}

const Home: React.FC<Props> = ({ data }) => {
  const { profile, bio, skills, projects, certificates, achievements, socialLinks } = data;

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">
      {/* Hero Section */}
      <section className="py-24 md:py-40 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-6 text-black uppercase leading-[0.85]">
          {profile.name || "YOUR NAME"}
        </h1>
        <p className="text-lg md:text-2xl text-amber-600 font-bold mb-8 uppercase tracking-[0.4em]">
          {profile.headline || "YOUR PROFESSIONAL TITLE"}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {profile.additionalHeadlines.map((h, i) => (
            <span key={i} className="px-4 py-1.5 bg-white border border-black/10 rounded-full text-[10px] font-bold text-gray-600 uppercase tracking-widest shadow-sm">
              {h}
            </span>
          ))}
        </div>
        
        {/* Buttons - Horizontal with Specific Spacing */}
        <div className="uppercase text-[11px] font-black tracking-[0.2em] flex items-center justify-center">
          <button 
            onClick={scrollToProjects}
            className="text-black hover:text-amber-600 transition-colors cursor-pointer outline-none focus:text-amber-600"
          >
            View Projects
          </button>
          {"\u00A0\u00A0\u00A0\u00A0"}
          <Link 
            to="/contact" 
            className="text-black hover:text-amber-600 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Bio Section */}
      {bio.text && (
        <section className="py-24 border-t border-black/5 grid md:grid-cols-2 gap-20">
          <div className="text-left">
            <h2 className="text-4xl font-black mb-8 text-black uppercase tracking-tight">The Narrative</h2>
            <p className="text-gray-600 leading-[1.8] text-xl font-light">
              {bio.text}
            </p>
          </div>
          <div className="space-y-12 text-left">
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Core Competencies</h3>
              <div className="grid grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-xs font-bold text-amber-600 mb-4 uppercase tracking-widest">Frontend</h4>
                  <ul className="text-base text-gray-500 space-y-2">
                    {skills.frontend.map((s, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-amber-600 rounded-full"></span>{s}</li>)}
                    {skills.frontend.length === 0 && <li>-</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-600 mb-4 uppercase tracking-widest">Backend</h4>
                  <ul className="text-base text-gray-500 space-y-2">
                    {skills.backend.map((s, i) => <li key={i} className="flex items-center gap-2"><span className="w-1 h-1 bg-amber-600 rounded-full"></span>{s}</li>)}
                    {skills.backend.length === 0 && <li>-</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section id="projects" className="py-24 border-t border-black/5">
        <h2 className="text-4xl font-black mb-16 text-black text-left uppercase tracking-tight">Selected Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
          {projects.length > 0 ? projects.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-black/5 hover:border-amber-500/40 transition-all duration-500 shadow-xl shadow-black/[0.02]">
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                )}
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-black mb-4 uppercase tracking-tight">{project.title}</h3>
                <p className="text-gray-500 text-base mb-8 line-clamp-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((t, i) => (
                    <span key={i} className="text-[9px] font-bold px-3 py-1 bg-white text-amber-600 rounded-md border border-black/10 uppercase tracking-widest shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-left">
              <p className="text-gray-400 italic text-xl">No projects added yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Certificates & Achievements */}
      <section className="py-24 border-t border-black/5">
        <div className="grid md:grid-cols-2 gap-32">
          <div className="text-left">
            <h2 className="text-3xl font-black mb-12 text-black uppercase tracking-tight">Certifications</h2>
            <div className="space-y-10">
              {certificates.length > 0 ? (
                certificates.map(cert => (
                  <div key={cert.id} className="flex items-center gap-8 group">
                    <div className="w-24 h-24 bg-white rounded-3xl overflow-hidden border border-black/5 shrink-0 shadow-lg">
                      <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div>
                      <h4 className="text-black text-xl font-bold tracking-tight">{cert.title}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-2 font-black">Verified Credential</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-lg italic">No certificates listed.</p>
              )}
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black mb-12 text-black uppercase tracking-tight">Achievements</h2>
            <div className="text-left">
              {achievements.length > 0 ? (
                <ul className="space-y-8">
                  {achievements.map(ach => (
                    <li key={ach.id} className="flex items-start gap-5 group">
                      <span className="text-amber-500 text-2xl group-hover:scale-125 transition-transform duration-300">✦</span>
                      <span className="text-gray-600 text-lg leading-snug font-medium">{ach.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-lg italic">No achievements listed.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Socials */}
      <footer className="py-24 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Portfolio © {new Date().getFullYear()}</p>
          <p className="text-black text-sm font-black uppercase tracking-[0.1em]">{profile.name || "Portfolio"}</p>
        </div>
        <div className="flex gap-12">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600 transition-colors uppercase text-[11px] font-black tracking-widest">GitHub</a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600 transition-colors uppercase text-[11px] font-black tracking-widest">LinkedIn</a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-600 transition-colors uppercase text-[11px] font-black tracking-widest">Twitter</a>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Home;
