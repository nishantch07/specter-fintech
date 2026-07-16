import { TabType } from "../types";
interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}
export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: "dashboard" as TabType, icon: "grid_view", label: "Dashboard" },
    { id: "wallet" as TabType, icon: "account_balance_wallet", label: "Wallet" },
    { id: "add" as TabType, icon: "add_circle", label: "Add", isCenter: true },
    { id: "analytics" as TabType, icon: "leaderboard", label: "Analytics" },
    { id: "settings" as TabType, icon: "settings", label: "Settings" }
  ];
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center bg-black px-6 py-2 shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-full gap-4 max-w-md w-[calc(100%-40px)] justify-around select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (tab.isCenter) {
          return (
            <button
              id={`nav-btn-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full p-2.5 transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-white text-black scale-110 shadow-lg" 
                  : "bg-transparent text-white/50 hover:text-white hover:scale-105"
              } active:scale-90`}
              title="Add Expense"
            >
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {tab.icon}
              </span>
            </button>
          );
        }
        return (
          <button
            id={`nav-btn-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-2.5 flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer ${
              isActive 
                ? "text-white scale-110" 
                : "text-white/50 hover:text-white"
            } active:scale-95`}
            title={tab.label}
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
              {tab.icon}
            </span>
            {isActive && (
              <span className="absolute -bottom-0.5 w-1 h-1 bg-white rounded-full"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
