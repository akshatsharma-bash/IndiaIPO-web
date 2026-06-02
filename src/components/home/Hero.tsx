import { useState, useEffect, useRef, useCallback } from "react";
import { getImgSrc } from "@/utils/image";
import {
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Banner {
    id: string;
    title: string | null;
    subtitle: string | null;
    image_url: string;
    mobile_image_url?: string | null;
    video_url?: string | null;
    type?: "image" | "video";
    cta_text: string | null;
    cta_link: string | null;
    badge_text?: string | null;
    cta2_text?: string | null;
    cta2_link?: string | null;
    sort_order: number;
    is_active?: boolean;
}

const fallbackBanners: Banner[] = [
    {
        id: "1",
        title: "Invest in IPOs Smarter",
        subtitle:
            "Track real-time GMP, analyze deep market insights, and participate in India's growth story with confidence.",
        image_url: "",
        video_url: "",
        type: "image",
        cta_text: "Explore IPOs",
        cta_link: "/all-ipos",
        badge_text: "Official IPO Consultancy",
        cta2_text: "View GMP",
        cta2_link: "/all-ipos",
        sort_order: 1,
    },
];

const Hero = () => {
    const initialBanners =
        (typeof window !== "undefined" &&
            (window as any).__INITIAL_BANNERS__) || [];

    const [banners, setBanners] =
        useState<Banner[]>(initialBanners);

    const [current, setCurrent] = useState(0);
    const safeBanners =
        banners.length > 0 ? banners : fallbackBanners;

    useEffect(() => {
        if (banners.length === 0) {
            const fetchBanners = async () => {
                try {
                    const res = await fetch("/api/banners?page=/");
                    const data = await res.json();

                    const active = data.filter(
                        (b: Banner) => b.is_active
                    );

                    setBanners(active);
                } catch (err) {
                    console.error(
                        "Error fetching banners client-side fallback:",
                        err
                    );
                }
            };

            fetchBanners();
        }
    }, [banners.length]);


    const banner = safeBanners[current];

    const next = useCallback(() => {
        if (safeBanners.length === 0) return;
        setCurrent((p) => (p + 1) % safeBanners.length);
    }, [safeBanners.length]);

    const prev = useCallback(() => {
        if (safeBanners.length === 0) return;
        setCurrent((p) => (p - 1 + safeBanners.length) % safeBanners.length);
    }, [safeBanners.length]);

    useEffect(() => {
        if (safeBanners.length <= 1) return;
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [next, safeBanners.length]);

    if (!banner) {
        return (
            <section className="relative overflow-hidden flex items-center bg-slate-950 aspect-[215/225] md:aspect-auto md:min-h-[720px]">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-slate-900" />
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative overflow-hidden flex items-center bg-slate-950 aspect-[215/225] md:aspect-auto md:min-h-[720px]"
        >
            <div className="absolute inset-0 z-0">
                {banner.video_url ? (
                    <video
                        src={getImgSrc(banner.video_url) || ""}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={getImgSrc(banner.image_url) || ""}
                        className="w-full h-full object-cover"
                    />
                ) : banner.image_url ? (
                    <picture className="w-full h-full">
                        {banner.mobile_image_url && (
                            <source
                                media="(max-width: 767px)"
                                srcSet={getImgSrc(banner.mobile_image_url) || ""}
                            />
                        )}
                        <img
                            src={getImgSrc(banner.image_url) || ""}
                            alt={banner.title || "Banner"}
                            loading="eager"
                            decoding="async"
                            width="1920"
                            height="720"
                            sizes="100vw"
                            className="w-full h-full object-cover"
                        />
                    </picture>
                ) : (
                    <div className="w-full h-full bg-slate-900" />
                )}

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0.2) 100%)",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 md:py-32 w-full h-full flex flex-col justify-center">
                <div className="max-w-3xl">
                    <div>
                        {banner.badge_text && (
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-6">
                                <ShieldCheck className="h-4 w-4" />
                                {banner.badge_text}
                            </span>
                        )}

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-3 md:mb-6">
                            {banner.title}
                        </h1>

                        <p className="text-lg md:text-3xl text-white leading-relaxed mb-5 md:mb-10 max-w-lg ">
                            {banner.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {banner.cta_text && (
                                <Link
                                    to={banner.cta_link || "/all-ipos"}
                                    className="px-5 py-2.5 md:px-8 md:py-4 bg-amber-700 text-white rounded-lg md:rounded-xl font-bold text-sm md:text-lg shadow-lg hover:bg-amber-600 hover:shadow-amber-900/20 transition-colors flex items-center gap-2 active:scale-95"
                                >
                                    {banner.cta_text} <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                                </Link>
                            )}
                            {banner.cta2_text && (
                                <Link
                                    to={banner.cta2_link || "/all-ipos"}
                                    className="px-5 py-2.5 md:px-8 md:py-4 bg-blue-800/70 text-blue-100 rounded-lg md:rounded-xl font-bold text-sm md:text-lg shadow-lg hover:bg-blue-700/80 transition-colors active:scale-95"
                                >
                                    {banner.cta2_text}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {safeBanners.length > 1 && (
                <>
                    <div className="absolute bottom-4 md:bottom-10 left-4 md:left-8 z-20 flex gap-2 md:gap-4">
                        <button
                            onClick={prev}
                            className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10"
                        >
                            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
                        </button>
                        <button
                            onClick={next}
                            className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10"
                        >
                            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
                        </button>
                    </div>

                    <div className="absolute bottom-6 md:bottom-12 right-4 md:right-8 z-20 flex gap-1.5 md:gap-2">
                        {safeBanners.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`transition-colors duration-500 rounded-full h-1.5 ${i === current ? "bg-amber-500 w-8" : "bg-white/30 w-4 hover:bg-white/50"}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};


export default Hero;