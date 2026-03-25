import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import { getBaseImageUrl, getMerchantHref } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
    merchant: Merchant | CompanyWiseMerchant;
    mer_slug: string;
    mer_slug_type: string;
}

const StoreCard = async ({ merchant, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const domain = companyDomain?.domain;
    
    const logoSrc = getBaseImageUrl(domain, merchant.merchant_logo, "");

    return (
        <Link 
            href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
            className="no-underline group relative flex flex-col items-center w-full"
        >
            {/* Main Container */}
            <div className="relative w-full aspect-square mb-5 transition-all duration-500">
                
                {/* Green Animated Background Glow (Replaced Blue) */}
                <div className="absolute inset-0 bg-[#27AE60]/0 group-hover:bg-[#27AE60]/5 rounded-[2.5rem] blur-2xl transition-all duration-500" />
                
                {/* Logo Frame */}
                <div className="relative w-full h-full bg-white border border-slate-200 rounded-[2.5rem] flex items-center justify-center p-8 shadow-sm group-hover:shadow-2xl group-hover:shadow-[#27AE60]/10 group-hover:border-[#27AE60]/30 transition-all duration-500 overflow-hidden">
                    
                    {/* Subtle Sparkle on Hover (Green) */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#27AE60]/10 rounded-full group-hover:scale-[3] transition-transform duration-700" />

                    <div className="relative w-full h-full z-10">
                        <Image
                            src={logoSrc}
                            alt={merchant.merchant_name}
                            fill
                            /* Removed grayscale to keep original logo colors */
                            className="object-contain transition-all duration-500 scale-95 group-hover:scale-110"
                            sizes="200px"
                        />
                    </div>
                </div>

                {/* Floating "Go" Button (Replaced Blue/Slate with Theme Green) */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#151b28] text-[#27AE60] p-2.5 rounded-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-[#27AE60]/20">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" />
                   </svg>
                </div>
            </div>

            {/* Merchant Name & Offer Hint */}
            <div className="text-center space-y-1.5">
                <h4 className="font-black text-sm text-slate-800 group-hover:text-[#27AE60] transition-colors duration-300 uppercase tracking-tight">
                    {merchant.merchant_name}
                </h4>
                <div className="flex items-center justify-center gap-1.5 bg-[#27AE60]/5 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#27AE60] rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-[#27AE60] uppercase tracking-widest">
                        Verified
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default StoreCard;