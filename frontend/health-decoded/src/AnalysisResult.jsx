import React, { useState } from "react";
import { ArrowLeft, Activity, AlertCircle, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function AnalysisResult({ data, imagePreview, onReset }) {
  // 1. SAFETY GUARD: Check if data is valid before doing anything
  const isReport = data && (!!data.findings || !!data.audit_findings);
  const isMedicalReport = data && !!data.findings;
  const [showPreview, setShowPreview] = useState(false);

  // 2. ERROR STATE: If data is missing or structure is wrong, show a single clean message
  if (!data || !isReport) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-4 text-red-600">
            <AlertTriangle size={48} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Analysis Format Error</h2>
        <p className="mt-2 text-slate-600">
          The AI provided a response, but it couldn't be parsed correctly.
          This usually happens with blurry images or complex layouts.
        </p>
        <button
          onClick={onReset}
          className="mt-8 rounded-full bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 3. SUCCESS STATE: Only runs if data is correct
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 animate-in fade-in duration-500">
      <button onClick={onReset} className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft size={20} /> Back to Home
      </button>

      {/* NEW: Image Preview Toggle */}
      {imagePreview && (
        <div className="mb-6">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? "Hide Original Document" : "View Original Document"}
          </button>

          {showPreview && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 shadow-md animate-in slide-in-from-top-4 duration-300">
              <img
                src={imagePreview}
                alt="Original Document"
                className="w-full max-h-[500px] object-contain bg-slate-100"
              />
            </div>
          )}
        </div>
      )}


      <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {isMedicalReport ? "Medical Report Analysis" : "Billing Audit Results"}
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          {isMedicalReport ? data.summary : `Bill Trust Score: ${data.bill_trust_score}/100`}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {isMedicalReport ? (
          data.findings.map((item, i) => {
            const isNormal = item.status?.toLowerCase() === 'normal';
            const statusColor = isNormal
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700';

            return (
              <div key={i} className="rounded-2xl bg-white p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="font-bold text-slate-900 text-lg">{item.parameter}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColor}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-2xl font-mono text-blue-600 mb-2">{item.value}</div>
                <p className="text-slate-500 text-sm italic">{item.explanation}</p>
              </div>
            );
          })
        ) : (
          data.audit_findings.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-slate-900">{item.item}</span>
                <span className="text-slate-900 font-bold">${item.cost}</span>
              </div>
              <p className="text-red-600 text-sm font-medium mb-3 flex items-center gap-1">
                <AlertCircle size={14} /> {item.issue_detected}
              </p>
              <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-medium">
                Recommendation: {item.suggested_action}
              </div>
            </div>
          ))
        )}

        {!isMedicalReport && data.savings_opportunity?.detected && (
          <div className="col-span-full mt-4 rounded-2xl bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
              <Activity size={20} /> Savings Opportunities Found
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.savings_opportunity.generic_alternatives.map((alt, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                  <div className="text-sm text-slate-500 mb-1">Switch from</div>
                  <div className="font-bold text-red-600 line-through decoration-2 opacity-70">
                    {alt.branded}
                  </div>
                  <div className="text-sm text-slate-500 my-1">to</div>
                  <div className="font-bold text-green-600 text-lg">
                    {alt.generic}
                  </div>
                  <div className="mt-2 text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded inline-block">
                    Save approx {alt.estimated_savings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* NEW: Questions Checklist */}
      {(data.questions_for_doctor || data.questions_for_bill_department) && (
        <div className="mt-8 rounded-2xl bg-slate-50 p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Questions to Ask Your {isMedicalReport ? "Doctor" : "Billing Department"}
          </h3>
          <ul className="space-y-3">
            {(data.questions_for_doctor || data.questions_for_bill_department).map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                <span className="text-slate-700 font-medium">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NEW: Gentle Reminder Banner (Moved to bottom) */}
      {data.gentle_reminder && (
        <div className="mt-8 rounded-2xl bg-indigo-50 p-5 border border-indigo-100 flex items-start gap-4">
          <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h4 className="font-bold text-indigo-900 text-lg mb-1">Gentle Reminder</h4>
            <p className="text-indigo-700 leading-relaxed">{data.gentle_reminder}</p>
          </div>
        </div>
      )}

      {/* Helper Note */}
      <div className="mt-12 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex gap-4 items-center">
        <Activity className="text-blue-600 shrink-0" />
        <p className="text-sm text-blue-800">
          {data.safety_note || "This audit is powered by AI. Please consult with a healthcare professional before taking action."}
        </p>
      </div>

    </div>
  );
}
