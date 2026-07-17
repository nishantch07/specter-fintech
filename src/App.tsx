import { useState, useEffect } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import LoginScreen from "./components/LoginScreen";
import DashboardScreen from "./components/DashboardScreen";
import WalletScreen from "./components/WalletScreen";
import AddExpenseScreen from "./components/AddExpenseScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import ProfileScreen from "./components/ProfileScreen";
import SettingsScreen from "./components/SettingsScreen";
import RegisterScreen from "./components/RegisterScreen";
import { Expense, Profile, AppSettings, TabType, LoginState } from "./types";
export default function App() {
  const [loginState, setLoginState] = useState<LoginState>("logged_out");
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [profile, setProfile] = useState<Profile>({
    name: "Alexander Specter",
    tier: "Founding Member • Premium Tier",
    role: "Strategic Philanthropist & Portfolio Architect",
    memberSince: "January 2021",
    region: "India (₹)",
    currencySymbol: "₹",
    email: "alexander@gmail.com",
    avatarUrl: "🦊"
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    biometricUnlock: true,
    twoFactorAuth: true,
    currency: "INR",
    region: "India",
    theme: "dark",
    notifications: {
      transactions: true,
      securityAlerts: true,
      marketNews: false
    }
  });
  useEffect(() => {
    fetchProfile();
    fetchExpenses();
    fetchSettings();
  }, []);
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };
  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses");
      if (res.ok) {
        const data = await res.json();
        setExpenses(data);
      }
    } catch (err) {
      console.error("Failed to load expenses", err);
    }
  };
  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const settingsData = await res.json();
        setSettings(settingsData);
        if (settingsData.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    } catch (err) {
      console.error("Failed to load settings", err);
    }
  };
  const handleLoginSuccess = (email: string) => {
    localStorage.setItem("specter_email", email);
    const storedName = localStorage.getItem("specter_name");
    if (storedName) {
      setProfile(prev => ({ ...prev, email, name: storedName }));
      handleUpdateProfile({ email, name: storedName });
    } else {
      setProfile(prev => ({ ...prev, email }));
    }
    setLoginState("logged_in");
    setActiveTab("dashboard");
  };
  const handleLogout = () => {
    localStorage.removeItem("specter_email");
    setLoginState("logged_out");
  };
  const handleUpdateProfile = async (updatedFields: Partial<Profile>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) {
        const updatedProfile = await res.json();
        setProfile(updatedProfile);
      }
    } catch (err) {
      console.error("Failed to save profile on backend", err);
    }
  };
  const handleUpdateSettings = async (updatedFields: Partial<AppSettings>) => {
    const newSettings = { ...settings, ...updatedFields };
    setSettings(newSettings);
    if (newSettings.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings)
      });
    } catch (err) {
      console.error("Failed to save settings on backend", err);
    }
  };
  const handleAddExpense = async (newExpense: {
    title: string;
    category: string;
    amount: number;
    date: string;
    notes: string;
    icon?: string;
  }) => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense)
      });
      if (res.ok) {
        const added = await res.json();
        setExpenses(prev => [added, ...prev]);
        setActiveTab("dashboard");
      }
    } catch (err) {
      console.error("Failed to add expense on backend", err);
    }
  };
  const handleDeleteExpense = async (id: string) => {
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete expense on backend", err);
    }
  };
  if (loginState === "logged_out") {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToRegister={() => setLoginState("register")} />;
  }
  if (loginState === "register") {
    return <RegisterScreen onRegisterSuccess={handleLoginSuccess} onBackToLogin={() => setLoginState("logged_out")} />;
  }
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardScreen
            expenses={expenses}
            setActiveTab={setActiveTab}
            currencySymbol={profile.currencySymbol}
          />
        );
      case "wallet":
        return (
          <WalletScreen
            expenses={expenses}
            currencySymbol={profile.currencySymbol}
            onDeleteExpense={handleDeleteExpense}
          />
        );
      case "add":
        return (
          <AddExpenseScreen
            onAddExpense={handleAddExpense}
            currencySymbol={profile.currencySymbol}
          />
        );
      case "analytics":
        return (
          <AnalyticsScreen
            expenses={expenses}
            currencySymbol={profile.currencySymbol}
          />
        );
      case "settings":
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onLogout={handleLogout}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            currencySymbol={profile.currencySymbol}
          />
        );
      default:
        return <div className="p-8 text-center text-outline">Screen under development</div>;
    }
  };
  return (
    <div className={`min-h-screen bg-canvas-bg font-sans flex flex-col ${settings.theme === "dark" ? "dark" : ""}`}>
      <Header
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNotificationClick={() => window.location.reload()}
      />
      { }
      <div className="flex-1 w-full relative">
        {renderTabContent()}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
