
import SEOHead from "@/components/SEOHead";
import { BASE_URL } from "@/hooks/useCanonicalUrl";
import SitePopup from "@/components/SitePopup";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer3 from "@/components/Footer";
import AboutPreview from "@/components/AboutPreview";
import ServicesSection from "@/components/ServicesSection";
import Hero from "@/components/home/Hero";
const LiveIPOs = lazy(() => import("@/components/home/LiveIPOs"));
const GMPSection = lazy(() => import("@/components/home/GMPSection"));

const IPOTable = lazy(() => import("@/components/home/IPOTable"));
const BentoGrid = lazy(() => import("@/components/home/BentoGrid"));
const VideoSection = lazy(() => import("@/components/home/VideoSection"));
const MarketInsights = lazy(() => import("@/components/home/MarketInsights"));
const AcademyFAQ = lazy(() => import("@/components/home/AcademyFAQ"));
const AnnualReport = lazy(() => import("@/components/home/AnnualReport"))
const Newsletter = lazy(() => import("@/components/home/Newsletter"));
import { academyItems, faqItems } from "@/data/academyFaqData";

const Index2 = () => {
  return (
    <div
      className="min-h-screen bg-[#f8f9fb] text-slate-900 font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <SEOHead
        title="India IPO Consultant - SME & Mainboard IPO Advisory"
        description="Track real-time GMP, analyze deep market insights, and participate in India's growth story with confidence."
        keywords="IPO, SME IPO, GMP tracker, IPO India, Expert Advisory"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "India IPO",
              "url": BASE_URL,
              "logo": `${BASE_URL}/logo.png`,
              "sameAs": [
                "https://www.facebook.com/01indiapo",
                "https://x.com/india_ipo1",
                "https://www.linkedin.com/company/india-ipo/",
                "https://www.instagram.com/india_ipo1"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-74283-37280",
                "contactType": "customer service",
                "email": "info@indiaipo.in",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"]
              }
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                ...academyItems.map((item) => ({
                  "@type": "Question",
                  name: item.title,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.desc,
                  },
                })),
                ...faqItems.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a,
                  },
                })),
              ],
            },
          ],
        }}
      />

      <main>
        <Header />
        <Hero />
        <AboutPreview />
        <ServicesSection />
        <Suspense fallback={null}>
          <LiveIPOs />
        </Suspense>
        <Suspense fallback={null}>
          <GMPSection />
        </Suspense>
        <Suspense fallback={null}>
          <IPOTable />
        </Suspense>
        <Suspense fallback={null}>
          <BentoGrid />
        </Suspense>
        <Suspense fallback={null}>
          <VideoSection />
        </Suspense>

        <Suspense fallback={null}>
          <MarketInsights />
        </Suspense>

        <Suspense fallback={null}>
          <AcademyFAQ />
        </Suspense>
        {/* <SuccessStories /> */}


        <Suspense fallback={null}>
          <AnnualReport />
        </Suspense>

        <Suspense fallback={null}>
          <Newsletter />
        </Suspense>


        <Footer3 />
      </main>

      <SitePopup />
    </div>
  );
};

export default Index2;
