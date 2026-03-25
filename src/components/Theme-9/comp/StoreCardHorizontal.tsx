import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { ArrowUpRight } from 'lucide-react';

const StoreCardHorizontal = async ({ merchant, mer_slug, mer_slug_type }: any) => {
    const domainData = await cookieService.get("domain");
    const companyDomain = domainData?.domain;
    const [heading] = splitHeadingFromDetails(merchant?.details);
    const logoSrc = getBaseImageUrl(companyDomain, merchant?.merchant_logo, "");

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="no-underline block group">
            <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                
                {/* Logo Box - Clean White for contrast on dark bg */}
                <div className="relative w-14 h-14 bg-white rounded-xl flex-shrink-0 p-2 transition-transform group-hover:scale-105 shadow-lg">
                    <Image
                        src={logoSrc}
                        alt={merchant?.merchant_name}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h4 className="font-bold text-slate-200 text-sm group-hover:text-[#27AE60] transition-colors line-clamp-1 uppercase tracking-tight">
                        {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-black text-[#27AE60] uppercase tracking-widest">Active Deal</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Updated</span>
                    </div>
                </div>

                {/* Arrow Icon - Dark Mode Style */}
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#27AE60] group-hover:border-[#27AE60] transition-all">
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white transition-all" />
                </div>
            </div>
        </Link>
    )
}

export default StoreCardHorizontal;