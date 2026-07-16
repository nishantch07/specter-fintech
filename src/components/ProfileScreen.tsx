import React, { useState } from "react";
import { Profile } from "../types";
import { User, Mail, Globe, Calendar, Check, X, Loader2, Sparkles } from "lucide-react";
interface ProfileScreenProps {
  profile: Profile;
  onUpdateProfile: (updated: Partial<Profile>) => Promise<void>;
  currencySymbol: string;
}
export default function ProfileScreen({ profile, onUpdateProfile, currencySymbol }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [email, setEmail] = useState(profile.email);
  const [region, setRegion] = useState(profile.region);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    setIsSaving(true);
    try {
      await onUpdateProfile({
        name,
        role,
        email,
        region
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile details on the server");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <main className="max-w-3xl mx-auto px-6 mt-8 flex flex-col items-center pb-32 animate-fade-in select-none">
      {}
      <section className="w-full bento-card rounded-2xl p-8 md:p-12 flex flex-col items-center gap-8 text-center relative overflow-hidden shadow-sm">
        {}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#e6deff]/40 to-transparent"></div>
        {}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-md z-10 shrink-0 bg-primary/10 flex items-center justify-center">
          {profile.avatarUrl?.startsWith("http") ? (
            <img
              alt={profile.name}
              className="w-full h-full object-cover"
              src={profile.avatarUrl}
            />
          ) : (
            <span className="text-7xl md:text-[5.5rem] leading-none mb-2">{profile.avatarUrl || "🦊"}</span>
          )}
        </div>
        {}
        {!isEditing ? (
          <div className="z-10 w-full space-y-8 animate-fade-in">
            <div>
              <h1 className="font-sans font-bold text-2xl md:text-3xl text-on-surface mb-2">{profile.name}</h1>
              <div className="flex flex-col items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" /> {profile.tier}
                </span>
                <p className="font-sans text-sm md:text-base text-on-surface-variant font-medium max-w-md">
                  {profile.role}
                </p>
              </div>
            </div>
            {}
            <div className="w-full grid gap-6 border-t border-black/[0.04] pt-8 mt-4 grid-cols-3">
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Member since</p>
                <p className="font-sans text-sm md:text-base text-on-surface font-semibold flex items-center justify-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-primary" /> {profile.memberSince}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Region</p>
                <p className="font-sans text-sm md:text-base text-on-surface font-semibold flex items-center justify-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-primary" /> {profile.region}
                </p>
              </div>
              <div>
                <p className="font-sans text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Gmail</p>
                <p className="font-sans text-sm md:text-base text-on-surface font-semibold flex items-center justify-center gap-1 truncate max-w-[120px] md:max-w-none" title={profile.email}>
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {profile.email}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="z-10 w-full space-y-6 animate-fade-in text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline">FULL NAME</label>
                <input
                  className="w-full h-12 px-4 rounded-xl luxury-input font-sans text-sm text-on-background outline-none border border-black/[0.04]"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Specter"
                  required
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline">GMAIL ADDRESS</label>
                <input
                  className="w-full h-12 px-4 rounded-xl luxury-input font-sans text-sm text-on-background outline-none border border-black/[0.04]"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@gmail.com"
                  required
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline">ROLE / DESCRIPTION</label>
                <input
                  className="w-full h-12 px-4 rounded-xl luxury-input font-sans text-sm text-on-background outline-none border border-black/[0.04]"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Strategic Philanthropist"
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-sans text-xs font-bold text-outline">REGION</label>
                <input
                  className="w-full h-12 px-4 rounded-xl luxury-input font-sans text-sm text-on-background outline-none border border-black/[0.04]"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="India (₹)"
                  disabled={isSaving}
                />
              </div>
            </div>
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  setName(profile.name);
                  setRole(profile.role);
                  setEmail(profile.email);
                  setRegion(profile.region);
                  setIsEditing(false);
                }}
                className="flex-1 h-12 rounded-xl border border-outline text-outline font-sans text-sm font-bold flex items-center justify-center gap-2 hover:bg-black/[0.02] cursor-pointer"
                disabled={isSaving}
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-12 rounded-xl bg-primary text-white font-sans text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Save Details
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
      {}
      {!isEditing && (
        <section className="w-full mt-12 flex justify-center">
          <button
            id="profile-edit-toggle-btn"
            onClick={() => setIsEditing(true)}
            className="w-full md:max-w-md bg-primary text-white font-sans text-sm font-bold px-12 py-5 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4" /> Edit Details
          </button>
        </section>
      )}
    </main>
  );
}
