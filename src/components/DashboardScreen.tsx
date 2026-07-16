import { Expense, TabType } from "../types";
import {
  Utensils,
  Train,
  ShoppingCart,
  Clapperboard,
  TrendingUp,
  QrCode,
  Plus,
  FileDown,
  Settings2,
  Cloud,
  Terminal,
  Database,
  ArrowRight,
  Coffee,
  Palette,
  Dumbbell,
  Receipt,
  Sparkles
} from "lucide-react";
interface DashboardScreenProps {
  expenses: Expense[];
  setActiveTab: (tab: TabType) => void;
  currencySymbol: string;
}
export default function DashboardScreen({ expenses, setActiveTab, currencySymbol }: DashboardScreenProps) {
  const getCategoryTotal = (category: string) => {
    return expenses
      .filter(exp => exp.category === category && exp.type === "expense")
      .reduce((sum, exp) => sum + exp.amount, 0);
  };
  const foodTotal = getCategoryTotal("Food & Dining");
  const travelTotal = getCategoryTotal("Travel & Transit");
  const techTotal = getCategoryTotal("Shopping & Tech");
  const entTotal = getCategoryTotal("Entertainment");
  const totalOutflow = expenses
    .filter(exp => exp.type === "expense")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const getIconComponent = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "terminal":
        return <Terminal className={className} />;
      case "fitness_center":
        return <Dumbbell className={className} />;
      case "laptop_mac":
        return <ShoppingCart className={className} />;
      case "coffee":
        return <Coffee className={className} />;
      case "palette":
        return <Palette className={className} />;
      case "cloud":
        return <Cloud className={className} />;
      case "workspace_premium":
        return <Sparkles className={className} />;
      case "storage":
        return <Database className={className} />;
      default:
        return <Receipt className={className} />;
    }
  };
  const handleExportPDF = () => {
    alert("Simulated PDF Statement generation completed. Downloading file: Specter_May_2026_Statement.pdf");
  };
  return (
    <main className="max-w-4xl mx-auto px-6 py-6 pb-32 animate-fade-in select-none">
      {}
      <section className="mb-6">
        <div className="bg-white dark:bg-transparent rounded-[24px] p-8 border border-black/[0.04] dark:border-primary shadow-sm backdrop-blur-sm">
          <p className="font-sans text-xs font-bold tracking-widest text-outline uppercase mb-2">Total Aggregated Outflow</p>
          <h1 className="font-mono text-5xl md:text-6xl leading-none font-bold text-on-background tracking-tighter">
            {currencySymbol}{totalOutflow.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="mt-6 flex items-center gap-2 text-error font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span className="font-sans text-sm">12.4% vs last month</span>
          </div>
        </div>
      </section>
      {}
      <section className="mb-6 flex gap-3 overflow-x-auto hide-scrollbar py-1">
        <button
          id="action-scan"
          onClick={() => setActiveTab("add")}
          className="bg-surface-container-highest px-6 py-3.5 rounded-full flex items-center gap-2 font-sans text-xs font-bold uppercase text-on-background hover:bg-outline-variant/30 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-sm"
        >
          <QrCode className="w-4 h-4 text-primary" /> Scan
        </button>
        <button
          id="action-add"
          onClick={() => setActiveTab("add")}
          className="bg-surface-container-highest px-6 py-3.5 rounded-full flex items-center gap-2 font-sans text-xs font-bold uppercase text-on-background hover:bg-outline-variant/30 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4 text-primary" /> Add
        </button>
        <button
          id="action-pdf"
          onClick={handleExportPDF}
          className="bg-surface-container-highest px-6 py-3.5 rounded-full flex items-center gap-2 font-sans text-xs font-bold uppercase text-on-background hover:bg-outline-variant/30 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-sm"
        >
          <FileDown className="w-4 h-4 text-primary" /> Export PDF
        </button>
        <button
          id="action-manage"
          onClick={() => setActiveTab("settings")}
          className="bg-surface-container-highest px-6 py-3.5 rounded-full flex items-center gap-2 font-sans text-xs font-bold uppercase text-on-background hover:bg-outline-variant/30 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-sm"
        >
          <Settings2 className="w-4 h-4 text-primary" /> Preferences
        </button>
      </section>
      {}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {}
        <div
          onClick={() => setActiveTab("analytics")}
          className="bento-card bg-bento-purple rounded-[24px] p-6 shadow-[0px_10px_25px_rgba(168,85,247,0.15)] flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 rounded-t-[24px]"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm">
              <Utensils className="w-5 h-5 text-bento-purple" />
            </div>
          </div>
          <div className="relative z-10 text-left">
            <p className="font-sans text-xs font-semibold text-white/80">Food & Dining</p>
            <p className="font-mono text-xl font-bold text-white mt-1">
              {currencySymbol}{foodTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        {}
        <div
          onClick={() => setActiveTab("analytics")}
          className="bento-card bg-bento-blue rounded-[24px] p-6 shadow-[0px_10px_25px_rgba(59,130,246,0.15)] flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 rounded-t-[24px]"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm">
              <Train className="w-5 h-5 text-bento-blue" />
            </div>
          </div>
          <div className="relative z-10 text-left">
            <p className="font-sans text-xs font-semibold text-white/80">Travel & Transit</p>
            <p className="font-mono text-xl font-bold text-white mt-1">
              {currencySymbol}{travelTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        {}
        <div
          onClick={() => setActiveTab("analytics")}
          className="bento-card bg-bento-green rounded-[24px] p-6 shadow-[0px_10px_25px_rgba(16,185,129,0.15)] flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 rounded-t-[24px]"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm">
              <ShoppingCart className="w-5 h-5 text-bento-green" />
            </div>
          </div>
          <div className="relative z-10 text-left">
            <p className="font-sans text-xs font-semibold text-white/80">Shopping & Tech</p>
            <p className="font-mono text-xl font-bold text-white mt-1">
              {currencySymbol}{techTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        {}
        <div
          onClick={() => setActiveTab("analytics")}
          className="bento-card bg-bento-orange rounded-[24px] p-6 shadow-[0px_10px_25px_rgba(249,115,22,0.15)] flex flex-col justify-between h-44 relative overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 left-0 right-0 h-10 bg-white/10 rounded-t-[24px]"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-8 shadow-sm">
              <Clapperboard className="w-5 h-5 text-bento-orange" />
            </div>
          </div>
          <div className="relative z-10 text-left">
            <p className="font-sans text-xs font-semibold text-white/80">Entertainment</p>
            <p className="font-mono text-xl font-bold text-white mt-1">
              {currencySymbol}{entTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </section>
      {}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-sans font-bold text-xl text-on-background">Latest transactions</h2>
          <button
            id="btn-view-all"
            onClick={() => setActiveTab("wallet")}
            className="text-primary font-sans text-xs font-bold tracking-widest uppercase hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {expenses.slice(0, 5).map((exp) => (
            <div
              key={exp.id}
              className="min-w-[280px] bg-white dark:bg-surface-container-lowest rounded-[24px] p-6 shadow-sm border border-black/[0.04] flex flex-col gap-4 text-left transition-all hover:translate-y-[-2px] hover:shadow-md cursor-pointer"
              onClick={() => setActiveTab("wallet")}
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-primary">
                  {getIconComponent(exp.icon)}
                </div>
                <span className={`font-mono font-bold text-lg ${exp.type === "expense" ? "text-error" : "text-tertiary"}`}>
                  {exp.type === "expense" ? "-" : "+"}{currencySymbol}{exp.amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <p className="font-sans font-bold text-base text-on-background leading-tight truncate">{exp.title}</p>
                <p className="font-sans text-xs text-on-surface-variant font-medium mt-1">
                  {exp.category} • {exp.timestamp.split(" • ")[1] || exp.timestamp.split(", ")[1] || "Just now"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
