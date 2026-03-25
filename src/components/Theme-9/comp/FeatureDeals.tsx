import React from 'react'
import { apiGetPopularDeals } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import OfferCard from './OfferCard';
import { Reveal } from './MotionWrapper';
import { Sparkles } from 'lucide-react';

interface Props {
  companyId: string;
  mer_slug_type: string;
  mer_slug: string;
}

const FeaturedDeals = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
  const response = await apiGetPopularDeals(companyId);
  const bestOffers = response.data;

  if (!bestOffers?.offers?.length) return null;

  const [firstHalf, secondHalf] = splitHeading(
    bestOffers?.popular_deals_widget?.widget_heading
  );

  const content = bestOffers?.popular_deals_widget?.widget_text;
  const count = 6;

  return (
    <section className="bg-gray-100 py-20 px-6">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <Reveal>
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 text-[#2ECC71]">
            <Sparkles size={16} fill="#2ECC71" />
            <p className="font-bold text-sm uppercase tracking-widest">
              Handpicked for you
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            {firstHalf || 'Featured'}{' '}
            <span className="text-[#2ECC71]">
              {secondHalf || 'Deals'}
            </span>
          </h2>
          {/* ... baki content ... */}
        </div>
      </Reveal>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {bestOffers?.offers?.slice(0, count)?.map((item: any, i: number) => (
          <Reveal key={i} delay={i * 0.07}>
            {/* Yahan humne blue glow ko green kar diya hai */}
            <div className="group relative rounded-[2.5rem] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(46,204,113,0.15)]">
               <OfferCard 
                  offer={item} 
                  mer_slug_type={mer_slug_type} 
                  mer_slug={mer_slug} 
                />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
  );
};

export default FeaturedDeals;