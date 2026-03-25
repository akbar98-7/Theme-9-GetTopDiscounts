import React from "react";
import { ArrowRight } from "lucide-react";

export default function Subscribe() {
  return (
    /* Background kept deep dark to contrast with the light gray section above it */
    <section className="relative w-full py-28 overflow-hidden bg-[#0B0F1A]">
      
      {/* Background Glow Orbs - Switched from Purple to Green/Teal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#27AE60]/10 blur-[120px] rounded-full z-0" />
      <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#2ECC71]/5 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Tagline */}
        <p className="text-[#27AE60] font-black text-[11px] mb-6 uppercase tracking-[0.4em]">
           Exclusive Savings Await
        </p>

        {/* Heading - Split Color Logic */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">
          Never miss <br /> 
          <span className="text-[#27AE60]">a deal.</span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto opacity-80">
          Join <span className="text-white font-bold">100,000+</span> smart shoppers getting the best verified coupons directly in their inbox.
        </p>

        {/* Subscribe Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto mb-8 gap-4">
          
          {/* Email Input - Updated with Theme Border */}
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="
              w-full
              h-[64px]
              bg-white/5
              border border-white/10
              text-white
              px-8
              rounded-2xl
              outline-none
              backdrop-blur-xl
              transition-all
              focus:bg-white/10
              focus:border-[#27AE60]/50
              placeholder:text-gray-500
              text-lg
            "
          />

          {/* Button - Now Theme Green */}
          <button
            type="submit"
            className="
              w-full sm:w-auto
              h-[64px]
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
              hover:bg-[#2ecc71]
              hover:shadow-[0_0_30px_rgba(39,174,96,0.3)]
              transition-all
              active:scale-95
              whitespace-nowrap
            "
          >
            Join Now
            <ArrowRight size={20} />
          </button>

        </form>

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-medium uppercase tracking-widest opacity-60">
           <span className="w-1.5 h-1.5 bg-[#27AE60] rounded-full"></span>
           No spam. Unsubscribe anytime.
        </div>

      </div>
    </section>
  );
}