'use client'
import { apiSubscribeNewsletter } from '@/apis/page_optimization';
import { faPaperPlane, FontAwesomeIcon } from '@/constants/icons';
import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";

interface Props {
    companyId: string;
}

const FooterNewsletter = ({ companyId }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Invalid email address.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await apiSubscribeNewsletter(companyId, email);
            if (response.message === "Subscribed successfully") {
                toast.success("Welcome to the club!");
                setEmail("");
            } else {
                toast.info("Already on the list!");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg">
            <ToastContainer />
            <form 
                className="relative flex items-center" 
                onSubmit={handleRate} 
                autoComplete="off"
            >
                <div className="relative w-full">
                    <input 
                        type="email" 
                        placeholder="EMAIL ADDRESS" 
                        className="w-full bg-[#0a0a0a] border border-gray-800 text-white text-xs font-black tracking-widest rounded-full py-5 pl-8 pr-20 focus:outline-none focus:border-[#27AE60] transition-all duration-500 placeholder:text-gray-700"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        disabled={isLoading}
                    />
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-[#27AE60] text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 disabled:bg-gray-800"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Join"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FooterNewsletter;