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
  const [timeframe, setTimeframe] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [showDropdown, setShowDropdown] = useState(false);

  const graphData = {
    Weekly: {
      path: "M -5,30 C 15,35 25,25 38,30 C 45,35 48,22 52,22 C 56,22 60,25 75,20 C 90,15 100,28 105,28",
      peakX: 52,
      peakY: 22,
      value: "10,23,540"
    },
    Monthly: {
      path: "M -5,30 C 15,30 25,36 38,28 C 45,22 47,9 52,9 C 57,9 59,32 75,32 C 90,32 100,28 105,28",
      peakX: 52,
      peakY: 9,
      value: "12,13,838"
    },
    Yearly: {
      path: "M -5,25 C 10,25 25,35 40,20 C 50,10 60,30 75,15 C 80,10 82,5 85,5 C 90,5 95,25 105,25",
      peakX: 85,
      peakY: 5,
      value: "14,50,000"
    }
  };
  const activeGraph = graphData[timeframe];

  const [searchQuery, setSearchQuery] = useState("");
  const allRecurringData = [
    { title: "AWS Cloud Services", icon: <Cloud className="w-5 h-5" />, color: "text-[#5e43cb]", date: "May 28", amount: "1,420.00", freq: "MONTHLY" },
    { title: "Equinox Luxury Fitness", icon: <Dumbbell className="w-5 h-5" />, color: "text-[#0061a5]", date: "June 01", amount: "285.00", freq: "MONTHLY" },
    { title: "Bloomberg Terminal", icon: <Sparkle className="w-5 h-5" />, color: "text-[#006b2e]", date: "June 15", amount: "2,000.00", freq: "ANNUAL PRO-RATA" }
  ];

  const displayedRecurring = allRecurringData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      { }
      <div className="w-full bg-[#050b14] rounded-[32px] overflow-hidden mb-8 shadow-2xl relative border border-white/5 flex flex-col pt-6 font-sans">
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-blue-500/20 blur-[60px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>

        <div className="flex justify-between items-center px-8 relative z-20 w-full mb-8">
          <span className="text-xs text-white/50 tracking-wide">Data updated 2h ago</span>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 transition-all text-xs text-white/80 cursor-pointer shadow-sm"
            >
              {timeframe} <span className="text-[9px] opacity-70">▼</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-28 bg-[#0a101f] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-30">
                {(["Weekly", "Monthly", "Yearly"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => { setTimeframe(t); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2 font-sans text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-36 relative -mx-2 z-10 pointer-events-none">
          <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <filter id="neon-glow-analytics" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={activeGraph.path}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
              filter="url(#neon-glow-analytics)"
              style={{ transition: "d 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
            <circle
              cx={activeGraph.peakX}
              cy={activeGraph.peakY}
              r="1.6"
              fill="#bfdbfe"
              stroke="#ffffff"
              strokeWidth="0.5"
              filter="url(#neon-glow-analytics)"
              style={{ transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </svg>
        </div>

        <div className="text-center relative z-10 pb-12">
          <p className="text-sm text-white/60 mb-2 font-medium tracking-wide">Total Equity Value</p>
          <div className="text-5xl md:text-6xl font-semibold text-white tracking-tight flex justify-center items-start">
            <span className="text-2xl mt-1.5 md:mt-2 mr-1 font-medium opacity-80">{currencySymbol}</span>
            {activeGraph.value}
          </div>
          <p className="text-[10px] md:text-[11px] text-white/50 mt-4 font-medium flex items-center justify-center gap-1 uppercase tracking-wider">
            Increase vs last month <span className="text-emerald-400 font-bold ml-1 text-sm leading-none">↗</span>
          </p>
        </div>
      </div>
      { }
      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" strokeWidth={2.5} />
        <input
          id="search-transactions"
          className="w-full h-14 pl-12 pr-6 bg-[#0f0e13] border border-white/[0.03] rounded-full font-sans text-sm text-white placeholder:text-white/30 focus:ring-1 focus:ring-[#7b61ff] outline-none transition-all shadow-sm"
          placeholder="Search for any transaction"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        { }
        <div className="md:col-span-12 bg-[#121217] p-6 rounded-[24px] border border-white/[0.05] text-left shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-sans font-bold text-lg text-white">Recurring Tracking</h2>
            <button
              id="btn-view-calendar"
              onClick={() => window.open("https://calendar.google.com", "_blank")}
              className="text-[#7b61ff] font-sans text-xs font-bold tracking-wider uppercase hover:underline cursor-pointer flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" /> VIEW ALL CALENDAR
            </button>
          </div>
          <div className="space-y-4">
            {displayedRecurring.length === 0 ? (
              <div className="py-8 text-center text-white/40 font-sans text-sm">
                No recurring transactions match your search.
              </div>
            ) : (
              displayedRecurring.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#16151a] border border-white/[0.02] hover:bg-[#1a191f] transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${item.color} shadow-sm`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-sans font-bold text-base text-white/90">{item.title}</div>
                      <div className="font-sans text-xs font-semibold text-white/40 mt-1">Next billing: {item.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-sans font-bold text-base text-white/90">-{currencySymbol}{item.amount}</div>
                    <div className="font-sans text-[10px] font-bold text-white/30 tracking-wider uppercase mt-1">{item.freq}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        { }
        <div className="md:col-span-12 bg-[#121217] border border-white/[0.05] p-8 rounded-[24px] flex flex-col justify-center items-center text-center gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 mb-2">
            <Zap className="w-7 h-7 fill-orange-500 text-orange-500" />
          </div>
          <div>
            <h3 className="font-sans font-bold text-lg text-white">Optimization Ready</h3>
            <p className="font-sans text-xs font-medium text-white/50 mt-2 max-w-sm mx-auto">
              We've found {currencySymbol}{activeSavingsTotal} in potential annual savings on unused recurring services.
            </p>
          </div>
          <button
            id="btn-review-savings"
            onClick={() => setShowSavingsModal(true)}
            className="mt-2 bg-white text-black px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            REVIEW SAVINGS
          </button>
        </div>
      </div>
      { }
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
