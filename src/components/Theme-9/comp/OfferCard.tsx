import React from "react";
import Image from "next/image";
import { Copy, Star, ExternalLink, ArrowRight } from "lucide-react";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getFinalDiscountTag,
  getMerchantHref,
  getRandomRating,
  getRandomStoreSeoTitle,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Link from "next/link";
import { OffersOffer } from "@/services/dataTypes";

interface Props {
  offer: OffersOffer;
  mer_slug_type: string;
  mer_slug: string;
  type?: string;
}

const OfferCard = async ({ offer, mer_slug_type, mer_slug, type }: Props) => {
  const domainData = await cookieService.get("domain");
  const domain = domainData?.domain;

  const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
  const product = offer?.offer || offer;

  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");

  const rating = getRandomRating(offer?.offer?.rating);
  const brandName = offer?.merchant?.merchant_name || "Store";

  const originalPrice = product?.original_price
    ? parseFloat(product.original_price)
    : 0;
  const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent,
  );

 return (
  <div className="group relative h-full flex flex-col">
    <div className="relative flex flex-col h-full bg-white rounded-[2.5rem] border border-[#2ECC71] p-7 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#2ECC71]/40 hover:-translate-y-2">
      
      {/* Top Section: Logo & Badge */}
      <div className="flex justify-between items-start mb-6">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:border-[#2ECC71]/30">
          {imageSrc && (
            <Image src={imageSrc} alt={brandName} width={64} height={64} className="object-contain transition-transform duration-500 group-hover:scale-110" />
          )}
        </div>

        <div className="flex flex-col items-end">
          {finalDiscountTag && (
            /* Badge ko Blue se Green kiya */
            <span className="bg-[#E8F8F0] text-[#27AE60] text-[11px] font-black px-3 py-1.5 rounded-full border border-[#2ECC71]/20 uppercase tracking-tighter shadow-sm">
              {finalDiscountTag}
            </span>
          )}
          <div className="flex items-center gap-1 mt-2 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-amber-700 text-[10px] font-bold">{rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        <Link href={merchantHref} className="no-underline">
          <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2 group-hover:text-[#2ECC71] transition-colors">
            {brandName}
          </span>
        </Link>

        <h3 className="text-slate-800 text-xl font-extrabold leading-[1.3] mb-3 line-clamp-2 group-hover:text-slate-900 transition-colors">
          {type === "product" ? `${product?.offer_title}` : `${discardHTMLTags(offer?.offer?.offer_title)}`}
        </h3>
      </div>

      {/* CTA Button Section (THE MOST IMPORTANT PART) */}
      <div className="mt-auto pt-6">
      <OfferOutUrl
    unique_id={product?.unique_id}
    outUrl={product?.url}
    merchantHref={merchantHref}
    domain={domain}
    /* Yahan humne sirf colors ko blue se green kiya hai original prop 'customClass' ke saath */
    customClass="no-underline w-full bg-[#27AE60] !text-white py-4 rounded-2xl !font-bold flex items-center justify-center gap-3 shadow-md hover:bg-[#219150] hover:shadow-green-200 transition-all duration-300 relative group/btn"
  >
    {product?.coupon_code ? (
      <>
        <span className="flex-1 text-center pl-4">
          {product.coupon_code.trim().slice(0, 8).toUpperCase()}
        </span>
        <div className="bg-white/10 p-2 rounded-xl mr-1">
          <Copy size={16} />
        </div>
      </>
    ) : (
      <>
        <span className="text-sm uppercase tracking-wider">
          {type === "product" ? "Buy Now" : "Unlock Deal"}
        </span>
        <ArrowRight
          size={18}
          className="transition-transform group-hover/btn:translate-x-1"
        />
      </>
    )}
  </OfferOutUrl>
      </div>
    </div>
  </div>
  );
};

export default OfferCard;
