import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiGetTopCategories } from '@/apis/page_optimization';
import { getBaseImageUrl } from '@/constants/hooks';
import FooterNewsletter from './FooterNewsletter';
import cookieService from '@/services/CookiesService';
import { apiGetDisclaimer } from '@/apis/user';

interface Props {
    companyFooterLogo: string | null;
    company_id: string;
    socialLinks: any;
    blog_title?: string;
    blog_url?: string;
    companyName: string;
}

const Footer = async ({ companyFooterLogo, company_id, socialLinks, blog_title, companyName, blog_url }: Props) => {
    const topCategoriesResponse = (await apiGetTopCategories(company_id)).data;
    const companyDomain = await cookieService.get("domain");
    const disclaimer = (await apiGetDisclaimer(companyDomain.domain)).data;

    return (
        <footer className="relative bg-[#050505] text-gray-400 pt-24 pb-12 overflow-hidden">
            {/* Background Aesthetic Blur */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#27AE60]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Newsletter Hero Section */}
                <div className="mb-24">
                    <div className="relative p-1 bg-gradient-to-r from-white/5 via-[#27AE60]/20 to-white/5 rounded-[2.5rem]">
                        <div className="bg-[#2e2d2d] rounded-full p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl text-center lg:text-left">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4">
                                    THE INSIDER LIST.
                                </h2>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-[0.3em]">
                                    Exclusive coupons <span className="text-[#27AE60]">delivered</span> weekly.
                                </p>
                            </div>
                            <div className="w-full max-w-md">
                                <FooterNewsletter companyId={company_id} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 space-y-8">
                        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                            <Image 
                                src={getBaseImageUrl(companyDomain.domain, companyFooterLogo, "/themes/Theme_3/images/logo.png")} 
                                height={40} width={160} 
                                className="h-9 w-auto brightness-0 invert" 
                                alt="logo" 
                            />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Curating the world's most valuable discounts. Your destination for verified, premium shopping intelligence.
                        </p>
                        {/* Social Micro-links */}
                        <div className="flex gap-4">
                            {['facebook', 'twitter', 'instagram'].map((social) => (
                                <div key={social} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#27AE60]/50 cursor-pointer transition-all">
                                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Trending</h4>
                        <ul className="space-y-4 list-none p-0">
                            {topCategoriesResponse?.categories?.slice(0, 5).map((item: any, i: number) => (
                                <li key={i}>
                                    <Link href={`/${item?.url}`} className="text-white hover:text-[#27AE60] transition-colors no-underline text-sm font-bold">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Company</h4>
                        <ul className="space-y-4 list-none p-0 text-sm font-bold">
                            <li><Link href="/" className="text-white hover:text-[#27AE60] no-underline transition-colors">Home</Link></li>
                            <li><Link href="/category" className="text-white hover:text-[#27AE60] no-underline transition-colors">All Categories</Link></li>
                            <li><Link href="/contact-us" className="text-white hover:text-[#27AE60]  no-underline transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Support</h4>
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#27AE60]/20 transition-all group">
                            <p className="text-[10px] font-black text-[#27AE60] uppercase tracking-widest mb-2">Get in touch</p>
                            <span className="text-xs font-bold text-white break-all">{disclaimer?.CompanyContactUs?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Final Footer Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                        © {new Date().getFullYear()} {companyName} <span className="mx-2 text-gray-800">|</span> Precision Savings
                    </p>
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors no-underline">Privacy</Link>
                        <Link href="/terms-and-conditions" className="hover:text-white transition-colors no-underline">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;