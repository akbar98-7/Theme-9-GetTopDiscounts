import { discardHTMLTags } from '@/constants/hooks'
import { FooterResponse } from '@/services/dataTypes'
import Link from 'next/link'
import React from 'react'
import { Calendar, ArrowUpRight } from 'lucide-react'

interface Props {
    data: FooterResponse
}

const Blog = ({ data }: Props) => {
    return (
        <div className="group relative h-full flex flex-col">
            <Link href={data?.link} className="no-underline block h-full">
                
                {/* Main Card: Solid BG, No Blur, Sharp Borders */}
                <div className="relative h-full bg-[#f8f9fa] border border-gray-100 rounded-[2.5rem] p-10 transition-all duration-500 hover:bg-white hover:border-[#27AE60]/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] flex flex-col overflow-hidden">
                    
                    {/* Top Section */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-[#27AE60] transition-colors">
                            <Calendar size={14} strokeWidth={2.5} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                {data?.date || "Recent"}
                            </span>
                        </div>
                        
                        {/* Static Circle Icon - Flips on Hover */}
                        <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white group-hover:bg-[#27AE60] group-hover:border-[#27AE60] group-hover:text-white transition-all duration-500">
                            <ArrowUpRight size={18} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h4 className="mb-5">
                            <span className="text-2xl lg:text-3xl font-black text-[#111] leading-[1.15] tracking-tighter uppercase block group-hover:text-[#27AE60] transition-colors">
                                {discardHTMLTags(data?.title)}
                            </span>
                        </h4>
                        
                        <p className="text-gray-500 leading-relaxed text-[15px] font-medium opacity-75 line-clamp-3 mb-8">
                            {discardHTMLTags(data?.text)}
                        </p>
                    </div>

                    {/* Footer: Meta Info */}
                    <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex gap-2">
                             <span className="px-4 py-1.5 bg-gray-200/50 rounded-full text-[9px] font-black text-gray-500 uppercase tracking-widest group-hover:bg-[#27AE60]/10 group-hover:text-[#27AE60] transition-colors">
                                Featured
                             </span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-300 group-hover:text-[#111] transition-colors">
                            Read More
                        </span>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default Blog;