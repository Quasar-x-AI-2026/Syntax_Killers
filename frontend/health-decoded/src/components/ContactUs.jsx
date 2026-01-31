import React from "react";
import { Link } from "react-router-dom"; 
import { Mail, ShieldCheck, MapPin, ArrowLeft } from "lucide-react"; 

export default function Contact() {
  return (
    <section className="bg-white py-24 min-h-[70vh] flex items-center" id="contact">
      <div className="mx-auto max-w-3xl px-6 text-center">
        
        <div className="mb-12 flex flex-col items-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-blue-100">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Created by</h2>
          <h3 className="mt-2 text-5xl font-black tracking-tight text-slate-900">
            Team <span className="text-brand">Syntax Killers</span>
          </h3>
        </div>

        
        <div className="rounded-3xl border border-slate-100 bg-slate-50/50 p-10">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-sm">
                <Mail size={20} />
              </div>
              <p className="text-lg font-bold text-slate-500">Get in touch</p>
              <p className="text-xl font-bold text-slate-900 uppercase"></p>
              <a 
                href="mailto:syntaxkillers.dev@gmail.com" 
                className="text-brand hover:underline font-medium"
              >
                syntaxkillers.dev@gmail.com  <br />
             
              </a>
              <p className="text-md font-bold text-slate-500">Phone Support</p>
              <p className="text-sm font-semibold text-brand hover:underline">+919842561237</p>
            </div>

            <div className="h-px w-16 bg-slate-200"></div>

            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
                <MapPin size={20} />
              </div>
              <p className="text-sm font-bold text-slate-500">Based In</p>
              <p className="text-lg font-semibold text-slate-600">Ranchi, Jharkhand</p>
            </div>
            <br />
            <div className="space-y-1">
                <p className="text-lg font-bold text-slate-500">Working hours</p> 
                <p className="text-sm font-semibold text-slate-500">Digital Support: Available 24x7</p>
            </div>
          </div>
        </div>

        
        <div className="mt-12 flex flex-col items-center space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand transition-colors group "
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <p className="text-sm text-slate-400 leading-relaxed italic">
            Built for the future of healthcare transparency. <br />
            Empowering patients through AI. <br />
            We do not store personal or medical data.
          </p>
        </div>
      </div>
    </section>
  );
}