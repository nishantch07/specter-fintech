import React, { useState } from "react";
import { Expense } from "../types";
import {
  Search,
  Terminal,
  Dumbbell,
  Laptop,
  Coffee,
  Palette,
  Building2,
  Trash2,
  FileSpreadsheet,
  Cloud,
  Sparkles,
  Database,
  Receipt
} from "lucide-react";
interface WalletScreenProps {
  expenses: Expense[];
  currencySymbol: string;
  onDeleteExpense: (id: string) => void;
}
export default function WalletScreen({ expenses, currencySymbol, onDeleteExpense }: WalletScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonthTab, setSelectedMonthTab] = useState<"August" | "July" | "June" | "May" | "All">("All");
  const initialEquity = 1245920.00;
  const netFlow = expenses.reduce((sum, exp) => {
    if (exp.type === "expense") {
      return sum - exp.amount;
    } else {
      return sum + exp.amount;
    }
  }, 0);
  const totalEquity = initialEquity + netFlow;
  const getFilteredExpenses = () => {
    return expenses.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (exp.notes && exp.notes.toLowerCase().includes(searchQuery.toLowerCase()));
      if (selectedMonthTab === "All") return matchesSearch;
      const dateObj = new Date(exp.date);
      const monthIndex = dateObj.getMonth(); 
      const isAugust = monthIndex === 7 && dateObj.getFullYear() === 2024;
      const isJuly = monthIndex === 6 && dateObj.getFullYear() === 2024;
      const isJune = monthIndex === 5 && dateObj.getFullYear() === 2024;
      const isMay = monthIndex === 4 && dateObj.getFullYear() === 2024;
      if (selectedMonthTab === "August" && isAugust) return matchesSearch;
      if (selectedMonthTab === "July" && isJuly) return matchesSearch;
      if (selectedMonthTab === "June" && isJune) return matchesSearch;
      if (selectedMonthTab === "May" && isMay) return matchesSearch;
      const isJuly2026 = monthIndex === 6 && dateObj.getFullYear() === 2026;
      if (selectedMonthTab === "August" && isJuly2026) return matchesSearch; 
      return false;
    });
  };
  const filteredExpenses = getFilteredExpenses();
  const totalSpentInFiltered = filteredExpenses
    .filter(exp => exp.type === "expense")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const cashbackInFiltered = totalSpentInFiltered * 0.0256; 
  const handleExportCSV = () => {
    const headers = "ID,Title,Category,Amount,Date,Type,Timestamp\n";
    const rows = filteredExpenses.map(e =>
      `"${e.id}","${e.title}","${e.category}",${e.amount},"${e.date}","${e.type}","${e.timestamp}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Specter_Statement_${selectedMonthTab}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const getIconAndColor = (iconName: string) => {
    switch (iconName) {
      case "terminal":
        return {
          icon: <Terminal className="w-5 h-5 text-white" />,
          bgColor: "bg-black"
        };
      case "fitness_center":
        return {
          icon: <Dumbbell className="w-5 h-5 text-white" />,
          bgColor: "bg-[#775ee6]"
        };
      case "laptop_mac":
        return {
          icon: <Laptop className="w-5 h-5 text-white" />,
          bgColor: "bg-[#1c1a23]"
        };
      case "coffee":
        return {
          icon: <Coffee className="w-5 h-5 text-white" />,
          bgColor: "bg-[#006241]"
        };
      case "palette":
        return {
          icon: <Palette className="w-5 h-5 text-red-500" />,
          bgColor: "bg-red-500/10"
        };
      case "account_balance":
        return {
          icon: <Building2 className="w-5 h-5 text-emerald-600" />,
          bgColor: "bg-emerald-500/10"
        };
      case "cloud":
        return {
          icon: <Cloud className="w-5 h-5 text-white" />,
          bgColor: "bg-[#5e43cb]"
        };
      case "workspace_premium":
        return {
          icon: <Sparkles className="w-5 h-5 text-amber-500" />,
          bgColor: "bg-amber-500/10"
        };
      default:
        return {
          icon: <Receipt className="w-5 h-5 text-slate-700" />,
          bgColor: "bg-slate-100"
        };
    }
  };
  return (
    <main className="max-w-2xl mx-auto px-6 pb-32 pt-4 animate-fade-in select-none">
      {}
      <div className="bento-card p-8 mb-6 mt-4 relative overflow-hidden bg-white dark:bg-surface-container-lowest shadow-sm text-left">
        <div className="flex flex-col gap-1 mb-8">
          <span className="font-sans text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Total Equity</span>
          <div className="font-sans text-3xl md:text-4xl font-bold text-on-surface">
            {currencySymbol}{totalEquity.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        {}
        <div className="sparkline-container mt-4 mb-2 flex items-end h-20 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
            <path
              d="M 0 35 Q 10 32, 20 38 T 40 30 T 60 15 T 80 25 T 100 20"
              fill="none"
              stroke="#5e43cb"
              strokeWidth="1.5"
            />
            {}
            <path
              d="M 0 35 Q 10 32, 20 38 T 40 30 T 60 15 T 80 25 T 100 20 L 100 40 L 0 40 Z"
              fill="rgba(94, 67, 203, 0.04)"
            />
          </svg>
        </div>
      </div>
      {}
      <div className="relative mb-6">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-outline-variant w-5 h-5" />
        <input
          id="search-transactions"
          className="w-full h-14 pl-14 pr-6 bg-white dark:bg-surface-container-lowest border-none rounded-full font-sans text-base text-on-surface placeholder:text-outline shadow-sm focus:ring-2 focus:ring-primary/25 outline-none"
          placeholder="Search for any transaction"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {}
      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 custom-scrollbar">
        {(["All", "August", "July", "June", "May"] as const).map((tab) => (
          <button
            id={`month-tab-${tab}`}
            key={tab}
            onClick={() => setSelectedMonthTab(tab)}
            className={`flex-shrink-0 px-6 py-2.5 rounded-full font-sans text-sm font-semibold shadow-sm transition-all duration-300 cursor-pointer border ${selectedMonthTab === tab
                ? "bg-primary border-primary text-white"
                : "bg-white dark:bg-surface-container-lowest border-black/[0.04] text-on-surface-variant hover:bg-surface-container-low"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bento-card p-6 flex flex-col justify-between h-32 text-left">
          <span className="font-sans text-xs font-bold text-outline uppercase tracking-wider">Total spent</span>
          <span className="font-sans text-2xl font-bold text-on-surface">
            {currencySymbol}{totalSpentInFiltered.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="bento-card p-6 flex flex-col justify-between h-32 text-left">
          <span className="font-sans text-xs font-bold text-outline uppercase tracking-wider">Cashback</span>
          <span className="font-sans text-2xl font-bold text-tertiary">
            {currencySymbol}{cashbackInFiltered.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
      {}
      <div className="bento-card p-6 flex flex-col gap-6 text-left shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-sans font-bold text-xl text-on-surface">History</h2>
          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="font-sans text-sm font-semibold text-primary hover:underline cursor-pointer flex items-center gap-1"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </button>
        </div>
        <div className="flex flex-col divide-y divide-black/[0.05]">
          {filteredExpenses.length === 0 ? (
            <div className="py-12 text-center text-outline font-sans text-base">
              No transactions match your filters.
            </div>
          ) : (
            filteredExpenses.map((exp) => {
              const style = getIconAndColor(exp.icon);
              return (
                <div
                  key={exp.id}
                  className="py-4 flex items-center justify-between group hover:bg-surface-container-low/50 transition-colors px-2 rounded-xl"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={`w-12 h-12 rounded-xl ${style.bgColor} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      {style.icon}
                    </div>
                    <div className="min-w-0 flex-1 pr-4">
                      <h3 className="font-sans font-bold text-base text-on-surface leading-none truncate">{exp.title}</h3>
                      <p className="font-sans text-xs font-medium text-outline mt-1.5 truncate">
                        {exp.category} • {exp.timestamp}
                      </p>
                      {exp.notes && (
                        <p className="font-sans text-xs italic text-on-surface-variant/70 mt-1 truncate">
                          "{exp.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`font-sans font-bold text-lg ${exp.type === "expense" ? "text-on-surface" : "text-tertiary"}`}>
                      {exp.type === "expense" ? "-" : "+"}{currencySymbol}{exp.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => onDeleteExpense(exp.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-outline hover:text-error hover:bg-error-container/20 rounded-full transition-all cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
