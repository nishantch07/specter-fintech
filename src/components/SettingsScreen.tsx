import React from "react";
import { AppSettings, TabType } from "../types";
import {
  ShieldCheck,
  Settings,
  BellRing,
  HelpCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
  Sun,
  Moon,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (updated: Partial<AppSettings>) => void;
  onLogout: () => void;
}
export default function SettingsScreen({ settings, onUpdateSettings, onLogout }: SettingsScreenProps) {
  const handleToggleBiometrics = () => {
    onUpdateSettings({ biometricUnlock: !settings.biometricUnlock });
  };
  const handleToggle2FA = () => {
    onUpdateSettings({ twoFactorAuth: !settings.twoFactorAuth });
  };
  const handleToggleNotification = (key: keyof AppSettings["notifications"]) => {
    onUpdateSettings({
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };
  const handleThemeChange = (theme: "light" | "dark") => {
    onUpdateSettings({ theme });
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  const triggerSupportAlert = (topic: string) => {
    alert(`Specter Premium support routing active. Opening ${topic}...`);
  };
  return (
    <main className="max-w-4xl mx-auto px-6 mt-8 pb-32 text-left animate-fade-in select-none">
      <div className="mb-8">
        <h2 className="font-sans font-bold text-2xl text-on-background">Settings</h2>
        <p className="font-sans text-sm text-outline font-medium mt-1">Manage your account and preferences</p>
      </div>
      {}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {}
        <div className="md:col-span-4 bento-card p-8 flex flex-col justify-between bg-white dark:bg-surface-container-lowest">
          <div>
            <div className="flex items-center gap-3 mb-6 text-primary">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="font-sans font-bold text-lg text-on-surface">Security</h3>
            </div>
            <div className="space-y-6">
              {}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-sans text-sm font-bold text-on-surface">Biometric Unlock</p>
                  <p className="font-sans text-xs text-outline mt-0.5">FaceID or Fingerprint</p>
                </div>
                <button
                  id="toggle-biometrics-btn"
                  onClick={handleToggleBiometrics}
                  className="text-primary hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {settings.biometricUnlock ? (
                    <ToggleRight className="w-10 h-10 text-primary" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-outline" />
                  )}
                </button>
              </div>
              {}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-sans text-sm font-bold text-on-surface">2FA Status</p>
                  <p className="font-sans text-xs text-outline mt-0.5">Two-Factor Auth</p>
                </div>
                <button
                  id="toggle-2fa-btn"
                  onClick={handleToggle2FA}
                  className={`font-sans text-xs font-bold uppercase tracking-wider ${settings.twoFactorAuth ? "text-primary hover:underline" : "text-outline hover:underline"
                    } cursor-pointer`}
                >
                  {settings.twoFactorAuth ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <button
              id="settings-access-codes-btn"
              onClick={() => triggerSupportAlert("Access Codes Vault")}
              className="w-full bg-on-background hover:bg-on-background/90 text-white py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Manage Access Codes
            </button>
          </div>
        </div>
        {}
        <div className="md:col-span-4 bento-card p-8 bg-white dark:bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-6 text-primary">
            <Settings className="w-6 h-6" />
            <h3 className="font-sans font-bold text-lg text-on-surface">Preferences</h3>
          </div>
          <div className="space-y-5">
            <div
              onClick={() => alert("Currency settings is managed by regional billing. Default is ₹ INR.")}
              className="flex justify-between items-center py-2 border-b border-black/[0.03] cursor-pointer hover:border-primary/20 transition-all"
            >
              <span className="font-sans text-sm font-bold text-on-surface">Currency</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant flex items-center gap-1">
                ₹ INR <ChevronRight className="w-4 h-4 text-outline" />
              </span>
            </div>
            <div
              onClick={() => alert("Regional settings is configured to India.")}
              className="flex justify-between items-center py-2 border-b border-black/[0.03] cursor-pointer hover:border-primary/20 transition-all"
            >
              <span className="font-sans text-sm font-bold text-on-surface">Region</span>
              <span className="font-sans text-xs font-bold text-on-surface-variant flex items-center gap-1">
                India <ChevronRight className="w-4 h-4 text-outline" />
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-sans text-sm font-bold text-on-surface">Theme</span>
              <div className="flex bg-surface-container p-1 rounded-full border border-black/[0.02]">
                <button
                  id="theme-light-btn"
                  onClick={() => handleThemeChange("light")}
                  className={`p-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer transition-all ${settings.theme === "light"
                      ? "bg-white shadow-sm text-primary"
                      : "text-outline hover:text-on-background"
                    }`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  id="theme-dark-btn"
                  onClick={() => handleThemeChange("dark")}
                  className={`p-1.5 px-3 rounded-full flex items-center gap-1 cursor-pointer transition-all ${settings.theme === "dark"
                      ? "bg-white shadow-sm text-primary"
                      : "text-outline hover:text-on-background"
                    }`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="md:col-span-4 bento-card p-8 bg-white dark:bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-6 text-primary">
            <BellRing className="w-6 h-6" />
            <h3 className="font-sans font-bold text-lg text-on-surface">Notifications</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
              <input
                id="checkbox-notif-transactions"
                checked={settings.notifications.transactions}
                onChange={() => handleToggleNotification("transactions")}
                className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4 cursor-pointer"
                type="checkbox"
              />
              <div>
                <p className="font-sans text-sm font-bold text-on-surface leading-tight">Transactions</p>
                <p className="font-sans text-[11px] text-outline mt-0.5">Real-time alerts for all activity</p>
              </div>
            </label>
            <label className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
              <input
                id="checkbox-notif-alerts"
                checked={settings.notifications.securityAlerts}
                onChange={() => handleToggleNotification("securityAlerts")}
                className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4 cursor-pointer"
                type="checkbox"
              />
              <div>
                <p className="font-sans text-sm font-bold text-on-surface leading-tight">Security Alerts</p>
                <p className="font-sans text-[11px] text-outline mt-0.5">Login attempts and changes</p>
              </div>
            </label>
            <label className="flex items-center gap-3.5 p-3 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
              <input
                id="checkbox-notif-news"
                checked={settings.notifications.marketNews}
                onChange={() => handleToggleNotification("marketNews")}
                className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4 cursor-pointer"
                type="checkbox"
              />
              <div>
                <p className="font-sans text-sm font-bold text-on-surface leading-tight">Market News</p>
                <p className="font-sans text-[11px] text-outline mt-0.5">Personalized investment updates</p>
              </div>
            </label>
          </div>
        </div>
        {}
        <div className="md:col-span-4 bento-card p-8 flex flex-col justify-between h-64 bg-white dark:bg-surface-container-lowest">
          <div>
            <div className="flex items-center gap-3 mb-6 text-primary">
              <HelpCircle className="w-6 h-6" />
              <h3 className="font-sans font-bold text-lg text-on-surface">Support</h3>
            </div>
            <ul className="space-y-4">
              <li
                onClick={() => triggerSupportAlert("Privacy Policy Documentation")}
                className="flex items-center justify-between font-sans text-sm font-semibold text-on-surface cursor-pointer hover:text-primary transition-colors py-1"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="w-4 h-4 text-outline" />
              </li>
              <li
                onClick={() => triggerSupportAlert("Terms of Service Contract")}
                className="flex items-center justify-between font-sans text-sm font-semibold text-on-surface cursor-pointer hover:text-primary transition-colors py-1"
              >
                <span>Terms of Service</span>
                <ExternalLink className="w-4 h-4 text-outline" />
              </li>
            </ul>
          </div>
          <button
            id="settings-logout-btn"
            onClick={onLogout}
            className="mt-6 w-full border border-error text-error py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider hover:bg-error-container/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Log Out
          </button>
        </div>
      </div>
    </main>
  );
}
