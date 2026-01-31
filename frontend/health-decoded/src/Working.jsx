import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap, ShieldCheck, Database } from "lucide-react";

export default function Working() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <nav className="border-b bg-white px-6 py-4 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-500 hover:text-blue-700 transition-colors" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">The Pipeline: How Health Decoded Works</h1>
          <p className="text-lg text-slate-600">A look under the hood of our medical report analysis engine.</p>
        </div>

        <div className="grid gap-8">
          {[
            { 
              step: "01", 
              icon: <Zap />, 
              title: "Vision-Language Extraction", 
              desc: "Our VLM models don't just 'read' text. They identify the structure of medical tables, blood work ranges, and handwritten doctor notes." 
            },
            { 
              step: "02", 
              icon: <ShieldCheck />, 
              title: "On-the-Fly Redaction", 
              desc: "Before data hits our secondary processing, we scrub PII (Personally Identifiable Information) using local NLP rules to maintain HIPAA standards." 
            },
            { 
              step: "03", 
              icon: <Database />, 
              title: "Jargon Translation", 
              desc: "We cross-reference values with the latest medical databases to translate 'Leukocytosis' into 'Elevated white blood cell count' for the patient." 
            }
          ].map((item) => (
            <div key={item.step} className="flex gap-6 rounded-3xl bg-white border border-slate-200 p-8 transition-transform hover:scale-[1.01]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand">
                {item.icon}
              </div>
              <div>
                <span className="text-xs font-bold text-brand uppercase tracking-widest">{item.step} — Processing</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

