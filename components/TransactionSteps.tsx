
import React, { useState, useEffect } from 'react';
import { TransactionStep, BrandConfig, ExplanatoryPreference } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';
import { 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  CreditCard, 
  Info, 
  ClipboardCheck, 
  PartyPopper,
  Home,
  ArrowRight,
  ArrowLeft,
  Lock,
  Upload,
  Banknote,
  Mail,
  Phone,
  User,
  Clock,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  preference: ExplanatoryPreference;
  setPreference: (val: ExplanatoryPreference) => void;
  onNext: () => void;
  onBack?: () => void;
  optInSmartOne?: boolean;
  setOptInSmartOne?: (val: boolean) => void;
}

const StepHeader: React.FC<{ 
  title: string; 
  subtitle: string; 
  brand: BrandConfig; 
  stepNum: number;
  preference: ExplanatoryPreference;
}> = ({ title, subtitle, brand, stepNum, preference }) => (
  <div className="mb-6 md:mb-12">
    <div className="flex items-center gap-3 mb-2 md:mb-4">
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-2.5 md:px-3 py-1 rounded-full text-white" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 8</span>
      <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seller Onboarding</span>
    </div>
    <h2 className="font-header text-xl md:text-4xl mb-1 md:mb-4 leading-tight" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    {preference !== ExplanatoryPreference.SIMPLE && (
      <p className="font-subheader text-slate-600 text-sm md:text-lg leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const TransparencyNote: React.FC<{ 
  currentProcess: string; 
  duration: string; 
  brand: BrandConfig;
  behindTheScenes: string;
  preference: ExplanatoryPreference;
}> = ({ currentProcess, duration, brand, behindTheScenes, preference }) => {
  if (preference === ExplanatoryPreference.SIMPLE) {
    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current: {duration}</span>
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-[#64CCC9] rounded-full animate-pulse"></div>
           <span className="text-[9px] font-black text-[#004EA8] uppercase tracking-widest">{currentProcess.split('.')[0]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 md:mt-10 p-5 md:p-8 bg-slate-50 rounded-[24px] md:rounded-[32px] border border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 right-0 px-4 md:px-6 py-1 md:py-2 bg-[#B9D9EB] text-[#004EA8] text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-bl-xl md:rounded-bl-2xl">
        Transparency
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3">Current Process</h4>
          <p className="text-xs md:text-sm font-bold text-slate-900 leading-relaxed">{currentProcess}</p>
        </div>
        <div>
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3">Estimated Time</h4>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#64CCC9]" />
            <p className="text-xs md:text-sm font-black text-[#004EA8]">{duration}</p>
          </div>
        </div>
      </div>
      {preference === ExplanatoryPreference.COMPLETE && (
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200">
          <h4 className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-2">Full Audit Trail</h4>
          <p className="text-[10px] md:text-xs text-slate-500 italic">{behindTheScenes}</p>
        </div>
      )}
    </div>
  );
};

const Button: React.FC<{ label: string; onClick: () => void; primary?: boolean; brand: BrandConfig; className?: string; disabled?: boolean; icon?: React.ReactNode }> = ({ label, onClick, primary, brand, className = "", disabled, icon }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 md:px-10 py-3 md:py-4 rounded-xl font-black text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    style={{
      backgroundColor: primary ? brand.primaryColor : 'transparent',
      color: primary ? 'white' : brand.primaryColor,
      border: primary ? 'none' : `2px solid ${brand.accentColor}`
    }}
  >
    {icon}
    {label}
  </button>
);

const NavActions: React.FC<{ onNext: () => void; onBack?: () => void; brand: BrandConfig; nextLabel?: string; showBack?: boolean; disabled?: boolean }> = ({ onNext, onBack, brand, nextLabel = "Continue", showBack = true, disabled }) => (
  <div className="flex flex-wrap gap-3 mt-6 pb-8 md:pb-16">
    {showBack && onBack && (
      <Button label="Back" onClick={onBack} brand={brand} icon={<ArrowLeft className="w-4 h-4" />} />
    )}
    <Button label={nextLabel} onClick={onNext} primary brand={brand} disabled={disabled} className="flex-1 md:flex-none" icon={<ArrowRight className="w-4 h-4" />} />
  </div>
);

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, preference, setPreference, onNext, onBack, 
  optInSmartOne, setOptInSmartOne
}) => {
  const [bankVerified, setBankVerified] = useState(false);
  const [isLinkingBank, setIsLinkingBank] = useState(false);
  const [payoffMethod, setPayoffMethod] = useState<'stripe' | 'manual' | null>(null);
  const [wireMethod, setWireMethod] = useState<'stripe' | 'manual' | null>(null);

  const simulateBankLink = (type: 'payoff' | 'wire') => {
    setIsLinkingBank(true);
    setTimeout(() => {
      setIsLinkingBank(false);
      if (type === 'payoff') setPayoffMethod('stripe');
      if (type === 'wire') {
        setWireMethod('stripe');
        setBankVerified(true);
      }
    }, 2000);
  };

  useEffect(() => {
    if (step === TransactionStep.SUCCESS) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.3 },
        colors: [brand.primaryColor, brand.accentColor, '#ffffff']
      });
    }
  }, [step, brand]);

  switch (step) {
    case TransactionStep.PROPERTY_CONFIRM:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={1}
            title="Confirm Property" 
            subtitle="Please verify the property details for your upcoming sale." 
            brand={brand} 
            preference={preference}
          />
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl mb-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#004EA8]">
                <Home className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Subject Property</p>
                <h3 className="font-header text-2xl text-slate-900 leading-tight">{REAL_PROPERTY_MOCK.address}</h3>
                <p className="text-slate-500 font-medium">{REAL_PROPERTY_MOCK.cityStateZip}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Parcel ID</p>
                <p className="font-black text-slate-900 text-lg">{REAL_PROPERTY_MOCK.parcelId}</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Owner of Record</p>
                <p className="font-black text-slate-900 text-lg">{REAL_PROPERTY_MOCK.sellerName}</p>
              </div>
            </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Property Verification. We are cross-referencing county records with your sale agreement."
            duration="Instant"
            behindTheScenes="Our system is pulling the latest tax records and legal description from the Delaware County Auditor."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm Property" />
        </div>
      );

    case TransactionStep.AUTHENTICATION:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={2}
            title="Identity Shield" 
            subtitle="Securely verify your identity to protect your equity and prevent wire fraud." 
            brand={brand} 
            preference={preference}
          />
          <div className="p-8 md:p-12 border-2 border-slate-100 bg-slate-50/50 rounded-[32px] md:rounded-[48px] text-center">
             <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-2xl md:rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#004EA8]">
                <ShieldCheck className="h-10 w-10 md:h-12 md:w-12" />
             </div>
             <p className="text-slate-900 font-black text-lg md:text-xl mb-2 tracking-tighter">Biometric Verification</p>
             <p className="text-[11px] md:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">Encrypted facial matching against government-issued identification.</p>
             <div className="mt-8 flex justify-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                 <Lock className="w-3 h-3 text-emerald-500" />
                 <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">AES-256 Encrypted</span>
               </div>
             </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Secure Biometric Matching. We use AI analysis to cross-reference against DMV databases."
            duration="2 - 5 Minutes"
            behindTheScenes="WCT is running an OFAC check and verifying your signatory authority against the existing deed."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Begin Verification" />
        </div>
      );

    case TransactionStep.SELLER_AUTHORIZATION:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={3}
            title="Seller Authorization" 
            subtitle="Authorize World Class Title to request payoffs and clear any existing liens on your behalf." 
            brand={brand} 
            preference={preference}
          />

          <div className="space-y-6 mb-8">
            {/* Legal & Identity Section */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
              <h4 className="font-header text-lg text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#004EA8]" />
                Legal & Identity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Social Security Number</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input type="password" placeholder="XXX-XX-XXXX" className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Marital Status</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all appearance-none">
                    <option>Unmarried</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Seller on Title?</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="add-seller" className="w-4 h-4 text-[#004EA8]" defaultChecked />
                      <span className="text-sm font-medium text-slate-700">Yes, NOT my spouse</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="add-seller" className="w-4 h-4 text-[#004EA8]" />
                      <span className="text-sm font-medium text-slate-700">Yes, my spouse</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="add-seller" className="w-4 h-4 text-[#004EA8]" />
                      <span className="text-sm font-medium text-slate-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#B9D9EB]/20 rounded-xl flex items-center justify-center text-[#004EA8] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Payoff Authorization</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">By continuing, you authorize us to contact your mortgage lender(s) to obtain final payoff figures for the closing date.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#B9D9EB]/20 rounded-xl flex items-center justify-center text-[#004EA8] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Lien Clearing Consent</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">You authorize the clearing of any discovered judgments or liens that may affect the clear transfer of title.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <input type="checkbox" id="auth-check" className="w-5 h-5 rounded border-slate-300 text-[#004EA8] focus:ring-[#004EA8]" />
                <label htmlFor="auth-check" className="text-xs font-bold text-slate-700">I authorize World Class Title to act as my settlement agent for this transaction.</label>
              </div>
            </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Authorization Capture. We are securing your digital signature for lender correspondence."
            duration="Instant"
            behindTheScenes="This authorization is required by federal privacy laws (GLBA) for us to speak with your financial institutions."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="I Authorize" />
        </div>
      );

    case TransactionStep.PAYOFFS_WIRE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={4}
            title="Payoffs & Proceeds" 
            subtitle="Connect your accounts to automate payoff requests and secure your sale proceeds." 
            brand={brand} 
            preference={preference}
          />
          
          <div className="space-y-6 mb-8">
            {/* Mortgage Payoff Section */}
            <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <h4 className="font-header text-lg text-slate-900">Mortgage Payoff</h4>
                </div>
                {payoffMethod && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>
              
              {!payoffMethod ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => simulateBankLink('payoff')}
                    className="p-6 border-2 border-slate-100 rounded-2xl hover:border-[#004EA8] hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-[#004EA8] uppercase tracking-widest">Automated</span>
                      <span className="text-[8px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">RECOMMENDED</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-1">Link with Stripe</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Securely pull payoff data directly from your lender.</p>
                  </button>
                  <button 
                    onClick={() => setPayoffMethod('manual')}
                    className="p-6 border-2 border-slate-100 rounded-2xl hover:border-[#004EA8] hover:bg-slate-50 transition-all text-left"
                  >
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Manual</span>
                    <p className="font-bold text-slate-900 text-sm mb-1">Upload Statement</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Upload a PDF of your most recent mortgage statement.</p>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    {payoffMethod === 'stripe' ? 'Lender linked via Stripe' : 'Statement uploaded successfully'}
                  </span>
                  <button onClick={() => setPayoffMethod(null)} className="text-[10px] font-black text-emerald-700 uppercase tracking-widest underline">Change</button>
                </div>
              )}
            </div>

            {/* Wire Instructions Section */}
            <div className="p-8 bg-white rounded-[32px] border border-slate-100 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h4 className="font-header text-lg text-slate-900">Wire Instructions</h4>
                </div>
                {wireMethod && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              {!wireMethod ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => simulateBankLink('wire')}
                    className="p-6 border-2 border-slate-100 rounded-2xl hover:border-[#004EA8] hover:bg-slate-50 transition-all text-left group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-[#004EA8] uppercase tracking-widest">Automated</span>
                      <span className="text-[8px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">SECURE</span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm mb-1">Link Bank Account</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Verify your account via Stripe to prevent wire fraud.</p>
                  </button>
                  <button 
                    onClick={() => setWireMethod('manual')}
                    className="p-6 border-2 border-slate-100 rounded-2xl hover:border-[#004EA8] hover:bg-slate-50 transition-all text-left"
                  >
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Manual</span>
                    <p className="font-bold text-slate-900 text-sm mb-1">Upload Bank Doc</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Upload a voided check or bank statement.</p>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    {wireMethod === 'stripe' ? 'Bank verified via Stripe' : 'Bank document uploaded'}
                  </span>
                  <button onClick={() => setWireMethod(null)} className="text-[10px] font-black text-emerald-700 uppercase tracking-widest underline">Change</button>
                </div>
              )}
            </div>
          </div>

          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Financial Data Integration. We are establishing secure channels for debt satisfaction and proceeds delivery."
            duration="5 - 10 Minutes"
            behindTheScenes="Using Stripe Financial Connections ensures we have the correct routing and account numbers, virtually eliminating wire errors."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Continue" disabled={!payoffMethod || !wireMethod} />
        </div>
      );

    case TransactionStep.REMAINING_INFO:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={5}
            title="Final Details" 
            subtitle="Just a few more pieces of information needed to complete your file." 
            brand={brand} 
            preference={preference}
          />
          
          <div className="space-y-6 mb-8">
            {/* Utilities & HOA Section */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
              <h4 className="font-header text-lg text-slate-900 mb-6 flex items-center gap-2">
                <Home className="w-5 h-5 text-[#004EA8]" />
                Utilities & HOA
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Water/Sewer Provider</label>
                  <input type="text" placeholder="e.g. Mount Vernon Water" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">HOA Name (if applicable)</label>
                  <input type="text" placeholder="e.g. AVHOA" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">HOA Dues Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input type="number" placeholder="276" className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">HOA Frequency</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all appearance-none">
                    <option>Annually</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Prior Policy & Reissue Discount Section */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-header text-lg text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#004EA8]" />
                  Prior Policy & Reissue Discount
                </h4>
                <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded uppercase tracking-widest border border-emerald-200">Discount Applied</span>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 mb-1">We've located your prior title policy!</p>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      Providing a prior title insurance policy allows us to offer you a <strong>Reissue Rate</strong> discount on your new policy. Since we already have this on file, your discount has been automatically applied to your closing statement.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-3.5 h-3.5" />
                        Download Prior Deed
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-700 uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                        <FileText className="w-3.5 h-3.5" />
                        View Prior Policy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics & Communication Section */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl">
              <h4 className="font-header text-lg text-slate-900 mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#004EA8]" />
                Logistics & Communication
              </h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Forwarding Address</label>
                  <input type="text" placeholder="123 New Home St, City, ST 12345" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#004EA8] focus:border-transparent outline-none transition-all" />
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
                  <input type="checkbox" id="sms-opt" className="mt-1 w-5 h-5 rounded border-slate-300 text-[#004EA8] focus:ring-[#004EA8]" defaultChecked />
                  <div className="space-y-1">
                    <label htmlFor="sms-opt" className="text-xs font-bold text-slate-700">Opt-in for SMS transaction updates</label>
                    <p className="text-[10px] text-slate-400 leading-relaxed">Standard rates apply. To opt-out, reply with "STOP" at any time. Questions? Contact us at info@worldclasstitle.com.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Data Enrichment. Finalizing the details for your 1099-S, utility prorations, and HOA verification."
            duration="3 - 5 Minutes"
            behindTheScenes="Your SSN is encrypted immediately and only used for mandatory government reporting. Utility info helps us ensure accurate settlement prorations."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Review & Confirm" />
        </div>
      );

    case TransactionStep.FUTURE_ROADMAP:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={6}
            title="Your Transaction Roadmap" 
            subtitle="Since your property isn't in contract yet, these steps are currently locked. Here's what to expect once we move forward." 
            brand={brand} 
            preference={preference}
          />
          
          <div className="space-y-4 mb-8">
            {[
              { 
                title: "Title Search & Examination", 
                desc: "Our Smart AI Search has already completed an initial scan of the property history and is being reviewed by our examiners. A full, comprehensive search will be finalized immediately after contract execution.",
                expectation: "Smart AI Search active; Full search pending contract."
              },
              { 
                title: "Closing Disclosure Review", 
                desc: "You'll receive a detailed breakdown of all costs and credits for your final approval.",
                expectation: "Usually 3-5 days before your closing date."
              },
              { 
                title: "Signing Appointment", 
                desc: "We'll coordinate a convenient time for you to sign the final documents, either in-person or via mobile notary.",
                expectation: "Scheduled once the buyer's lender gives the 'Clear to Close'."
              },
              { 
                title: "Funding & Disbursement", 
                desc: "The final step where funds are transferred and you officially close on your sale.",
                expectation: "Occurs on the day of closing once all documents are recorded."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl opacity-60 grayscale relative overflow-hidden group">
                <div className="absolute top-4 right-4">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 shrink-0 shadow-sm">
                    <span className="text-xs font-black">{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-2">{item.desc}</p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-200/50 rounded text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      Expectation: {item.expectation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#004EA8] shrink-0 shadow-sm">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#004EA8] text-sm mb-1">Proactive Updates</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  You don't need to do anything for these steps right now. We'll automatically notify you via SMS and email the moment any of these milestones become active.
                </p>
              </div>
            </div>
          </div>

          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Milestone Planning. Mapping out the post-contract journey for your specific property."
            duration="Informational"
            behindTheScenes="These steps are standardized based on Ohio real estate law and WCT's best-in-class processing standards."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Got it, Continue" />
        </div>
      );

    case TransactionStep.REVIEW_CONFIRM:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
          <StepHeader 
            stepNum={7}
            title="Review & Confirm" 
            subtitle="Please review your information before we finalize your onboarding." 
            brand={brand} 
            preference={preference}
          />
          <div className="space-y-4 mb-8">
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900">Property & Identity</h4>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Address</p>
                  <p className="font-bold text-slate-700">{REAL_PROPERTY_MOCK.address}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Identity</p>
                  <p className="font-bold text-slate-700">Verified (Biometric)</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900">Financials</h4>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Payoff Method</p>
                  <p className="font-bold text-slate-700">{payoffMethod === 'stripe' ? 'Stripe (Automated)' : 'Manual Upload'}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Wire Instructions</p>
                  <p className="font-bold text-slate-700">{wireMethod === 'stripe' ? 'Stripe (Verified)' : 'Manual Upload'}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-900">Closing Preference</h4>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Method</p>
                  <p className="font-bold text-slate-700">Mobile Notary</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-black text-[9px] tracking-widest">Status</p>
                  <p className="font-bold text-slate-700">Pending Schedule</p>
                </div>
              </div>
            </div>
          </div>
          <TransparencyNote 
            brand={brand}
            preference={preference}
            currentProcess="Final Review. Correlating all inputs for file submission."
            duration="Instant"
            behindTheScenes="Once you confirm, your file is sent to our escrow team for immediate processing."
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Finalize Onboarding" />
        </div>
      );

    case TransactionStep.SUCCESS:
      return (
        <div className="animate-in zoom-in-95 duration-1000 pb-10 text-center">
           <div className="inline-block p-8 md:p-12 rounded-[48px] md:rounded-[64px] bg-[#64CCC9]/10 text-[#64CCC9] mb-6 md:mb-10 shadow-inner border border-[#64CCC9]/20">
              <PartyPopper className="h-20 w-20 md:h-28 md:w-28" />
            </div>
            <h2 className="font-header text-4xl md:text-7xl mb-4 md:mb-6 text-[#004EA8]">You're All Set!</h2>
            <p className="text-slate-600 text-lg md:text-2xl max-w-xl mx-auto mb-10 md:mb-20 leading-relaxed font-subheader px-4">
               Your onboarding is complete. We've notified your agent and our escrow team.
            </p>

            <div className="bg-white border-2 md:border-4 border-[#B9D9EB] rounded-[32px] md:rounded-[72px] p-8 md:p-16 shadow-xl text-left relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-[#64CCC9] text-[#004EA8] px-6 md:px-12 py-2 md:py-4 text-[9px] md:text-xs font-black uppercase tracking-widest">NEXT STEPS</div>
               <div className="relative z-10">
                  <h3 className="font-header text-2xl md:text-4xl mb-6 md:mb-8 text-[#004EA8]">WHAT HAPPENS NOW?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#004EA8] mb-4 shadow-sm">
                        <ClipboardCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Title Search</h4>
                      <p className="text-xs text-slate-500">We are performing a 40-year search to ensure clear title.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#004EA8] mb-4 shadow-sm">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Payoff Request</h4>
                      <p className="text-xs text-slate-500">We've initiated the request to your lender for final figures.</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#004EA8] mb-4 shadow-sm">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Fraud Protection</h4>
                      <p className="text-xs text-slate-500">Your wire instructions are locked. We will never ask for changes via email.</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-10">
                    <h4 className="font-header text-xl text-slate-900 mb-6">Your Closing Team</h4>
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Sarah Montgomery</p>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Escrow Officer</p>
                          <div className="flex gap-3 mt-1">
                            <a href="mailto:sarah@worldclasstitle.com" className="text-[#004EA8] hover:underline"><Mail className="w-3.5 h-3.5" /></a>
                            <a href="tel:6145551234" className="text-[#004EA8] hover:underline"><Phone className="w-3.5 h-3.5" /></a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Enter Smart Spaces" />
               </div>
            </div>
        </div>
      );

    default:
      return null;
  }
};
