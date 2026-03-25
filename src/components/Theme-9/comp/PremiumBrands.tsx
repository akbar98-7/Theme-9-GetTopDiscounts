import React from 'react'
import Link from 'next/link';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { ArrowRight } from "lucide-react";
import TopMerchants from './TopMerchants';
import { splitHeading } from '@/constants/hooks'; // Hook ko import karna na bhoolna

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const PremiumBrand = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const merchants = await apiGetTopMerchants(companyId);
    
    // Default heading as fallback
    const headingText = merchants?.data?.top_merchants_widget?.widget_heading || "Verified Coupon Codes & Deals";
    const subHeading = merchants?.data?.top_merchants_widget?.widget_text;

    // Split the big heading at the first space
    const [firstWord, ...restOfWords] = splitHeading(headingText);
    const mainHeadingRemaining = restOfWords.join(' '); // verified ke baad wala sara text

    if (merchants.data?.merchants?.length > 0) {
        return (
            <section className="bg-gray-100 py-24 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section Fix: Big Heading is now split */}
                    <div className="relative mb-16">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div className="max-w-4xl">
                                {/* Tagline (As seen in SS, but simplified) */}
                                <p className="text-gray-400 font-medium text-xs mb-3 uppercase tracking-[0.2em]">
                                    Your Trusted Source
                                </p>
                                
                                {/* h2: 'Verified' is Black, rest is Green */}
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111] tracking-tighter leading-[1.1] mb-6 uppercase">
                                    {firstWord || 'Verified'}{' '}
                                    <span className="text-[#27AE60]">{mainHeadingRemaining || 'Coupon Codes & Deals for Thousands of Brands'}</span>
                                
                                </h2>

                                {subHeading && (
                                    <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-medium opacity-80">
                                        {subHeading}
                                    </p>
                                )}
                            </div>

                            <div className="pb-2">
                                <Link 
                                    href={`/all-stores/A`} 
                                    className="group inline-flex items-center gap-2 text-gray-500 font-bold text-sm uppercase tracking-[0.15em] hover:text-[#27AE60] transition-all whitespace-nowrap"
                                    target='_blank'
                                >
                                    <span className="border-b-2 border-transparent group-hover:border-[#27AE60] transition-all">View all brands</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Brands Grid */}
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