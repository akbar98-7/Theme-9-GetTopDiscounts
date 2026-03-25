import { getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomRating, splitOfferTitle } from '@/constants/hooks';
import Image from 'next/image';
import React from 'react';
import RenderRating from './RenderRating';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import OfferDuration from './OfferDuration';
import Link from 'next/link';
import SocialMediaShare from './SocialMediaShare';
import { ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const CouponCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, pageType }: any) => {
    const rating = getRandomRating(product?.rating);
    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0 ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : null;
    const finalDiscountTag = getFinalDiscountTag(product?.offer_title || product?.offer_detail, discountPercent);

    return (
        <div className="group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-500 hover:border-[#2ECC71]/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2">
            
            {/* Green Discount Badge */}
            {finalDiscountTag && (
                <div className="absolute -top-3 -right-2 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] text-white text-[11px] font-black px-5 py-2 rounded-2xl shadow-[0_10px_20px_rgba(46,204,113,0.25)] z-20 flex items-center gap-2">
                    <Zap size={12} className="fill-white" />
                    {finalDiscountTag}
                </div>
            )}

            <div className="flex-grow">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8">
                    <div className="relative w-16 h-16 bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src={(product?.offer_type?.name === "product" && product?.product_image) ? getBaseImageUrl(domain, product?.product_image, '') : getBaseImageUrl(domain, merchant_logo, '')}
                            alt={merchant_name}
                            width={50} height={50}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-[#27AE60] font-bold text-[10px] uppercase tracking-widest bg-[#2ECC71]/10 px-3 py-1.5 rounded-full mb-2">
                            <ShieldCheck size={12} /> Verified
                        </div>
                        <div className="text-slate-400 font-medium">
                           <OfferDuration endDate={product?.end_date} />
                        </div>
                    </div>
                </div>

                {/* Title Section */}
                <div className="space-y-3">
                    <h4 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-[#2ECC71] transition-colors line-clamp-2 min-h-[56px] tracking-tight">
                        {splitOfferTitle(product?.offer_title).join(' / ')}
                    </h4>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center scale-90 origin-left">
                            <RenderRating rating={rating} />
                            <span className="ml-2 text-slate-400 text-xs font-bold">({rating})</span>
                        </div>
                        <SocialMediaShare offerUrl={`/${product?.url}`} offerTitle={product?.offer_title} merchantHref={merchantHref} unique_id={product?.unique_id} domain={domain} />
                    </div>
                </div>

                {/* Price Display */}
                {(salePrice > 0 || originalPrice > 0) && (
                    <div className="mt-6 flex items-baseline gap-3">
                        {salePrice > 0 && (
                            <span className="text-3xl font-black text-slate-900">
                                {getCurrencySymbol(product?.currency)}{salePrice}
                            </span>
                        )}
                        {originalPrice > 0 && (
                            <span className="text-sm text-slate-400 line-through font-medium italic">
                                {getCurrencySymbol(product?.currency)}{originalPrice}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Actions Section */}
            <div className="mt-10 space-y-4">
                <OfferOutUrl
                    unique_id={product?.unique_id}
                    outUrl={product?.url}
                    merchantHref={merchantHref}
                    domain={domain}
                    customClass={`w-full relative h-14 flex items-center justify-center rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 overflow-hidden no-underline ${
                        product?.coupon_code 
                        ? "bg-white border-2 border-dashed border-[#2ECC71] text-[#27AE60] hover:bg-[#2ECC71]/5" 
                        : "bg-slate-900 text-white hover:bg-[#2ECC71] hover:shadow-[0_15px_30px_rgba(46,204,113,0.3)]"
                    }`}
                >
                    {product?.coupon_code ? (
                        <div className="flex items-center gap-3">
                            <span className="bg-[#2ECC71] text-white px-3 py-1 rounded-lg">
                                {product.coupon_code.trim().slice(0, 7)}...
                            </span>
                            <span>Copy Code</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <span>{product?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    )}
                </OfferOutUrl>

                {pageType !== 'events' && (
                    <Link href={merchantHref} className="no-underline block text-center group/link">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover/link:text-[#2ECC71] transition-colors">
                            Visit {merchant_name} Store
                        </span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CouponCard;