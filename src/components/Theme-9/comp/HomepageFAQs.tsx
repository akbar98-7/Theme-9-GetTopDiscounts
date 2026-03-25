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
    const domainData = await cookieService.get("domain");
    const companyDomain = domainData?.domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;
    const faqs = (await apiHomePageFaqs(companyDomain)).data;

    return (
        /* Section background: Deep Navy */
        <section className="bg-[#0F172A] py-28 px-6 lg:px-20 relative overflow-hidden">
            
            {/* Background Decorative Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#27AE60]/5 blur-[120px] rounded-full z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* FAQ SECTION (Left Side) */}
                    {faqs?.length > 0 && (
                        <div className="w-full lg:w-7/12">
                            <div className="mb-14">
                                <span className="bg-[#27AE60]/10 text-[#27AE60] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-[#27AE60]/20">
                                    Support Center
                                </span>
                                <h2 className="text-5xl md:text-6xl font-black text-white mt-8 tracking-tighter leading-[1.1] uppercase">
                                    Everything you <br/> <span className="text-[#27AE60]">need to know.</span>
                                </h2>
                            </div>
                            
                            {/* Note: Ensure MerchantFaqsAccordion also handles dark mode text/bg */}
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
                            {/* Elevated Dark Card for Sidebar */}
                            <div className="sticky top-28 bg-[#1E293B]/50 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Fresh Deals</h3>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#27AE60]/10 rounded-full border border-[#27AE60]/20">
                                        <div className="h-2 w-2 rounded-full bg-[#27AE60] animate-pulse shadow-[0_0_8px_#27AE60]"></div>
                                        <span className="text-[10px] font-bold text-[#27AE60] uppercase tracking-widest">Live Now</span>
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

                                <button className="w-full mt-10 py-5 bg-[#27AE60] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#0F172A] transition-all shadow-xl shadow-[#27AE60]/10 active:scale-95">
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