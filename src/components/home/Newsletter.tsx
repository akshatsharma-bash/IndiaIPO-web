import React, { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { toast } from "sonner";
import { Zap, Mail } from "lucide-react";


const Newsletter = () => {
    const [email, setEmail] = useState("");
    const { getToken, loadRecaptcha } = useRecaptcha({ lazy: true });
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            return toast.error("Please type email address first");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return toast.error("Please enter a valid email address");
        }

        try {
            const recaptchaToken = await getToken("newsletter_subscribe_index");
            const r = await fetch("/api/subscriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recaptchaToken }),
            });

            if (r.ok) {
                toast.success("Thank you for subscribing!");
                setEmail("");
            } else {
                const err = await r.json();
                toast.error(err.error || "Failed");
            }
        } catch (_) {
            toast.error("An error occurred.");
        }
    };
    return (
        <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-br from-[#071028] via-[#0B1736] to-[#111827] border-t border-white/10">
            {/* Background Glow */}
            <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />

            {/* Small floating blur */}
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full" />

            <div

                className="max-w-5xl mx-auto text-center relative z-10"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#f99810] text-xs font-black tracking-[0.2em] uppercase mb-6">
                    <Zap className="w-3 h-3 fill-blue-300" />
                    Newsletter Access
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
                    Stay Ahead of the <br />
                    <strong className="text-[#f99810]">IPO</strong> Market Curve
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-lg mt-6 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Get live GMP updates, IPO alerts, allotment news and exclusive market
                    insights directly in your inbox.
                </p>

                {/* Form */}
                <form
                    onSubmit={submit}
                    onMouseEnter={loadRecaptcha}
                    onTouchStart={loadRecaptcha}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    {/* Input */}
                    <div className="relative w-full max-w-2xl">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={loadRecaptcha}
                            placeholder="Enter your email address"
                            className="w-full h-16 pl-14 pr-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="h-16 px-10 rounded-2xl bg-[#f99810] to-indigo-600 text-white font-black text-lg shadow-[0_10px_40px_rgba(37,99,235,0.35)] hover:scale-105 hover:shadow-blue-500/40 transition-all duration-300 whitespace-nowrap"
                    >
                        Subscribe Now
                    </button>
                </form>

                {/* Bottom Trust Text */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        12,000+ Subscribers
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Daily IPO Alerts
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        No Spam
                    </div>
                </div>

                {/* Privacy text */}
                <p className="text-[10px] text-slate-500 mt-6 uppercase tracking-[0.25em] font-bold">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
};

export default React.memo(Newsletter);