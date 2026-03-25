import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CategoryData } from '@/services/dataTypes';
import { ChevronRight } from 'lucide-react';

interface Props {
    category: CategoryData;
}

const TopCategories = async ({ category }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const domain = companyDomain?.domain;
    
    const imageSrc = category?.category_image 
        ? getBaseImageUrl(domain, category.category_image, "")
        : "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=300&q=80";

    return (
        <Link 
            href={`/${category?.url}`}
            className="no-underline group relative flex flex-col items-center w-full transition-all duration-300"
        >
            {/* Circular Image Container */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white border border-slate-200 shadow-sm group-hover:shadow-xl group-hover:shadow-green-500/10 group-hover:border-[#2ECC71]/40 transition-all duration-500 mb-4 flex items-center justify-center p-5">
                <Image 
                    src={imageSrc} 
                    alt={category?.name || "Category"} 
                    width={112} 
                    height={112}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            
            <div className="text-center w-full">
                <h4 className="text-sm font-black text-slate-800 group-hover:text-[#2ECC71] transition-colors line-clamp-1 mb-2 tracking-tight">
                    {category?.name}
                </h4>
                
                {/* Deals Count Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white group-hover:bg-[#27AE60] rounded-full border border-slate-200 group-hover:border-[#2ECC71] transition-all duration-300 shadow-sm">
                    <span className="text-[10px] font-black text-slate-500 group-hover:text-white uppercase tracking-tighter">
                        {category?.total_offers ? `${category.total_offers}` : '0'} Deals
                    </span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </Link>
    );
}

export default TopCategories;