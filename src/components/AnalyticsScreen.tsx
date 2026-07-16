import { useState } from "react";
import { Expense } from "../types";
import {
  Zap,
  Cloud,
  Dumbbell,
  Sparkles,
  Calendar,
  Sparkle,
  X,
  CheckCircle2,
  AlertTriangle,
  Search
} from "lucide-react";
interface AnalyticsScreenProps {
  expenses: Expense[];
  currencySymbol: string;
}
export default function AnalyticsScreen({ expenses, currencySymbol }: AnalyticsScreenProps) {
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [savingsList, setSavingsList] = useState([
    { id: "sav_1", title: "Unused Figma seat subscription", savings: 140, cancelled: false },
    { id: "sav_2", title: "Duplicate GitHub Copilot trial account", savings: 280, cancelled: false }
  ]);
  const handleCancelSubscription = (id: string) => {
    setSavingsList(prev => prev.map(item => item.id === id ? { ...item, cancelled: true } : item));
  };
  const activeSavingsTotal = savingsList
    .filter(item => !item.cancelled)
    .reduce((sum, item) => sum + item.savings, 0);
  return (
    <main className="max-w-4xl mx-auto px-6 py-6 pb-32 animate-fade-in select-none">
      {}
      <div className="w-full bg-white dark:bg-surface-container-lowest rounded-[32px] pt-8 px-8 overflow-hidden mb-6 shadow-sm border border-black/[0.04]">
        <div className="text-left mb-6">
          <span className="font-sans text-xs font-bold text-outline uppercase tracking-widest">Total Equity</span>
          <div className="font-mono text-[42px] leading-none font-bold mt-2 text-on-surface tracking-tighter">
            {currencySymbol}12,13,838.01
          </div>
        </div>
        {}
        <div className="w-full h-32 relative -mr-8">
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#5e43cb" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#5e43cb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 30,30 C 40,30 45,35 50,25 C 55,10 65,-5 75,10 C 85,25 90,30 95,20 C 98,15 100,10 100,10"
              fill="none"
              stroke="#5e43cb"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 30,30 C 40,30 45,35 50,25 C 55,10 65,-5 75,10 C 85,25 90,30 95,20 C 98,15 100,10 100,10 L 100,40 L 30,40 Z"
              fill="url(#purpleGradient)"
            />
          </svg>
        </div>
      </div>
      {}
      <div className="bg-white rounded-full px-6 py-4 flex items-center gap-3 shadow-sm border border-black/[0.04] mb-8">
        <Search className="w-5 h-5 text-outline/60" strokeWidth={2.5} />
        <input
          type="text"
          placeholder="Search for any transaction"
          className="w-full bg-transparent border-none outline-none font-sans text-base text-on-surface placeholder-outline/70 font-medium"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {}
        <div className="md:col-span-12 bento-card p-6 border-t-4 border-[#005ac1] text-left shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sans font-bold text-lg text-on-surface">Recurring Tracking</h2>
            <button
              id="btn-view-calendar"
              onClick={() => alert("Calendar scheduler view is synchronized with your Google Calendar.")}
              className="text-primary font-sans text-xs font-bold tracking-wider uppercase hover:underline cursor-pointer flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" /> VIEW ALL CALENDAR
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5e43cb] shadow-sm">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans font-bold text-base text-on-surface">AWS Cloud Services</div>
                  <div className="font-sans text-xs font-semibold text-outline mt-1">Next billing: May 28</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-sans font-bold text-base text-on-surface">-{currencySymbol}1,420.00</div>
                <div className="font-sans text-[10px] font-bold text-outline tracking-wider uppercase">MONTHLY</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0061a5] shadow-sm">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans font-bold text-base text-on-surface">Equinox Luxury Fitness</div>
                  <div className="font-sans text-xs font-semibold text-outline mt-1">Next billing: June 01</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-sans font-bold text-base text-on-surface">-{currencySymbol}285.00</div>
                <div className="font-sans text-[10px] font-bold text-outline tracking-wider uppercase">MONTHLY</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#006b2e] shadow-sm">
                  <Sparkle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-sans font-bold text-base text-on-surface">Bloomberg Terminal</div>
                  <div className="font-sans text-xs font-semibold text-outline mt-1">Next billing: June 15</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-sans font-bold text-base text-on-surface">-{currencySymbol}2,000.00</div>
                <div className="font-sans text-[10px] font-bold text-outline tracking-wider uppercase font-mono">ANNUAL PRO-RATA</div>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="md:col-span-12 bento-card p-8 border-t-4 border-[#8e4e00] flex flex-col justify-center items-center text-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <Zap className="w-7 h-7 fill-orange-600 text-orange-600" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-lg text-on-surface">Optimization Ready</h3>
            <p className="font-sans text-xs font-medium text-outline mt-1 max-w-sm mx-auto">
              We've found {currencySymbol}{activeSavingsTotal} in potential annual savings on unused recurring services.
            </p>
          </div>
          <button
            id="btn-review-savings"
            onClick={() => setShowSavingsModal(true)}
            className="bg-on-background text-white px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            REVIEW SAVINGS
          </button>
        </div>
      </div>
      {}
      {showSavingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white dark:bg-surface-container-lowest rounded-[24px] max-w-md w-full p-6 text-left relative animate-slide-up shadow-2xl">
            <button
              onClick={() => setShowSavingsModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-black/[0.04] text-outline hover:text-on-background transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-sans font-bold text-xl text-on-background">Specter Optimization Advisor</h3>
            </div>
            <p className="font-sans text-sm text-outline mb-6">
              Cancel detected recurring duplicate services with one-click elite banking automation.
            </p>
            <div className="space-y-4 mb-6">
              {savingsList.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-black/[0.04] bg-surface-container-low flex items-center justify-between">
                  <div>
                    <p className={`font-sans font-bold text-sm ${item.cancelled ? "line-through text-outline" : "text-on-surface"}`}>{item.title}</p>
                    <p className="font-sans text-xs text-emerald-600 font-semibold mt-0.5">Saves {currencySymbol}{item.savings} / year</p>
                  </div>
                  {item.cancelled ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-sans text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleCancelSubscription(item.id)}
                      className="bg-[#ba1a1a] text-white px-3 py-1.5 rounded-full font-sans text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                    >
                      Cancel Now
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSavingsModal(false)}
              className="w-full bg-on-background text-white py-3.5 rounded-full font-sans text-sm font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
