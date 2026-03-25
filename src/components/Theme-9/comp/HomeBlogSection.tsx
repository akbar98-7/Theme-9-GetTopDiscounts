import { apiFooter } from '@/apis/user';
import Link from 'next/link';
import React from 'react';
import Blog from './Blog';
import { ArrowRight } from 'lucide-react';

const HomeBlogSection = async ({ companyId, blog_url }: { companyId: string, blog_url: string }) => {
    const blog = await apiFooter(companyId);

    if (blog.status && blog?.data?.length > 0) {
        return (
            <section className="bg-white py-24 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Area: Solid & Minimal */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="max-w-3xl">
                            <p className="text-[#27AE60] font-black text-[10px] mb-5 uppercase tracking-[0.4em] leading-none">
                                Insights & Articles
                            </p>
                            
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#111] tracking-tighter leading-[0.95] uppercase">
                                Weekly <span className="text-gray-200">News</span> <br /> <span className="text-[#27AE60]">& Insights</span>
                            </h2>
                        </div>
                        
                        <div className="pb-2">
                            <Link 
                                href={blog_url}
                                className="group inline-flex items-center gap-3 text-gray-400 font-black text-xs uppercase tracking-[0.2em] hover:text-[#27AE60] transition-all duration-300"
                                target='_blank'
                            >
                                <span className="border-b-2 border-transparent group-hover:border-[#27AE60] pb-1 transition-all">
                                    View all posts
                                </span>
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Blog Grid: Sharp Spacing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {blog.data.slice(0, 3).map((item: any, i: number) => (
                            <Blog key={i} data={item} />
                        ))}
                    </div>

                </div>
            </section>
        );
    }
    return null;
}

export default HomeBlogSection;