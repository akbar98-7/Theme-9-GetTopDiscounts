import React from 'react'
import Link from 'next/link';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { ArrowRight } from "lucide-react";
import TopMerchants from './TopMerchants';
import { splitHeading } from '@/constants/hooks';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const PremiumBrand = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const merchants = await apiGetTopMerchants(companyId);
    
    const headingText = merchants?.data?.top_merchants_widget?.widget_heading || "Verified Coupon Codes & Deals";
    const subHeading = merchants?.data?.top_merchants_widget?.widget_text;

    const [firstWord, ...restOfWords] = splitHeading(headingText);
    const mainHeadingRemaining = restOfWords.join(' ');

    if (merchants.data?.merchants?.length > 0) {
        return (
            /* Dark Background Section */
            <section className="bg-[#0F172A] py-28 px-6 lg:px-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    
                    <div className="relative mb-20">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                            <div className="max-w-4xl space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-12 h-[1px] bg-[#27AE60]"></span>
                                    <p className="text-[#27AE60] font-black text-[10px] uppercase tracking-[0.4em]">Premium Partners</p>
                                </div>
                                
                                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] uppercase">
                                    {firstWord || 'Verified'}{' '}
                                    <span className="text-[#27AE60] block md:inline">{mainHeadingRemaining}</span>
                                </h2>

                                {subHeading && (
                                    <p className="text-slate-400 text-lg leading-relaxed max-w-2xl font-medium opacity-90">
                                        {subHeading}
                                    </p>
                                )}
                            </div>

                            <div className="pb-3">
                                <Link 
                                    href={`/all-stores/A`} 
                                    className="group inline-flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.2em] hover:text-[#27AE60] transition-all border border-white/10 px-8 py-4 rounded-2xl bg-white/5 hover:bg-[#27AE60]/10 shadow-2xl"
                                    target='_blank'
                                >
                                    <span>Browse All</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300 text-[#27AE60]" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <TopMerchants 
                        merchantData={merchants?.data?.merchants} 
                        mer_slug_type={mer_slug_type} 
                        mer_slug={mer_slug} 
                    />
                </div>
            </section>
        )
    }
    return null;
}

export default PremiumBrand;