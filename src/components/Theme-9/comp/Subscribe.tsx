import React from "react";
import { ArrowRight, Mail } from "lucide-react";

export default function Subscribe() {
  return (
    /* Background kept white or slightly off-white to blend with bg-gray-100 sections */
    <section className="relative w-full py-24 overflow-hidden bg-white">
      
      {/* Subtle Background Elements - Soft Green Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#27AE60]/5 blur-[100px] rounded-full z-0" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Tagline - Green Accent */}
        <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#27AE60]/30"></span>
            <p className="text-[#27AE60] font-black text-[10px] uppercase tracking-[0.4em]">
                Exclusive Savings Await
            </p>
            <span className="w-8 h-[1px] bg-[#27AE60]/30"></span>
        </div>

        {/* Heading - Clean Slate Text */}
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95] uppercase">
          Never miss <br /> 
          <span className="text-[#27AE60]">a deal.</span>
        </h2>

        {/* Subtext - Improved Readability for Light BG */}
        <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          Join <span className="text-slate-900 font-bold underline decoration-[#27AE60]/30 decoration-4">100,000+</span> smart shoppers getting the best verified coupons directly in their inbox.
        </p>

        {/* Subscribe Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto mb-10 gap-4">
          
          {/* Email Input - White with Shadow Elevation */}
          <div className="relative w-full group">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#27AE60] transition-colors" size={20} />
            <input
                type="email"
                placeholder="Enter your email address"
                required
                className="
                w-full
                h-[68px]
                bg-white
                border border-slate-200
                text-slate-900
                pl-14 pr-8
                rounded-2xl
                outline-none
                transition-all
                focus:border-[#27AE60]
                focus:shadow-[0_10px_30px_-10px_rgba(39,174,96,0.15)]
                placeholder:text-slate-400
                text-lg
                font-medium
                "
            />
          </div>

          {/* Button - Strong Green CTA */}
          <button
            type="submit"
            className="
              w-full sm:w-auto
              h-[68px]
              px-12
              rounded-2xl
              bg-[#27AE60]
              text-white
              font-black
              text-sm
              uppercase
              tracking-widest
              flex
              items-center
              justify-center
              gap-3
              hover:bg-slate-900
              hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)]
              transition-all
              active:scale-95
              whitespace-nowrap
            "
          >
            Join Now
            <ArrowRight size={20} />
          </button>

        </form>

        {/* Footer Note - Minimalist */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27AE60] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27AE60]"></span>
           </span>
           No spam. Unsubscribe anytime.
        </div>

      </div>

      {/* Subtle Bottom Border/Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </section>
  );
}