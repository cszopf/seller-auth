
import React from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Search, 
  CreditCard, 
  User, 
  Mail, 
  Phone,
  ArrowRight,
  FileText,
  AlertCircle
} from 'lucide-react';

interface AgentViewProps {
  brand: BrandConfig;
  agent: AgentInfo;
}

const AgentTransparencyView: React.FC<AgentViewProps> = ({ brand }) => {
  const phases = [
    {
      title: 'Seller Onboarding',
      milestones: [
        { label: 'Property Info Confirmed', status: 'Complete', time: 'Today, 10:12 AM' },
        { label: 'Identity Verified (Biometric)', status: 'Complete', time: 'Today, 10:15 AM' },
        { label: 'Seller Authorization Signed', status: 'Complete', time: 'Today, 10:20 AM' },
        { label: 'Financial Accounts Linked', status: 'Complete', time: 'Today, 10:30 AM' }
      ]
    },
    {
      title: 'Title & Curative',
      milestones: [
        { label: 'Title Search Ordered', status: 'In Progress', time: 'Pending' },
        { label: 'Tax Certification', status: 'Pending', time: 'Pending' },
        { label: 'Lien Examination', status: 'Pending', time: 'Pending' }
      ]
    },
    {
      title: 'Closing Preparation',
      milestones: [
        { label: 'Payoff Verification', status: 'Pending', time: 'Pending' },
        { label: 'Deed Preparation', status: 'Pending', time: 'Pending' },
        { label: 'Closing Disclosure Draft', status: 'Pending', time: 'Pending' }
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 max-w-6xl mx-auto">
      {/* Precision Header Panel */}
      <div className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex gap-6 items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#004EA8] shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-header text-2xl text-slate-900 tracking-tight">{REAL_PROPERTY_MOCK.address}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listing: {REAL_PROPERTY_MOCK.sellerName}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Pre-Contract Onboarding</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
          <div className="text-center lg:text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Onboarding Status</p>
            <p className="text-sm font-black text-emerald-600 uppercase">100% Complete</p>
          </div>
          <div className="hidden lg:block h-10 w-[1px] bg-slate-200"></div>
          <div className="text-center lg:text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Escrow Officer</p>
            <p className="text-sm font-black text-[#004EA8]">Sarah Montgomery</p>
          </div>
          <button className="px-6 py-3 bg-[#004EA8] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Message Team
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left Column: Master Timeline Tracker */}
        <div className="xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-blue-600"></span>
              Transaction Pipeline
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase">Live Update: Active</span>
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-12">
            {phases.map((phase, pIdx) => (
              <div key={pIdx} className="relative">
                {/* Phase Label */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-lg border border-slate-200">
                     Phase 0{pIdx + 1}
                   </div>
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-tighter">{phase.title}</h4>
                   <div className="flex-1 h-[1px] bg-slate-100"></div>
                </div>

                {/* Milestones in Phase */}
                <div className="space-y-0 ml-4 border-l-2 border-slate-100">
                  {phase.milestones.map((m, mIdx) => {
                    const isComplete = m.status === 'Complete';
                    const isInProgress = m.status === 'In Progress';
                    
                    return (
                      <div key={mIdx} className={`relative pl-10 pb-10 last:pb-2 group transition-all`}>
                        {/* Tracker Node */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 transition-colors ${isComplete ? 'bg-emerald-500' : isInProgress ? 'bg-blue-500' : 'bg-slate-200'}`}>
                          {isComplete && (
                            <CheckCircle2 className="w-full h-full text-white p-0.5" />
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-5 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:border-blue-200 hover:shadow-md transition-all group-hover:-translate-y-0.5">
                          <div>
                            <p className={`text-sm font-black tracking-tight ${isComplete ? 'text-slate-900' : 'text-slate-400'}`}>
                              {m.label}
                            </p>
                            {isComplete ? (
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{m.time}</p>
                            ) : isInProgress ? (
                              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-0.5 animate-pulse">Active Process</p>
                            ) : (
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-0.5">Awaiting Phase Start</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            {isComplete ? (
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest">Verified</span>
                            ) : isInProgress ? (
                              <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">In Progress</span>
                            ) : (
                              <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">Pending</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Agent Insights */}
        <div className="xl:col-span-4 space-y-12">
          {/* Seller Readiness Card */}
          <div className="bg-[#004EA8] rounded-[48px] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <User className="w-24 h-24" />
            </div>
            <h4 className="text-[10px] font-black text-[#B9D9EB] uppercase tracking-[0.4em] mb-8">Seller Readiness</h4>
            <div className="space-y-6">
              {[
                { label: 'Identity', status: 'Verified', detail: 'Biometric Match Confirmed' },
                { label: 'Payoff Auth', status: 'Received', detail: 'Lender: LOWER, LLC' },
                { label: 'Wire Info', status: 'Locked', detail: 'Stripe Verified Account' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 p-5 rounded-3xl border border-white/10">
                   <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase text-[#B9D9EB] tracking-widest">{item.label}</span>
                      <span className="text-[10px] font-black text-emerald-400 uppercase">{item.status}</span>
                   </div>
                   <p className="text-sm font-bold text-white tracking-tight">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Protection Status */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-[40px] p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Fraud Shield Active</h4>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed font-medium">
              Seller has successfully verified their identity and bank account via Stripe. Wire instructions are locked and verified for this file.
            </p>
          </div>

          {/* Next Milestones Side-Feed */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="w-4 h-[1px] bg-slate-300"></span>
              Upcoming Milestones
            </h3>
            <div className="space-y-6 border-l border-slate-100 pl-6 ml-2">
              {[
                { event: "Title Commitment Issuance", time: "Est. 24-48 Hours" },
                { event: "Tax Certification Review", time: "Est. Tomorrow" },
                { event: "Preliminary CD Draft", time: "Post-Contract" }
              ].map((log, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-slate-200"></div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{log.event}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{log.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentTransparencyView;
