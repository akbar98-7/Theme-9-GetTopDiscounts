import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularProducts } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import ProductCard from './ProductCard';
import OfferSlider from './OfferSlider';
import { ArrowRight } from 'lucide-react';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularProducts(companyId);
    const [firstHalf, secondHalf] = splitHeading(response?.data?.home_page_widget?.widget_heading);
    const content = response?.data?.home_page_widget?.widget_text;
    const couponData = response?.data?.offers;

    if (!couponData || couponData.length === 0) return null;

    return (
        <section className="bg-gray-100 py-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-[2px] bg-[#2ECC71]"></span>
                            <span className="text-[#2ECC71] text-[10px] font-black uppercase tracking-[0.3em]">Trending Now</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                            {firstHalf || 'Trending'}{' '}
                            <span className="text-[#2ECC71]">{secondHalf || 'Products'}</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl text-base font-medium opacity-90">
                            {content || "Discover the latest trending products from top global brands."}
                        </p>
                    </div>

                    <div className="pb-2">
                        <Link 
                            href="/all-products" 
                            className="group flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-[0.2em] hover:text-[#2ECC71] transition-all no-underline"
                        >
                            View All
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-[#2ECC71] group-hover:border-[#2ECC71] group-hover:text-white transition-all shadow-sm">
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Slider Component */}
                <OfferSlider>
                    {couponData.slice(0, 12).map((item: any, i: number) => (
                        <div key={i} className="min-w-[280px] md:min-w-[320px] transition-transform duration-500 hover:z-50">
                            <ProductCard
                                offer={item}
                                mer_slug={mer_slug}
                                mer_slug_type={mer_slug_type}
                                type={item?.offer?.offer_type?.name}
                            />
                        </div>
                    ))}
                </OfferSlider>
            </div>
        </section>
    );
}

export default TrendingProducts;