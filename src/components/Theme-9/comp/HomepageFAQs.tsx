import React from 'react'
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import StoreCardHorizontal from './StoreCardHorizontal';
import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';

interface Props {
    slug_type: string;
    store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;
    const faqs = (await apiHomePageFaqs(companyDomain)).data;

    return (
        /* Section background kept light gray for contrast */
        <section className="bg-[#f3f4f6] py-28 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* FAQ SECTION (Left Side) */}
                    {faqs?.length > 0 && (
                        <div className="w-full lg:w-7/12">
                            <div className="mb-14">
                                <span className="bg-[#27AE60]/10 text-[#27AE60] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#27AE60]/20">
                                    Support Center
                                </span>
                                <h2 className="text-5xl md:text-6xl font-black text-[#111] mt-8 tracking-tighter leading-[1.1] uppercase">
                                    Everything you <br/> <span className="text-[#27AE60]">need to know.</span>
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {faqs.map((faq: any, idx: number) => (
                                    <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RECENTLY UPDATED (Right Side - Sticky) */}
                    {promoMerchants?.length > 0 && (
                        <div className="w-full lg:w-5/12">
                            <div className="sticky top-28 bg-white p-10 rounded-[3rem] border border-gray-200 shadow-[0_30px_60px_rgba(0,0,0,0.04)]">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-2xl font-black text-[#111] uppercase tracking-tighter">Fresh Deals</h3>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                                        <div className="h-2 w-2 rounded-full bg-[#27AE60] animate-pulse"></div>
                                        <span className="text-[10px] font-bold text-[#27AE60] uppercase">Live Now</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    {promoMerchants?.slice(0, 6).map((merchant: any, i: number) => (
                                        <StoreCardHorizontal 
                                            key={i} 
                                            merchant={merchant} 
                                            mer_slug={store_slug} 
                                            mer_slug_type={slug_type} 
                                        />
                                    ))}
                                </div>

                                <button className="w-full mt-10 py-5 bg-[#111] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#27AE60] transition-all shadow-xl hover:shadow-[#27AE60]/20 active:scale-95">
                                    Explore More Stores
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default HomepageFAQs;