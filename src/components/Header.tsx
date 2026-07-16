import { Profile, TabType } from "../types";
import { Menu, Bell } from "lucide-react";
interface HeaderProps {
  profile: Profile;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onNotificationClick?: () => void;
}
export default function Header({ profile, activeTab, setActiveTab, onNotificationClick }: HeaderProps) {
  const isProfile = activeTab === "profile";
  return (
    <header className="w-full sticky top-0 z-40 bg-white/80 dark:bg-transparent backdrop-blur-md px-6 py-5 flex justify-between items-center">
      <div className="flex items-center min-w-[60px]">
        {isProfile ? (
          <button
            id="profile-back-btn"
            onClick={() => setActiveTab("dashboard")}
            className="w-10 h-10 flex items-center justify-start active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-background">arrow_back</span>
          </button>
        ) : null}
      </div>
      <div
        onClick={() => setActiveTab("dashboard")}
        className="flex items-center justify-center cursor-pointer active:scale-95 transition-all bg-surface-container rounded-full px-6 py-2"
      >
        <span className="font-sans font-extrabold text-[22px] text-on-background tracking-tight">Specter</span>
      </div>
      <div className="flex items-center justify-end gap-3 min-w-[60px]">
        <button
          id="header-notification-btn"
          onClick={onNotificationClick}
          className="relative w-8 h-8 flex items-center justify-center text-on-background cursor-pointer active:scale-95 transition-all"
        >
          <Bell className="w-5 h-5 text-on-background" strokeWidth={2.5} />
          <span className="absolute top-[3px] right-[5px] w-1.5 h-1.5 bg-error rounded-full"></span>
        </button>
        <div
          id="header-profile-avatar"
          onClick={() => setActiveTab("profile")}
          className={`w-9 h-9 rounded-full overflow-hidden border-2 cursor-pointer flex items-center justify-center bg-primary/10 active:scale-95 transition-all ${isProfile ? "border-primary" : "border-transparent"}`}
        >
          {profile.avatarUrl?.startsWith("http") ? (
            <img
              alt="User"
              className="w-full h-full object-cover"
              src={profile.avatarUrl}
            />
          ) : (
            <span className="text-xl leading-none">{profile.avatarUrl || "🦊"}</span>
          )}
        </div>
      </div>
    </header>
  );
}
