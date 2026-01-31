import React, { useState, useRef } from "react";
import { FileSearch, CreditCard, X, Loader2 } from "lucide-react";

// Added onAnalysisComplete to the props
export default function UploadModal({ isOpen, onClose, onAnalysisComplete }) {
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  if (!isOpen) return null;

  const handleTypeSelect = (type) => {
    setSelectedCategory(type);
    // Timeout ensures the state update registers before file explorer opens
    setTimeout(() => fileInputRef.current.click(), 100);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCategory) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    // Map internal names to backend 'mode'
    const mode = selectedCategory === "medical_report" ? "report" : "bill";

    try {

      const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

      // Pass the language parameter to the backend
      const response = await fetch(`${API_BASE_URL}/analyze?mode=${mode}&lang=${language}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend failed to respond");

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Create a temporary URL for the uploaded file to display as preview
      const previewUrl = URL.createObjectURL(file);

      // CRITICAL STEP: Pass the data up to App.js
      if (onAnalysisComplete) {
        onAnalysisComplete(result.analysis, previewUrl);
      }

      // Close the modal so the user can see the new page
      onClose();

    } catch (error) {
      console.error("Connection Failed:", error);
      alert(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
      setSelectedCategory(null); // Reset for next time
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center py-10 text-center">
            <Loader2 className="mb-4 animate-spin text-blue-600" size={48} />
            <h3 className="text-xl font-bold text-slate-900">Decoding Document...</h3>
            <p className="text-slate-500 mt-2">Our AI is processing your {selectedCategory === 'medical_report' ? 'Report' : 'Bill'}</p>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>

            <h3 className="mb-6 text-2xl font-bold text-slate-900">What are we analyzing?</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="grid gap-4">
              <button
                onClick={() => handleTypeSelect("medical_report")}
                className="flex items-center gap-4 rounded-2xl border-2 border-slate-50 p-5 hover:border-blue-600 hover:bg-blue-50/50 transition-all text-left group"
              >
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FileSearch size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Medical Report</div>
                  <div className="text-xs text-slate-500">Extract insights from labs/scans</div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect("medical_bill")}
                className="flex items-center gap-4 rounded-2xl border-2 border-slate-50 p-5 hover:border-red-500 hover:bg-red-50/50 transition-all text-left group"
              >
                <div className="p-3 rounded-xl bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <CreditCard size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Hospital Bill</div>
                  <div className="text-xs text-slate-500">Audit for errors & overcharges</div>
                </div>
              </button>
            </div>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
}