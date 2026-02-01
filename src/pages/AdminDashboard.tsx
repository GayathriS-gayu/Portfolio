
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const adminModules = [
    { title: "Profile Settings", desc: "Name, Headline, Status", path: "/admin/profile", icon: "👤", color: "bg-blue-500/10 text-blue-600" },
    { title: "Achievements", desc: "Manage Awards", path: "/admin/achievements", icon: "🏆", color: "bg-yellow-500/10 text-yellow-600" },
    { title: "Certificates", desc: "Verification Links", path: "/admin/certificates", icon: "📜", color: "bg-green-500/10 text-green-600" },
    { title: "Bio & Email", desc: "Your Narrative", path: "/admin/bio", icon: "🖋️", color: "bg-purple-500/10 text-purple-600" },
    { title: "Skills", desc: "Frontend & Backend", path: "/admin/skills", icon: "⚡", color: "bg-cyan-500/10 text-cyan-600" },
    { title: "Projects", desc: "Portfolio Work", path: "/admin/projects", icon: "📂", color: "bg-orange-500/10 text-orange-600" },
    { title: "Social Links", desc: "External Profiles", path: "/admin/socials", icon: "🔗", color: "bg-pink-500/10 text-pink-600" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-black tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-3 text-lg">Manage all your portfolio content with precision and ease.</p>
        </div>
        <div className="uppercase text-[11px] font-black tracking-[0.2em]">
          <Link to="/" className="text-black hover:text-amber-600 transition-colors">View Projects</Link>
          {"\u00A0\u00A0\u00A0\u00A0"}
          <Link to="/contact" className="text-black hover:text-amber-600 transition-colors">Get in Touch</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {adminModules.map((module, i) => (
          <Link 
            key={i} 
            to={module.path}
            className="group block p-10 bg-white border border-black/5 rounded-[2rem] hover:border-amber-500/40 hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-2 shadow-xl shadow-black/[0.02]"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6 ${module.color}`}>
              {module.icon}
            </div>
            <h3 className="text-xl font-bold text-black mb-3">{module.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{module.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
