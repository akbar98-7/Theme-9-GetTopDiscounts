import React from 'react'
import Link from 'next/link';
import { apiGetTopCategories } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import { ArrowRight, LayoutGrid } from "lucide-react";
import TopCategories from './TopCategories';

interface Props {
    companyId: string;
    slug_type: string;
    cat_slug: string;
}

const ExploreCategory = async ({ companyId, cat_slug, slug_type }: Props) => {
    const response = await apiGetTopCategories(companyId);
    const topCategoriesResponse = response.data;
    
    const [firstHalf, secondHalf] = splitHeading(response?.data?.top_category_widget?.widget_heading);
    const content = response?.data?.top_category_widget?.widget_text;

    if (!topCategoriesResponse?.categories || topCategoriesResponse?.categories?.length === 0) {
        return null;
    }

    return (
        /* BG Gray 100 as requested */
        <section className="bg-gray-100 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3 text-[#2ECC71]">
                            <LayoutGrid size={18} />
                            <p className="font-bold text-sm uppercase tracking-widest">
                                Explore Categories
                            </p>
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
                            {firstHalf ? firstHalf : `Browse by`}{' '}
                            <span className="text-[#2ECC71]">{secondHalf ? secondHalf : `Category`}</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {content}
                        </p>
                    </div>
                    
                    <Link 
                        href={`/${cat_slug}`} 
                        className="group relative flex items-center gap-3 w-fit text-slate-400 font-black text-[12px] uppercase tracking-[0.2em] no-underline transition-all duration-300 hover:text-[#2ECC71]"
                    >
                        <span className="relative">
                             All Categories 
                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2ECC71] transition-all duration-300 group-hover:w-full" />
                        </span>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute h-10 w-10 scale-0 rounded-full bg-green-50 transition-transform duration-300 group-hover:scale-100" />
                            <ArrowRight 
                                size={20} 
                                className="relative z-10 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#2ECC71]" 
                            />
                        </div>
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
                    {topCategoriesResponse.categories.slice(0, 8).map((category: any, index: number) => (
                        <TopCategories key={index} category={category} />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default ExploreCategory;