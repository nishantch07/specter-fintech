export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  notes?: string;
  type: "expense" | "income";
  timestamp: string;
  icon: string;
}
export interface Profile {
  name: string;
  tier: string;
  role: string;
  memberSince: string;
  region: string;
  currencySymbol: string;
  email: string;
  avatarUrl: string;
}
export interface AppSettings {
  biometricUnlock: boolean;
  twoFactorAuth: boolean;
  currency: string;
  region: string;
  theme: "light" | "dark";
  notifications: {
    transactions: boolean;
    securityAlerts: boolean;
    marketNews: boolean;
  };
}
export type TabType = "dashboard" | "wallet" | "add" | "analytics" | "settings" | "profile";
export type LoginState = "logged_out" | "logged_in" | "register";
