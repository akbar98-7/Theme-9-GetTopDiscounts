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
        <section className="bg-[#0B0F1A] py-20 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section: View More is now perfectly aligned with the heading */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative">
                    <div className="space-y-3 flex-1">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
                            {firstHalf || 'Trending'}{' '}
                            <span className="text-[#2ECC71]">{secondHalf || 'Products'}</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl text-base leading-relaxed opacity-80 font-medium">
                            {content}
                        </p>
                    </div>

                    <div className="pb-2">
                        <Link 
                            href="/all-products" 
                            className="group flex items-center gap-2 text-[#2ECC71] font-bold text-sm uppercase tracking-[0.2em] hover:text-white transition-all duration-300"
                        >
                            View More
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Slider Component with Side Arrows */}
                <div className="relative">
                    <OfferSlider>
                        {couponData.slice(0, 12).map((item: any, i: number) => (
                            <div key={i} className="min-w-[280px] md:min-w-[300px]">
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
            </div>
        </section>
    );
}

export default TrendingProducts;