import React from "react";
import Image from "next/image";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDetailsToggle from "./OfferDetailsToggle";
import { Flame, Star, ShoppingCart } from "lucide-react";
import {
  getBaseImageUrl,
  getFinalDiscountTag,
  getMerchantHref,
  discardHTMLTags,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

const ProductCard = async ({ offer, mer_slug, mer_slug_type, type }: any) => {
  const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
  const domainData = await cookieService.get("domain");
  const domain = domainData?.domain;
  const product = offer?.offer || offer;

  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");

  const originalPrice = Number(product?.original_price || 0);
  const salePrice = Number(product?.sale_price || 0);

  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent
  );

  return (
    <div className="group relative w-full flex-shrink-0 
      rounded-[2rem] bg-white border border-slate-200 
      p-5 flex flex-col transition-all duration-500 
      hover:-translate-y-2 hover:border-[#2ECC71]/30 
      /* Soft Shadow Fix: Light background ke liye shadow ko bohot soft rakha hai */
      shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(46,204,113,0.15)]">

      {/* IMAGE CONTAINER */}
      <div className="relative h-48 rounded-2xl bg-[#F8FAFC] overflow-hidden flex items-center justify-center border border-slate-50">
        <Image
          src={imageSrc}
          alt="Product"
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />

        {/* DISCOUNT TAG - Modern Pill Style */}
        {finalDiscountTag && (
          <div className="absolute top-3 right-3 flex items-center gap-1 
            rounded-full bg-slate-900 px-3 py-1.5 text-[9px] 
            font-black text-white shadow-lg">
            <Flame size={10} className="fill-[#2ECC71] text-[#2ECC71]" />
            {finalDiscountTag}
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="mt-5 space-y-3 flex-grow">
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={10} fill="currentColor" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black">
            Top Rated
          </span>
        </div>

        {/* TITLE - Slate color for better contrast on Light BG */}
        <h3 className="text-[15px] font-bold text-slate-800 leading-tight line-clamp-2 min-h-[40px] group-hover:text-[#2ECC71] transition-colors">
          {type === "product"
            ? product?.offer_title
            : discardHTMLTags(product?.offer_title)}
        </h3>

        <div className="flex justify-between items-center pt-2">
          <OfferDetailsToggle
            domain={domain}
            imageSrc={imageSrc}
            merchantHref={merchantHref}
            offer={product}
            type="anchor"
            /* Refined text for light mode */
            buttonClass="text-slate-400 text-[11px] font-bold uppercase tracking-wider hover:text-slate-900 transition"
          />

          {/* PRICE - Bold Green */}
          {salePrice > 0 && (
            <div className="flex flex-col items-end">
                <span className="text-[#27AE60] font-black text-lg leading-none">
                ${salePrice}
                </span>
                {originalPrice > salePrice && (
                    <span className="text-[10px] text-slate-300 line-through font-medium">
                        ${originalPrice}
                    </span>
                )}
            </div>
          )}
        </div>
      </div>

      {/* GET DEAL BUTTON - Green Pill */}
      <div className="mt-6">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass="no-underline flex items-center justify-center gap-2 w-full rounded-2xl bg-[#27AE60] 
          py-4 text-center text-[11px] font-black uppercase tracking-[0.2em] text-white 
          hover:bg-slate-900 transition-all 
          active:scale-95 shadow-[0_10px_20px_-5px_rgba(39,174,96,0.3)] hover:shadow-none"
        >
          <ShoppingCart size={14} />
          Get Deal
        </OfferOutUrl>
      </div>
    </div>
  );
};

export default ProductCard;