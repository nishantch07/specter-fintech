import React, { useState, useRef } from "react";
import { Camera, ChevronDown, Zap, Loader2, Sparkles, Check } from "lucide-react";
interface AddExpenseProps {
  onAddExpense: (expense: {
    title: string;
    category: string;
    amount: number;
    date: string;
    notes: string;
    icon?: string;
  }) => void;
  currencySymbol: string;
}
export default function AddExpenseScreen({ onAddExpense, currencySymbol }: AddExpenseProps) {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [isAutoCategorizing, setIsAutoCategorizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await scanReceipt(file);
  };
  const scanReceipt = async (file: File) => {
    setIsScanning(true);
    setScanSuccess(false);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(",")[1];
        const mimeType = file.type;
        const res = await fetch("/api/expenses/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Data, mimeType })
        });
        if (!res.ok) {
          throw new Error("Failed to scan receipt image using AI model.");
        }
        const data = await res.json();
        console.log("Scanned result:", data);
        if (data.amount) setAmount(data.amount.toString());
        if (data.title) setTitle(data.title);
        if (data.category) setCategory(data.category);
        if (data.date) setDate(data.date);
        if (data.notes) setNotes(data.notes);
        setScanSuccess(true);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      alert("AI Scan failed: " + (err.message || "Please configure your GEMINI_API_KEY in the Secrets panel."));
    } finally {
      setIsScanning(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleAutoCategorize = () => {
    if (!title.trim()) {
      alert("Please enter a Merchant / Title first so Specter AI can categorize it.");
      return;
    }
    setIsAutoCategorizing(true);
    setTimeout(() => {
      const lowerTitle = title.toLowerCase();
      let matchedCategory = "Others";
      if (lowerTitle.includes("starbucks") || lowerTitle.includes("mcdonald") || lowerTitle.includes("burger") || lowerTitle.includes("food") || lowerTitle.includes("coffee") || lowerTitle.includes("restaurant") || lowerTitle.includes("swiggy") || lowerTitle.includes("zomato") || lowerTitle.includes("kfc")) {
        matchedCategory = "Food & Dining";
      } else if (lowerTitle.includes("uber") || lowerTitle.includes("ola") || lowerTitle.includes("flight") || lowerTitle.includes("train") || lowerTitle.includes("transit") || lowerTitle.includes("irctc") || lowerTitle.includes("taxi") || lowerTitle.includes("bus")) {
        matchedCategory = "Travel & Transit";
      } else if (lowerTitle.includes("amazon") || lowerTitle.includes("flipkart") || lowerTitle.includes("apple") || lowerTitle.includes("myntra") || lowerTitle.includes("shopping") || lowerTitle.includes("tech") || lowerTitle.includes("store") || lowerTitle.includes("mall")) {
        matchedCategory = "Shopping & Tech";
      } else if (lowerTitle.includes("netflix") || lowerTitle.includes("spotify") || lowerTitle.includes("movie") || lowerTitle.includes("cinema") || lowerTitle.includes("prime") || lowerTitle.includes("entertainment") || lowerTitle.includes("steam")) {
        matchedCategory = "Entertainment";
      } else if (lowerTitle.includes("electric") || lowerTitle.includes("water") || lowerTitle.includes("internet") || lowerTitle.includes("wifi") || lowerTitle.includes("jio") || lowerTitle.includes("airtel") || lowerTitle.includes("bill") || lowerTitle.includes("utility")) {
        matchedCategory = "Utilities";
      }
      setCategory(matchedCategory);
      setIsAutoCategorizing(false);
    }, 1200);
  };
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await scanReceipt(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    const finalTitle = title.trim() || `${category} - Automated`;
    setIsSaving(true);
    let icon = "receipt_long";
    if (category === "Food & Dining") icon = "coffee";
    else if (category === "Travel & Transit") icon = "cloud";
    else if (category === "Shopping & Tech") icon = "terminal";
    else if (category === "Entertainment") icon = "fitness_center";
    setTimeout(() => {
      onAddExpense({
        title: finalTitle,
        category,
        amount: Number(amount),
        date,
        notes,
        icon
      });
      setAmount("");
      setTitle("");
      setCategory("Food & Dining");
      setDate(new Date().toISOString().split("T")[0]);
      setNotes("");
      setScanSuccess(false);
      setIsSaving(false);
      alert("Expense logged successfully inside the precision database.");
    }, 800);
  };
  return (
    <main className="max-w-2xl mx-auto px-6 pt-2 pb-32 animate-fade-in select-none">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
        {}
        <div className="bento-card p-8 flex flex-col items-center justify-center text-center">
          <span className="font-sans text-xs font-bold text-outline tracking-wider mb-2">ENTER AMOUNT</span>
          <div className="flex items-center justify-center">
            <span className="font-sans text-3xl font-bold text-primary mr-2">{currencySymbol}</span>
            <input
              id="amount-input"
              autoFocus
              className="input-minimal font-sans text-3xl font-bold text-on-surface w-full max-w-[200px] text-left outline-none"
              placeholder="0.00"
              step="0.01"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        {}
        <div className="bento-card p-1">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="relative group cursor-pointer block w-full h-48 rounded-[22px] custom-dashed hover:bg-surface-container-low transition-colors active:scale-[0.99] transition-all"
          >
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              {isScanning ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-12 h-12 text-primary animate-spin" />
                  <p className="font-sans text-base font-bold text-on-surface">Analyzing receipt via Specter AI...</p>
                  <p className="font-sans text-xs text-outline">Extracting amounts, dates, and vendors</p>
                </div>
              ) : scanSuccess ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 animate-fade-in">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-sans text-base font-bold text-on-surface">Specter AI Scanned!</p>
                    <p className="font-sans text-xs text-emerald-600 font-medium">Fields populated with luxury precision</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center group-hover:scale-110 transition-transform text-primary">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-sans text-base font-bold text-on-surface">Upload Image/Bill</p>
                    <p className="font-sans text-xs text-outline">Drag receipt here or click to browse (JPG, PNG)</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {}
        <div className="bento-card p-6 flex flex-col gap-3">
          <label className="font-sans text-xs font-bold text-outline">MERCHANT / TITLE</label>
          <input
            id="merchant-input"
            className="w-full bg-surface-container border-none rounded-xl py-3.5 px-4 font-sans text-base text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/25"
            placeholder="e.g. Starbucks, Amazon, Apple Store"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {}
          <div className="bento-card p-6 flex flex-col gap-3">
            <label className="font-sans text-xs font-bold text-outline">CATEGORY</label>
            <div className="relative">
              <select
                id="category-select"
                className="w-full bg-surface-container border-none rounded-xl py-3.5 px-4 font-sans text-base text-on-surface appearance-none focus:ring-2 focus:ring-primary/25 outline-none cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Travel & Transit">Travel & Transit</option>
                <option value="Shopping & Tech">Shopping & Tech</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Others">Others</option>
              </select>
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
            </div>
          </div>
          {}
          <div className="bento-card p-6 flex flex-col gap-3">
            <label className="font-sans text-xs font-bold text-outline">DATE</label>
            <input
              id="date-input"
              className="w-full bg-surface-container border-none rounded-xl py-3 px-4 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary/25 outline-none"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        {}
        <div className="bento-card p-6 flex flex-col gap-3">
          <label className="font-sans text-xs font-bold text-outline">NOTES</label>
          <textarea
            id="notes-input"
            className="w-full bg-surface-container border-none rounded-xl py-3.5 px-4 font-sans text-base text-on-surface focus:ring-2 focus:ring-primary/25 outline-none resize-none"
            placeholder="What was this expense for?"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        {}
        <div
          onClick={handleAutoCategorize}
          className="bento-card overflow-hidden h-32 relative shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group"
        >
          <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
            <img
              className="w-full h-full object-cover"
              alt="High-end leather texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1_B9pYEIQnMQUyFBVxsmD2T2u8zVbrHv4WFdbOEhP6weK2cgUSvA-G2nhVaXZWuDW19nJj2nQ9wTimVVNQbw4g-auAPpclkCprjPQeMH-9WsmnblTiPr1wrV6Y0A24OEx1RvMNsFh_kXVjOiKvsKCQk23NL4SeAQEhkZTczAvppwPV0l702Z_BvZYnWCqZ0Dy_Z72n6TsmAbmDlujUqJBS3mJSM6mlJPmkrjPG6m7O8r9wANE2DJw6JO3izK4SXHKJkJpFoqJ7lRK"
            />
          </div>
          <div className="relative z-10 p-6 flex items-center justify-between h-full">
            <div className="text-left">
              <p className="font-sans font-bold text-lg text-on-surface flex items-center gap-1.5 drop-shadow-md">
                Auto-Categorize Title <Sparkles className="w-4 h-4 text-primary" />
              </p>
              <p className="font-sans text-xs text-outline font-semibold mt-1">Powered by Specter AI Intelligence</p>
            </div>
            <span className="p-3 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              {isAutoCategorizing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Zap className="w-6 h-6 fill-current" />
              )}
            </span>
          </div>
        </div>
        {}
        <div className="mt-2">
          <button
            id="expense-save-btn"
            className="w-full bg-[#8E76FF] text-white py-5 rounded-2xl font-sans text-base font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] hover:bg-[#775ee6] active:shadow-sm transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Save Expense"
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
