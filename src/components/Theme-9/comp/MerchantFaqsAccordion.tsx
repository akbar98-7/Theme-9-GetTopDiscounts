"use client";
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const MerchantFaqsAccordion = ({ faq, index }: { faq: any; index: number }) => {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div className={`group border-2 transition-all duration-500 rounded-[2.5rem] ${isOpen ? 'border-[#27AE60]/30 bg-white shadow-2xl shadow-[#27AE60]/5' : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-200'}`}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-8 text-left"
            >
                <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-[#111]' : 'text-gray-500 group-hover:text-[#111]'}`}>
                    {faq.question}
                </span>
                <div className={`p-2.5 rounded-xl transition-all duration-500 ${isOpen ? 'bg-[#27AE60] text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:text-[#27AE60]'}`}>
                    {isOpen ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 text-gray-500 text-lg leading-relaxed">
                    <div className="h-[1px] w-full bg-gray-100 mb-6"></div>
                    <div className="prose prose-slate">
                        {faq.answer}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MerchantFaqsAccordion;