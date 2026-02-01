
import React, { useState, useEffect, useMemo } from 'react';
import { MemoryRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { PortfolioData, Project, Achievement, Certificate } from './types';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ProfileSettings from './pages/ProfileSettings';
import Achievements from './pages/Achievements';
import Certificates from './pages/Certificates';
import Bio from './pages/Bio';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import SocialLinks from './pages/SocialLinks';
import Contact from './pages/Contact';

const STORAGE_KEY = 'dev_portfolio_data';

const initialData: PortfolioData = {
  profile: { name: '', headline: '', additionalHeadlines: [] },
  bio: { text: '', email: '' },
  skills: { frontend: [], backend: [] },
  projects: [],
  achievements: [],
  certificates: [],
  socialLinks: { github: '', linkedin: '', twitter: '' }
};

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-black/5 px-8 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Title */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-xl font-bold tracking-[0.3em] text-black uppercase block">
            ADMIN <span className="text-amber-600">DASHBOARD</span>
          </Link>
        </div>

        {/* Navigation Links - Horizontal with Pipes */}
        <div className="flex items-center gap-6 font-bold tracking-[0.2em] uppercase">
          <Link 
            to="/" 
            className={`text-[11px] transition-all duration-300 hover:text-amber-600 ${location.pathname === '/' ? 'text-amber-600' : 'text-gray-500'}`}
          >
            Home
          </Link>
          <span className="text-gray-300 text-[11px]">|</span>
          <Link 
            to="/contact" 
            className={`text-[11px] transition-all duration-300 hover:text-amber-600 ${location.pathname === '/contact' ? 'text-amber-600' : 'text-gray-500'}`}
          >
            Contact
          </Link>
          <span className="text-gray-300 text-[11px]">|</span>
          <Link 
            to="/admin" 
            className={`text-[15px] transition-all duration-300 hover:text-amber-600 ${location.pathname.startsWith('/admin') ? 'text-amber-600' : 'text-black font-black'}`}
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : initialData;
    } catch (e) {
      console.warn("Storage access denied:", e);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage write denied:", e);
    }
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return (
    <Router>
      <div className="relative min-h-screen text-gray-900">
        {/* UI Pattern Background Layers */}
        <div className="ui-pattern"></div>
        <div className="ambient-glow"></div>
        
        <Navigation />
        
        <main className="relative z-10 pt-32">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/contact" element={<Contact email={data.bio.email} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/profile" element={<ProfileSettings profile={data.profile} update={(p) => updateData({ profile: p })} />} />
            <Route path="/admin/achievements" element={<Achievements achievements={data.achievements} update={(a) => updateData({ achievements: a })} />} />
            <Route path="/admin/certificates" element={<Certificates certificates={data.certificates} update={(c) => updateData({ certificates: c })} />} />
            <Route path="/admin/bio" element={<Bio bio={data.bio} update={(b) => updateData({ bio: b })} />} />
            <Route path="/admin/skills" element={<Skills skills={data.skills} update={(s) => updateData({ skills: s })} />} />
            <Route path="/admin/projects" element={<Projects projects={data.projects} update={(p) => updateData({ projects: p })} />} />
            <Route path="/admin/socials" element={<SocialLinks links={data.socialLinks} update={(l) => updateData({ socialLinks: l })} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
