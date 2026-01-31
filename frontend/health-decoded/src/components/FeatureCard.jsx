import React from "react";

export default function FeatureCard({ icon: Icon, title, desc, colorClass, shadowClass }) {
  return (
    <div className={`group rounded-3xl border border-slate-100 bg-slate-50/50 p-10 transition-all hover:border-brand/20 hover:bg-white hover:shadow-xl ${shadowClass}`}>
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${colorClass} text-white shadow-lg transition-transform group-hover:scale-110`}>
        <Icon size={28} />
      </div>
      <h3 className="mb-4 text-2xl font-bold text-slate-900">{title}</h3>
      <p className="leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}