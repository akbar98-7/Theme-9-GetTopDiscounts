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
            <div className="relative w-full aspect-square mb-6">
                {/* Neon Glow on Hover */}
                <div className="absolute inset-0 bg-[#27AE60]/0 group-hover:bg-[#27AE60]/15 rounded-[2.5rem] blur-3xl transition-all duration-500" />
                
                {/* elevated background taake card 'muddy' na lage */}
                <div className="relative w-full h-full bg-[#1E293B] border border-white/5 rounded-[2.5rem] flex items-center justify-center p-8 group-hover:border-[#27AE60]/40 group-hover:shadow-[0_20px_40px_-15px_rgba(39,174,96,0.3)] transition-all duration-500 overflow-hidden backdrop-blur-md">
                    <div className="relative w-full h-full z-10 flex items-center justify-center">
                        <Image
                            src={logoSrc}
                            alt={merchant.merchant_name}
                            fill
                            /* Brightness added for dark mode clarity */
                            className="object-contain transition-all duration-500 scale-90 group-hover:scale-110 brightness-110"
                            sizes="200px"
                        />
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#27AE60] text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-2xl z-20">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7-7 7" />
                   </svg>
                </div>
            </div>

            {/* Merchant Info */}
            <div className="text-center space-y-2">
                <h4 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors uppercase tracking-wide">
                    {merchant.merchant_name}
                </h4>
                <div className="flex items-center justify-center gap-2 bg-[#27AE60]/10 px-3 py-1.5 rounded-full border border-[#27AE60]/20 transition-all">
                    <span className="w-1.5 h-1.5 bg-[#27AE60] rounded-full shadow-[0_0_8px_#27AE60] animate-pulse"></span>
                    <span className="text-[9px] font-black text-[#27AE60] uppercase tracking-[0.2em]">Verified</span>
                </div>
            </div>
        </Link>
    );
};

export default StoreCard;