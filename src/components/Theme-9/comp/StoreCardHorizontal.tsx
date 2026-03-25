import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { ArrowUpRight } from 'lucide-react';

const StoreCardHorizontal = async ({ merchant, mer_slug, mer_slug_type }: any) => {
    const companyDomain = await cookieService.get("domain");
    const [heading] = splitHeadingFromDetails(merchant?.details);
    const logoSrc = getBaseImageUrl(companyDomain.domain, merchant?.merchant_logo, "");

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="no-underline block group">
            <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#27AE60]/5 transition-all border border-transparent hover:border-[#27AE60]/10">
                
                {/* Logo Box */}
                <div className="relative w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl flex-shrink-0 p-2 transition-transform group-hover:scale-105">
                    <Image
                        src={logoSrc}
                        alt={merchant?.merchant_name}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h4 className="font-bold text-[#111] text-sm group-hover:text-[#27AE60] transition-colors line-clamp-1 uppercase tracking-tight">
                        {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-[#27AE60] uppercase tracking-widest">Active Deal</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">Updated</span>
                    </div>
                </div>

                {/* Arrow Icon */}
                <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#27AE60] group-hover:border-[#27AE60] transition-all">
                    <ArrowUpRight size={14} className="text-gray-300 group-hover:text-white transition-all" />
                </div>
            </div>
        </Link>
    )
}

export default StoreCardHorizontal;