import React, { useState } from "react";
import { FileSearch, CreditCard, Lock, Zap, ShieldCheck } from "lucide-react";
import Navbar from "./components/Navbar";
import FeatureCard from "./components/FeatureCard";
import Footer from "./components/Footer";
import UploadModal from "./UploadModal";
import AnalysisResult from "./AnalysisResult";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAnalysisComplete={(data) => setAnalysisData(data)}
      />

      {analysisData ? (
        <AnalysisResult
          data={analysisData}
          onReset={() => setAnalysisData(null)}
        />
      ) : (
        <>
          <header className="px-6 pt-20 pb-28 lg:pt-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-brand-light px-4 py-1.5 text-sm font-bold text-brand shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative h-2 w-2 rounded-full bg-brand"></span>
                </span>
                ABHA Integrated • Healthcare Transparency
              </div>

              <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl">
                Medical clarity. <br />
                <span className="text-gradient">Financial honesty.</span>
              </h1>

              <p className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                We translate complex medical jargon into simple terms and audit your hospital bills
                for errors—empowering you to take control of your health and your wallet.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-200 transition-all hover:bg-blue-700 hover:translate-y-[-2px]"
              >
                <Zap size={20} fill="currentColor" />
                Analyze My Report
              </button>
            </div>
          </header>

          <section className="bg-white py-24" id="capabilities">
            <div className="mx-auto max-w-7xl px-6 grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={FileSearch}
                title="ELI5 Decoder"
                desc="Converts intimidating lab values and pathology reports into plain English that a 5-year-old could understand."
                colorClass="bg-brand"
                shadowClass="hover:shadow-blue-100"
              />
              <FeatureCard
                icon={CreditCard}
                title="Bill Auditor"
                desc="Automatically scans for overcharges, duplicate billing, and unbundling—errors found in over 80% of hospital bills."
                colorClass="bg-audit-red"
                shadowClass="hover:shadow-red-100"
              />
              <FeatureCard
                icon={Lock}
                title="Privacy Shield"
                desc="Your data is yours. We use client-side redaction to scrub PII before AI processing. We never store your medical history."
                colorClass="bg-medical-green"
                shadowClass="hover:shadow-green-100"
              />
            </div>
          </section>
        </>
      )}

      <Footer />
      <section className="bg-slate-50 py-6 border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl justify-center gap-8 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-blue-600" />
            End-to-End Encrypted
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-600" />
            HIPAA Compliant
          </div>
        </div>
      </section>
    </div>
  );
}