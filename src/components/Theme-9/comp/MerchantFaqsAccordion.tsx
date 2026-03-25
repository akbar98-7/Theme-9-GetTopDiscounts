"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const MerchantFaqsAccordion = ({ faq, index }: { faq: FAQ; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`group mb-4 rounded-[2rem] border transition-all duration-500 overflow-hidden
        ${isOpen 
          ? "bg-[#1E293B] border-[#27AE60]/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]" 
          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
        }`}
    >
      {/* Question / Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-7 text-left outline-none"
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300
          ${isOpen ? "text-[#27AE60]" : "text-slate-200 group-hover:text-white"}
        `}>
          {faq.question}
        </span>
        
        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500
          ${isOpen ? "bg-[#27AE60] text-white rotate-180" : "bg-white/10 text-slate-400 group-hover:bg-white/20 group-hover:text-white"}
        `}>
          {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
        </div>
      </button>

      {/* Answer / Body */}
      <div 
        className={`transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-7 pb-8">
          <div className="h-[1px] w-full bg-white/5 mb-6" />
          <p className="text-slate-400 leading-relaxed text-base font-medium">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MerchantFaqsAccordion;