import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { getImgSrc } from "@/utils/image";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import TypewriterText from "./TypewriterText";

import { useState, useEffect, useCallback } from "react";

import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";


interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  video_url?: string | null;
  type?: "image" | "video";
  cta_text: string | null;
  cta_link: string | null;
  badge_text?: string | null;
  cta2_text?: string | null;
  cta2_link?: string | null;
  sort_order: number;
  is_active?: boolean;
};

const fallbackBanners: Banner[] = [
  {
    id: "1",
    title: "India's Leading IPO Consultancy Platform",
    subtitle:
      "Expert advisory for SME IPO, Mainline IPO, FPO, and Pre-IPO funding.",
    image_url: "",
    video_url: "/video/ccvindia1.mp4",
    type: "video",
    cta_text: "Check IPO Eligibility",
    cta_link: "/ipo-eligibility-check",
    badge_text: "SEBI Registered IPO Consultancy",
    cta2_text: "Contact Us",
    cta2_link: "/contact",
    sort_order: 1,
  },


























];

const HeroSection = () => {
  const [banners, setBanners] = useState<Banner[]>(fallbackBanners);
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const loadBanners = async () => {
      try {
        const res = await fetch("/api/banners?page=/");
        const data = await res.json();

        const activeBanners = data.filter((b: Banner) => b.is_active);

        if (activeBanners.length > 0) {
          const mapped = activeBanners.map((b: Banner) => ({
            ...b,
            image_url: b.image_url || fallbackBanners[0].image_url,

            type: b.video_url ? "video" : (b.type || "image"),
            video_url: b.video_url
          }));

          setBanners(mapped);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadBanners();
  }, []);

  const banner = banners[current];

  useEffect(() => {
    if ((banner?.type === "video" || banner?.video_url) && banner.video_url) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = getImgSrc(banner.video_url) || "";
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) document.head.removeChild(link);
      };
    }

    if (banner?.image_url) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = getImgSrc(banner.image_url) || "";
      document.head.appendChild(link);

      return () => {
        if (document.head.contains(link)) document.head.removeChild(link);
      };
    }
  }, [banner]);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden h-[600px] lg:h-[700px]">

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {(banner.type === "video" || banner.video_url) && banner.video_url ? (
            <video
              src={getImgSrc(banner.video_url) || ""}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={getImgSrc(banner.image_url) || ""}
              alt={banner.title || "IPO Banner"}
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          )}

          <div className="absolute inset-0 bg-foreground/65" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-3xl">

          {banner.badge_text && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-green/20 text-brand-green border border-brand-green/30 mb-6">
              <CheckCircle className="h-3.5 w-3.5" />
              {banner.badge_text}
            </span>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 text-background">
                {banner.title && (
                  <TypewriterText text={banner.title} delay={0.2} />
                )}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 0.75, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 2.2, duration: 1 }}
                className="text-lg text-background/75 mb-8 max-w-xl"
              >
                {banner.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            {banner.cta_text && (
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8 gold-glow"
                asChild
              >
                <Link to={banner.cta_link || "/ipo-eligibility-check"}>
                  {banner.cta_text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}

            {banner.cta2_text && (
              <Button
                size="lg"
                variant="ghost"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 font-semibold text-base px-6 h-auto py-3"
                asChild
              >
                <Link to={banner.cta2_link || "/contact"}>
                  {banner.cta2_text}
                </Link>
              </Button>
            )}
          </div>

        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-background transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 hover:bg-background/40 flex items-center justify-center text-background transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current
                  ? "bg-accent w-8"
                  : "bg-background/40 hover:bg-background/60"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;