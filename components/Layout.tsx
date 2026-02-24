
import React from 'react';
import { BrandConfig, AgentInfo, UserRole } from '../types';
import { MapPin, Phone, MessageSquare, ShieldCheck, User } from 'lucide-react';

interface LayoutProps {
  brand: BrandConfig;
  agent: AgentInfo;
  children: React.ReactNode;
  propertyAddress: string;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ brand, agent, children, propertyAddress, role, setRole }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Prototype Banner */}
      <div className="bg-slate-50 border-b border-slate-200 py-1.5 px-6 text-center z-[100]">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Prototype Experience: Seller Perspective
        </p>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar - Branding & Navigation Only */}
        <aside 
          className="w-full md:w-72 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-6 pt-12 md:p-8 shrink-0 z-20"
        >
          <div className="mb-8 text-center md:text-left">
            <h1 
              className="font-header uppercase-tracking-150 text-xl md:text-2xl mb-1" 
              style={{ color: brand.primaryColor }}
            >
              {brand.logoName}
            </h1>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              {role === UserRole.SELLER ? 'Transaction Center' : 'Agent Transparency Portal'}
            </p>
            <div className="h-[1px] w-full bg-slate-200 my-6"></div>
            <p className="text-xs font-bold text-slate-800 flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span className="truncate">{propertyAddress.split('|')[0]}</span>
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-white md:bg-transparent overflow-x-hidden">
          <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-20 pb-64 md:pb-64">
            {children}
          </div>
        </main>
      </div>
      
      {/* Global Bottom Footer - Agent & Role Toggle */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-[90] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Agent Section */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm transition-transform group-hover:scale-105" 
              />
              {agent.isVerified && (
                <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border-2 border-white shadow-sm" title="Smart Verified Agent">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tighter">{agent.name}</p>
                <span className="text-[7px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-widest border border-emerald-100">Smart Verified</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-0.5">{agent.brokerage}</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.location.href = `tel:${agent.phone}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all active:scale-95"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Call</span>
              </button>
              <button 
                className="flex items-center gap-2 px-4 py-2 text-white rounded-xl transition-all active:scale-95 shadow-md shadow-blue-500/10"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-widest">SMS</span>
              </button>
            </div>
          </div>

          {/* Perspective Toggle */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">View Mode</p>
            <div className="inline-flex bg-slate-100 p-0.5 rounded-full border border-slate-200 shadow-inner">
              <button 
                onClick={() => setRole(UserRole.SELLER)}
                className={`px-4 py-1 text-[7px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.SELLER ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => setRole(UserRole.AGENT)}
                className={`px-4 py-1 text-[7px] font-black uppercase tracking-widest rounded-full transition-all ${role === UserRole.AGENT ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Agent
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Layout;
