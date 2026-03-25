"use client";
import React, { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function OfferSlider({ children }: { children: React.ReactNode }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = 350; 
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-visible group/slider">
      
      {/* Navigation Buttons - Light Glassmorphism Style */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-10px] lg:left-[-45px] top-1/2 -translate-y-1/2 z-[100] p-4 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#2ECC71] hover:text-white hover:border-[#2ECC71] transition-all duration-300 shadow-xl hidden md:flex items-center justify-center active:scale-90"
        aria-label="Scroll Left"
      >
        <ArrowLeft size={20} strokeWidth={3} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-10px] lg:right-[-45px] top-1/2 -translate-y-1/2 z-[100] p-4 rounded-full bg-white border border-slate-200 text-slate-900 hover:bg-[#2ECC71] hover:text-white hover:border-[#2ECC71] transition-all duration-300 shadow-xl hidden md:flex items-center justify-center active:scale-90"
        aria-label="Scroll Right"
      >
        <ArrowRight size={20} strokeWidth={3} />
      </button>

      {/* SCROLLABLE TRACK - This py-12 fixes the "Shadow Clipping" issue */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar select-none py-12 px-4 overflow-visible"
        style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
        }} 
      >
        {children}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}