
import React from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Search, 
  CreditCard, 
  User, 
  Mail, 
  Phone,
  Lock,
  Download,
  ExternalLink
} from 'lucide-react';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  daysRemaining: number;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-slate-100 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Seller Onboarding Vault</span>
          </div>
          <h2 className="font-header text-3xl tracking-tight text-slate-900">
            {REAL_PROPERTY_MOCK.address}
          </h2>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-tighter mt-1">
            Pre-Contract Onboarding | File #WCT-2026-8821
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 text-right">Security Status</p>
          <div className="flex items-center gap-2 text-blue-700 font-black text-xs uppercase tracking-tighter">
            <ShieldCheck className="w-3.5 h-3.5" />
            Identity Verified
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-slate-50/30">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-tighter text-lg">Onboarding Progress</h3>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">100% Complete</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">All initial seller requirements have been satisfied.</p>
          </div>
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
            {[
              { label: 'Property Info Confirmed', status: 'Complete' },
              { label: 'Identity Verified', status: 'Complete' },
              { label: 'Seller Authorization', status: 'Complete' },
              { label: 'Payoff Data Linked', status: 'Complete' },
              { label: 'Wire Instructions Locked', status: 'Complete' },
              { label: 'IRS 1099-S Info Captured', status: 'Complete' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3">
                <span className="text-sm font-bold text-slate-700">{item.label}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Team Card */}
        <div className="bg-[#004EA8] rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full"></div>
          <div>
            <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Your Escrow Team</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-header text-xl tracking-tight">Sarah Montgomery</h4>
                <p className="text-[#B9D9EB] text-[10px] font-black uppercase tracking-widest">Senior Escrow Officer</p>
              </div>
            </div>
            <div className="space-y-3">
              <a href="mailto:sarah@worldclasstitle.com" className="flex items-center gap-3 text-xs font-bold hover:text-[#64CCC9] transition-colors">
                <Mail className="w-4 h-4" />
                sarah@worldclasstitle.com
              </a>
              <a href="tel:6145551234" className="flex items-center gap-3 text-xs font-bold hover:text-[#64CCC9] transition-colors">
                <Phone className="w-4 h-4" />
                (614) 555-1234
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10">
            <button className="w-full py-3 bg-[#64CCC9] text-[#004EA8] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform">
              Message Team
            </button>
          </div>
        </div>
      </div>

      {/* Active Processes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-slate-200"></span>
            Active Title Processes
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Title Search', icon: <Search className="w-5 h-5" />, status: 'In Progress', detail: 'Examining 40-year chain of title for any encumbrances.', color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Payoff Verification', icon: <CreditCard className="w-5 h-5" />, status: 'Requested', detail: 'Waiting for final payoff statement from LOWER, LLC.', color: 'text-amber-600', bg: 'bg-amber-50' },
              { title: 'Deed Preparation', icon: <FileText className="w-5 h-5" />, status: 'Pending Search', detail: 'Drafting General Warranty Deed for your review.', color: 'text-slate-400', bg: 'bg-slate-50' }
            ].map((proc, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-start gap-5">
                <div className={`w-12 h-12 ${proc.bg} ${proc.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  {proc.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-900 text-sm">{proc.title}</h4>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${proc.color}`}>{proc.status}</span>
                  </div>
                  <p className="text-xs text-slate-500">{proc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Vault */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-slate-200"></span>
            Your Document Vault
          </h3>
          <div className="bg-slate-50 rounded-[48px] p-10 border border-slate-200 shadow-inner">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                   <h4 className="font-black text-slate-900 uppercase tracking-tighter">Secure Storage</h4>
                   <p className="text-xs text-slate-500">Immutable copies of your onboarding documents.</p>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { name: 'Seller Authorization Form', size: '0.8 MB' },
                  { name: 'Identity Verification Receipt', size: '0.4 MB' },
                  { name: 'Payoff Request Consent', size: '0.6 MB' }
                ].map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-sm group">
                    <div>
                      <span className="text-sm font-bold text-slate-800 block">{doc.name}</span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.size} • PDF</span>
                    </div>
                    <Download className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Fraud Prevention Banner */}
      <div className="bg-red-50 border-2 border-red-100 rounded-[40px] p-8 md:p-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-red-500 shadow-sm shrink-0">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-header text-2xl text-red-900 mb-2">Wire Fraud Protection Active</h3>
            <p className="text-red-700 text-sm leading-relaxed max-w-xl">
              Your wire instructions have been securely locked. World Class Title will <span className="font-bold">NEVER</span> ask you to change your wire instructions via email. If you receive such a request, contact us immediately at (614) 555-1234.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartOneDashboard;
