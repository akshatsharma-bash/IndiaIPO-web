import { useParams, Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BASE_URL } from "@/hooks/useCanonicalUrl";
import { servicesData } from "@/data/servicesData";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { getImageUrl } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Phone,
  Mail,
  Home,
  Shield,
  Clock,
  Users,
  Star,
  Award,
  Zap,
  Target,
  Wallet,
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  TrendingUp,
  MessageSquare,
  Building2,
  Globe,
  BarChart3,
  LayoutDashboard,
  AreaChart,
  ShieldCheck,
  Lock,
  UserCheck,
  Scale,
  HeartPulse,
  Calendar,
  Coins,
  Landmark,
} from "lucide-react";
import NotFound from "./NotFound";
import LatestNews from "@/components/home/LatestNews";

const categoryConfig: Record<
  string,
  { accent: string; bg: string; gradient: string; badgeBg: string }
> = {
  IPO: {
    accent: "#f59e08",
    bg: "#fff8e6",
    gradient: "from-[#001529] via-[#002147] to-[#003380]",
    badgeBg: "rgba(245,158,8,0.18)",
  },
  "CAPITAL RAISING": {
    accent: "#f59e08",
    bg: "#fff8e6",
    gradient: "from-[#001529] via-[#002147] to-[#003380]",
    badgeBg: "rgba(245,158,8,0.18)",
  },
  "FINANCE ADVISORY": {
    accent: "#f59e08",
    bg: "#fff8e6",
    gradient: "from-[#001529] via-[#002147] to-[#003380]",
    badgeBg: "rgba(245,158,8,0.18)",
  },
};

const trustStats = [
  { value: "8+", label: "Years", icon: Award },
  { value: "140+", label: "IPOs", icon: TrendingUp },
  { value: "9.2K +", label: "Consultancies", icon: Clock },
  { value: "98%", label: "Success", icon: Star },
];

const whyUs = [
  {
    icon: Shield,
    title: "Expert Advisory Team",
    desc: "Our advisors bring extensive experience across capital markets, operating within a strong compliance framework to ensure clarity, accuracy and confidence at every step.",
  },
  {
    icon: Users,
    title: "Dedicated Deal Team",
    desc: "A focused team of bankers, legal experts and CAs is assigned to your mandate, ensuring seamless coordination and consistent execution throughout the engagement.",
  },
  {
    icon: Zap,
    title: "Efficient Execution Timelines",
    desc: "Our structured processes are designed to streamline the regulatory, documentation and execution phases while maintaining the highest quality standards",
  },
  {
    icon: Target,
    title: "Strong Investor Network",
    desc: "Access to a wide network of institutional investors, HNIs and family offices, enabling effective capital raising and strong investor participation.",
  },
  {
    icon: Globe,
    title: "Pan-India Presence",
    desc: "With teams across major cities, we support clients nationwide, combining local market understanding with centralised expertise.",
  },
  {
    icon: BookOpen,
    title: "End-to-End Documentation",
    desc: "We manage the complete documentation process from drafting and filings to regulatory submissions and ongoing compliance support.",
  },
];

const testimonials = [
  {
    name: "Rajesh Mehta",
    designation: "CMD, Mehta Industrial Ltd.",
    quote:
      "India IPO transformed our SME IPO journey. The team was with us every step of the way, and we listed oversubscribed by 47x. Truly professional.",
  },
  {
    name: "Priya Sharma",
    designation: "CFO, FinGreen Capital Services",
    quote:
      "Their financial modelling and capital structuring advisory gave our board complete clarity. The detail and accuracy of their work is unmatched in the industry.",
  },
  {
    name: "Anil Kumar Gupta",
    designation: "Director, Greenfield Infra Projects",
    quote:
      "We went from idea to financial closure in 8 months for our ₹400 Cr project. The Project Finance team at India IPO is simply the best I've worked with.",
  },
];

const commonFaqs = [
  {
    q: "How do I know if an SME IPO is right for my company?",
    a: "We assess your financial performance, eligibility criteria and growth plans to determine whether an SME IPO on BSE SME or NSE Emerge is the right fit and whether you are ready for listing.",
  },
  {
    q: "How long does the SME IPO process typically take?",
    a: "The SME IPO timeline usually ranges from 3 to 6 months, depending on your company’s preparedness, documentation and regulatory approvals at each stage of the process.",
  },
  {
    q: "Are your SME IPO advisors experienced?",
    a: "Yes, our advisors have extensive experience in managing SME IPOs, working closely with merchant bankers, legal teams and exchanges to ensure smooth execution and compliance.",
  },
  {
    q: "What are your fee structures?",
    a: "Our fees are structured based on the scope and size of the SME IPO. For capital-raising services, we typically follow a success-fee model linked to the funds raised. For advisory services like valuation and modelling, we charge a fixed professional fee, discussed transparently upfront.",
  },
  {
    q: "Can you assist SME companies from non-metro cities?",
    a: "Absolutely. We have executed SME IPO mandates for companies across Tier 1, Tier 2 and Tier 3 cities in India. Location is not a limitation; we combine on-ground support with secure digital processes.",
  },
];

const FAQItem = ({
  faq,
  index,
}: {
  faq: (typeof commonFaqs)[0];
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors gap-4"
      >
        <span className="font-bold text-slate-800 text-sm leading-snug">
          {faq.q}
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-[#f59e08] shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
          {faq.a}
        </div>
      )}
    </div>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);
  const { pathname } = useLocation();
  const [bannerVideo, setBannerVideo] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(
          "/api/admin-blogs?limit=3&summary=1&category=ipo_blogs",
        );
        if (res.ok) {
          const data = await res.json();
          setRecentBlogs(data.data || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecentBlogs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        let nextScroll = scrollLeft + clientWidth;
        if (scrollLeft >= maxScroll - 10) nextScroll = 0;
        scrollRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialRef.current && window.innerWidth < 768) {
        const { scrollLeft, scrollWidth, clientWidth } = testimonialRef.current;
        const maxScroll = scrollWidth - clientWidth;
        let nextScroll = scrollLeft + clientWidth;
        if (scrollLeft >= maxScroll - 10) nextScroll = 0;
        testimonialRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(
          `/api/banners?page=${encodeURIComponent(pathname)}`,
        );
        if (res.ok) {
          const data = await res.json();
          const activeBanner = data.find(
            (b: any) => b.video_url || b.image_url,
          );
          if (activeBanner) {
            if (activeBanner.video_url) setBannerVideo(activeBanner.video_url);
            if (activeBanner.image_url) setBannerImage(activeBanner.image_url);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanners();
  }, [pathname]);

  if (!service) return <NotFound />;

  const cfg = categoryConfig[service.category] || categoryConfig["IPO"];

  const siteUrl = BASE_URL;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: service.title,
    description: service.shortDescription,
    url: `${siteUrl}/${service.slug}`,
    image: `${siteUrl}/favicon.png`,
    provider: {
      "@type": "Organization",
      name: "India IPO",
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-74283-37280",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: service.category || "IPO Advisory",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Services`,
      itemListElement: (service.keyBenefits || [])
        .slice(0, 5)
        .map((benefit: any, i: number) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: benefit.title || benefit,
            description: benefit.description || "",
          },
        })),
    },
    inLanguage: "en-IN",
    knowsAbout: [
      "IPO",
      "SME IPO",
      "SEBI Regulations",
      "Capital Markets",
      "India Stock Exchange",
    ],
  };

  // --- FAQ Schema (JSON-LD) for Google FAQ Rich Results ---
  const faqsToUse =
    service.faqs && service.faqs.length > 0 ? service.faqs : commonFaqs;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsToUse.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <SEOHead
        title={`${service.title} | India IPO Advisory Services`}
        description={service.shortDescription}
        keywords={`${service.title}, IPO Consultancy India, ${service.category}, expert IPO advisory, financial services India`}
      />
      {/* JSON-LD ProfessionalService Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-grow">
        <section
          className={`bg-gradient-to-br ${cfg.gradient} pt-14 pb-40 relative overflow-hidden`}
        >
          {bannerVideo ? (
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                src={getImageUrl(bannerVideo)}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-80 mix-blend-multiply`}
              />
            </div>
          ) : bannerImage ? (
            <div className="absolute inset-0 z-0">
              <div
                className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay"
                style={{ backgroundImage: `url(${getImageUrl(bannerImage)})` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} opacity-80 mix-blend-multiply`}
              />
            </div>
          ) : (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div
                className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
                style={{
                  background: cfg.accent,
                  filter: "blur(120px)",
                  transform: "translate(30%,-20%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5"
                style={{
                  background: "#3b82f6",
                  filter: "blur(80px)",
                  transform: "translate(-20%,20%)",
                }}
              />
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#F8FAFC] z-0" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-2 text-sm text-white/50 mb-8 flex-wrap">
              <Link
                to="/"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                to="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/80">{service.title}</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
                  {service.title}
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-8">
                  {service.shortDescription}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="font-black rounded-xl px-8 h-12 text-sm shadow-2xl transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${cfg.accent}, #d97706)`,
                      color: "#001529",
                      boxShadow: `0 8px 24px ${cfg.accent}40`,
                    }}
                  >
                    <Link to="/contact">
                      Book Your IPO Consultancy
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outlineWhite"
                    className="rounded-xl px-8 h-12 text-sm font-bold shadow-md"
                  >
                    <a href="tel:+917428337280">
                      <Phone className="mr-2 h-4 w-4" /> Call Us Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#001529] to-[#003380] py-10 -mt-1 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {trustStats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/8 backdrop-blur-sm border border-white/12 rounded-2xl p-5 text-center hover:bg-white/12 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f59e08]/20 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="h-5 w-5 text-[#f59e08]" />
                  </div>
                  <div className="text-2xl font-black text-white mb-1">
                    {s.value}
                  </div>
                  <div className="text-white/55 text-xs font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 relative -mt-6 rounded-t-[40px] bg-[#F8FAFC] z-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-14">
                {slug === "business-valuation-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="valuation-guide"
                        className="service-content-box service-content space-y-4 scroll-mt-24"
                      >
                        {/* <!-- Overview --> */}
                        <div className="row pt-2" id="overview">
                          <div className="col-lg-12">
                            <p>
                              Nowadays, the business world is changing so fast
                              that knowing the real value of your company or
                              assets has become very important. That's where the
                              business valuation services come in handy, which
                              help you in making the right decisions, whether
                              you are a business owner, an investor, or a
                              company leader.
                            </p>
                            <p>
                              <b>India IPO</b> provides professional business
                              valuation services across India. We help
                              businesses, investors and stakeholders understand
                              the true worth of their companies, assets and
                              projects. From <b>mergers and acquisitions</b> to{" "}
                              <b>financial reporting and tax compliance</b>, our
                              valuations are accurate, reliable and made just
                              for your business.
                            </p>
                          </div>
                        </div>

                        {/* <!-- Why Important --> */}
                        <div className="row mt-4" id="why-important">
                          <div className="col-lg-12">
                            <h2>
                              Why Business Valuation Services Are Important
                            </h2>
                            <p>
                              Business valuation is not just about numbers; it
                              is more than that. It helps you{" "}
                              <b>plan, grow and reduce risks</b>. Here's why
                              business valuation is needed:
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <b>1. For Investments:</b> Every investor
                                  wants to know the true value of your business
                                  before funding it and a clear valuation helps
                                  in negotiating equity, shares and investment
                                  terms.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>2. For Mergers & Acquisitions:</b> During a
                                  merger & acquisition deal, accurate valuation
                                  helps in ensuring a fair deal and avoiding any
                                  misunderstandings between buyer and seller.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>3. For Financial Reporting:</b> A fair
                                  valuation is also required when companies go
                                  for GAAP or IFRS compliance, goodwill testing
                                  and fair value accounting.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>4. For Taxes and Legal Needs:</b> Proper
                                  valuation helps in estate planning, gift taxes
                                  and legal settlements.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>5. For Strategic Planning:</b> Knowing your
                                  company's worth helps you grow, enter new
                                  markets, or buy/sell businesses wisely.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- Our Services --> */}
                        <div className="row mt-4" id="our-services">
                          <div className="col-lg-12">
                            <h2>Our Business Valuation Services</h2>
                            <p>
                              India IPO provides a wide range of valuation
                              services for different business needs.
                            </p>
                          </div>
                        </div>

                        {/* <!-- 1. Business Valuation --> */}
                        <div className="row mt-4" id="business-valuation">
                          <div className="col-lg-12 asd">
                            <h3>1. Business Valuation</h3>
                            <p>
                              Our <b>business valuation services</b> help you
                              know the total worth of your company. For business
                              valuation, we use methods like:
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <b>• Discounted Cash Flow (DCF):</b>{" "}
                                  Discounted Cash Flow is the method to decide
                                  valuation after looking at future cash flows
                                  and converting them into present value.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>• Market Comparable Method:</b> In this
                                  method, we compare your company with similar
                                  businesses in the market and then decide the
                                  value of your company or asset.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>• Asset-Based Valuation:</b> Calculates
                                  value from your company's assets and
                                  liabilities.
                                </p>
                              </li>
                            </ul>
                            <p>
                              We check your{" "}
                              <b>
                                financial performance, market position, growth
                                potential and assets
                              </b>
                              . This gives you an accurate and clear picture of
                              your business value.
                            </p>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Know your business's worth accurately</p>
                              </li>
                              <li>
                                <p>
                                  • Make better decisions for growth and
                                  investments
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Understand the strengths and weaknesses of
                                  your business
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 2. M&A Valuation --> */}
                        <div className="row mt-4" id="ma-valuation">
                          <div className="col-lg-12">
                            <h3>2. Mergers & Acquisitions (M&A) Valuation</h3>
                            <p>
                              Business valuation services also become useful in
                              merger and acquisition deals. If you are buying or
                              selling a company, then knowing the correct value
                              is very important. Our business valuation service
                              also includes an M&A valuation service to help in:
                            </p>
                            <ul>
                              <li>
                                <p>
                                  • Assess the financial health and growth
                                  potential
                                </p>
                              </li>
                              <li>
                                <p>• Check market position and risks</p>
                              </li>
                              <li>
                                <p>
                                  • Ensure fair pricing for both buyer and
                                  seller
                                </p>
                              </li>
                            </ul>
                            <p>
                              We give a detailed valuation report, helping you{" "}
                              <b>negotiate the best deal and reduce risks</b>.
                            </p>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Fair valuation for both parties</p>
                              </li>
                              <li>
                                <p>• Better negotiation power</p>
                              </li>
                              <li>
                                <p>• Safer business transactions</p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 3. Real Estate Valuation --> */}
                        <div className="row mt-4" id="real-estate">
                          <div className="col-lg-12">
                            <h3>3. Real Estate Valuation</h3>
                            <p>
                              Real estate is a big part of any business in
                              today's world, which is why real estate valuation
                              becomes more important. Our real estate valuation
                              services include in business valuation services
                              are useful for:
                            </p>
                            <ul>
                              <li>
                                <p>
                                  • Residential, commercial, or industrial
                                  property
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Understanding market trends and location
                                  value
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Evaluating property condition and growth
                                  potential
                                </p>
                              </li>
                            </ul>
                            <p>
                              A clear valuation helps in{" "}
                              <b>buying, selling, financing, or mergers</b>{" "}
                              involving property.
                            </p>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  • Know the real market value of your property
                                </p>
                              </li>
                              <li>
                                <p>• Take smart investment or loan decisions</p>
                              </li>
                              <li>
                                <p>• Plan property transactions carefully</p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 4. Intangible Asset Valuation --> */}
                        <div className="row mt-4" id="intangible-assets">
                          <div className="col-lg-12">
                            <h3>4. Intangible Asset Valuation</h3>
                            <p>
                              Intangible assets like{" "}
                              <b>
                                patents, trademarks, intellectual property and
                                brand value
                              </b>{" "}
                              are very important today.
                            </p>
                            <p>
                              Our <b>intangible asset valuation</b> helps:
                            </p>
                            <ul>
                              <li>
                                <p>
                                  • Assess brand reputation and market position
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Value patents, trademarks, or proprietary
                                  technology
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Leverage these assets for funding, mergers,
                                  or tax planning
                                </p>
                              </li>
                            </ul>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Use intangible assets to raise funds</p>
                              </li>
                              <li>
                                <p>
                                  • Improve business strategy and partnerships
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Ensure correct reporting for compliance and
                                  taxes
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 5. Financial Reporting --> */}
                        <div className="row mt-4" id="financial-reporting">
                          <div className="col-lg-12">
                            <h3>
                              5. Financial Reporting and Compliance Valuation
                            </h3>
                            <p>
                              Financial reporting and compliance are something
                              that always require accurate valuations. India IPO
                              comprehensive business valuation services also
                              help with:
                            </p>
                            <ul>
                              <li>
                                <p>• Goodwill impairment testing</p>
                              </li>
                              <li>
                                <p>
                                  • Fair value accounting of assets and
                                  liabilities
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Employee stock options and benefits
                                  valuation
                                </p>
                              </li>
                            </ul>
                            <p>
                              This ensures your company{" "}
                              <b>meets legal and regulatory requirements</b> and
                              builds trust with investors.
                            </p>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Avoid penalties from regulators</p>
                              </li>
                              <li>
                                <p>• Improve investor confidence</p>
                              </li>
                              <li>
                                <p>• Accurate financial statements</p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 6. Tax Valuation --> */}
                        <div className="row mt-4" id="tax-valuation">
                          <div className="col-lg-12">
                            <h3>6. Tax Valuation</h3>
                            <p>
                              Companies and businesses have to file taxes
                              regularly and a fair valuation always seems
                              helpful in it. That's where certified business
                              valuation services help, which is required for:
                            </p>
                            <ul>
                              <li>
                                <p>• Estate planning and inheritance tax</p>
                              </li>
                              <li>
                                <p>• Gift or transfer taxes</p>
                              </li>
                              <li>
                                <p>• Corporate tax filings</p>
                              </li>
                            </ul>
                            <p>
                              Our <b>tax valuation services</b> make sure your{" "}
                              <b>tax filings are correct</b>, reducing the
                              chances of disputes with authorities.
                            </p>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Minimize tax liability</p>
                              </li>
                              <li>
                                <p>• Ensure legal compliance</p>
                              </li>
                              <li>
                                <p>• Clear documentation for authorities</p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- 7. Shareholder Valuation --> */}
                        <div className="row mt-4" id="shareholder">
                          <div className="col-lg-12">
                            <h3>7. Shareholder and Partnership Valuation</h3>
                            <p>
                              Fair valuation is also important at the time of
                              ownership change, buyout, or disputes. Our
                              business valuation services also include
                              shareholder and partnership valuation, which helps
                              in:
                            </p>
                            <ul>
                              <li>
                                <p>• Shareholder and partnership valuation</p>
                              </li>
                              <li>
                                <p>
                                  • Buyout and ownership restructuring support
                                </p>
                              </li>
                              <li>
                                <p>
                                  • Fair and transparent reports for all
                                  stakeholders
                                </p>
                              </li>
                            </ul>
                            <p>
                              <b>Benefits:</b>
                            </p>
                            <ul>
                              <li>
                                <p>• Smooth ownership transitions</p>
                              </li>
                              <li>
                                <p>• Avoid conflicts during disputes</p>
                              </li>
                              <li>
                                <p>• Support mergers, acquisitions, or exits</p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- How We Work --> */}
                        <div className="row mt-4" id="how-we-work">
                          <div className="col-lg-12">
                            <h2>How Our Business Valuation Services Work</h2>
                            <ul>
                              <li>
                                <p>
                                  <b>1. Consultation:</b> We begin by gaining a
                                  clear understanding of your business goals and
                                  objectives, as well as the purpose for which
                                  the valuation is desired. These steps allow us
                                  to address the right methodology, whether you
                                  need a valuation for borrowing purposes, the
                                  sale or purchase of shares or assets of a
                                  business, tax compliance issues and financial
                                  reporting, among other needs.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>2. Data Collection:</b> Our team gathers
                                  all relevant data, such as financials, asset
                                  details, industry and market information and
                                  legal documents. Gathering accurate and
                                  complete data ensures that the valuation
                                  reflects the actual financial and operational
                                  status of your company.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>3. Analysis:</b> We employ widely accepted
                                  analyses and methodologies, such as Discounted
                                  Cash Flow, Market Comparable, or Asset-Based
                                  Valuation, which help us really get inside
                                  your business. We also factor growth
                                  prospects, market conditions and risks to
                                  arrive at a comprehensive and reliable value.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>4. Report Preparation:</b> Based on the
                                  analysis, a comprehensive valuation report is
                                  prepared, which covers details of the method
                                  adopted, assumptions applied and value arrived
                                  at. The structure of the report is
                                  straightforward and helps readers to
                                  comprehensively grasp and easily apply when
                                  needed.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>5. Discussion & Recommendations:</b>{" "}
                                  Finally, we present the business valuation
                                  services report to you, where all the findings
                                  use to be explained in simple language. We
                                  also provide strategic advice and
                                  recommendations based on the valuation that
                                  help you in making informed business,
                                  investment, or compliance decisions
                                  confidently.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- Industry-Specific Services --> */}
                        <div className="row mt-4" id="industry-specific">
                          <div className="col-lg-12">
                            <h2>
                              Industry-Specific Business Valuation Services
                            </h2>
                            <ul>
                              <li>
                                <p>
                                  <b>1. Technology Startups:</b> In the case of
                                  technology startups, we are looking at the
                                  intellectual property, innovation and market
                                  potential. The number is arrived at with
                                  factors like the uniqueness of the product,
                                  its growth potential and the types of revenue
                                  it could generate, since typical stuff
                                  evaluation doesn't really reflect the actual
                                  value of a startup.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>2. Manufacturing Firms:</b> For the
                                  manufacturing business, valuation is often
                                  based on workers, inventory of goods, property
                                  and capacity to generate income. Market
                                  conditions, production efficiency and
                                  operational risks are also considered to
                                  ensure that the valuation provided is
                                  realistic.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>3. Real Estate Companies:</b> Valuation of
                                  real estate businesses depends on property
                                  location, market demand and condition. We
                                  analyze potential appreciation, rental income
                                  and future development opportunities to
                                  provide an accurate estimate of the business's
                                  real estate assets.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>4. Healthcare & Pharma:</b> In healthcare
                                  and pharma, patents, regulatory approvals,
                                  brand reputation and revenue potential are key
                                  factors. We evaluate market shares, growth
                                  potential and necessary parameters of
                                  compliance to get a realistic idea of a
                                  company's value.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>5. Financial Institutions:</b> Banks, NBFCs
                                  and financial institutions are valued by their
                                  cash flows, loan books, risk management &
                                  regulations. The valuation also considers
                                  market position, credit quality and financial
                                  stability to reflect the true business value.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- Benefits --> */}
                        <div className="row mt-4" id="benefits">
                          <div className="col-lg-12">
                            <h2>
                              Benefits of Professional Business Valuation
                              Services
                            </h2>
                            <ul>
                              <li>
                                <p>
                                  <b>1. Better Decision-Making:</b> You are
                                  better placed to take strategic decisions, be
                                  it for expansion, fundraising, or entering new
                                  markets, among others, when you have a correct
                                  view of your company's worth. All choices that
                                  come through true valuation lower the prospect
                                  of fiscal loss.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>2. Investor Confidence:</b> A professional
                                  valuation provides credibility to your
                                  business. Investors, banks and funding
                                  agencies gain trust in your company's
                                  financials, which makes it easier to attract
                                  investments and secure loans at fair terms.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>3. Fair Negotiation:</b> When it comes to
                                  mergers, acquisitions, or partnerships and the
                                  protection of all investors in a company or
                                  fund-accurate valuations on assets are a
                                  necessity. This minimises disputes, prevents
                                  conflicts and facilitates agreement on fair,
                                  honest terms.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>4. Risk Management:</b> Valuation will help
                                  you pinpoint risks in your business, whether
                                  it's from underperforming assets, liabilities,
                                  or market pressures. Identifying these trends
                                  in advance provides an opportunity to address
                                  those risks and strengthen business stability
                                  over time.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>5. Compliance:</b> Accurate valuation
                                  ensures your company meets accounting,
                                  reporting and tax regulations. This prevents
                                  penalties, reduces audit issues and ensures
                                  financial transparency for regulators,
                                  investors and stakeholders.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- Why Choose Us --> */}
                        <div className="row mt-4 " id="why-choose-us">
                          <div className="col-lg-12">
                            <h2>Why Choose India IPO</h2>
                            <ul>
                              <li>
                                <p>
                                  <b>1. Experienced Experts:</b> Our team has
                                  years of experience in the business valuation
                                  services across industries and valuation
                                  methods. They understand the nuances of
                                  different sectors, ensuring that every
                                  valuation is accurate, reliable and customized
                                  to your business requirements.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>2. Customized Solutions:</b> All businesses
                                  are different and so are their requirements
                                  for valuations. At India IPO, we offer
                                  customized business valuation services based
                                  on your business size, industry and purpose –
                                  be it for M&A support, capital raising,
                                  regulatory compliance, or strategic planning.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>3. Clear Reports:</b> Our valuation reports
                                  are easy to understand, with detailed
                                  explanations of methodology, assumptions and
                                  results. This helps business owners and
                                  stakeholders make informed decisions without
                                  confusion.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>4. Compliance Assurance:</b> All our
                                  valuations are prepared in accordance with
                                  GAAP/ IFRS/ Indian regulatory standards. This
                                  is a way to comply with the law, avoid fines
                                  and gain legitimacy in the eyes of investors
                                  and governments.
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>5. Trusted Partner:</b> India IPO has built
                                  a reputation for reliability and
                                  professionalism. We assist startups, SMEs and
                                  large enterprises, helping them make smart
                                  business decisions with confidence through
                                  accurate and actionable valuation insights.
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* <!-- Conclusion --> */}
                        <div className="row mt-4 ">
                          <div className="col-lg-12">
                            <h2>Conclusion</h2>
                            <p>
                              If you are a founder, investor, or corporate
                              leader, it is important to understand the
                              estimation of what your business is really worth.
                              India IPO's business valuation services provide
                              you with credible, dependable and actionable
                              insights to build your business, meet regulations
                              and identify growth opportunities.
                            </p>
                            <p>
                              Contact India IPO for a business valuation today
                              and gain access to what your company is really
                              worth.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "corporate-finance-services" ? (
                  <div className="space-y-20">
                    <div className="flex flex-col gap-12 relative">
                      <div className="w-full space-y-20">
                        <div
                          id="finance-overview"
                          className="service-content-box service-content scroll-mt-24"
                        >
                          <div className="mb-0">
                            <div className="row pt-2">
                              <div className="col-lg-12" id="corporate-finance">
                                <h2>Understanding Corporate Finance </h2>
                                <p>
                                  Corporate finance forms the pillar of
                                  financial planning and the long-term success
                                  of any business. It is a combination of a
                                  broad range of financial plans and decisions
                                  that assist business entities to distribute
                                  resources, manage risks and produce returns to
                                  their shareholders. The major goal of
                                  corporate finance services is to maximize the
                                  capital structure of a company and facilitate
                                  smooth financial processes in order to achieve
                                  sustainable growth.
                                </p>
                                <p>
                                  At its core, corporate finance is centered
                                  around three major areas:
                                </p>
                                <div className="orhp m-2">
                                  <ul>
                                    <li id="faster-process">
                                      <b>Capital Budgeting</b> – making
                                      decisions about where to invest for future
                                      growth
                                    </li>
                                    <li id="targeted-investor-base">
                                      <b>Capital Structure </b> – determines the
                                      best mix of debt and equity to maximize
                                      growth
                                    </li>
                                    <li id="targeted-investor-base">
                                      <b>Working Capital Management </b> –
                                      Management of day-to-day financial
                                      operations
                                    </li>
                                  </ul>
                                  <p>
                                    India IPO provides customized corporate
                                    finance services to guide companies through
                                    these areas with clarity and confidence. Our
                                    regulatory knowledge, access to investors
                                    and intimate knowledge of the changing
                                    capital markets in India form the basis of
                                    our services. Corporate bonds and debentures
                                    are the two most important elements that we
                                    assist companies with and they are the most
                                    vital tools of long-term capital planning.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12" id="bonds">
                              <h2>
                                Corporate Bonds: Structured Capital for
                                Long-Term Growth{" "}
                              </h2>
                              <p>
                                Raising capital by issuing corporate bonds has
                                become a more commonly used alternative to
                                equity dilution or conventional loans. These are
                                fixed-income securities that enable businesses
                                to borrow money from investors on the condition
                                that they will repay with interest, which makes
                                them suitable for firms that need scalable
                                financing but want to maintain ownership.
                              </p>
                              <p>
                                India IPO provides end-to-end corporate finance
                                services in this domain by:
                              </p>
                              <div className="orhp m-2">
                                <ul>
                                  <li id="faster-process">
                                    <b>Strategic Structuring: </b> We
                                    collaborate with every client to establish
                                    the most advantageous bond conditions,
                                    including tenor and coupon rate, protective
                                    covenants based on the specific business
                                    objectives and credit profile.{" "}
                                  </li>
                                  <li id="targeted-investor-base">
                                    <b>Market Intelligence: </b> Having
                                    real-time market data and investor
                                    sentiment, we assist businesses in knowing
                                    the best interest rates and issuance
                                    conditions depending on the current economic
                                    and market conditions.
                                  </li>
                                  <li id="targeted-investor-base">
                                    <b>Investor Access: </b> We use our
                                    extensive network of institutional
                                    investors, mutual funds, pension funds and
                                    large corporations to match issuers with
                                    quality bond buyers who are well matched to
                                    the risk-return profile of the company.{" "}
                                  </li>
                                </ul>
                                <p>
                                  By using these corporate finance services,
                                  businesses to access capital more readily and
                                  obtain the funds they require to grow, upgrade
                                  their technology, acquire or refinance
                                  existing debt, without giving up ownership.
                                </p>
                              </div>
                            </div>
                            <div id="debentures">
                              <h2>
                                Debentures: Flexible Debt Instruments for
                                Targeted Financing{" "}
                              </h2>
                              <p>
                                Debenture is another powerful instrument of
                                corporate finance, which is a long-term debt
                                instrument and is more flexible and cheaper than
                                conventional loans. Debentures enable companies
                                to raise capital by borrowing funds at a fixed
                                or floating interest rate and they are repaid at
                                a future date.
                              </p>
                              <p>
                                India IPO specializes in helping businesses
                                leverage debentures effectively through:
                              </p>
                              <div className="orhp m-2">
                                <ul>
                                  <li id="faster-process">
                                    <b>Customized Structuring: </b> Our team
                                    works with clients to develop a debenture
                                    structure that suits their cash flow
                                    capacity and strategic objectives, secured
                                    or unsecured, convertible or
                                    non-convertible.{" "}
                                  </li>
                                  <li id="targeted-investor-base">
                                    <b>Investor Outreach: </b> We also offer
                                    access to reputable investors like NBFCs,
                                    insurance companies, family offices and HNIs
                                    who are already in the business of investing
                                    in private debt and are seeking structured
                                    investments.
                                  </li>
                                  <li id="targeted-investor-base">
                                    <b>Legal & Documentation Support: </b>{" "}
                                    Starting with drafting Information
                                    Memoranda, to filing with SEBI and other
                                    relevant authorities, our compliance experts
                                    make sure that all the steps of the issuance
                                    are of the highest standards.{" "}
                                  </li>
                                  <li id="targeted-investor-base">
                                    <b>Market Positioning : </b> We also advise
                                    on timing, pricing and promotion of the
                                    debenture offering to enhance market uptake
                                    and trust among investors.{" "}
                                  </li>
                                </ul>
                                <p>
                                  Corporate finance services offered by India
                                  IPO help companies to raise capital in the
                                  form of debentures to finance new projects, to
                                  meet working capital requirements, or to
                                  manage financial restructuring, without
                                  diluting equity and control.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-12" id="why-Choose">
                              <h2>
                                Why Choose India IPO for Corporate Finance
                                Services?{" "}
                              </h2>
                              <p>
                                In India IPO, we do not simply offer
                                fundraising; we strategically facilitate it. Our
                                corporate finance services are customized to
                                contemporary Indian businesses who desire to
                                grow without friction, tap into capital markets
                                with confidence and navigate through complicated
                                regulatory frameworks without being overwhelmed.
                              </p>
                              <p>
                                Being an SME, growth-stage startup or an
                                established enterprise, India IPO is your
                                capital markets partner to take you through the
                                entire financing process, beginning with
                                planning and ending with execution.
                              </p>
                              <p>
                                <b>
                                  Let your capital work smarter. Let your
                                  company grow stronger with India IPO’s expert
                                  corporate finance services.{" "}
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "financial-modelling-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="modelling-overview"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <p className="text-slate-700 text-lg leading-relaxed">
                          Financial modelling is a core capability at India IPO,
                          enabling businesses to forecast performance, evaluate
                          strategies and support capital decisions. Our models
                          are not templates; they are dynamic, multi-layered
                          frameworks designed to assess risk, optimise outcomes
                          and enhance investor confidence.
                        </p>

                        <div className="row pt-2">
                          <div className="col-lg-12 col-md-12 col-sm-12"></div>
                          <div className="col-lg-12" id="financial-modelling">
                            <p>
                              Financial modelling is one of the specialties at
                              India IPO, where we assist businesses in
                              visualizing their financial future in a clear and
                              precise way. Our end-to-end financial modelling
                              services help enterprises to make predictions,
                              measure the effects of strategic decisions and
                              overcome financial losses. To support any business
                              decision, whether you are interested in increasing
                              your business, raising capital, or an IPO, we will
                              provide you with sound and data-driven insights.
                            </p>
                            <p>
                              We do not simply develop models, but we develop
                              financial strategies that can lead to growth,
                              increase profitability and increase investor
                              confidence.
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4" id="e2">
                          <div className="col-lg-12">
                            <h2>
                              How India IPO Helps You With Financial Modelling
                            </h2>
                            <p>
                              Our financial modelling services will offer you
                              customized, smart and sensible financial models to
                              achieve your business goals. Here is how we can
                              help you with precision-based modelling expertise:
                            </p>
                            <div className="row mt-4">
                              <div className="col-lg-12" id="e3">
                                <h3>
                                  1. Personalized Financial Models As Per Your
                                  Business Needs{" "}
                                </h3>
                                <p>
                                  Each business has its own financial system and
                                  business dynamics. At India IPO, we design
                                  customized financial models that portray the
                                  distinctive tastes of your company. Our
                                  financial modelling service provides
                                  customized frameworks, irrespective of whether
                                  you are in manufacturing, retail, technology,
                                  real estate, or emerging sectors, that will be
                                  aligned to your business objectives.
                                </p>
                                <p>
                                  Our models are not just templates; we use your
                                  business KPIs, industry-specific variables and
                                  operational strategies to make sure that your
                                  financial planning and forecasting are
                                  accurate.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-lg-12" id="e4">
                                <h3>
                                  2. Complete Financial Forecasting and Scenario
                                  Planning
                                </h3>
                                <p>
                                  Strategic decision-making involves having a
                                  clear perception of what could happen in the
                                  future. Our financial modelling services
                                  involve comprehensive financial forecasting so
                                  that you can forecast revenues, costs, cash
                                  flows and profitability in both short-term and
                                  long-term periods. We also perform scenario
                                  analysis, which is used to simulate different
                                  business environments—from favorable growth to
                                  adverse downturns. This will allow you to know
                                  how financial changes in terms of market
                                  fluctuations, policy changes, or operational
                                  changes will affect your finances so that you
                                  can be ready to face different possibilities
                                  using data-driven strategies.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4">
                              <div className="col-lg-12" id="e5">
                                <h3>
                                  3. Financial Statements Forecasting with
                                  Granular Insights
                                </h3>
                                <p>
                                  Our financial modelling services are founded
                                  on proper forecasting of your Profit and Loss
                                  (P&L) Statement, Balance Sheet and Cash Flow
                                  Statement. We build integrated models to
                                  provide you a 360-degree view of your
                                  financial situation so that you can track
                                  performance metrics such as revenue growth,
                                  gross margins, operating efficiencies, working
                                  capital needs and liquidity levels over time.
                                </p>
                                <p>
                                  These forecasts are significant in strategic
                                  planning, internal performance monitoring and
                                  external reporting to investors, lenders and
                                  stakeholders.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4" id="e6">
                              <div className="col-lg-12">
                                <h3>
                                  4. Comprehensive Business Valuation Models
                                </h3>
                                <p>
                                  You are raising funds, preparing to
                                  merge/acquire a company, or negotiating with
                                  investors; it is important to know your
                                  business valuation. India IPO financial
                                  modelling services offer comprehensive
                                  business valuation models that are based on
                                  the industry standard approaches, such as
                                  Discounted Cash Flow (DCF), Comparable Company
                                  Analysis (CCA) and Precedent Transaction
                                  Analysis.
                                </p>
                                <p>
                                  Our valuation models will enable you to make a
                                  strong case when it comes to negotiations, as
                                  you will be aware of the real value of your
                                  business and be able to negotiate the best
                                  terms.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4" id="e7">
                              <div className="col-lg-12">
                                <h3>
                                  5. Strategic Budgeting and Long-Term Financial
                                  Planning
                                </h3>
                                <p>
                                  Effective budgeting is the pillar of good
                                  financial management. Our financial modelling
                                  services assist companies in coming up with
                                  realistic and detailed budgets that can
                                  support their strategic goals. We help you in
                                  setting realistic financial targets,
                                  monitoring actual and planned performance and
                                  maintaining a disciplined use of resources.
                                </p>
                                <p>
                                  Through proper financial planning, businesses
                                  are able to plan expansions, capital
                                  expenditures and streamline operational
                                  efficiencies with a high degree of comfort and
                                  confidence without compromising financial
                                  health and investor confidence.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4" id="e8">
                              <div className="col-lg-12">
                                <h3>
                                  6. Sensitivity Analysis and Risk Management
                                  Modelling
                                </h3>
                                <p>
                                  Businesses are full of uncertainty. Our
                                  financial modelling services also incorporate
                                  sensitivity analysis so that we know how
                                  fluctuations in key variables such as sales
                                  volume, interest rates, raw material costs, or
                                  currency exchange rates can impact your
                                  financial performance.
                                </p>
                                <p>
                                  We also assist you in developing risk
                                  management models to detect possible
                                  weaknesses in your financial framework,
                                  enabling you to come up with proactive
                                  mitigation strategies and ensure business
                                  resilience under fluctuating economic
                                  conditions.
                                </p>
                              </div>
                            </div>
                            <div className="row mt-4" id="e9">
                              <div className="col-lg-12">
                                <h3>
                                  7. Professional Investor and Lender-Ready
                                  Financial Models
                                </h3>
                                <p>
                                  Obtaining investment or debt capital needs
                                  more than a great business concept; it needs
                                  professional and transparent financial
                                  records. India IPO financial modelling
                                  services are created to build investor-ready
                                  financial models that convey your business
                                  potential, profitability and growth strategy.
                                </p>
                                <p>
                                  Our models are well organized, easy to
                                  understand and compelling, which makes you
                                  more credible to investors, venture
                                  capitalists and financial institutions. With
                                  our support, you can present a strong
                                  financial case that boosts your chances of
                                  securing funding.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e10">
                            <h3>
                              Why Choose Financial Modelling Services by India
                              IPO?
                            </h3>
                            <div className="orhp m-2">
                              <ul>
                                <li id="">
                                  <b>Industry-Specific Expertise :</b> Deep
                                  understanding of different industries and
                                  their financial characteristics.
                                </li>
                                <li id="">
                                  <b>Custom-Built Models :</b>Custom-Built
                                  Models: There are no cookie-cutter models; all
                                  models are custom-built for your business.
                                </li>
                                <li id="">
                                  <b>Investor-Focused Approach:</b> Our models
                                  are built for meeting the demands of investors
                                  and lenders.
                                </li>
                                <li id="">
                                  <b>End-to-End Support:</b> We will be there
                                  every step of the way, from initial modelling
                                  to investor presentations.
                                </li>
                                <li id="">
                                  <b>Accuracy & Transparency:</b> Data-driven
                                  and highly transparent and precise insights.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e11">
                            <h3>
                              Get Started with India IPO's Financial Modelling
                              Services
                            </h3>
                            <p>
                              Are you ready to build a strategic financial
                              roadmap for your business? Partner with India IPO
                              to leverage our financial modelling services to
                              translate data into strategic actions. Whether you
                              are trying to grow operations, find investors, or
                              mitigate financial risks, our team will provide
                              you with the tools and information needed to make
                              informed decisions.
                            </p>
                            <p>
                              Contact India IPO today to get a consultation and
                              the next step in growing your business.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="strategic-decisions"
                      className="bg-[#001529] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden scroll-mt-24"
                    >
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#f59e08]/5 rounded-full blur-[120px]" />
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                          <h3 className="text-3xl md:text-4xl font-black leading-tight">
                            Turn Financial Data into
                            <span className="text-[#f59e08]">
                              Strategic Decisions
                            </span>
                          </h3>
                          <p className="text-white/60 text-sm leading-relaxed">
                            We go beyond modelling, delivering structured
                            financial insights that support capital planning,
                            risk management and investor communication.
                          </p>
                          <div className="space-y-4 pt-4">
                            {[
                              "Industry-Specific Forecasting Models",
                              "100% Customized (No Templates)",
                              "Investor & Lender-Ready Outputs",
                              "End-to-End Support, Including Investor Presentation",
                            ].map((check, ci) => (
                              <div key={ci} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-[#f59e08]/20 flex items-center justify-center shrink-0">
                                  <CheckCircle className="h-3.5 w-3.5 text-[#f59e08]" />
                                </div>
                                <span className="text-sm font-bold text-white/80">
                                  {check}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm space-y-6">
                          <h4 className="text-xl font-black text-[#f59e08]">
                            Ready to Build a Strategic Roadmap?
                          </h4>
                          <p className="text-white/60 text-xs leading-relaxed font-semibold">
                            Transform your financial data into actionable
                            decisions with expert-led financial modelling and
                            advisory support.
                          </p>
                          <div className="flex flex-col gap-3 pt-4">
                            <Button
                              asChild
                              className="bg-[#f59e08] hover:bg-[#c27c00] text-[#001529] font-black h-14 rounded-2xl"
                            >
                              <Link to="/contact">
                                Request Expert Consultation
                              </Link>
                            </Button>
                            <div className="text-center">
                              <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">
                                Or Call Directly
                              </span>
                              <p className="text-[#f59e08] font-black text-lg">
                                +91-74283-37280
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "project-finance-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="project-finance-overview"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <div className="flex items-center gap-3 mb-4"></div>
                        <div className="row pt-2">
                          <div className="col-lg-12">
                            <h2 id="e1">What is Project Finance? </h2>
                            <p className="mt-3">
                              Project finance is a form of financing long-term,
                              infrastructure, industrial and large-scale
                              development projects where the cash flows and
                              assets of the project itself are used as
                              collateral. Therefore, it is also referred to as
                              infrastructure finance services or project
                              financing solutions. Project finance does not rely
                              on the financial situation of the company that
                              sponsors the project; instead, the main
                              consideration is the future ability of the project
                              to generate revenues.
                            </p>
                            <p className="mt-2">
                              This financing is normally applied to large
                              capital-intensive projects like power plants,
                              highways, ports, airports, renewable energy
                              projects and real estate developments. The
                              repayment of loans and the returns on investments
                              are made by the success of the project's
                              operation.
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e2">
                            <div className="orhp mt-2">
                              <b> Key Features of Project Finance Services </b>
                              <ul className="mt-2">
                                <li>
                                  <b>
                                    Non-Recourse or Limited Recourse Financing:
                                  </b>{" "}
                                  The lenders depend on the cash flow of the
                                  project for repayment.{" "}
                                </li>
                                <li>
                                  <b>Special Purpose Vehicle (SPV):</b> A
                                  separate legal entity created to isolate
                                  project risks.
                                </li>
                                <li>
                                  <b>Cash Flow Based Repayment:</b> Repayment in
                                  which the amount to be repaid is based on
                                  future revenues of the project.
                                </li>
                                <li>
                                  <b>Risk Allocation:</b> Risks are shared among
                                  multiple stakeholders.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e3">
                            <div className="row mt-3">
                              <div className="col-lg-12" id="e4">
                                <h2>
                                  How India IPO Helps You with Project Finance
                                  Services
                                </h2>
                                <p>
                                  At India IPO, we provide a complete package of
                                  services to assist in your project financing.
                                  We assist you in overcoming the challenges of
                                  funding large-scale projects by advising on
                                  the financing structure and the most
                                  appropriate sources of funds. This is how we
                                  can help:
                                </p>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e5">
                                    <h3>1. Personalized Financing Solutions</h3>
                                    <div className="orhp m-2">
                                      <p>
                                        We know that each project is special. We
                                        will assist you in developing a
                                        customized project finance strategy when
                                        you are building a new plant, developing
                                        an infrastructure, or expanding on a
                                        large scale. Our professionals draft the
                                        most appropriate structure that fits the
                                        nature, scope and financial requirements
                                        of your project.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e6">
                                    <h2>
                                      2. Comprehensive Eligibility Studies and
                                      Risk Analysis
                                    </h2>
                                    <div className="orhp m-2">
                                      <p>
                                        We carry out extensive Eligibility
                                        studies and risk analysis before
                                        proceeding to finance your project so
                                        that we do not waste funds on an
                                        unworkable project. This analysis
                                        assists in determining the possible
                                        payback on the investment, measures the
                                        project risks and possible obstacles.
                                        Knowing these factors well, we suggest
                                        the best financing structure.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e7">
                                    <h3>
                                      3. Structuring Project Finance Deals
                                    </h3>
                                    <div className="orhp m-2">
                                      <p>
                                        Project finance is a complicated process
                                        that involves the development of a
                                        financing structure that best suits the
                                        project's requirements and risk profile.
                                        At India IPO, we are specialists in
                                        Project Finance Services and structuring
                                        project finance transactions, both debt
                                        and equity, to achieve the best possible
                                        terms for our clients. We also ensure
                                        that the project is financed
                                        appropriately as per the project’s
                                        future cash flows and assets. This
                                        offers the required capital with minimal
                                        risks to all the parties involved.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e8">
                                    <h3>
                                      4. Identifying the Right Financial
                                      Institutions and Investors
                                    </h3>
                                    <p>
                                      We have a wide coverage of financial
                                      institutions, investors and lenders to
                                      make sure that we pair the right partners
                                      to your project. You may need debt capital
                                      in the form of loans or bonds, or equity
                                      capital in the form of venture capitalists
                                      and private equity firms. We help you find
                                      the most suitable sources of capital to
                                      fund your project.{" "}
                                    </p>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e9">
                                    <h3>5. Optimizing Debt Financing Terms</h3>
                                    <div className="orhp m-2">
                                      <p>
                                        At India IPO, we do everything in our
                                        power to obtain the most advantageous
                                        financing conditions for your project.
                                        We also negotiate with lenders to
                                        achieve the best interest rates,
                                        repayment schedules and loan agreements
                                        that suit the cash flow model of your
                                        project. By understanding the unique
                                        needs of your project, we ensure the
                                        financing structure is designed to be
                                        sustainable in the long term.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e9.1">
                                    <h3>6. Mitigating Project Risks </h3>
                                    <div className="orhp m-2">
                                      <p>
                                        Our Project Finance Services assist in
                                        the management and mitigation of risks
                                        involved in large projects by
                                        structuring the financing in a manner
                                        that considers the possible risks. These
                                        are risk-sharing tools such as
                                        guarantees, insurance and hedging. These
                                        safeguard the lenders and the borrower
                                        against any unforeseen event. We have
                                        extensive experience to guide you
                                        through issues that can come up during
                                        the project's life.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e9.2">
                                    <h3>
                                      7. Assistance to Compliance and Regulation
                                    </h3>
                                    <div className="orhp m-2">
                                      <p>
                                        Compliance with various legal and
                                        regulatory authorities is part of any
                                        project finance deal. These complexities
                                        are dealt with at the India IPO. We make
                                        sure that your project financing is
                                        within the regulatory provisions and is
                                        legally acceptable. We take care of all
                                        the paperwork, permits and formalities
                                        to ensure that the financing process is
                                        easy.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e10">
                            <h3>Industries We Serve</h3>
                            <p>
                              India IPO provides Project Finance Services across
                              a wide range of industries, including:
                            </p>
                            <div className="orhp m-2">
                              <ul>
                                <li id="">
                                  Power & Energy (Thermal, Solar, Wind, Hydro)
                                </li>
                                <li id="">
                                  Infrastructure Development (Roads, Highways,
                                  Bridges)
                                </li>
                                <li id="">
                                  Ports, Airports and Logistics Infrastructure
                                </li>
                                <li id="">
                                  Real Estate & Commercial Property Developments
                                </li>
                                <li id="">Manufacturing & Industrial Units</li>
                                <li id="">
                                  Healthcare Infrastructure (Hospitals, Medical
                                  Facilities)
                                </li>
                                <li id="">
                                  Renewable Energy & Sustainable Projects
                                </li>
                                <li id="">Manufacturing & Industrial Units</li>
                                <li id="">
                                  Public-Private Partnership (PPP) Initiatives
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e11">
                            <h2>
                              Our Project Finance Process: Step-by-Step Approach
                            </h2>

                            <div className=" m-2">
                              <ul className="orhp">
                                <li>
                                  <span>1. </span>
                                  <b>
                                    {" "}
                                    Project Assessment & Initial
                                    Consultation:{" "}
                                  </b>
                                  Understanding the project scope, financial
                                  needs and objectives.
                                </li>
                                <li>
                                  <span>2. </span>{" "}
                                  <b>
                                    Eligibility Study & Financial
                                    Modelling:{" "}
                                  </b>
                                  Conducting in-depth viability analysis, risk
                                  assessment and preparing detailed financial
                                  models.
                                </li>
                                <li>
                                  <span>3. </span>
                                  <b> Structuring & Documentation: </b>{" "}
                                  Designing an optimal financing structure and
                                  preparing essential documentation.
                                </li>
                                <li>
                                  <span>4. </span>{" "}
                                  <b> Sourcing Investors & Lenders: </b>Engaging
                                  with suitable financial institutions,
                                  investors and syndicates.
                                </li>
                                <li>
                                  <span>5. </span>
                                  <b>Negotiating Terms & Finalizing Deals: </b>
                                  Securing the best possible financing terms
                                  through negotiations.
                                </li>
                                <li>
                                  <span>6. </span>{" "}
                                  <b> Compliance & Regulatory Approvals:</b>{" "}
                                  Managing all regulatory filings, permits and
                                  legal compliance.{" "}
                                </li>
                                <li>
                                  <span>7. </span>{" "}
                                  <b> Post-Funding Advisory & Monitoring:</b>{" "}
                                  Providing ongoing advisory support to ensure
                                  smooth project execution.{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e12">
                            <h3>
                              Why Choose India IPO for Project Finance Services?
                            </h3>
                            <div className="orhp m-2">
                              <ul>
                                <li id="">
                                  Customized financing strategies aligned with
                                  your project’s unique needs.
                                </li>
                                <li id="">
                                  End-to-end support from Eligibility studies to
                                  fund disbursement.
                                </li>
                                <li id="">
                                  Strong network of lenders, investors and
                                  financial institutions.
                                </li>
                                <li id="">
                                  Expertise in structuring complex project
                                  finance deals.
                                </li>
                                <li id="">
                                  Comprehensive risk assessment and mitigation
                                  strategies.
                                </li>
                                <li id="">
                                  Full regulatory and compliance management.
                                </li>
                                <li id="">
                                  Proven track record in managing large-scale
                                  projects.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      id="why-us-project"
                      className="bg-[linear-gradient(135deg,_rgb(245,158,8),_rgb(217,119,6))] border border-slate-200 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12 scroll-mt-24"
                    >
                      <div className="flex-1 space-y-6">
                        <h3 className="text-3xl font-black text-[#001529]">
                          Why Choose{" "}
                          <strong style={{ color: "white" }}>India IPO?</strong>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {[
                            "Customised strategies aligned with your project lifecycle",
                            "End-to-end execution from Eligibility to fund disbursement",
                            "Access to a strong network of lenders and institutional investors",
                            "Proven experience in large-scale infrastructure and industrial projects",
                            "Expertise in structuring risk-optimised project finance solutions",
                          ].map((point, pi) => (
                            <div key={pi} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />
                              <span className="text-sm font-bold text-slate-700">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button
                          asChild
                          className="bg-[#001529] hover:bg-[#003366] text-white h-14 rounded-2xl px-10 font-bold mt-4 shrink-0"
                        >
                          <Link to="/contact">
                            Fund Your Next Big Project{" "}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                      </div>
                      <div className="w-full md:w-1/3 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                          <Phone className="h-8 w-8 text-[#f59e08]" />
                        </div>
                        <h4 className="font-black text-[#001529]">
                          Direct Consultation
                        </h4>
                        <p className="text-slate-400 text-xs font-bold leading-relaxed">
                          Speak with our Project Finance specialists today.
                        </p>
                        <div className="text-2xl font-black text-[#001529]">
                          +91-74283-37280
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "debt-syndication-services" ? (
                  <div className="space-y-20">
                    <div className="service-content-box service-content">
                      <div className="row pt-2">
                        <div className="col-lg-12">
                          <p className="mt-3">
                            In a dynamic business environment where access to
                            large-scale capital is a key driver for growth,
                            expansion and project execution, India IPO provides
                            specialized Debt Syndication Services to address
                            complex funding requirements. We collaborate with
                            companies to design, organize, and implement
                            multi-lender debt financing solutions, so you can
                            get the right funds with competitive terms and
                            minimize the risks of financing.
                          </p>
                          <p className="mt-2">
                            Debt Syndication at India IPO is not merely a loan
                            arrangement business, but one that develops
                            strategic financial solutions to fuel your business
                            ambitions.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e2">
                          <h2>What is Debt Syndication? </h2>
                          <p className="mt-2">
                            Debt Syndication is the process of raising a large
                            amount of debt capital by a group of lenders (banks,
                            NBFCs, financial institutions, global investors)
                            organized by a financial advisor or lead arranger.
                            It is done when the loan amount is so large that it
                            cannot be given by a single lender or when the risk
                            has to be spread among various financiers.
                          </p>
                          <div className="orhp mt-2">
                            Instead of depending on one lender, businesses opt
                            for syndication to:
                            <ul>
                              <li>Get access to bigger funds </li>
                              <li>Negotiate for better loan terms</li>
                              <li>Spread credit risk</li>
                              <li>Get flexible and structured funding plans</li>
                            </ul>
                          </div>
                          <div className="orhp mt-2">
                            <b> Debt Syndication </b> Services are essential
                            for:
                            <ul>
                              <li>Large Corporates & Mid-sized Companies </li>
                              <li>Real Estate Developers and Infrastructure</li>
                              <li>
                                Startups & Growing Enterprises that require
                                organized debt rounds
                              </li>
                              <li>
                                Businesses executing capital-intensive projects
                                or expansions
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e3">
                          <h2>
                            Why are Debt Syndication Services Important in the
                            Current Market?{" "}
                          </h2>
                          <div className="orhp m-2">
                            At a time when capital demands are increasing along
                            with tiger credit policies and evolving financial
                            regulations, businesses may not be able to raise
                            large sums of money through traditional
                            single-lender financing. Debt Syndication Services
                            bridge this gap by:
                            <ul>
                              <li id="faster-process">
                                Creating access to diversified funding sources
                              </li>
                              <li id="confidentiality">
                                Providing competitive loan rates through
                                competitive bidding among lenders
                              </li>
                              <li>
                                Offering customized debt structuring (tenure,
                                repayment schedules, interest rates)
                              </li>
                              <li>
                                Reducing the financial risk burden on just one
                                lender
                              </li>
                              <li>
                                Providing consultancy services to come up with
                                solutions to complex regulatory, financial and
                                compliance needs
                              </li>
                            </ul>
                            <h3 id="e3.1">
                              Comprehensive Debt Syndication Services of India
                              IPO
                            </h3>
                            <p>
                              India IPO offers Debt Syndication Services on an
                              end-to-end basis according to the specific
                              requirements of a client. We aren't just lender
                              arrangers, we are your financial strategy partner
                              and we ensure that all the elements of your debt
                              financing are finely tuned to be successful.
                            </p>
                            <div className="orhp mt-4 ">
                              <b> Our Debt Syndication Solutions Include:</b>
                              <ul>
                                <ol className="mt-3">
                                  1.<b> Term Loan Syndication:</b> For capital
                                  expenditures, infrastructure projects,
                                  business expansion, and long-term
                                  investments.{" "}
                                </ol>
                                <ol>
                                  2.<b> Working Capital Syndication:</b> To
                                  finance operating and liquidity cash
                                  requirements.
                                </ol>
                                <ol>
                                  3.
                                  <b>
                                    {" "}
                                    External Commercial Borrowings (ECB):
                                  </b>{" "}
                                  Syndication of foreign currency loans for
                                  eligible businesses.
                                </ol>
                                <ol>
                                  4. <b> Project Finance Syndication:</b>{" "}
                                  Financing of major infrastructure, energy or
                                  industry projects.
                                </ol>
                                <ol>
                                  5.{" "}
                                  <b> Structured Debt & Mezzanine Financing:</b>{" "}
                                  Hybrid funding where there is a mix of debt
                                  and equity.
                                </ol>
                                <ol>
                                  6.{" "}
                                  <b>
                                    {" "}
                                    Loan Against Property/Assets & Receivables:
                                  </b>{" "}
                                  Unlocking value from existing assets for
                                  funding needs.
                                </ol>
                                <ol>
                                  7.{" "}
                                  <b>
                                    {" "}
                                    Refinancing & Debt Restructuring
                                    Syndication:
                                  </b>{" "}
                                  For optimizing existing debt portfolios and
                                  enhancing cash flows.
                                </ol>
                              </ul>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-12" id="e4">
                              <h2>Debt Syndication Process at India IPO</h2>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e5">
                                  <h3>
                                    1. Detailed Requirement Assessment &
                                    Strategy Planning
                                  </h3>
                                  <div className="orhp m-2">
                                    <p>
                                      We begin by having a deep understanding of
                                      your funding requirements, business
                                      concept, project information and financial
                                      status. Based on this, we come up with a
                                      customized syndication strategy that will
                                      serve your business goals.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e6">
                                  <h2>
                                    2. Financial Modeling & Project
                                    Documentation
                                  </h2>
                                  <div className="orhp m-2">
                                    <p>
                                      We develop robust financial models,
                                      Detailed Project Reports (DPR), and
                                      Information Memorandums that will be able
                                      to sell your business case to lenders and
                                      investors effectively.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e7">
                                  <h3>3. Identifying & Engaging Lenders</h3>
                                  <div className="orhp m-2">
                                    <p>
                                      Using our vast network of both domestic
                                      and international lenders from our Debt
                                      Syndication services section, we find the
                                      correct combination of financial
                                      institutions that best fit your needs to
                                      fund your requirements.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e8">
                                  <h3>4. Deal Structuring & Negotiations</h3>
                                  <p>
                                    We design the debt to have the best tenure,
                                    repayment terms, interest rate and security.
                                    We have the negotiation skills to secure you
                                    the most competitive and business-friendly
                                    terms on the loan.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e9">
                                  <h3>
                                    5. Coordination of Legal, Compliance &
                                    Documentation
                                  </h3>
                                  <div className="orhp m-2">
                                    <p>
                                      We deal with all legal, regulatory and
                                      compliance documents, and we coordinate
                                      with all parties to ensure the syndication
                                      process is smooth.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e9.1">
                                  <h3>
                                    6. Financial Closure & Post-Sanction Support
                                  </h3>
                                  <div className="orhp m-2">
                                    <p>
                                      We do all the work of a closure, including
                                      final lender settlements and fund
                                      releases. We also offer advisory services
                                      on post-sanction conditions, covenants and
                                      monitoring of compliance.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col-lg-12" id="e10">
                                  <h2>
                                    Why is India IPO Your Ideal Debt Syndication
                                    Partner?
                                  </h2>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e11">
                                      <h3>1. Deep Expertise in Debt Markets</h3>
                                      <div className="orhp m-2">
                                        <p>
                                          India IPO has a strong track record in
                                          capital markets, project funding &
                                          corporate advisory with unmatched
                                          expertise in handling complex
                                          multi-lender debt financing.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e12">
                                      <h2>
                                        2. Strong Lender & Investor
                                        Relationships
                                      </h2>
                                      <div className="orhp m-2">
                                        <p>
                                          We have built relationships with
                                          leading banks, NBFCs, institutional
                                          lenders and international financiers,
                                          which provide you with a large source
                                          of funding options
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e13">
                                      <h3>
                                        3. Customized Structuring for Your
                                        Business
                                      </h3>
                                      <div className="orhp m-2">
                                        <p>
                                          There are no two identical businesses.
                                          We design customized debt syndication
                                          strategies that are suitable to the
                                          requirements of your project and your
                                          financial capability.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e14">
                                      <h3>
                                        4. End-to-End Execution Excellence
                                      </h3>
                                      <p>
                                        We do the entire end-to-end syndication
                                        exercise with speed, precision, and
                                        transparency, right down to the initial
                                        planning to financial closure.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e15">
                                      <h3>5. Competitive Borrowing Terms</h3>
                                      <div className="orhp m-2">
                                        <p>
                                          We deal with lenders and bid
                                          competitively in order to ensure that
                                          you get the best terms of financing
                                          that the market offers.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e16">
                                      <h3>6. Compliance-Driven Approach</h3>
                                      <div className="orhp m-2">
                                        <p>
                                          We stay updated with evolving
                                          regulatory frameworks and ensure that
                                          all the syndication deals are in
                                          accordance with the mandated statutory
                                          and legal compliances.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Who Can Benefit */}
                    <div className="row mt-10">
                      <div className="col-lg-12" id="e17">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                          {/* Heading */}
                          <div className="bg-[#001529] px-8 py-5">
                            <h3 className="text-2xl font-black text-white">
                              Who Can Benefit from Debt Syndication Services?
                            </h3>
                          </div>

                          {/* Content */}
                          <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {[
                                "Companies executing large infrastructure or industrial projects",

                                "Mid-sized businesses seeking CAPEX and working capital financing",

                                "Startups looking for structured debt rounds from multiple investors",

                                "Real estate developers requiring construction finance syndication",

                                "Companies planning refinancing or restructuring of existing debt",
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition"
                                >
                                  <div className="min-w-[38px] h-[38px] rounded-full bg-[#f59e08] text-white flex items-center justify-center font-black text-sm">
                                    {index + 1}
                                  </div>

                                  <p className="text-slate-700 leading-7 font-medium">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="row mt-10">
                      <div className="col-lg-12" id="e18">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                          {/* Heading */}
                          <div className="bg-[#001529] px-8 py-5">
                            <h3 className="text-2xl font-black text-white">
                              Key Benefits of Debt Syndication with India IPO
                            </h3>
                          </div>

                          {/* Benefits Grid */}
                          <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {[
                                "Access to large-scale funding beyond single-lender capacity",

                                "Diversified lender base reducing credit risk concentration",

                                "Better loan pricing through competitive market negotiations",

                                "Flexible loan structuring aligned with business cash flows",

                                "Efficient financial closure with professional advisory support",
                              ].map((benefit, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition"
                                >
                                  <div className="min-w-[38px] h-[38px] rounded-full bg-green-600 text-white flex items-center justify-center font-black">
                                    ✓
                                  </div>

                                  <p className="text-slate-700 leading-7 font-medium">
                                    {benefit}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="row mt-10">
                      <div className="col-lg-12" id="e19">
                        <div className="bg-gradient-to-r from-[#001529] to-[#0f2744] rounded-3xl p-10 shadow-2xl text-white">
                          <h3 className="text-3xl font-black leading-tight mb-6">
                            Ready to Raise Large Capital?
                          </h3>

                          <p className="text-lg leading-8 text-slate-200 mb-6">
                            Partner with India IPO’s Debt Syndication Experts to
                            secure structured, scalable and efficient financing
                            solutions for your business growth.
                          </p>

                          <p className="leading-8 text-slate-300 mb-8">
                            At India IPO, we understand that capital is the
                            foundation of expansion, innovation and long-term
                            success. Our Debt Syndication Services help
                            businesses access large-scale funding through
                            strategic lender networks, optimized structuring and
                            professional execution support.
                          </p>

                          {/* CTA Box */}
                          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
                            <p className="text-lg font-semibold text-white leading-8">
                              Contact us today to discuss your debt funding
                              requirements and explore customized syndication
                              solutions tailored to your business objectives.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Internal Linking Section */}
                    <div className="row mt-8">
                      <div className="col-lg-12">
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                          <h4 className="text-2xl font-black text-[#001529] mb-5">
                            Explore More IPO Resources
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                              <h5 className="font-bold text-[#001529] mb-2">
                                IPO Process Guide
                              </h5>
                              <p className="text-sm text-slate-600 leading-6">
                                Understand the complete IPO journey from
                                planning to listing.
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                              <h5 className="font-bold text-[#001529] mb-2">
                                IPO Calendar
                              </h5>
                              <p className="text-sm text-slate-600 leading-6">
                                Track upcoming IPOs, issue dates and listing
                                schedules.
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                              <h5 className="font-bold text-[#001529] mb-2">
                                IPO Reviews
                              </h5>
                              <p className="text-sm text-slate-600 leading-6">
                                Read GMP updates, subscription status and
                                allotment insights.
                              </p>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
                              <h5 className="font-bold text-[#001529] mb-2">
                                Expert Guidance
                              </h5>
                              <p className="text-sm text-slate-600 leading-6">
                                Get professional IPO and capital market advisory
                                support.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#001529] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, #f59e08 0.5px, transparent 0.5px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black leading-tight">
                          Scale Beyond{" "}
                          <span className="text-[#f59e08]">Single-Lender</span>{" "}
                          Limits
                        </h3>
                        <p className="text-white/60 text-base font-medium leading-relaxed">
                          Our Debt Syndication services provide you with the
                          financial strength to grow, innovate, and execute
                          massive projects. Access large-scale funding with
                          diversified risks and professional advisory support.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                          <Button
                            asChild
                            className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black h-16 rounded-2xl px-12 text-lg"
                          >
                            <Link to="/contact">
                              Discuss Funding Requirements
                            </Link>
                          </Button>
                          <div className="flex items-center justify-center gap-4 px-8 border border-white/10 rounded-2xl bg-white/5 h-16">
                            <Phone className="h-6 w-6 text-[#f59e08]" />
                            <div className="text-left">
                              <div className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                                Call Specialist
                              </div>
                              <div className="text-xl font-black text-white">
                                +91-74283-37280
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "social-stock-exchange" ? (
                  <div className="flex flex-col gap-12">
                    <div className="w-full space-y-12">
                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100"></div>
                      </div>

                      <div className="space-y-6">
                        {[
                          {
                            t: "Overview of Social Stock Exchange (SSE)",
                            d: "The Social Stock Exchange (SSE) segment on the NSE & BSE is changing the way social enterprises can raise funds from the public to maximize their impact.",
                            c: "bg-orange-50 border-orange-100",
                            link: "/social-stock-exchange/sse-introduction",
                          },
                          {
                            t: "Social Enterprise Eligibility Framework",
                            d: "To be officially recognized as a Social Enterprise on the Social Stock Exchange, an organization must meet SE eligibility set by exchanges.",
                            c: "bg-green-50 border-green-100",
                            link: "/social-stock-exchange/eligibility-criteria-to-qualify-social-enterprise",
                          },
                          {
                            t: "How NPOs Register on the Social Stock Exchange",
                            d: "All Not-for-Profit (NPOs) require a formal registration with the SSE platform hosted by Indian stock exchanges like NSE and BSE",
                            c: "bg-orange-50 border-orange-100",
                            link: "/social-stock-exchange/registration-of-npo-on-sse",
                          },
                          {
                            t: "ZCZP Listing Process on SSE",
                            d: "Zero Coupon Zero Principal instrument is among the innovative securities that have been introduced by the SSE framework of SEBI in India",
                            c: "bg-green-50 border-green-100",
                            link: "/social-stock-exchange/listing-process-of-zczp-on-sse",
                          },
                          {
                            t: "Registered and Listed NPOs on BSE SSE and NSE SSE",
                            d: "Several NPOs are registered on the SSE platforms of BSE and NSE to showcase their governance, transparency and impact metrics.",
                            c: "bg-orange-50 border-orange-100",
                            link: "/social-stock-exchange/listed-npos-and-registered-npos",
                          },
                          {
                            t: "Key Intermediaries in SSE Listings",
                            d: "For listing ZCZPs on the Social Stock Exchange (SSE) framework, several intermediaries are involved to ensure regulatory compliance, transparency and smooth operations.",
                            c: "bg-green-50 border-green-100",
                            link: "/social-stock-exchange/intermediaries-involved-in-the-listing-of-zczp",
                          },
                          {
                            t: "Post-Listing Compliance for NPOs",
                            d: "Non-profit organizations (NPOs) have to comply with the post listing regulations after listing their instruments on SSE",
                            c: "bg-orange-50 border-orange-100",
                            link: "/social-stock-exchange/post-listing-requirements-for-npo",
                          },
                        ].map((item, idx) => (
                          <Link
                            to={item.link}
                            key={idx}
                            id={
                              [
                                "sse-overview",
                                "eligibility",
                                "registration",
                                "zczp",
                                "npos",
                                "intermediaries",
                                "compliance",
                              ][idx]
                            }
                            className={`block ${item.c} border p-8 rounded-3xl space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow scroll-mt-24`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-green-600 shadow-sm">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                              <h4 className="font-black text-[#001529] text-lg group-hover:text-[#f59e08] transition-colors">
                                {item.t}
                              </h4>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed font-medium pl-9">
                              {item.d}
                            </p>
                          </Link>
                        ))}
                      </div>

                      <div className="bg-[#001529] p-10 md:p-14 rounded-[3rem] text-white space-y-6 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #f59e08 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                          }}
                        />
                        <div className="relative z-10 space-y-4">
                          <h3 className="text-2xl font-black">
                            Is Your Organization Ready for SSE?
                          </h3>
                          <p className="text-white/60 text-xs font-semibold leading-relaxed max-w-xl">
                            We guide NGOs, Societies, and Trusts through the
                            complexities of registration and ZCZP issuance.
                            Access capital that matches your impact goals.
                          </p>
                          <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button
                              asChild
                              className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black h-12 rounded-xl px-8"
                            >
                              <Link to="/contact">
                                Schedule Eligibility Sync
                              </Link>
                            </Button>
                            <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-xl border border-white/10">
                              <Phone className="h-4 w-4 text-[#f59e08]" />
                              <span className="text-xs font-black">
                                +91-74283-37280
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "private-placement-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="placement-overview"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <div className="row pt-2">
                          <div className="col-lg-12" id="private-placement">
                            <p>
                              At India IPO, IPO advisory is what we are known
                              for, but raising capital does not always have to
                              begin with a public listing. Private Placement
                              Service is for companies that would like to raise
                              growth capital in a quick, discreet & efficient
                              manner from a select pool of investors that meet
                              their strategic requirements and at the same time
                              remain 100% compliant with Indian regulations.
                            </p>
                            <p>
                              Private placement is often the smartest route for
                              founders who want speed, flexibility and long-term
                              partners without the visibility and rigidity of an
                              IPO.
                            </p>
                          </div>
                          <div
                            className="col-lg-12"
                            id="what-is-private-placement"
                          >
                            <h2>What Is a Private Placement? </h2>
                            <p>
                              A Private Placement Service or “PPS” allows
                              companies to raise debt and equity capital through
                              the sale of securities to investors directly
                              instead of through a public offering. These
                              investors typically include:
                            </p>
                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Institutional investors
                                </li>
                                <li id="investor-network">
                                  Private equity and venture capital funds
                                </li>
                                <li id="regulatory-compliance">
                                  High-Net-Worth Individuals (HNIs)
                                </li>
                                <li id="valuation-and-negotiation">
                                  Strategic or sector-focused investors
                                </li>
                              </ul>

                              <p>
                                Unlike going to the public market, private
                                placements are customized transactions
                                structured around your business stage, capital
                                raising requirement and future listing plans in
                                mind.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div
                            className="col-lg-12"
                            id="private-placement-services"
                          >
                            <h2>India IPO’s Private Placement Services</h2>
                            <p id="pps-advisory">
                              <b>1. End-to-End Private Placement Advisory</b>
                            </p>
                            <p>
                              We advise promoters and management teams on{" "}
                              <b>whether, when and how</b> to raise capital via
                              private placement. This includes:
                            </p>

                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Capital structuring (equity, CCPS, CCDs,
                                  debentures)
                                </li>
                                <li id="investor-network">
                                  Determining optimal fund size and dilution
                                </li>
                                <li id="regulatory-compliance">
                                  Aligning private placement with future IPO or
                                  exit plans
                                </li>
                              </ul>
                            </div>
                            <p id="pps-investor-network">
                              Our approach ensures the raise strengthens your
                              balance sheet{" "}
                              <b>
                                without compromising long-term control or
                                valuation discipline
                              </b>
                              .
                            </p>

                            <p id="pps-investor-network">
                              <b>2. Access to a Strong Investor Network</b>
                            </p>
                            <p>
                              India IPO brings access to a{" "}
                              <b>deep and relevant investor ecosystem</b>,
                              including:
                            </p>

                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Domestic and global institutional investors
                                </li>
                                <li id="investor-network">
                                  Family offices and HNWIs
                                </li>
                                <li id="regulatory-compliance">
                                  Growth-stage PE and VC funds
                                </li>
                              </ul>
                            </div>
                            <p>
                              Instead of broad outreach, we focus on{" "}
                              <strong>targeted</strong> investor matchmaking,
                              bringing you together with investors that match
                              your sector, stage and strategy.
                            </p>
                            <p id="pps-valuation">
                              <b>
                                3. Valuation Support & Commercial Negotiation
                              </b>
                            </p>
                            <p>
                              Valuation is where nearly all private placements
                              make it or break it. Our Private Placement Service
                              includes:
                            </p>

                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Independent valuation benchmarking
                                </li>
                                <li id="investor-network">
                                  Structuring downside protection without
                                  excessive promoter risk
                                </li>
                                <li id="regulatory-compliance">
                                  Negotiating shareholder rights, exits and
                                  governance terms
                                </li>
                              </ul>
                            </div>
                            <p>
                              The objective is simple:
                              <b>
                                {" "}
                                fair valuation, clean structures and balanced
                                investor rights.
                              </b>
                            </p>
                            <p id="pps-compliance">
                              <b>4. Regulatory & Compliance Advisory</b>
                            </p>
                            <p>
                              Private placements in India must comply with the
                              Companies Act, 2013 and applicable securities and
                              foreign investment norms. India IPO ensures:
                            </p>

                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Proper structuring under Indian private
                                  placement rules
                                </li>
                                <li id="investor-network">
                                  Compliance with{" "}
                                  <b>
                                    Securities and Exchange Board of India
                                    (SEBI)
                                  </b>{" "}
                                  regulations, where applicable
                                </li>
                                <li id="regulatory-compliance">
                                  Adherence to{" "}
                                  <b>Reserve Bank of India (RBI)</b> and FDI
                                  guidelines for foreign investors
                                </li>
                              </ul>
                            </div>
                            <p>
                              We coordinate closely with legal and tax advisors
                              to ensure <b>zero regulatory friction.</b>
                            </p>
                            <p id="pps-execution">
                              <b>5. Transaction Execution & Closure</b>
                            </p>
                            <p>
                              From term sheet to fund infusion, India IPO
                              manages the full lifecycle:
                            </p>

                            <div className="orhp">
                              <ul>
                                <li id="private-placement-advisory">
                                  Investor presentations and data rooms
                                </li>
                                <li id="investor-network">
                                  Term sheet finalization
                                </li>
                                <li id="regulatory-compliance">
                                  Shareholder approvals and allotment
                                </li>
                                <li id="regulatory-compliance">
                                  Closing coordination with legal, audit and
                                  secretarial teams
                                </li>
                              </ul>
                            </div>
                            <p>
                              Our focus is execution certainty, not just
                              introductions.
                            </p>
                          </div>

                          <div
                            className="col-lg-12"
                            id="private-placement-services"
                          >
                            <h2>
                              Key Benefits of Using a Private Placement Service
                            </h2>
                            <div>
                              <p id="faster-capital">
                                <b>Faster Capital Raise</b>
                              </p>
                              <p>
                                Compared to an IPO, private placements involve:
                              </p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    Fewer disclosures
                                  </li>
                                  <li id="investor-network">
                                    Shorter timelines
                                  </li>
                                  <li id="regulatory-compliance">
                                    Lower execution risk
                                  </li>
                                </ul>
                              </div>
                              <p>
                                This makes them ideal for{" "}
                                <b>
                                  growth capital, deleveraging, or bridge
                                  financing.
                                </b>
                              </p>
                            </div>
                            <div>
                              <p id="confidentiality-control">
                                <b>Confidentiality & Control</b>
                              </p>
                              <p>Private placements allow companies to:</p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    Avoid public disclosure of sensitive
                                    financials
                                  </li>
                                  <li id="investor-network">
                                    Control investor communication
                                  </li>
                                  <li id="regulatory-compliance">
                                    Maintain strategic confidentiality during
                                    expansion or restructuring
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <p id="targeted-investors">
                                <b>Targeted, High-Quality Investors</b>
                              </p>
                              <p>
                                Rather than raising from the market at large,
                                private placements enable you to:
                              </p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    Choose investors with sector expertise
                                  </li>
                                  <li id="investor-network">
                                    Bring in long-term capital partners
                                  </li>
                                  <li id="regulatory-compliance">
                                    Avoid unnecessary shareholder fragmentation
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div>
                              <p id="ipo-ready-structuring">
                                <b>IPO-Ready Capital Structuring:</b>
                              </p>
                              <p>
                                For companies planning a future IPO, private
                                placement acts as a{" "}
                                <b>strategic pre-IPO step</b>:
                              </p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    Strengthens balance sheet
                                  </li>
                                  <li id="investor-network">
                                    Establishes valuation benchmarks
                                  </li>
                                  <li id="regulatory-compliance">
                                    Brings credible investors onto the cap table
                                  </li>
                                </ul>
                              </div>
                              <p>
                                India IPO structures private placements with a{" "}
                                <b>clear public market lens.</b>
                              </p>
                            </div>
                          </div>

                          <div className="col-lg-12" id="who-should-use-pps">
                            <h2>
                              Who Should Use India IPO’s Private Placement
                              Service?
                            </h2>
                            <div>
                              <p>Our Private Placement Service is ideal for:</p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    Promoter-led growth companies
                                  </li>
                                  <li id="investor-network">
                                    Pre-IPO and late-stage businesses
                                  </li>
                                  <li id="regulatory-compliance">
                                    Companies seeking institutional validation
                                  </li>
                                  <li id="regulatory-compliance">
                                    Firms looking to optimize leverage or fund
                                    expansion without going public immediately
                                  </li>
                                </ul>
                              </div>
                              <p>
                                This makes them ideal for{" "}
                                <b>
                                  growth capital, deleveraging, or bridge
                                  financing.
                                </b>
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12" id="why-india-ipo">
                            <h2>Why India IPO?</h2>
                            <div>
                              <p>
                                What differentiates India IPO is our{" "}
                                <b>capital markets DNA.</b> Unlike pure
                                investment brokers, we approach private
                                placements with:
                              </p>
                              <div className="orhp">
                                <ul>
                                  <li id="private-placement-advisory">
                                    IPO-grade financial discipline
                                  </li>
                                  <li id="investor-network">
                                    Institutional investor expectations
                                  </li>
                                  <li id="regulatory-compliance">
                                    Long-term listing and exit clarity
                                  </li>
                                </ul>
                              </div>
                              <p>
                                Every private placement we advise is designed
                                not just to raise money, but to{" "}
                                <b>
                                  build credibility, governance and valuation
                                  sustainability
                                </b>
                                .
                              </p>
                            </div>
                          </div>

                          <div
                            className="col-lg-12"
                            id="raise-capital-privately"
                          >
                            <h2>Looking to Raise Capital Privately?</h2>
                            <p>
                              India IPO's Private Placement Service brings
                              together strategic advisory, investor access,
                              regulatory compliance and execution capabilities
                              that help companies raise the right capital from
                              the right investors at the right time.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        id="smart-capital"
                        className="bg-[#001529] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden scroll-mt-24"
                      >
                        <div
                          className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #f59e08 0.5px, transparent 0.5px)",
                            backgroundSize: "16px 16px",
                          }}
                        />
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                          <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-black leading-tight">
                              Smart Capital for{" "}
                              <span className="text-[#f59e08]">
                                High-Growth Founders
                              </span>
                            </h3>
                            <div className="space-y-4">
                              {[
                                {
                                  t: "Speed to Capital",
                                  d: "Faster execution with fewer public disclosures and lower friction.",
                                },
                                {
                                  t: "Total Confidentiality",
                                  d: "Strategic expansion stays private during sensitive restructuring phases.",
                                },
                                {
                                  t: "IPO-Ready DNA",
                                  d: "We structure private placements to strengthen balance sheets for future public listings.",
                                },
                                {
                                  t: "Strategic Alignment",
                                  d: "Chosen investors bring sector expertise, not just currency.",
                                },
                              ].map((ben, bi) => (
                                <div key={bi} className="flex gap-4">
                                  <div className="w-5 h-5 rounded-full bg-[#f59e08] flex items-center justify-center shrink-0 mt-1">
                                    <CheckCircle className="h-3 w-3 text-[#001529]" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-white text-sm">
                                      {ben.t}
                                    </h4>
                                    <p className="text-white/40 text-[10px] uppercase font-black leading-relaxed">
                                      {ben.d}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm space-y-6">
                            <div className="flex items-center gap-3 ">
                              <Award className="h-6 w-6 text-[#f59e08]" />
                              <h4 className="text-xl font-black text-white">
                                Difference with the India IPO
                              </h4>
                            </div>
                            <p className="text-white/60 text-xs font-semibold leading-relaxed">
                              We approach private placements with
                              institutional-grade discipline and structured
                              execution. Unlike traditional brokers, we focus on
                              governance, valuation alignment and long-term
                              capital strategy so that every transaction
                              strengthens your future growth and market
                              positioning.
                            </p>
                            <div className="pt-4 border-t border-white/10">
                              <p className="text-[10px] text-[#f59e08] font-black uppercase tracking-widest mb-4">
                                Ideal For:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "Promoter-led Growth",
                                  "Pre-IPO Companies",
                                  "Late-stage Expansion",
                                  "CAPEX Optimization",
                                ].map((tag, ti) => (
                                  <span
                                    key={ti}
                                    className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold text-white/80"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="consultation"
                        className="bg-[#f59e08] border border-orange-100 p-10 md:p-14 rounded-[3rem] text-center space-y-6 scroll-mt-24"
                      >
                        <h3 className="text-3xl font-black text-[#001529]">
                          Looking to Raise Capital Privately?
                        </h3>
                        <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">
                          Our Private Placement Service brings together
                          strategic advisory, investor access, and zero-friction
                          regulatory compliance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                          <Button
                            asChild
                            className="bg-[#001529] hover:bg-slate-800 text-[#f59e08] font-black px-10 h-14 rounded-2xl"
                          >
                            <Link to="/contact">
                              Get Free Consultation{" "}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                          <div className="flex items-center gap-4 px-8 border border-slate-200 rounded-2xl bg-white h-14 shadow-sm">
                            <Phone className="h-5 w-5 text-[#f59e08]" />
                            <div className="text-left leading-none">

                              <div className="text-lg font-black text-[#001529]">
                                +91-74283-37280
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "project-funding-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="funding-overview"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <p className="text-slate-700 text-lg leading-relaxed">
                          At{" "}
                          <strong style={{ color: "#f59e08" }}>
                            India IPO
                          </strong>{" "}
                          , we provide specialised project funding advisory to
                          help businesses secure the right capital for growth
                          and expansion. Whether it is infrastructure
                          development, capacity expansion, or new ventures, we
                          structure funding solutions and coordinate with
                          lenders and investors to ensure efficient execution.
                        </p>
                        <div className="row pt-2">
                          <div className="col-lg-12" id="project-funding">
                            <p>
                              At <b>India IPO</b>, we provide specialized{" "}
                              <b> Project Funding Services </b> that help
                              businesses to raise funds to finance their
                              projects. Whether it is a new venture,
                              infrastructure development, product launch, or
                              business expansion, we make sure that companies
                              access the right funding solutions with strategic
                              guidance at each step.
                            </p>
                            <p className="mt-3">
                              India IPO possesses years of experience in the
                              capital markets and regulatory systems, which
                              offer a seamless process of project financing and
                              connecting businesses with reputable investors and
                              structuring funding mechanisms that minimize risks
                              and maximize growth opportunities.
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e2">
                            <h2>What are Project Funding Services?</h2>
                            <p>
                              Project Funding Services are professional services
                              that assist businesses and entrepreneurs in
                              raising the financial capital needed to execute a
                              specific project. These services include a
                              systematic procedure of determining the financing
                              requirements of a project, developing a financing
                              strategy, preparing regulatory-compliant documents
                              and linking the business with the right investors
                              or financial institutions.
                            </p>
                            <div className="orhp m-2">
                              <p className="text-[#001529] uppercase font-bold tracking-wide">
                                {" "}
                                Project Funding can be used for:
                              </p>
                              <ul>
                                <li id="">
                                  Infrastructure Development (e.g., factories,
                                  commercial spaces, logistics parks)
                                </li>
                                <li id="">New Product Launches</li>
                                <li id="">
                                  Business Expansions & Diversifications
                                </li>
                                <li id="">
                                  Large-scale Equipment Purchase & Technology
                                  Upgrades
                                </li>
                                <li id="">
                                  Renewable Energy & Green Projects{" "}
                                </li>
                                <li id="">
                                  Industry-Specific Major Projects
                                  (Manufacturing, Healthcare, Real Estate,
                                  etc.){" "}
                                </li>
                              </ul>
                            </div>
                            <p>
                              Project Funding is generally not the same as
                              general business funding or working capital loans,
                              because it is used to fund a specific project or
                              initiative with clear financial objectives,
                              schedules and deliverables. The funds may be
                              obtained by debt financing, equity investment,
                              structured finance or a combination of the above
                              funding models, depending on the project needs.
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e3">
                            <h2>
                              Why Do Businesses Need Project Funding Services?
                            </h2>
                            <p>
                              Many businesses, especially SMEs, startups and
                              even large corporations, face challenges in
                              raising project-specific funds due to:
                            </p>
                            <div className="orhp m-2">
                              <p className="text-[#001529] uppercase font-bold tracking-wide">
                                {" "}
                                Project Funding can be used for:
                              </p>
                              <ul>
                                <li id="">
                                  Limited access to investor networks
                                </li>
                                <li id="">
                                  Complex regulatory and documentation processes
                                </li>
                                <li id="">
                                  High risk of equity dilution while raising
                                  capital
                                </li>
                                <li id="">
                                  Lack of expertise in structuring funding deals
                                  that balance growth with financial risk
                                </li>
                              </ul>
                            </div>
                            <div className="orhp mt-3 mb-2">
                              <p className="text-[#001529] uppercase font-bold tracking-wide">
                                {" "}
                                This is where <b>
                                  {" "}
                                  Project Funding Services{" "}
                                </b>{" "}
                                comes into play. They help businesses:
                              </p>
                              <ul>
                                <li id="">
                                  Identify the best-suited funding options
                                  (Debt/Equity/Hybrid)
                                </li>
                                <li id="">
                                  Structure the funding deal in a way that
                                  aligns with business objectives
                                </li>
                                <li id="">
                                  Ensure full legal and regulatory compliance
                                  (especially SEBI guidelines)
                                </li>
                                <li id="">
                                  Connect with credible investors and financial
                                  institutions who are genuinely interested in
                                  funding the project
                                </li>
                                <li id="">
                                  Manage the entire process smoothly, from
                                  documentation to fund disbursement
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-lg-12" id="e4">
                            <h2>
                              Why Choose India IPO for Project Funding Services?
                            </h2>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e5">
                                <h3>
                                  1. Comprehensive Understanding of Project
                                  Financial Needs
                                </h3>
                                <div className="orhp m-2">
                                  <p>
                                    Every project is unique. The first step is
                                    to familiarize ourselves with your business
                                    model, financial objectives and project
                                    needs. India IPO professionals will conduct
                                    a thorough study to determine the scope,
                                    timeframe and capital requirements of your
                                    venture and will ensure that the funding
                                    mechanism is perfectly aligned with your
                                    business goals.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e6">
                                <h2>
                                  2. Customized Funding Structures for Optimal
                                  Results
                                </h2>
                                <div className="orhp m-2">
                                  <p>
                                    We design customized funding strategies for
                                    your project’s specific needs. It may be
                                    debt funding, structured financing, or
                                    hybrid capital systems, but our team will
                                    make sure that you can obtain capital at
                                    terms that allow you to grow sustainably.
                                    Our Project Funding Services are aimed at
                                    developing funding solutions that do not
                                    result in excessive equity dilution, which
                                    means that you will be able to maintain
                                    control over your business.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e7">
                                <h3>
                                  3. Regulatory-Compliant Documentation and
                                  Advisory
                                </h3>
                                <div className="orhp m-2">
                                  <p>
                                    Companies may experience the challenge of
                                    going through complicated legal and
                                    compliance procedures. India IPO will also
                                    make sure that all the documentation is done
                                    in a very precise manner and is fully
                                    compliant with SEBI (Securities and Exchange
                                    Board of India) guidelines and other
                                    statutory authorities. This helps in
                                    minimising compliance risks and an easy
                                    funding process.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e8">
                                <h3>
                                  4. Strategic Investor Network for Targeted
                                  Project Funding
                                </h3>
                                <div className="orhp m-2">
                                  <p>
                                    One of the core strengths of India IPO’s
                                    Project Funding Services is a large network
                                    of financial institutions, private equity
                                    firms, venture capitalists and
                                    project-specific investors that it provides.
                                    We link your business with funding partners
                                    who are not only interested in financing
                                    your projects but are also keen on making
                                    the capital raised not only sufficient but
                                    also strategically advantageous.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e9">
                                <h3>
                                  5. End-to-End Project Funding Execution
                                  Support
                                </h3>
                                <div className="orhp m-2">
                                  <p>
                                    From the initial planning and investor
                                    matchmaking to negotiations, documentation
                                    and final fund disbursement, India IPO
                                    offers <b>end-to-end execution support</b>.
                                    Our team works as an extended arm of your
                                    business, managing the entire process with
                                    precision so that you can focus on driving
                                    your project forward.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e10">
                            <h3>
                              Benefits of India IPO’s Project Funding Services
                            </h3>
                            <div className="orhp m-2">
                              <ul>
                                <li id="">
                                  Holistic Project Assessment & Funding Advisory
                                </li>
                                <li id="">
                                  End-to-End Funding Support for Specific
                                  Projects
                                </li>
                                <li id="">
                                  Custom-Built Financing Structures (Debt,
                                  Equity, Hybrid)
                                </li>
                                <li id="">
                                  SEBI-Compliant Documentation & Advisory
                                </li>
                                <li id="">
                                  Access to High-Quality Investor Networks
                                </li>
                                <li id="">
                                  Capital Raising without Diluting Ownership
                                </li>
                                <li id="">
                                  Efficient Process Management to Save Time and
                                  Resources
                                </li>
                                <li id="">
                                  Expert in Risk Management and Strategic
                                  Deal-Making
                                </li>
                                <li id="">
                                  Transparent, Hassle-Free Execution
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12" id="e11">
                          <h3>
                            Industries We Serve with Our Project Funding
                            Services
                          </h3>
                          India IPO’s Project Funding Services are designed to
                          cater to a wide range of industries, including:
                          <div className="orhp m-2">
                            <ul>
                              <li id="">Infrastructure & Real Estate</li>
                              <li id="">Manufacturing & Industrial Projects</li>
                              <li id="">
                                Renewable Energy & Sustainability Projects
                              </li>
                              <li id="">Technology & Innovation Ventures</li>
                              <li id="">Healthcare & Pharmaceuticals</li>
                              <li id="">Consumer Goods & Retail Expansion</li>
                              <li id="">
                                MSMEs & Startups with Large-Scale Project Plans
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-12" id="e12">
                          <h3>
                            Start Your Project Funding Journey with India IPO
                          </h3>
                          <p>
                            Finding the appropriate funding for your project may
                            be complicated, but with the Project Funding
                            Services of India IPO, the process is efficient,
                            transparent and growth-oriented. Our team of experts
                            will ensure that not only does your business raise
                            the required capital, but also on favorable terms
                            that will protect your long-term interests.
                          </p>
                          <p>
                            <b>
                              Let India IPO be your trusted partner in turning
                              project visions into successful realities.
                            </b>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      id="call-to-action"
                      className="bg-[linear-gradient(135deg,_rgb(245,158,8),_rgb(217,119,6))] rounded-[3rem] p-12 md:p-20 text-center space-y-8 border border-orange-100 scroll-mt-24"
                    >
                      <div className="max-w-2xl mx-auto space-y-4">
                        <h3 className="text-4xl font-black text-[#001529]">
                          Fuel Your Growth Today
                        </h3>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed">
                          Finding the right funding is complicated. India IPO
                          makes it efficient, transparent, and growth-oriented.
                          Let us turn your project vision into a successful
                          reality.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          asChild
                          className="bg-[#001529] hover:bg-slate-800 text-[#f59e08] h-16 rounded-2xl px-12 font-black text-lg"
                        >
                          <Link to="/contact">
                            Start Your Journey{" "}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <div className="flex items-center gap-4 px-10 border border-slate-200 rounded-2xl bg-white h-16 shadow-lg">
                          <Phone className="h-6 w-6 text-[#f59e08]" />
                          <div className="text-left leading-none">
                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                              Direct Help
                            </div>
                            <div className="text-xl font-black text-[#001529]">
                              +91-74283-37280
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "mainstream-reit-structuring" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div
                        id="reit-overview"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <div className="mb-0">
                          <div className="row pt-2">
                            <div className="col-lg-12" id="e1">
                              <h2>
                                Bringing Institutional Real Estate to the Public
                                Markets{" "}
                              </h2>
                              <p className="mt-3">
                                The real estate industry in India is
                                transforming asset-based models to
                                capital-intensive approaches. To developers,
                                asset owners and investment platforms with
                                large-scale income-generating assets, Real
                                Estate Investment Trusts (REITs) provide an
                                opportunity of a lifetime to raise long-term
                                capital without losing property control.
                              </p>
                              <p className="mt-2">
                                REITs unlock the value of stabilized rental
                                portfolios by turning them into publicly traded
                                units that allow constant income distributions
                                to investors and liquidity to sponsors. Now its
                                the right time to consider issuing REITs in
                                India with a strong regulatory framework of SEBI
                                and an increasing appetite of investors.
                              </p>
                              <p className="mt-2">
                                India IPO being one of the best REIT issue
                                consultants India enables you to design,
                                structure and list your REIT in a fully
                                regulatory-compliant, investor-friendly friendly
                                and execution-assisted manner- from concept to
                                IPO and beyond.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-12" id="e2">
                              <h2>What is a REIT?</h2>
                              <p className="mt-2">
                                A REIT (Real Estate Investment Trust) is an
                                investment vehicle that is based on trusts that
                                own and manage income-producing real estate and
                                pass most of its income to the unit holders.
                                REITs are listed on the stock exchange and are
                                governed by SEBI to provide transparency,
                                governance and retail/institutional investor
                                confidence.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-12" id="e3">
                              <h3>Key Highlights:</h3>
                              <div className="orhp m-2">
                                <ul>
                                  <li id="faster-process">
                                    {" "}
                                    Pooling of capital in a trust structure by
                                    public investors
                                  </li>
                                  <li id="confidentiality">
                                    {" "}
                                    Portfolio consists of office parks, malls,
                                    warehouses, etc.
                                  </li>
                                  <li id="targeted-investor-base">
                                    Compulsory listing and income distribution
                                    quarterly
                                  </li>
                                  <li id="targeted-investor-base">
                                    Units are traded on NSE/BSE just as equity
                                    shares
                                  </li>
                                  <li id="targeted-investor-base">
                                    Open to retail, HNI and institutional
                                    investors
                                  </li>
                                </ul>
                              </div>
                              <div className="row mt-3">
                                <div className="col-lg-12" id="e4">
                                  <h2>
                                    India IPO’s End-to-End REIT Advisory
                                    Services
                                  </h2>
                                  <p>
                                    As a real estate developer, sponsor group,
                                    private equity owner or asset manager, we
                                    support you to transfer your
                                    yield-generating asset portfolio to the REIT
                                    market in India in an efficient and
                                    compliant way.
                                  </p>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e5">
                                      <h3>
                                        1. Initial Eligibility & Structuring
                                      </h3>
                                      <div className="orhp m-2">
                                        <ul>
                                          <li id="faster-process">
                                            Technical and commercial due
                                            diligence on assets
                                          </li>
                                          <li id="confidentiality">
                                            Lease audit and tenant quality
                                            analysis
                                          </li>
                                          <li id="targeted-investor-base">
                                            Title verification and legal
                                            documentation review{" "}
                                          </li>
                                          <li id="targeted-investor-base">
                                            Capital structuring & income
                                            simulation models
                                          </li>
                                          <li id="targeted-investor-base">
                                            SPV consolidation and property
                                            transfer planning
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e6">
                                      <h3>2. REIT Trust & Entity Formation</h3>
                                      <div className="orhp m-2">
                                        <ul>
                                          <li id="faster-process">
                                            Drafting and registration of the
                                            REIT Trust under the Indian Trusts
                                            Act
                                          </li>
                                          <li id="confidentiality">
                                            Formation of SPVs (Special Purpose
                                            Vehicles)
                                          </li>
                                          <li id="targeted-investor-base">
                                            Appointment of Sponsor, Manager and
                                            Trustee
                                          </li>
                                          <li id="targeted-investor-base">
                                            Defining scheme structure and
                                            segregation of assets
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e7">
                                      <h3>
                                        3. Regulatory Advisory & SEBI Compliance
                                      </h3>
                                      <div className="orhp m-2">
                                        <ul>
                                          <li id="faster-process">
                                            Preparation and filing of REIT Offer
                                            Document via SEBI-registered
                                            Merchant Banker
                                          </li>
                                          <li id="faster-process">
                                            Coordination with legal, financial
                                            and valuation experts
                                          </li>
                                          <li id="confidentiality">
                                            <p className="text-[#001529] uppercase font-bold tracking-wide">
                                              Filing under:
                                            </p>
                                            <ul className="nested-list">
                                              <li>
                                                SEBI (REIT) Regulations, 2014
                                              </li>
                                              <li>SEBI (ICDR) Regulations</li>
                                              <li>Companies Act, 2013</li>
                                            </ul>
                                          </li>
                                          <li id="faster-process">
                                            Approval management with SEBI and
                                            stock exchanges
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e8">
                                      <h3>
                                        4. Intermediary Management & Due Process
                                      </h3>
                                      <div className="orhp m-2">
                                        <ul>
                                          <li id="confidentiality">
                                            <p className="text-[#001529] uppercase font-bold tracking-wide">
                                              Appointment of:
                                            </p>
                                            <ul className="nested-list">
                                              <li>
                                                Independent Trustee
                                                (SEBI-registered,
                                                non-affiliated)
                                              </li>
                                              <li>
                                                {" "}
                                                Valuer (5+ years in commercial
                                                real estate)
                                              </li>
                                              <li>
                                                Custodians, Registrars,
                                                Auditors, Legal Advisors
                                              </li>
                                            </ul>
                                          </li>
                                          <li id="faster-process">
                                            Setting up escrow, depository and
                                            investor communication systems
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-lg-12" id="e9">
                                      <h3>
                                        5. Listing, Distribution & Post-Issue
                                        Support
                                      </h3>
                                      <div className="orhp m-2">
                                        <ul>
                                          <li id="faster-process">
                                            Listing of REIT units on the NSE/BSE
                                            mainboard
                                          </li>
                                          <li id="faster-process">
                                            Coordination with broker networks
                                            for IPO subscription
                                          </li>
                                          <li id="faster-process">
                                            Ongoing compliance: disclosures,
                                            audits, governance
                                          </li>
                                          <li id="faster-process">
                                            Quarterly distribution management to
                                            unit holders
                                          </li>
                                          <li id="faster-process">
                                            Support for rights issues,
                                            acquisitions and mergers
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e10">
                            {/* Main Container */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                              {/* Header */}
                              <div className="bg-[#001529] px-8 py-5">
                                <h2 className="text-3xl font-black text-white">
                                  SEBI REIT Regulatory Requirements
                                </h2>
                              </div>

                              {/* Table Wrapper */}
                              <div className="overflow-x-auto">
                                <table className="w-full min-w-[1000px] border-collapse">
                                  {/* Table Head */}
                                  <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                      <th className="px-8 py-5 text-left text-sm font-black uppercase tracking-wide text-slate-800 w-[35%]">
                                        Regulatory Parameter
                                      </th>

                                      <th className="px-8 py-5 text-left text-sm font-black uppercase tracking-wide text-[#f59e08] w-[65%]">
                                        Requirement
                                      </th>
                                    </tr>
                                  </thead>

                                  {/* Table Body */}
                                  <tbody>
                                    {[
                                      {
                                        param: "Minimum Asset Value",
                                        req: "₹500 crore or more of completed rent-generating assets",
                                      },

                                      {
                                        param: "Minimum Issue Size",
                                        req: "₹250 crore or more public offer",
                                      },

                                      {
                                        param: "Sponsor Commitment",
                                        req: "Minimum 15% holding for 3 years",
                                      },

                                      {
                                        param: "Public Holding",
                                        req: "At least 25% of post-issue capital",
                                      },

                                      {
                                        param: "Distribution Mandate",
                                        req: "90% of Net Distributable Cash Flow (NDCF) must be distributed semi-annually",
                                      },

                                      {
                                        param: "Leverage Limit",
                                        req: "Up to 49% of asset value. Above 25% requires credit rating",
                                      },

                                      {
                                        param: "Valuation",
                                        req: "Half-yearly valuation and upon acquisitions or disposals",
                                      },

                                      {
                                        param: "Related Party Transactions",
                                        req: "Allowed only with unit-holder and Trustee approval",
                                      },

                                      {
                                        param: "Trustee",
                                        req: "Must remain independent of Sponsor and Manager",
                                      },

                                      {
                                        param: "Investment Restrictions",
                                        req: "Maximum 20% in under-construction assets and minimum 80% in completed income-generating properties",
                                      },
                                    ].map((row, index) => (
                                      <tr
                                        key={index}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                      >
                                        {/* Left Column */}
                                        <td className="px-8 py-6 align-top">
                                          <div className="font-bold text-slate-800 leading-7">
                                            {row.param}
                                          </div>
                                        </td>

                                        {/* Right Column */}
                                        <td className="px-8 py-6 align-top">
                                          <div className="text-slate-600 leading-7 font-medium">
                                            {row.req}
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e11">
                            <h2>Ideal Use Cases for REIT Structuring</h2>
                            <div className="orhp m-2">
                              <ul>
                                <li id="faster-process">
                                  Institutional-grade
                                  <b> office parks, IT SEZs, retail malls</b>
                                </li>
                                <li id="confidentiality">
                                  <b>Industrial parks, logistics hubs</b> and
                                  warehousing facilities
                                </li>
                                <li id="targeted-investor-base">
                                  Portfolios of leased assets held by{" "}
                                  <b> developers or private equity funds</b>
                                </li>
                                <li id="targeted-investor-base">
                                  <b>Yield-focused </b>investors looking to exit
                                  or partially monetize income assets
                                </li>
                                <li>
                                  {" "}
                                  Conversion of{" "}
                                  <b>
                                    {" "}
                                    privately pooled real estate platforms
                                  </b>{" "}
                                  into public REITs
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e12">
                            <h3>
                              Conversion & Listing of Existing Real Estate
                              Platforms
                            </h3>
                            <p>
                              If you're managing a{" "}
                              <b> Fractional Ownership Platform (FOP),</b>{" "}
                              YieldCo, or private asset pool:
                            </p>
                            <div className="orhp m-2">
                              <ul>
                                <li id="faster-process">
                                  We offer <b> migration advisory</b> to align
                                  with REIT norms
                                </li>
                                <li id="confidentiality">
                                  We support{" "}
                                  <b>
                                    SEBI-compliant trust setup, investor
                                    conversion & filing
                                  </b>
                                </li>
                                <li id="targeted-investor-base">
                                  We help align SPV ownership, asset vetting and
                                  unit listing
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e13">
                            <h3>Governance, Lock-In & Investor Protection</h3>
                            <div className="orhp m-2">
                              <ul>
                                <li id="faster-process">
                                  <b>Trustee-led control </b> for transparency
                                  and accountability
                                </li>
                                <li id="confidentiality">
                                  <b> Sponsor lock-in </b> of 15% units for 3
                                  years (minimum)
                                </li>
                                <li id="targeted-investor-base">
                                  <b> Quarterly reporting,</b> annual AGMs &
                                  mandatory financial disclosures
                                </li>
                                <li id="targeted-investor-base">
                                  <b>No related party transactions </b> without
                                  prior approval
                                </li>
                                <li id="targeted-investor-base">
                                  <b>Valuation reports & audit schedules </b>{" "}
                                  enforced under SEBI guidelines
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e14">
                            <h3>Why India IPO?</h3>
                            <div className="orhp m-2">
                              <ul>
                                <li id="faster-process">
                                  Proven track record in listing large-scale
                                  capital market instruments
                                </li>
                                <li id="confidentiality">
                                  Strong compliance frameworks and regulatory
                                  network
                                </li>
                                <li id="targeted-investor-base">
                                  Partner ecosystem of SEBI-registered
                                  intermediaries
                                </li>
                                <li id="targeted-investor-base">
                                  {" "}
                                  Full handholding from idea to public market
                                  debut
                                </li>
                                <li id="targeted-investor-base">
                                  Post-issue support for governance, investor
                                  relations and reporting
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="row pt-2">
                          <div className="col-lg-12" id="e15">
                            <h3>
                              Let’s Take Your Real Estate Assets to the Public
                              Market
                            </h3>
                            <p className="mt-2">
                              If you have ₹500 crore+ in leased assets or want
                              to build a REIT-ready portfolio — India IPO will
                              walk with you across structuring, SEBI approval,
                              public issue and SEBI REIT listing.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        id="regulatory"
                        className="bg-[#001529] rounded-[3rem] p-10 md:p-14 text-white overflow-hidden relative scroll-mt-24"
                      >
                        <div
                          className="absolute inset-0 opacity-5 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #f59e08 1px, transparent 1px)",
                            backgroundSize: "25px 25px",
                          }}
                        />
                        <div className="relative z-10 space-y-10">
                          <div className="text-center space-y-3">
                            <h3 className="text-3xl font-black">
                              SEBI REIT Regulatory Framework
                            </h3>
                            <p className="text-white/40 text-sm font-medium">
                              Core parameters for listing a successful REIT in
                              India
                            </p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#f59e08]">
                                    Parameter
                                  </th>
                                  <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-[#f59e08]">
                                    SEBI Requirement
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {[
                                  {
                                    l: "Minimum Asset Value",
                                    r: "₹500 crore+ (primarily completed, income-generating assets)",
                                  },
                                  {
                                    l: "Minimum Issue Size",
                                    r: "₹250 crore public issue",
                                  },
                                  {
                                    l: "Sponsor Commitment",
                                    r: "Minimum 15% holding for at least 3 years",
                                  },
                                  {
                                    l: "Public Holding",
                                    r: "At least 25% of total units post-issue",
                                  },
                                  {
                                    l: "Distribution Mandate",
                                    r: "Minimum 90% of Net Distributable Cash Flows (NDCF) to be distributed (typically quarterly in practice)",
                                  },
                                  {
                                    l: "Leverage Limit",
                                    r: "Up to 49% of asset value; extendable up to 70% with unitholder approval and credit rating",
                                  },
                                  {
                                    l: "Investment Rule",
                                    r: "Minimum 80% in completed, income-generating assets",
                                  },
                                ].map((row, ri) => (
                                  <tr
                                    key={ri}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                  >
                                    <td className="py-4 px-6 text-sm font-bold text-white/80">
                                      {row.l}
                                    </td>
                                    <td className="py-4 px-6 text-sm font-medium text-white/60">
                                      {row.r}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div id="use-cases" className="space-y-8 scroll-mt-24">
                        <div className="flex items-center gap-3 pt-10">
                          <div
                            className="w-1.5 h-8 rounded-full"
                            style={{ background: cfg.accent }}
                          />
                          <h2 className="text-3xl md:text-4xl font-black text-[#001529]">
                            Ideal REIT Use Cases
                          </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                            "Grade-A Office Parks & IT SEZs",
                            "Retail Malls & High-Street Portfolios",
                            "Industrial Logistics & Warehousing Assets",
                            "Stabilised, Income-Generating Real Estate Portfolios",
                          ].map((ind, ii) => (
                            <div
                              key={ii}
                              className="p-6 shadow-2xl bg-slate-50 border border-slate-200 rounded-3xl flex items-center gap-4 group hover:bg-[#f59e08]/10 transition-all"
                            >
                              <div className="w-1.5 h-8 bg-slate-200 group-hover:bg-[#f59e08] rounded-full transition-colors" />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#001529]">
                                {ind}
                              </h4>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        id="why-us"
                        className="bg-[linear-gradient(135deg,_rgb(245,158,8),_rgb(217,119,6))] border border-orange-100 p-12 md:p-16 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 scroll-mt-24"
                      >
                        <div className="flex-1 space-y-6 text-center md:text-left">
                          <h3 className="text-3xl font-black text-[#001529]">
                            Why{" "}
                            <strong style={{ color: "#fff" }}>
                              India IPO?
                            </strong>
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              "Proven track record in listing large-scale capital market instruments.",
                              "Strong compliance frameworks and extensive regulatory network.",
                              "Elite partner ecosystem of professional Merchant Bankers and Trustees.",
                              "Post-issue support for Governance, Investor Relations, and Reporting.",
                            ].map((point, pi) => (
                              <div key={pi} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />
                                <span className="text-sm font-bold text-slate-700">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Button
                            asChild
                            className="bg-[#001529] hover:bg-[#003366] text-white h-14 rounded-2xl px-10 font-bold mt-4 w-full md:w-auto"
                          >
                            <Link to="/contact">
                              Monetize Your Leased Assets{" "}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                        <div className="w-full md:w-1/3 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto">
                            <div style={{ color: cfg.accent }}>
                              <Target className="h-8 w-8" />
                            </div>
                          </div>
                          <h4 className="font-black text-[#001529]">
                            Launch Your REIT
                          </h4>
                          <p className="text-slate-400 text-xs font-bold leading-relaxed">
                            For portfolios of ₹500 crore+ in leased assets.
                          </p>
                          <div className="text-2xl font-black text-[#001529]">
                            +91-74283-37280
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "sm-reit-structuring-listing-services" ? (
                  <div className="service-content-box service-content">
                    <div className="row pt-2">
                      <div className="col-lg-12" id="e1">
                        <h2>
                          Empowering Mid-Sized Real Estate Sponsors to Unlock
                          Capital through SM REITs{" "}
                        </h2>
                        <p className="mt-3">
                          The mid-market real estate business in India is moving
                          towards a new phase of capital efficiency. The launch
                          of Small and Medium Real Estate Investment Trusts (SM
                          REITs) in the SEBI 2024 regulatory framework provides
                          a formal, listed channel through which asset-intensive
                          real estate players can monetize income-generating
                          assets without the need to divest assets fully or use
                          complicated debt arrangements.
                        </p>
                        <p className="mt-2">
                          At <b> India IPO</b>, we specialize in designing and
                          executing <b> SM REIT issues end-to-end</b>, ensuring
                          full compliance with SEBI norms, structuring
                          flexibility and complete support from ideation to
                          listing.
                        </p>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-12" id="e2">
                        <h2>What is an SM REIT?</h2>
                        <p className="mt-2">
                          An SM REIT is a regulated real estate investment
                          structure under the Securities and Exchange Board of
                          India (SEBI) where capital is pooled alongside shares
                          against a portfolio of income-generating, completed
                          real estate assets, the asset value of which is
                          between ₹50 crore and ₹500 crore.
                        </p>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-lg-12" id="e3">
                        <h3>Key Features:</h3>
                        <div className="orhp m-2">
                          <ul>
                            <li id="faster-process">
                              {" "}
                              SPV ownership in the form of a Trust
                            </li>
                            <li id="confidentiality">
                              The asset portfolio should be 95% complete and
                              revenue-earning
                            </li>
                            <li id="targeted-investor-base">
                              SPVs can only be a 100 % entity of the SM REIT
                            </li>
                            <li id="targeted-investor-base">
                              A compulsory requirement for units to be listed on
                              an exchange
                            </li>
                            <li id="targeted-investor-base">
                              No investment in under-construction assets
                              permitted
                            </li>
                            <li id="targeted-investor-base">
                              The Sponsor and Investment Manager terms may be
                              identical
                            </li>
                          </ul>
                        </div>

                        <div className="row mt-3">
                          <div className="col-lg-12" id="e4">
                            <h2>India IPO's SM REIT Advisory Service</h2>
                            <p>
                              Our services are extensive and modular for the
                              real estate companies that are willing to
                              structure and list SM REITs as per the SEBI (REIT)
                              Amendment Regulations, 2024.
                            </p>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e5">
                                <h3>1. Initial Assessment & Eligibility</h3>

                                <div className="orhp m-2">
                                  <ul>
                                    <li id="faster-process">
                                      Evaluation of the quality and yield
                                      attributes of the asset and lease in rent
                                    </li>
                                    <li id="confidentiality">
                                      Title verification and legal due diligence
                                    </li>
                                    <li id="targeted-investor-base">
                                      Monetization and REIT structure financial
                                      modeling{" "}
                                    </li>
                                    <li id="targeted-investor-base">
                                      Special Purpose Vehicle (SPV) Ready
                                      Assessment and Structuring Plan of an
                                      Entity
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e6">
                                <h3>2. Structuring the SM REIT Entity</h3>

                                <div className="orhp m-2">
                                  <ul>
                                    <li id="faster-process">
                                      Drafting and registration of Trust Deeds
                                      under the Indian Trusts Act
                                    </li>
                                    <li id="confidentiality">
                                      Formation and registration of SPVs to hold
                                      property
                                    </li>
                                    <li id="targeted-investor-base">
                                      Organization of the Investment Manager and
                                      Trustee Functions{" "}
                                    </li>
                                    <li id="targeted-investor-base">
                                      Establishment of scheme-specific asset
                                      segregation
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e7">
                                <h3>3. Regulatory & Compliance Execution</h3>

                                <div className="orhp m-2">
                                  <ul>
                                    <li id="faster-process">
                                      Drafting of the Offer Document and filing
                                      through a SEBI-registered Merchant Banker
                                    </li>
                                    <li id="faster-process">
                                      Liaison with legal, financial and
                                      valuation professionals
                                    </li>
                                    <li id="faster-process">
                                      Obtaining the SEBI and specified exchange
                                      approvals
                                    </li>
                                    <li id="confidentiality">
                                      Ensuring full compliance with:
                                      <ul className="nested-list">
                                        <li>SEBI (REIT) Regulations, 2014</li>
                                        <li>
                                          SEBI (NCS) Regulations, 2021 (for
                                          leverage/debt)
                                        </li>
                                        <li>Companies Act, 2013</li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-2">
                              <div className="col-lg-12" id="e8">
                                <h3>
                                  4. Appointing & Managing Key Intermediaries
                                </h3>
                                <div className="orhp m-2">
                                  <ul>
                                    <li id="confidentiality">
                                      <p
                                        style={{
                                          color: "black",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {" "}
                                        Engagement of:
                                      </p>
                                      <ul className="nested-list">
                                        <li>
                                          SEBI-registered Trustee (not
                                          affiliated with IM)
                                        </li>
                                        <li>
                                          Independent valuer (5+ years
                                          experience in real estate)
                                        </li>
                                        <li>
                                          Custodians, Registrars & Compliance
                                          Auditors
                                        </li>
                                      </ul>
                                    </li>
                                    <li id="targeted-investor-base">
                                      Coordination for escrow, depository
                                      accounts and compliance infrastructure
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="row mt-2">
                              <div className="col-lg-12" id="e9">
                                <h3>
                                  5. Listing Preparation & Post-Issue Advisory
                                </h3>

                                <div className="orhp m-2">
                                  <ul>
                                    <li id="faster-process">
                                      Listing of SM REIT units on NSE/BSE SME or
                                      REIT segment
                                    </li>
                                    <li id="confidentiality">
                                      Quarterly compliance and governance
                                      systems
                                    </li>
                                    <li id="targeted-investor-base">
                                      Disclosure support, distribution
                                      processing and trust reporting{" "}
                                    </li>
                                    <li id="targeted-investor-base">
                                      Lock-in management and valuation audit
                                      schedule
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-10">
                      <div className="col-lg-12" id="e10">
                        {/* Main Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                          {/* Header */}
                          <div className="bg-[#001529] px-8 py-5">
                            <h2 className="text-3xl font-black text-white">
                              SM REIT Regulatory Conditions
                            </h2>
                          </div>

                          {/* Table Wrapper */}
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] border-collapse">
                              {/* Table Head */}
                              <thead className="bg-slate-100 border-b border-slate-200">
                                <tr>
                                  <th className="px-8 py-5 text-left text-sm font-black uppercase tracking-wide text-slate-800 w-[35%]">
                                    Regulatory Parameter
                                  </th>

                                  <th className="px-8 py-5 text-left text-sm font-black uppercase tracking-wide text-[#f59e08] w-[65%]">
                                    Requirement
                                  </th>
                                </tr>
                              </thead>

                              {/* Table Body */}
                              <tbody>
                                {[
                                  {
                                    param: "Asset Portfolio Value (Per Scheme)",
                                    req: "₹50 crore to ₹500 crore",
                                  },

                                  {
                                    param: "Investment Criteria",
                                    req: "95% in completed revenue-generating assets and 5% in liquid unencumbered assets",
                                  },

                                  {
                                    param: "Minimum Unit Price",
                                    req: "₹10,00,000 per unit (Demat form only)",
                                  },

                                  {
                                    param: "Leverage Limit",
                                    req: "Maximum 49% of scheme asset value. Above 25% requires credit rating and investor approval",
                                  },

                                  {
                                    param: "Investment Manager Net Worth",
                                    req: "₹20 crore net worth with minimum ₹10 crore liquid net worth",
                                  },

                                  {
                                    param: "Investment Manager Experience",
                                    req: "Minimum 2 years in real estate or fund management OR qualified KMPs with 5+ years experience each",
                                  },

                                  {
                                    param: "Trustee Eligibility",
                                    req: "Trustee must not be associated with the Investment Manager",
                                  },

                                  {
                                    param: "Offer Timeline",
                                    req: "Initial scheme must be launched within 3 years of SEBI registration",
                                  },

                                  {
                                    param: "Distribution Compliance",
                                    req: "95% of SPV cash flows and 100% of scheme-level NDCF must be distributed quarterly",
                                  },

                                  {
                                    param: "Valuation Reports",
                                    req: "Annual valuation plus valuation on material events, submitted to SEBI, Trustee and Exchanges",
                                  },

                                  {
                                    param: "Lock-in Requirements",
                                    req: "Investment Manager to hold 5%–15% units initially with phased reduction over 20 years",
                                  },
                                ].map((row, index) => (
                                  <tr
                                    key={index}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                  >
                                    {/* Left Column */}
                                    <td className="px-8 py-6 align-top">
                                      <div className="font-bold text-slate-800 leading-7">
                                        {row.param}
                                      </div>
                                    </td>

                                    {/* Right Column */}
                                    <td className="px-8 py-6 align-top">
                                      <div className="text-slate-600 leading-7 font-medium">
                                        {row.req}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-12" id="e11">
                        <h2>
                          Migration Support for FOPs & Pre-Existing Structures
                        </h2>
                        <p>
                          In the case of current Fractional Ownership Platforms
                          (FOPs) or privately pooled real estate structures:
                        </p>
                        <div className="orhp m-2">
                          <ul>
                            <li id="faster-process">
                              India IPO offers migration counseling,
                              documentation and compliance filing
                            </li>
                            <li id="confidentiality">
                              Compulsory implementation of SEBI within 6 months
                              of the date of the regulation
                            </li>
                            <li id="targeted-investor-base">
                              Current unitholders may be converted into SM REIT
                              schemes
                            </li>
                            <li id="targeted-investor-base">
                              Conversion support involves the establishment of
                              new SPVs, the transfer of assets and the
                              restructuring of investors
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-lg-12" id="e12">
                        <h3>Governance, Lock-in & Related Party Controls</h3>

                        <div className="orhp m-2">
                          <ul>
                            <li id="faster-process">
                              A trustee is a custodian of property on behalf of
                              scheme unit holders
                            </li>
                            <li id="confidentiality">
                              The initial unit holding of IM is locked at
                              leverage choice (5%-15%)
                            </li>
                            <li id="targeted-investor-base">
                              No related party transactions allowed (except
                              IM/Trustee fees)
                            </li>
                            <li id="targeted-investor-base">
                              Annual meetings and quarterly financials are
                              required
                            </li>
                            <li id="targeted-investor-base">
                              There are clear voting thresholds on major actions
                              (e.g. borrowing, change in IM, asset transactions)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="row pt-2">
                      <div className="col-lg-12" id="e13">
                        <h3>Build Your SM REIT with Confidence</h3>
                        <p className="mt-2">
                          India IPO is your strategic advisory partner and we
                          will take you through all the stages of SM REIT
                          issuance, including Eligibility, listing and long-term
                          governance. As a developer, asset manager, FOP, or
                          sponsor, we assist you in designing capital
                          markets-ready platforms that scale and sustain.
                        </p>
                      </div>
                      <div className="col-lg-12">
                        <p>
                          Understand how IPOs work through our{" "}
                          <Link to="/ipo-process">IPO Process</Link> guide. Stay
                          updated with upcoming listings in the{" "}
                          <Link to="/all-ipos">IPO Calendar</Link>
                          and read insights on our{" "}
                          <Link to="/ipo-blogs">
                            IPO Company Reviews — GMP, Subscription Status &
                            Allotment.
                          </Link>
                          Explore our guidance for IPO.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : slug === "rights-issue-advisory" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="service-content-box service-content">
                      <div className="row pt-2">
                        <div className="col-lg-12" id="e1">
                          <h2>
                            Unlock Growth Capital Through Strategic Rights
                            Issues with India IPO{" "}
                          </h2>
                          <p className="mt-3">
                            At India IPO, we specialize in offering
                            comprehensive Rights Issue Advisory Services to
                            companies that are willing to raise funds by
                            offering shares to their existing shareholders. A
                            rights issue is a powerful instrument that can help
                            companies to consolidate their balance sheet,
                            finance growth strategies, boost shareholders' value
                            and reduce debt without losing control under their
                            current ownership structure.
                          </p>
                          <p className="mt-2">
                            We assist promoters, family-owned businesses, MSMEs
                            and listed companies in navigating the entire rights
                            issue process from regulatory compliance to
                            successful capital mobilisation — with a customized
                            and strategic approach.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e2">
                          <h2>What is a Rights Issue?</h2>
                          <p className="mt-2">
                            A Rights Issue is a way in which a company can raise
                            extra capital by giving its existing shareholders
                            the option of buying some new shares at a discounted
                            rate, in proportion to their current shareholding.
                            This strategy helps companies to raise money while
                            allowing existing shareholders to keep their shares
                            or even increase them.
                          </p>
                          <p className="mt-2">
                            Rights Issues are less expensive, faster than the
                            public offering and are favoured in raising capital
                            when the companies do not want to dilute the
                            promoter shareholding to a large extent.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e">
                          <div className="row mt-3">
                            <div className="col-lg-12" id="e3">
                              <h2>
                                Why Opt for Rights Issue Advisory Services?
                              </h2>
                              <p>
                                The Rights Issue is a complex process requiring
                                regulatory, strategic and operational
                                procedures. Through the Rights Issue Advisory
                                Services of India IPO, businesses enjoy the
                                following:
                              </p>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e4">
                                  <h3>Expert Structuring & Strategy</h3>
                                  <p>
                                    We design the most appropriate rights issue
                                    format- the issue size, ratio, pricing,
                                    renounceability and timing to fit your
                                    business plans and shareholders' interests.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e5">
                                  <h3>Regulatory & SEBI Compliance</h3>
                                  <p>
                                    We make sure that you are compliant on an
                                    end-to-end basis with SEBI guidelines, stock
                                    exchange requirements and Companies Act
                                    requirements. We also compile and submit all
                                    the necessary documents, such as the Letter
                                    of Offer (LoF), Public Announcements and
                                    process regulatory approvals.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e6">
                                  <h3>Valuation & Pricing Advisory</h3>
                                  <p>
                                    Proper pricing of the issue is very
                                    important. We will undertake thorough
                                    valuation tests and market surveys to advise
                                    on a competitive but attractive pricing
                                    policy for your shareholders.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e7">
                                  <h3>
                                    Shareholder Communication & Engagement
                                  </h3>
                                  <p>
                                    With our Rights Issue Advisory Services, we
                                    develop effective communication to inform
                                    and involve existing shareholders in the
                                    process of the rights issue with
                                    transparency and clarity in the rights issue
                                    process.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e8">
                                  <h3>Underwriting & Subscriptions Support</h3>
                                  <p>
                                    In cases where full subscription is
                                    uncertain, we arrange for underwriting
                                    support and explore investor interest to
                                    safeguard capital mobilisation targets.
                                  </p>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e9">
                                  <h3>End-to-End Execution Management</h3>
                                  <p>
                                    India IPO takes care of the entire process
                                    of your rights issue, right from the
                                    appointment of intermediaries (merchant
                                    bankers, RTA, legal advisors) to timelines,
                                    disclosures and listing of new shares.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e10">
                          <h3>Benefits of Rights Issue for Companies</h3>
                          <div className="orhp m-2">
                            <ul>
                              <li id="">
                                {" "}
                                <b>Cost-Effective Fundraising:</b> Lower
                                issuance costs than in comparison to a public
                                offering or a private placement.
                              </li>
                              <li id="">
                                <b> Control Retention:</b> Existing promoters
                                can maintain or increase their shareholding.
                              </li>
                              <li id="">
                                <b>Faster Process:</b> Rights issues are quicker
                                to execute with less regulatory burden than
                                public offerings.
                              </li>
                              <li id="">
                                <b>Market Confidence: </b> The decision to offer
                                shares to current investors is a sign that the
                                promoters are confident in the business's
                                growth.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e11">
                          <h3>
                            Who Should Consider Rights Issue Advisory Services?
                          </h3>
                          <div className="orhp m-2">
                            <ul>
                              <li id="">
                                {" "}
                                <b>Listed Companies </b> that are looking for
                                capital to expand, reduce debt, or meet working
                                capital requirements.
                              </li>
                              <li id="">
                                <b>
                                  {" "}
                                  Promoter Groups & Family-Owned Businesses{" "}
                                </b>{" "}
                                that want to raise money but want to remain in
                                control.
                              </li>
                              <li id="">
                                {" "}
                                <b>MSMEs & SMEs </b> listed on NSE Emerge / BSE
                                SME Platform are considering rights issues.
                              </li>
                              <li id="">
                                {" "}
                                <b>
                                  {" "}
                                  Companies preparing for Future Public
                                  Offers{" "}
                                </b>{" "}
                                and looking to strengthen financials pre-IPO.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e12">
                          <div className="row mt-3">
                            <div className="col-lg-12" id="e4">
                              <h2>Our Rights Issue Advisory Process</h2>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e13">
                                  <h3>1. Initial Assessment & Eligibility</h3>
                                  <div className="orhp m-2">
                                    <ul>
                                      <li id="">
                                        {" "}
                                        Understanding capital requirements and
                                        business objectives.
                                      </li>
                                      <li id="">
                                        {" "}
                                        Assessing the appropriateness of rights
                                        issues as a means of fundraising.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e14">
                                  <h3>2. Structuring & Planning</h3>
                                  <div className="orhp m-2">
                                    <ul>
                                      <li id="">
                                        {" "}
                                        Choosing the size, ratio, price and
                                        renounceability.
                                      </li>
                                      <li id="">
                                        Development of indicative timelines and
                                        roadmap to compliance.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e15">
                                  <h3>3. Documentation & Compliance</h3>
                                  <div className="orhp m-2">
                                    <ul>
                                      <li id="">
                                        {" "}
                                        Preparing Letter of Offer, public
                                        announcements and SEBI filings.
                                      </li>
                                      <li id="">
                                        Ensuring that there is all the legal,
                                        financial and exchange-related
                                        compliance.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e16">
                                  <h3>4. Execution & Launch</h3>
                                  <div className="orhp m-2">
                                    <ul>
                                      <li id="">
                                        Coordinating with stock exchanges,
                                        intermediaries and regulators
                                      </li>
                                      <li id="">
                                        {" "}
                                        Managing the rights issue opening,
                                        subscription period and allotments.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-2">
                                <div className="col-lg-12" id="e17">
                                  <h3>5. Post-Issue Support </h3>
                                  <div className="orhp m-2">
                                    <ul>
                                      <li id="">
                                        Facilitating listing of new shares.{" "}
                                      </li>
                                      <li id="">
                                        Regulatory reporting and communication
                                        with shareholders following the issue.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e18">
                          <h3>
                            Why India IPO for Rights Issue Advisory Services?
                          </h3>
                          <div className="orhp m-2">
                            <ul>
                              <li id="">
                                <b>Specialised Capital Market Expertise:</b>{" "}
                                Long track record of rights issues, IPOs and
                                secondary capital issues.
                              </li>
                              <li id="">
                                <b>End-to-End Execution Support: </b> From
                                structuring to listing, we manage the complete
                                process.
                              </li>
                              <li id="">
                                <b>Founder & Promoter-Focused Approach: </b>We
                                know what matters to groups of promoters and
                                provide advice based on their control and
                                capital objectives.
                              </li>
                              <li id="">
                                <b>Seamless Regulatory Handling: </b> Good track
                                record in dealing with SEBI, NSE, BSE and
                                statutory requirements.
                              </li>
                              <li id="">
                                <b>
                                  Commitment to Maximising Shareholder
                                  Value:{" "}
                                </b>{" "}
                                Ensuring your rights issue is positioned as a
                                win-win for the company and its shareholders.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="e19">
                          <h3>
                            Get Started with India IPO’s Rights Issue Advisory
                            Services
                          </h3>
                          <p>
                            If you're exploring capital raising options and want
                            to retain control while strengthening your finances,
                            a Rights Issue could be the strategic solution for
                            your business. India IPO is here to guide you
                            through every step of the journey.
                          </p>

                          <div className="col-lg-12">
                            <p>
                              Understand how IPOs work through our{" "}
                              <Link to="/ipo-process">IPO Process</Link> guide.
                              Stay updated with upcoming listings in the{" "}
                              <Link to="/all-ipos">IPO Calendar</Link>
                              and read insights on our{" "}
                              <Link to="/ipo-blogs">
                                IPO Company Reviews — GMP, Subscription Status &
                                Allotment.
                              </Link>
                              Explore our site for comprehensive IPO guidance.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "securitised-debt-instruments-sdi" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="service-content-box service-content">
                      <div className="row pt-2">
                        <div className="col-lg-12" id="sme-ipo-consultation">
                          <h2>
                            Introduction to Securitised Debt Instruments
                            (SDIs){" "}
                          </h2>
                          <p className="mt-3">
                            Securitised Debt Instruments (SDIs) segment in India
                            provides a significant tool for the transformation
                            of illiquid assets (reduced due to the time and cost
                            taken to trade them), such as loans and receivables,
                            into marketable securities. These instruments are
                            issued via Special Purpose Distinct Entities
                            (SPDEs), usually established in the form of trusts
                            and listed on recognised stock exchanges, subject to
                            regulation by SEBI.
                          </p>
                          <p className="mt-2">
                            The SDIs are like fixed-income securities and are
                            governed by the SEBI (Issue and Listing of
                            Securitised Debt Instruments and Security Receipts)
                            Regulations, 2008 and are uniquely positioned for
                            institutional investors looking for exposure in
                            asset-backed fixed-income securities. These
                            instruments help banks, NBFCs, housing finance
                            companies and other originators to release capital
                            and move risk off-balance sheet, at the same time
                            providing investors an opportunity to receive
                            structured returns from known cash flows.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="why-consider-sme-ipo">
                          <h2>What is a Securitised Debt Instrument?</h2>
                          <p className="mt-2">
                            A Securitised Debt Instrument (SDI) is a financial
                            asset that has been created by a securitisation
                            process that pools one or more types of underlying
                            assets that produce stable cash flows (principally
                            loan repayments). The underlying assets are then
                            transferred to a legally independent SPDE, which
                            issues the instruments to the investors.
                          </p>
                          <p className="mt-2">
                            This form of securitisation helps convert illiquid
                            receivables into tradable securities and spreads
                            risk across a diversified pool.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="benefit-sme">
                          <h2>Structure of SDI Transactions</h2>
                          <p>
                            The SDI ecosystem involves multiple regulated
                            participants:
                          </p>
                          <div className="orhp m-2">
                            <ul>
                              <li id="faster-process">
                                <b>Originator :</b> Who is assigning debt or
                                receivable to SPDE (eg, Bank, NBFC)
                              </li>
                              <li id="confidentiality">
                                <b>SPDE :</b> A bankruptcy-remote trust
                                established to issue SDIs.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Trustee : </b> SEBI-registered, which is
                                responsible for ensuring the SPDE's Compliance
                                with investor protection and governing
                                disclosure in the prospectus
                              </li>
                              <li id="targeted-investor-base">
                                <b>Servicer :</b> A Company that collects the
                                receivables and perfroms the regular
                                distributions.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Credit Enhancer: </b> Guarantees or reserves
                                to diminish risk.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Liquidity Provider: </b>Ensures smooth cash
                                flows if delays arise in receivable collections.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="character-sdi">
                          <h2>Characteristics of SDIs</h2>
                          <div className="orhp m-2">
                            <ul>
                              <li id="faster-process">
                                <b> Asset-backed :</b> Based on loans or
                                receivables that produce predictable cash flows
                              </li>
                              <li id="confidentiality">
                                <b>Bankruptcy Remote :</b> SPDE serves to shield
                                assets from the originator’s credit risk.{" "}
                              </li>
                              <li id="targeted-investor-base">
                                <b>Structured Returns : </b>Payments are made in
                                defined tranches per the contract.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Rated Instruments :</b> Should be rated at
                                least two (2) credit rating agencies registered
                                with SEBI.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Tradable : </b>Publicly issued and listed
                                SDIs are traded on recognised stock exchanges.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="categories-assets">
                          <h2>Categories of Underlying Assets</h2>
                          <p>
                            SDIs can be structured around various types of
                            receivables, including:
                          </p>
                          <div className=" m-2">
                            <ul>
                              <li>
                                <span>1.</span> Mortgage-backed loans
                                (residential or commercial).
                              </li>
                              <li>
                                <span>2.</span> Vehicle or equipment finance
                                loans.
                              </li>
                              <li>
                                <span>3.</span> Microfinance portfolios.
                              </li>
                              <li>
                                <span>4.</span> Trade receivables or corporate
                                loans.
                              </li>
                              <li>
                                <span>5.</span> All monetary assets as defined
                                in the SARFAESI Act, 2002.
                              </li>
                            </ul>
                          </div>
                          <p>
                            These assets should be unencumbered, binding and
                            generate cash flows to emphasise investor
                            confidence.
                          </p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="eligibity">
                          <h2>Eligibility & Compliance Criteria</h2>
                          <p>
                            There are strict conditions to satisfy both the SPDE
                            and the associated trustee to release SDIs:
                          </p>
                          <div className="orhp m-2">
                            <ul>
                              <li id="faster-process">
                                It will be necessary for SPDE to be a trust with
                                a constitution document sanctioning SDI
                                creation.
                              </li>
                              <li id="confidentiality">
                                Trustees must be:
                                <ul className="nested-list">
                                  <li>
                                    SEBI registered (or exempt, e.g., NHB,
                                    NABARD).
                                  </li>
                                  <li>Have a net worth of ₹2 crore.</li>
                                  <li>
                                    Hire securitisation professionals of
                                    quality.
                                  </li>
                                </ul>
                              </li>
                              <li id="targeted-investor-base">
                                The asset sale should be a "true sale" without
                                recourse or set-off rights to the originator.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="purpose-sdi">
                          <h2>Purpose of SDI Issuance</h2>
                          <div className="orhp m-2">
                            <ul>
                              <li id="faster-process">
                                <b> Liquidity generation: </b> Assists financial
                                firms to decongest their balance sheets by
                                vending loan books.
                              </li>
                              <li id="confidentiality">
                                <b>Risk transfer :</b> Enables both originators
                                and investors to diversify their risks.{" "}
                              </li>
                              <li id="targeted-investor-base">
                                <b> Efficient capital management: </b>Improves
                                balance sheet ratios for lending institutions.
                              </li>
                              <li id="targeted-investor-base">
                                <b>Investor access:</b> Institutional investors
                                can get access to high-yield, asset-backed
                                securities.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-12" id="adv-sdi">
                          <h2> Advantages of SDI Listing</h2>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="pre-ipo-assessment">
                              <h3>1. Access to Capital Markets</h3>
                              <p className="mt-2">
                                Exchange listing allows SPDEs to reach more
                                investors.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="ipo-structuring">
                              <h3>2. Risk Mitigation</h3>
                              <p className="mt-2">
                                Investors benefit from diversification,
                                structured payouts and credit enhancement
                                mechanisms.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div
                              className="col-lg-12"
                              id="regulatory-documentation"
                            >
                              <h3>3. Transparency</h3>
                              <p className="mt-2">
                                Regular disclosures and audited accounts build
                                investor trust.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div
                              className="col-lg-12"
                              id="stakeholder-coordination"
                            >
                              <h3>4. Regulated Framework</h3>
                              <p className="mt-2">
                                From start to finish, everything is managed by
                                SEBI to guarantee legality and financial safety.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="marketing-roadshows">
                              <h3>5. Improved Liquidity for Originators</h3>
                              <p className="mt-2">
                                Lenders can recycle capital for further lending
                                operations.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-lg-12" id="dis-adv">
                          <h2> Disadvantages & Risks</h2>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="pre-ipo-assessment">
                              <h3>1. Complex Structuring</h3>
                              <p className="mt-2">
                                Legal and financial complexity in setting up
                                SPDEs and executing the true sale of assets.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="ipo-structuring">
                              <h3>2. High Compliance Burden</h3>
                              <p className="mt-2">
                                Frequent reporting, audits, trustee coordination
                                and rating reviews.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div
                              className="col-lg-12"
                              id="regulatory-documentation"
                            >
                              <h3>3. Cost-Intensive</h3>
                              <p className="mt-2">
                                Involves credit rating fees, trustee fees, legal
                                documentation and listing expenses.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div
                              className="col-lg-12"
                              id="stakeholder-coordination"
                            >
                              <h3>4. Asset Performance Risk</h3>
                              <p className="mt-2">
                                Investor returns are based on the performance of
                                receivables underlying the ABS. A default or
                                delay may affect payouts.
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="col-lg-12" id="marketing-roadshows">
                              <h3>5. Limited Retail Participation</h3>
                              <p className="mt-2">
                                Primarily suited for Qualified Institutional
                                Buyers (QIBs) due to complexity and risk
                                profile.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-12" id="renewal">
                          <h3>Renewal & Ongoing Requirements</h3>
                          <div className="orhp m-2">
                            <ul>
                              <li id="faster-process">
                                Trustees will also need to file quarterly
                                performance reports, investor reports and audit
                                certificates.
                              </li>
                              <li id="confidentiality">
                                Ratings need to be reviewed once a year (or
                                half-yearly in case of security receipts).{" "}
                              </li>
                              <li id="targeted-investor-base">
                                Books and records must be kept for at least 8
                                years after the redemption.
                              </li>
                              <li id="targeted-investor-base">
                                The trustee has to have a net worth of all time
                                and it must name a compliance officer.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-10">
                        <div className="col-lg-12" id="comparison">
                          {/* Card Container */}
                          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                            {/* Heading */}
                            <div className="bg-[#001529] px-8 py-5">
                              <h3 className="text-2xl font-black text-white">
                                Comparison: SDIs vs Corporate Bonds
                              </h3>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[950px] border-collapse">
                                <thead className="bg-slate-100 border-b border-slate-200">
                                  <tr>
                                    <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[28%]">
                                      Parameter
                                    </th>

                                    <th className="px-8 py-5 text-left text-sm font-black text-[#f59e08] uppercase tracking-wide w-[36%]">
                                      Securitised Debt Instruments (SDIs)
                                    </th>

                                    <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[36%]">
                                      Corporate Bonds
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {[
                                    {
                                      param: "Backed By",
                                      sdi: "Asset pool of receivables",
                                      bond: "Issuer’s balance sheet",
                                    },

                                    {
                                      param: "Returns",
                                      sdi: "Structured cash flow-based returns",
                                      bond: "Fixed coupon or floating rate",
                                    },

                                    {
                                      param: "Investors",
                                      sdi: "Institutions, QIBs & HNIs",
                                      bond: "Retail + Institutional investors",
                                    },

                                    {
                                      param: "Credit Rating",
                                      sdi: "Mandatory (2 CRAs for public issue)",
                                      bond: "Usually mandatory",
                                    },

                                    {
                                      param: "Tradable",
                                      sdi: "Yes, on recognised exchanges",
                                      bond: "Yes",
                                    },

                                    {
                                      param: "Regulatory Authority",
                                      sdi: "SEBI",
                                      bond: "SEBI",
                                    },

                                    {
                                      param: "Listing Requirement",
                                      sdi: "Mandatory for public issues",
                                      bond: "Mandatory for listed bonds",
                                    },
                                  ].map((row, index) => (
                                    <tr
                                      key={index}
                                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                                    >
                                      <td className="px-8 py-6 font-bold text-slate-800 align-top">
                                        {row.param}
                                      </td>

                                      <td className="px-8 py-6 text-[#f59e08] font-semibold leading-7 align-top">
                                        {row.sdi}
                                      </td>

                                      <td className="px-8 py-6 text-slate-600 leading-7 align-top">
                                        {row.bond}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "public-issued-municipal-debt-securities" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      {/* Section 1 */}
                      <div
                        id="empowering"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <div className="flex items-center gap-3 mb-6"></div>
                        <div className="row pt-2">
                          <div className="col-lg-12" id="e1">
                            <h2>
                              Empowering Indian Cities to Raise Capital for the
                              Public Good{" "}
                            </h2>
                            <p>
                              Urban India is once again on the fast track to
                              growth, but the entire system is struggling to
                              meet the demand for sustainable, contemporary
                              infrastructure. India IPO provides a platform for
                              the municipal bodies of India to access the
                              capital markets via Public Issues of Municipal
                              Debt Securities (MDS) — a regulated, transparent
                              and inclusive mechanism for financing public
                              infrastructure projects.
                            </p>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e2">
                            <h2>What Are Municipal Debt Securities?</h2>
                            <p className="mt-2">
                              Municipal Debt Securities Public Issue (MDS) are
                              the bonds issued by Urban Local Bodies (ULBs) such
                              as city corporations to fetch capital from the
                              general public to finance various important and
                              essential infrastructure projects such as roads,
                              water supply systems, waste collection systems,
                              transport hubs and green energy, etc.
                            </p>
                            <p className="mt-2">
                              With the help of Public Issued Municipal Debt
                              Securities, cities will no longer need to depend
                              only on government grants or rely on internal
                              revenues, but will now have direct access to
                              retail and institutional investor interest,
                              meaning citizens will have a direct stake in the
                              development of their city.
                            </p>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e3">
                            <h2>India IPO: Your End-to-End Advisory Partner</h2>
                            <p>
                              India IPO serves as a strategic advisory partner
                              to municipalities, smart city projects and
                              state-level urban development bodies. Our services
                              include:
                            </p>
                            <div className="orhp m-2" id="e4">
                              <h3> Eligibility Assessment</h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Assessment of Financial Health and
                                  Creditworthiness
                                </li>
                                <li id="confidentiality">
                                  Regulatory compliance review as per SEBI
                                  (Issue and Listing of Municipal Debt
                                  Securities) Regulations, 2015
                                </li>
                                <li id="targeted-investor-base">
                                  Review of Revenue models and ability to
                                  service Debt
                                </li>
                              </ul>
                            </div>

                            <div className="orhp m-2" id="e5">
                              <h3>Structuring the Bond Issue</h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Instrument design – secured/unsecured, tenure,
                                  coupon rate
                                </li>
                                <li id="confidentiality">
                                  Assistance in selecting the right bond
                                  category (general obligation, revenue bonds,
                                  etc.)
                                </li>
                                <li id="targeted-investor-base">
                                  Evaluation of tax-free bond eligibility
                                </li>
                              </ul>
                            </div>
                            <div className="orhp m-2" id="e6">
                              <h3>Drafting & Regulatory Filings</h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Preparation and Review of Draft Offer Document
                                  (DOD)
                                </li>
                                <li id="confidentiality">
                                  Coordination with{" "}
                                  <b>SEBI and designated stock exchanges </b>
                                </li>
                                <li id="targeted-investor-base">
                                  Integration of disclosures, project details,
                                  risk factors and repayment schedules
                                </li>
                              </ul>
                            </div>

                            <div className="orhp m-2" id="e7">
                              <h3>Intermediary Coordination</h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Liaison with{" "}
                                  <b>
                                    {" "}
                                    merchant bankers, credit rating agencies,
                                    legal advisors and debenture trustees{" "}
                                  </b>
                                </li>
                                <li id="confidentiality">
                                  End-to-end project management from approval to
                                  launch
                                </li>
                              </ul>
                            </div>

                            <div className="orhp m-2" id="e8">
                              <h3>
                                Investor Outreach & Subscription Management
                              </h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Investor education and marketing to increase
                                  retail and institutional participation
                                </li>
                                <li id="confidentiality">
                                  Digital and offline subscription management,
                                  including UPI-based platforms
                                </li>
                                <li id="confidentiality">
                                  Roadshows and webinars to raise awareness and
                                  trust
                                </li>
                              </ul>
                            </div>
                            <div className="orhp m-2" id="e9">
                              <h3>Listing & Post-Issue Support</h3>
                              <ul>
                                <li id="faster-process">
                                  {" "}
                                  Bond listing support on recognized stock
                                  exchanges (like NSE/BSE)
                                </li>
                                <li id="confidentiality">
                                  Assistance with secondary market trading
                                  readiness and disclosure compliance
                                </li>
                                <li id="confidentiality">
                                  Ongoing investor reporting and trustee
                                  coordination
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-20">
                          <div className="col-lg-12" id="e10">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                              {/* Heading */}
                              <div className="bg-[#001529] px-8 py-5">
                                <h3 className="text-2xl font-black text-white">
                                  Why Public Issue Over Private Placement?
                                </h3>
                              </div>

                              {/* Table */}
                              <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] border-collapse">
                                  <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                      <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[25%]">
                                        Feature
                                      </th>

                                      <th className="px-8 py-5 text-left text-sm font-black text-[#f59e08] uppercase tracking-wide w-[37.5%]">
                                        Public Issue
                                      </th>

                                      <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[37.5%]">
                                        Private Placement
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {[
                                      {
                                        f: "Investor Base",
                                        pub: "General public & institutional investors",
                                        priv: "Select institutional investors",
                                      },

                                      {
                                        f: "Regulatory Oversight",
                                        pub: "Strict SEBI compliance with mandatory disclosures",
                                        priv: "Relatively relaxed compliance framework",
                                      },

                                      {
                                        f: "Market Visibility",
                                        pub: "Higher visibility through exchange listing",
                                        priv: "Lower visibility due to private trading",
                                      },

                                      {
                                        f: "Transparency",
                                        pub: "Detailed disclosures, reporting & ratings",
                                        priv: "Moderate transparency",
                                      },

                                      {
                                        f: "Fundraising Potential",
                                        pub: "Larger and scalable capital raising opportunity",
                                        priv: "Limited to selected investors",
                                      },
                                    ].map((row, ri) => (
                                      <tr
                                        key={ri}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                                      >
                                        <td className="px-8 py-6 font-bold text-slate-800 align-top">
                                          {row.f}
                                        </td>

                                        <td className="px-8 py-6 text-[#f59e08] font-semibold leading-7 align-top">
                                          {row.pub}
                                        </td>

                                        <td className="px-8 py-6 text-slate-600 leading-7 align-top">
                                          {row.priv}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row pt-2">
                          <div className="col-lg-12" id="e11">
                            <h3>Partner with India IPO</h3>
                            <p className="mt-3">
                              Whether you are a municipal commissioner, an urban
                              development official, or a smart city executive,
                              India IPO provides the knowledge, tools and
                              execution support to bring your Municipal Debt
                              Securities Public Issue to market seamlessly and
                              successfully.
                            </p>
                            <p>
                              Let’s build a future-ready India — city by city,
                              bond by bond.
                            </p>
                          </div>
                        </div>

                        <div className="row pt-2">
                          <div className="col-lg-12" id="e12">
                            <h4>Get Started Today</h4>
                            <p className="mt-2">
                              Book a free consultation with our Municipal
                              Finance Advisory Team.
                            </p>
                          </div>
                          <div className="col-lg-12">
                            <p>
                              Understand how IPOs work through our{" "}
                              <Link to="/ipo-process">IPO Process</Link> guide.
                              Stay updated with upcoming listings in the{" "}
                              <Link to="/reports">IPO Calendar</Link>
                              and read insights on our{" "}
                              <Link to="/ipo-blogs">
                                IPO Company Reviews — GMP, Subscription Status &
                                Allotment.
                              </Link>
                              Explore our blog for IPO guidance.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="bg-[#001529] p-12 md:p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e08] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <h3 className="text-3xl font-black text-white">
                          Get Started Today
                        </h3>
                        <p className="text-white/60 text-lg max-w-xl mx-auto font-medium">
                          Book a free consultation with our Municipal Finance
                          Advisory Team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                          <Button
                            asChild
                            className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black px-12 h-16 rounded-2xl text-lg"
                          >
                            <Link to="/contact">
                              Contact Us <ArrowRight className="ml-2 h-6 w-6" />
                            </Link>
                          </Button>
                          <div className="flex items-center gap-4 px-10 border border-white/10 rounded-2xl bg-white/5 h-16">
                            <Phone className="h-6 w-6 text-[#f59e08]" />
                            <span className="text-xl font-black text-white">
                              +91-74283-37280
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "privately-issued-municipal-debt-securities" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      {/* Section 1 */}
                      <div
                        id="private-empowering"
                        className="service-content-box service-content scroll-mt-24"
                      >
                        <div className="row pt-2">
                          <div className="col-lg-12">
                            <h2 className="text-3xl font-black text-[#001529] mb-6 leading-tight">
                              Secured and Highly Targeted Capital Sourcing for
                              Indian Municipalities
                            </h2>
                            <p className="text-lg leading-relaxed text-slate-700">
                              Rapid urban growth demands swift, efficient, and
                              substantial funding channels. India IPO acts as a
                              strategic advisory partner for Urban Local Bodies
                              (ULBs), smart city special purpose vehicles, and
                              public utilities, enabling them to raise targeted
                              capital via Private Placements of Municipal Debt
                              Securities (MDS). This compliant and streamlined
                              mechanism bridges the gap between major
                              institutional investors and critical city
                              development initiatives.
                            </p>
                          </div>
                        </div>

                        <div className="row mt-12">
                          <div className="col-lg-12">
                            <h2 className="text-2xl font-black mb-4">
                              What Are Privately Issued Municipal Debt
                              Securities?
                            </h2>
                            <p className="mt-2 text-slate-600 leading-relaxed">
                              Privately Issued Municipal Debt Securities
                              (Private MDS) are debt instruments issued by city
                              corporations, development authorities, or
                              municipal bodies to a select group of qualified
                              institutional buyers (QIBs), such as banks, mutual
                              funds, insurance companies, and pension funds.
                              Unlike public issues, private placement focuses on
                              high-value, sophisticated investors, significantly
                              reducing execution timelines and administrative
                              overhead while unlocking secure financing for key
                              infrastructure.
                            </p>
                          </div>
                        </div>

                        <div className="row mt-16">
                          <div className="col-lg-12">
                            <h2 className="text-2xl font-black mb-6">
                              Expert Advisory Across Every Stage
                            </h2>
                            <p className="text-slate-500 mb-10">
                              Our dedicated municipal finance team guides public
                              entities through the complex structuring, rating,
                              and regulatory requirements of private debt
                              issuance. We provide complete advisory including:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#001529]">
                                  Institutional Investor Mapping
                                </h3>
                                <div className="orhp text-sm text-slate-600">
                                  <ul className="space-y-2">
                                    <li>
                                      Identifying active institutional debt
                                      investors, pension funds, and domestic
                                      financial institutions.
                                    </li>
                                    <li>
                                      Pre-placement engagement to align
                                      interest, terms, and expectations.
                                    </li>
                                    <li>
                                      Securing anchor commitments to ensure
                                      successful issue subscription.
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#001529]">
                                  Custom Instrument Structuring
                                </h3>
                                <div className="orhp text-sm text-slate-600">
                                  <ul className="space-y-2">
                                    <li>
                                      Tailoring debt terms – coupon rates,
                                      amortization schedules, escrow structures,
                                      and redemption plans.
                                    </li>
                                    <li>
                                      Designing credit enhancement features like
                                      state government guarantees or debt
                                      service reserve funds (DSRF).
                                    </li>
                                    <li>
                                      Structuring revenue-backed bonds tied to
                                      specific city receipts (e.g., water
                                      tariffs, property tax).
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#001529]">
                                  Offer Document & Regulatory Advisory
                                </h3>
                                <div className="orhp text-sm text-slate-600">
                                  <ul className="space-y-2">
                                    <li>
                                      Drafting premium Private Placement Offer
                                      Letters (PPOL) in compliance with SEBI MDS
                                      Regulations.
                                    </li>
                                    <li>
                                      Managing coordination with SEBI-registered
                                      trustees, CAs, legal advisors, and credit
                                      rating agencies.
                                    </li>
                                    <li>
                                      Securing listing permissions on recognized
                                      exchanges (NSE/BSE) for secondary market
                                      liquidity.
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#001529]">
                                  Escrow & Cash Flow Engineering
                                </h3>
                                <div className="orhp text-sm text-slate-600">
                                  <ul className="space-y-2">
                                    <li>
                                      Setting up secure, structured escrow
                                      accounts to manage revenue flows and debt
                                      servicing.
                                    </li>
                                    <li>
                                      Engineering payment waterfall mechanisms
                                      to guarantee investor safety and enhance
                                      bond ratings.
                                    </li>
                                    <li>
                                      Ensuring transparent project monitoring
                                      and ongoing compliance reporting.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-20">
                          <div className="col-lg-12">
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                              <div className="bg-[#001529] px-8 py-5">
                                <h3 className="text-2xl font-black text-white">
                                  Key Parameters: Private Placement vs Public
                                  Issue
                                </h3>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px] border-collapse">
                                  <thead className="bg-slate-100 border-b border-slate-200">
                                    <tr>
                                      <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[25%]">
                                        Feature
                                      </th>
                                      <th className="px-8 py-5 text-left text-sm font-black text-[#f59e08] uppercase tracking-wide w-[37.5%]">
                                        Private Placement MDS
                                      </th>
                                      <th className="px-8 py-5 text-left text-sm font-black text-slate-800 uppercase tracking-wide w-[37.5%]">
                                        Public Issue MDS
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[
                                      {
                                        f: "Target Investor Base",
                                        priv: "Select qualified institutional buyers (pension funds, insurance, banks, mutual funds)",
                                        pub: "Retail public, HNIs, and broad institutional pools",
                                      },
                                      {
                                        f: "Time to Market",
                                        priv: "Fast-track execution (typically 4–8 weeks)",
                                        pub: "Longer execution (typically 12–20 weeks) due to mandatory public reviews",
                                      },
                                      {
                                        f: "Issuance Costs",
                                        priv: "Highly cost-effective (minimal marketing, printing, and retail fees)",
                                        pub: "Higher costs (large advertising, distribution, syndicate, and retail underwriting fees)",
                                      },
                                      {
                                        f: "Structuring Flexibility",
                                        priv: "Highly customizable to match specific institutional covenants",
                                        pub: "Standardized structures to suit retail risk-return preferences",
                                      },
                                      {
                                        f: "Minimum Credit Rating",
                                        priv: "Mandatory rating from at least one SEBI-registered agency",
                                        pub: "Mandatory investment-grade rating (typically from two agencies)",
                                      },
                                    ].map((row, ri) => (
                                      <tr
                                        key={ri}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                                      >
                                        <td className="px-8 py-6 font-bold text-slate-800 align-top">
                                          {row.f}
                                        </td>
                                        <td className="px-8 py-6 text-[#f59e08] font-semibold leading-7 align-top">
                                          {row.priv}
                                        </td>
                                        <td className="px-8 py-6 text-slate-600 leading-7 align-top">
                                          {row.pub}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-16 text-center">
                          <div className="col-lg-12">
                            <h3 className="text-2xl font-black text-[#001529] mb-4">
                              Partner with India IPO
                            </h3>
                            <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                              Whether you are planning a smart city
                              infrastructure project, expanding public
                              utilities, or seeking to optimize urban cash flows
                              — India IPO provides the legal, financial, and
                              market expertise required to successfully place
                              your Municipal Debt Securities.
                            </p>
                            <p className="font-black text-[#f59e08]">
                              Let’s build a future-ready India — city by city,
                              bond by bond.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-[#001529] p-12 md:p-20 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e08] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl" />
                      <h3 className="text-3xl font-black text-white">
                        Get Started Today
                      </h3>
                      <p className="text-white/60 text-lg max-w-xl mx-auto font-medium">
                        Book a free consultation with our Municipal Finance
                        Advisory Team.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                        <Button
                          asChild
                          className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black px-12 h-16 rounded-2xl text-lg"
                        >
                          <Link to="/contact">
                            Contact Us <ArrowRight className="ml-2 h-6 w-6" />
                          </Link>
                        </Button>
                        <div className="flex items-center gap-4 px-10 border border-white/10 rounded-2xl bg-white/5 h-16">
                          <Phone className="h-6 w-6 text-[#f59e08]" />
                          <span className="text-xl font-black text-white">
                            +91-74283-37280
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "invit-rights-issue-advisory-services" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="service-content-box service-content">
                      {" "}
                      <div className="space-y-10">
                        {/* e1 */}
                        <div className="row pt-2">
                          <div className="col-lg-12" id="e1">
                            <h2>
                              Unlocking Capital via SEBI‑Compliant Rights Issues
                              for Listed InvITs
                            </h2>
                            <p>
                              A rights issue is a strategic mechanism for listed
                              Infrastructure Investment Trusts (InvITs) to raise
                              additional equity capital from existing
                              unitholders. By offering new units at a
                              predetermined ratio and price, InvITs can fund
                              asset acquisitions, repay debt, or finance
                              expansion projects while allowing existing
                              investors to maintain their proportional stake.
                            </p>
                            <p>
                              At India IPO, we provide comprehensive InvIT
                              Rights Issue Advisory, covering everything from
                              structuring and pricing to regulatory filings,
                              Rights Entitlement (RE) management and final
                              allotment.
                            </p>
                          </div>
                        </div>

                        {/* e2 */}
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e2">
                            <h2>What is an InvIT Rights Issue?</h2>
                            <p>
                              An InvIT rights issue involves the issuance of
                              additional units to existing unitholders as on a
                              specific record date. These units are offered in a
                              fixed proportion to their existing holding,
                              typically at a discount to the current market
                              price. This route is favored for its
                              cost-efficiency and faster execution compared to
                              public issues, making it ideal for funding the
                              acquisition of revenue-generating infrastructure
                              assets.
                            </p>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e2">
                            <h2>What is an InvIT Rights Issue?</h2>
                            <p className="mt-2">
                              An InvIT rights issue enables an InvIT to issue
                              new capital by issuing new units to the existing
                              unitholders in proportion to their existing
                              holdings. The mechanism assists sponsors to raise
                              extra capital to buy assets, repay debt, or
                              restructure capital while providing unitholders
                              the first right to keep or grow their investment
                              stake at favorable conditions.
                            </p>
                          </div>
                        </div>

                        <div className="row mt-4">
                          <div className="col-lg-12" id="e3">
                            <h2>Regulatory Framework & Eligibility </h2>
                            <div className="orhp m-2">
                              The rights issues of InvIT in India are governed
                              by the detailed guidelines of SEBI, mainly under:
                              <ul>
                                <li id="faster-process">
                                  <b>
                                    SEBI (Infrastructure Investment Trusts)
                                    Regulations, 2014
                                  </b>{" "}
                                  (with latest amendments up to 2025)
                                </li>
                                <li id="confidentiality">
                                  {" "}
                                  <b>
                                    SEBI ICDR (Issue of Capital and Disclosure
                                    Requirements) Regulations{" "}
                                  </b>{" "}
                                  for rights issue process alignment.
                                </li>
                              </ul>
                              <h3 id="e3.1">Key regulatory highlights:</h3>
                              <ul>
                                <li>
                                  Both listed and unlisted InvITs are allowed to
                                  issue rights where fast-track approvals are
                                  available to eligible publicly listed
                                  InvITs.{" "}
                                </li>
                                <li>
                                  Similar requirements are imposed on follow-on
                                  offers in terms of minimum public float and
                                  disclosure.
                                </li>
                                <li>
                                  Right issues are moderate in terms of filing
                                  fees (0.05% of the size of the issue), which
                                  promotes efficient capital raising.
                                </li>
                                <li>
                                  Rights issues also need thorough compliance
                                  checks to prevent defaults, ensure sufficient
                                  disclosures and lock-in conditions to sponsor
                                  units.
                                </li>
                              </ul>
                            </div>
                            <div className="row mt-3">
                              <div className="col-lg-12" id="e4">
                                <h2>
                                  Our InvIT Rights Issue Advisory Services
                                </h2>

                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e5">
                                    <h3>
                                      1. Strategic Structuring & Eligibility
                                      Assessment
                                    </h3>
                                    <div className="orhp m-2">
                                      <ul>
                                        <li id="faster-process">
                                          Evaluate the benefits of rights issue
                                          compared to alternatives (private
                                          placements, raising debt, follow-on
                                          offers).
                                        </li>
                                        <li id="confidentiality">
                                          Design optimal quantum of capital
                                          raising, pricing plans (typically
                                          discounted NAV-based prices) and plans
                                          to allocate units.
                                        </li>
                                        <li>
                                          Evaluate the effect on the holding of
                                          the sponsor, the norms of public float
                                          and the expected market reception.
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e6">
                                    <h2>
                                      2. Offer Document Drafting & Regulatory
                                      Liaison
                                    </h2>
                                    <div className="orhp m-2">
                                      <ul>
                                        <li id="confidentiality">
                                          Prepare detailed draft offer documents
                                          compliant with SEBI requirements,
                                          including:
                                          <ul className="nested-list">
                                            <li>
                                              {" "}
                                              Financial disclosures (audited and
                                              pro forma),
                                            </li>
                                            <li>
                                              {" "}
                                              Asset portfolios and valuation
                                              methodologies,
                                            </li>
                                            <li>
                                              {" "}
                                              Sponsor and related-party details,
                                            </li>
                                            <li>
                                              {" "}
                                              Rights ratio, issue price, minimum
                                              subscription and timelines.
                                            </li>
                                          </ul>
                                          <li>
                                            {" "}
                                            Manage SEBI filings, respond to
                                            regulatory comments and coordinate
                                            with merchant bankers and legal
                                            advisors.
                                          </li>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e7">
                                    <h3>
                                      3. Investor Communication & Market
                                      Execution
                                    </h3>
                                    <div className="orhp m-2">
                                      <ul>
                                        <li id="faster-process">
                                          Develop investor outreach programs
                                          targeting existing unitholders across
                                          institutional, non-institutional and
                                          retail segments.
                                        </li>
                                        <li id="faster-process">
                                          Guide on application processes via
                                          ASBA and UPI for smooth subscription
                                          management.
                                        </li>
                                        <li id="faster-process">
                                          Make sure that there are transparent
                                          allotment practices as per the right
                                          entitlements and regulatory norms.
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e8">
                                    <h3>
                                      4. Subscription & Allotment Management
                                    </h3>
                                    <div className="orhp m-2">
                                      <ul>
                                        <li id="faster-process">
                                          {" "}
                                          Monitor subscription levels in real
                                          time and manage any unsubscribed unit
                                          offerings.
                                        </li>
                                        <li id="">
                                          Oversight of timely allocations,
                                          refunds, dematerialization processes
                                          and liaising with stock exchanges and
                                          registrars on listing of additional
                                          units.
                                        </li>
                                        <li>
                                          {" "}
                                          Ensure T+3 listing timelines are met
                                          to enhance liquidity.{" "}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-lg-12" id="e9">
                                    <h3>
                                      5. Post-Issue Compliance & Governance
                                      Support
                                    </h3>
                                    <div className="orhp m-2">
                                      <ul>
                                        <li id="faster-process">
                                          Assist in the continuous monitoring of
                                          public float requirements and
                                          disclosures post-issue.
                                        </li>
                                        <li id="faster-process">
                                          Support trustee governance functions
                                          of compliance audits, investor
                                          complaints and reporting.
                                        </li>
                                        <li id="faster-process">
                                          Maintain the standards of distribution
                                          (pay out at least 90% of distributable
                                          cash flow) and quarterly performance
                                          reports.
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e11 Benefits (User Content) */}
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e11">
                            <h2>
                              Benefits of Engaging Our InvIT Rights Issue
                              Advisory
                            </h2>
                            <div className="orhp">
                              <ul>
                                <li>
                                  <b>Regulatory Expertise:</b> To deal with
                                  complicated SEBI regulations with care so that
                                  approvals and disclosures can be made
                                  smoothly.
                                </li>
                                <li>
                                  <b>Investor Confidence: </b> Robust investor
                                  communication and transparent execution
                                  protect unitholder interests and market
                                  reputation.
                                </li>
                                <li>
                                  <b>Optimized Capital Raising: </b> Raise the
                                  maximum amount possible in terms of pricing
                                  and allocation advice to align sponsors and
                                  investors.
                                </li>
                                <li>
                                  <b>Efficient Execution: </b> Mitigate risks
                                  with expert coordination across multiple
                                  stakeholders, including SEBI, merchant
                                  bankers, trustees and registrars.
                                </li>
                                <li>
                                  <b> Holistic Compliance: </b> End-to-end
                                  support from pre-issue planning to post-issue
                                  monitoring safeguards trust, governance and
                                  legal compliance.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* e12 Who Should Seek (User Content) */}
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e12">
                            <h2>
                              Who Should Seek InvIT Rights Issue Advisory?
                            </h2>
                            <div className="orhp">
                              <ul>
                                <li>
                                  <b>Sponsors & Fund Managers:</b> InvIT
                                  sponsors and fund managers aiming to raise
                                  additional capital through rights offers.
                                </li>
                                <li>
                                  <b>Listed & Unlisted InvITs:</b> Listed and
                                  unlisted InvITs contemplating expansion,
                                  acquisition, or debt servicing while
                                  maintaining existing ownership structures.
                                </li>
                                <li>
                                  <b>Institutional Investors:</b> Institutional
                                  investors and trustees seeking assurance on
                                  process transparency, compliance and investor
                                  protection.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* e13 Why Choose India IPO (User Content) */}
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e13">
                            <h2>
                              Why Choose India IPO for InvIT Rights Issue
                              Advisory?
                            </h2>
                            <p>
                              India IPO offers deep regulatory expertise, vast
                              experience in capital markets and a network of
                              institutional partners to provide full InvIT
                              rights issue advisory services. We have a
                              personalized service approach that makes your
                              capital raise legally compliant, financially sound
                              and operationally efficient throughout the
                              process.
                            </p>
                          </div>
                        </div>

                        {/* e14 Get in Touch (User Content) */}
                        <div className="row mt-4">
                          <div className="col-lg-12" id="e14">
                            <h2>Get in Touch</h2>
                            <p>
                              Raise capital confidently with an InvIT rights
                              issue customized to SEBI guidelines and today’s
                              investor expectations. Contact India IPO’s InvIT
                              advisory team today for a personalized
                              consultation and let us guide you toward a
                              successful and compliant capital raise.
                            </p>

                            <div className="col-lg-12 mt-4">
                              <p>
                                Understand how IPOs work through our{" "}
                                <Link to="/ipo-process">IPO Process</Link>{" "}
                                guide. Stay updated with upcoming listings in
                                the <Link to="/reports">IPO Calendar</Link>
                                and read insights on our{" "}
                                <Link to="/ipo-blogs">
                                  IPO Company Reviews — GMP, Subscription Status
                                  & Allotment.
                                </Link>
                                Explore our blog for IPO guidance.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : slug === "invit-public-issue-advisory" ? (
                  <div className="flex flex-col gap-12 relative">
                    <div className="service-content-box service-content">
                      {" "}
                      <div className="space-y-10">
                        {/* e1 */}
                        <div className="row pt-2">
                          <div className="col-lg-12" id="e1">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Unlocking Capital via SEBI‑Compliant Public Issues
                              for Public or Privately‑Listed InvITs{" "}
                            </h2>
                            <p className="mt-3 text-slate-600 text-lg leading-relaxed">
                              A listed or private-listed InvIT can raise capital
                              in a public issue using a fresh issue and/or an
                              offer-for-sale to institutional, anchor and retail
                              investors. In the case of privately listed InvITs,
                              it transforms them into public InvITs under SEBI
                              guidelines, which provide liquidity, scale and
                              public float requirements.
                            </p>
                            <p className="mt-4 text-slate-600 text-lg leading-relaxed font-medium">
                              At India IPO, we deliver full‑service InvIT Public
                              Issue Advisory, providing capital structuring,
                              drafting of the Offer Document, SEBI coordination,
                              investor engagement, execution and post-listing
                              assurance.
                            </p>
                          </div>
                        </div>

                        {/* e2 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e2">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              What is an InvIT Public Issue?
                            </h2>
                            <p className="mt-2 text-slate-600 leading-relaxed">
                              The InvIT public issue is a capital raising
                              process through the public issue of units to the
                              investors through a duly filed offer document with
                              SEBI and exchanges. When done by a privately
                              listed InvIT, this provides it with a public InvIT
                              status, which is also subject to SEBI eligibility
                              requirements, including unitholder consent,
                              lock-in of the sponsor, minimum public float
                              levels and disclosure standards consistent with
                              follow-on offerings.
                            </p>
                          </div>
                        </div>

                        {/* e3-e7 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e3">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-6">
                              InvIT Public Issue: Eligibility & Regulatory
                              Criteria
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <h3
                                  id="e4"
                                  className="text-xl font-black text-[#001529] flex items-center gap-2"
                                >
                                  <ShieldCheck className="h-5 w-5 text-[#f59e08]" />{" "}
                                  Conversion & Eligibility Requirements
                                </h3>
                                <div className="orhp ml-2">
                                  <ul className="space-y-3">
                                    <li
                                      id="faster-process"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Unitholder Approval:</b> A privately
                                        listed InvIT will not be eligible to
                                        issue a public issue unless it obtains
                                        the approval of at least 75% of the
                                        unitholders (by value).
                                      </span>
                                    </li>
                                    <li
                                      id="confidentiality"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>No Distribution Defaults:</b> InvIT
                                        should not have defaulted on payments in
                                        the last 3 financial years.
                                      </span>
                                    </li>
                                    <li
                                      id="targeted-investor-base"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>SEBI Compliance:</b> Full adherence
                                        to SEBI (Infrastructure Investment
                                        Trusts) Regulations, including
                                        continuous listing requirements.
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3
                                  id="e5"
                                  className="text-xl font-black text-[#001529] flex items-center gap-2"
                                >
                                  <AreaChart className="h-5 w-5 text-[#f59e08]" />{" "}
                                  Under-Construction Asset Exposure
                                </h3>
                                <div className="orhp ml-2">
                                  <ul className="space-y-3">
                                    <li
                                      id="faster-process"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Threshold Limit:</b> Listed InvITs
                                        will not be allowed to invest more than
                                        10% of the asset value in
                                        under-construction infrastructure.
                                      </span>
                                    </li>
                                    <li
                                      id="confidentiality"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Breach of Limit:</b> In case this
                                        limit is exceeded, the capital raising
                                        will have to take place through a
                                        private placement rather than a public
                                        issue.
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3
                                  id="e6"
                                  className="text-xl font-black text-[#001529] flex items-center gap-2"
                                >
                                  <Lock className="h-5 w-5 text-[#f59e08]" />{" "}
                                  Sponsor Unitholding & Lock-In Norms
                                </h3>
                                <div className="orhp ml-2">
                                  <ul className="space-y-3">
                                    <li
                                      id="faster-process"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Minimum Holding:</b> Sponsors are
                                        required to hold 15% of post-issue
                                        units, which are locked in for 18
                                        months.
                                      </span>
                                    </li>
                                    <li
                                      id="confidentiality"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Relaxation Proposed:</b> Proposals by
                                        SEBI in August 2023 and April 2025 are
                                        to eliminate both sponsor and
                                        non-sponsor lock-ins, but only after the
                                        quality of disclosures and trust
                                        structure.
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3
                                  id="e7"
                                  className="text-xl font-black text-[#001529] flex items-center gap-2"
                                >
                                  <Users className="h-5 w-5 text-[#f59e08]" />{" "}
                                  Public Float & Investor Limits
                                </h3>
                                <div className="orhp ml-2">
                                  <ul className="space-y-3">
                                    <li
                                      id="faster-process"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Minimum Public Holding:</b> At least
                                        25% of units must be held by public
                                        unitholders within 3 years of listing.
                                      </span>
                                    </li>
                                    <li
                                      id="confidentiality"
                                      className="text-sm text-slate-600 flex gap-2"
                                    >
                                      <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />
                                      <span>
                                        <b>Cap on Institutional Holding:</b> No
                                        institutional or non-sponsor investor
                                        will hold more than 25% of the total
                                        units after issue.
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e8 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e8">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Offer Document & Disclosure Standards
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                <div className="orhp">
                                  <ul className="space-y-2">
                                    <li id="confidentiality">
                                      <b className="text-[#001529] block mb-2">
                                        Disclosure Mandates:
                                      </b>
                                      <ul className="space-y-2 ml-4">
                                        <li className="text-sm text-slate-600 flex items-center gap-2">
                                          <ArrowRight className="h-3 w-3 text-[#f59e08]" />{" "}
                                          3 years of audited financials.
                                        </li>
                                        <li className="text-sm text-slate-600 flex items-center gap-2">
                                          <ArrowRight className="h-3 w-3 text-[#f59e08]" />{" "}
                                          Pro forma financials for acquired
                                          assets.
                                        </li>
                                        <li className="text-sm text-slate-600 flex items-center gap-2">
                                          <ArrowRight className="h-3 w-3 text-[#f59e08]" />{" "}
                                          Working capital sufficiency
                                          statements.
                                        </li>
                                        <li className="text-sm text-slate-600 flex items-center gap-2">
                                          <ArrowRight className="h-3 w-3 text-[#f59e08]" />{" "}
                                          Valuation methodology and asset NAV.
                                        </li>
                                        <li className="text-sm text-slate-600 flex items-center gap-2">
                                          <ArrowRight className="h-3 w-3 text-[#f59e08]" />{" "}
                                          Sponsor and related-party disclosures.
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center">
                                <div className="orhp">
                                  <ul className="space-y-2">
                                    <li
                                      id="faster-process"
                                      className="text-sm text-slate-600 leading-relaxed"
                                    >
                                      <b className="text-[#001529] block mb-2 text-base">
                                        Follow-On Offer Alignment:
                                      </b>
                                      SEBI mandates that conversion of a private
                                      to a public issue will be as per follow-on
                                      public offer norms and is subject to
                                      faster and easier regulatory processing.
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e9 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e9">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Distribution Norms
                            </h2>
                            <div className="bg-white shadow-2xl border border-slate-100 p-8 rounded-3xl">
                              <div className="orhp">
                                <ul className="space-y-6">
                                  <li className="text-slate-600 leading-relaxed">
                                    <b className="text-[#001529] text-lg block mb-1">
                                      Minimum Distribution:
                                    </b>
                                    The company is required to pay out 90% of
                                    its net distributable cash flows to
                                    unitholders every year.
                                  </li>
                                  <li id="confidentiality">
                                    <b className="text-[#001529] text-lg block mb-3">
                                      Distribution Frequency:
                                    </b>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <span className="font-bold text-[#001529] block">
                                          Public InvITs:
                                        </span>
                                        <span className="text-sm text-slate-600">
                                          Quarterly distributions.
                                        </span>
                                      </div>
                                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <span className="font-bold text-[#001529] block">
                                          Private InvITs:
                                        </span>
                                        <span className="text-sm text-slate-600">
                                          Semi-annual distributions.
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e10 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e10">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Accelerated Listing Timeline (T+3)
                            </h2>
                            <div className="bg-[#001529] text-white p-8 rounded-3xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-[#f59e08] opacity-10 rounded-full -mr-16 -mt-16" />
                              <div className="orhp relative z-10">
                                <p className="text-lg leading-relaxed">
                                  With effect from November 1, 2025, InvITs that
                                  are publicly issued are required to be listed
                                  within 3 working days or T+3 of allotment,
                                  enhancing the liquidity of the market and
                                  confidence of investors.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e11 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e11">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Trustee Oversight & Governance (as per Schedule X,
                              Reg 9(23))
                            </h2>
                            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl">
                              <div className="orhp">
                                <p className="text-lg font-bold text-[#001529] mb-4">
                                  Trustees now have enhanced responsibilities
                                  under SEBI’s 2025 amendments:
                                </p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <li className="flex gap-3 text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-100">
                                    <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />{" "}
                                    Quarterly reviews of compliance.
                                  </li>
                                  <li className="flex gap-3 text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-100">
                                    <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />{" "}
                                    Monitoring of Investment Manager
                                    Appointments.
                                  </li>
                                  <li className="flex gap-3 text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-100">
                                    <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />{" "}
                                    Observation of Related-Party Transactions.
                                  </li>
                                  <li className="flex gap-3 text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-100">
                                    <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />{" "}
                                    In case of compliance issues, Direct
                                    Communication with Unitholders.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e12 */}
                        <div className="row mt-10">
                          <div className="col-lg-12" id="e12">
                            <h2 className="text-2xl md:text-3xl font-black text-[#001529] mb-4">
                              Post-Issue Communication & SEBI Compliance
                            </h2>
                            <div className="orhp bg-white border border-slate-200 p-8 rounded-3xl">
                              <ul className="space-y-4">
                                <li className="flex gap-4">
                                  <div className="w-10 h-10 rounded-full bg-[#f59e08]/10 flex items-center justify-center shrink-0">
                                    <FileText className="h-5 w-5 text-[#f59e08]" />
                                  </div>
                                  <span className="text-slate-600 leading-relaxed">
                                    <b>Allotment Disclosure:</b> Merchant
                                    bankers are required to disclose
                                    oversubscription information and allotment
                                    position within 10 days of listing.
                                  </span>
                                </li>
                                <li className="flex gap-4">
                                  <div className="w-10 h-10 rounded-full bg-[#f59e08]/10 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-5 w-5 text-[#f59e08]" />
                                  </div>
                                  <span className="text-slate-600 leading-relaxed">
                                    <b>Marketing Restrictions:</b> During the
                                    subscription window, only the offer document
                                    may be referenced in public communication—no
                                    advertisements, teasers, or promotional
                                    media.
                                  </span>
                                </li>
                                <li className="flex gap-4">
                                  <div className="w-10 h-10 rounded-full bg-[#f59e08]/10 flex items-center justify-center shrink-0">
                                    <UserCheck className="h-5 w-5 text-[#f59e08]" />
                                  </div>
                                  <span className="text-slate-600 leading-relaxed">
                                    <b>Compliance Officer:</b> A nominated
                                    officer is required to take care of legal,
                                    SEBI and post-listing disclosures till all
                                    units are completely dematerialised and
                                    listed.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* e13-e18 */}
                        <div className="row mt-16 pt-10 border-t border-slate-200">
                          <div className="col-lg-12" id="e13">
                            <h2 className="text-3xl md:text-4xl font-black text-[#001529] mb-8 text-center">
                              <b>
                                India IPO InvIT Public Issue Advisory Service
                              </b>{" "}
                            </h2>

                            <div className="space-y-8">
                              <div className="row mt-2" id="e14">
                                <div className="col-lg-12">
                                  <h3 className="text-xl font-black text-[#001529] mb-3 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-sm">
                                      1
                                    </span>
                                    Strategic Structuring & Eligibility
                                  </h3>
                                  <div className="orhp ml-10">
                                    <ul className="space-y-2">
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Evaluate public issue Eligibility vs.
                                        follow-on or private placement routes.
                                      </li>
                                      <li
                                        id="confidentiality"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Model capital raise size, dilution,
                                        sponsor shareholding, public float
                                        adherence and valuation impact.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2" id="e15">
                                <div className="col-lg-12">
                                  <h3 className="text-xl font-black text-[#001529] mb-3 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-sm">
                                      2
                                    </span>
                                    Offer Document Drafting & SEBI Coordination
                                  </h3>
                                  <div className="orhp ml-10">
                                    <ul className="space-y-2">
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Draft Offer Document compliant with SEBI
                                        Schedule A, inclusive of sponsor
                                        lock-ins, float targets and valuation
                                        disclosures.
                                      </li>
                                      <li
                                        id="confidentiality"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Manage SEBI comment handling, merchant
                                        banker coordination, underwriting terms,
                                        escrow settings and listing approvals.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2" id="e16">
                                <div className="col-lg-12">
                                  <h3 className="text-xl font-black text-[#001529] mb-3 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-sm">
                                      3
                                    </span>
                                    Investor Allocation & Pricing Strategy
                                  </h3>
                                  <div className="orhp ml-10">
                                    <ul className="space-y-2">
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Define allocation split—typically 75%
                                        institutional/anchor and 25%
                                        public/retail.
                                      </li>
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Recommend pricing methodology such as
                                        NAV or VWAP-based, aligned with investor
                                        demand and regulatory comfort.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2" id="e17">
                                <div className="col-lg-12">
                                  <h3 className="text-xl font-black text-[#001529] mb-3 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-sm">
                                      4
                                    </span>
                                    Subscription & Allotment Execution
                                  </h3>
                                  <div className="orhp ml-10">
                                    <ul className="space-y-2">
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Oversee the ASBA-based subscription
                                        process across categories.
                                      </li>
                                      <li
                                        id=""
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Administer allotment basis, refund
                                        triggers, dematerialisation and
                                        registrar coordination; ensure timely
                                        listing and regulatory filings.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2" id="e18">
                                <div className="col-lg-12">
                                  <h3 className="text-xl font-black text-[#001529] mb-3 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-sm">
                                      5
                                    </span>
                                    Post‑Listing Governance & Compliance Setup
                                  </h3>
                                  <div className="orhp ml-10">
                                    <ul className="space-y-2">
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Support ongoing public float monitoring
                                        compliance until the three-year horizon.
                                      </li>
                                      <li
                                        id="faster-process"
                                        className="text-slate-600 text-sm flex gap-2"
                                      >
                                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0 mt-0.5" />{" "}
                                        Enable trustee oversight, investor
                                        grievance redressal system, periodic NAV
                                        reporting, quarterly financial filings
                                        and LODR-aligned compliance.
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e19 */}
                        <div className="row mt-12 bg-slate-50 p-8 rounded-3xl border border-slate-200">
                          <div className="col-lg-12" id="e19">
                            <h3 className="text-2xl font-black text-[#001529] mb-6">
                              Benefits: What Clients Gain
                            </h3>
                            <div className="orhp">
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <li
                                  id="faster-process"
                                  className="text-sm text-slate-600 flex gap-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{" "}
                                  <b>Broader Capital Access:</b> Enables
                                  fundraising from institutional, anchor and
                                  retail segments, enhancing liquidity and
                                  valuation.
                                </li>
                                <li
                                  id="faster-process"
                                  className="text-sm text-slate-600 flex gap-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{" "}
                                  <b>Regulatory Compliance Assurance:</b> Fully
                                  aligned with SEBI’s 2022 conversion framework,
                                  August 2023 lock-in reforms and potential July
                                  2025 relaxations.
                                </li>
                                <li className="text-sm text-slate-600 flex gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{" "}
                                  <b>Sponsor Integrity & Governance:</b>{" "}
                                  Structured unitholding and float obligations
                                  integrated into issuance strategy.
                                </li>
                                <li className="text-sm text-slate-600 flex gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{" "}
                                  <b>Administrative Efficiency:</b> End-to-end
                                  orchestration—from structuring to
                                  documentation, issuance and governance.
                                </li>
                                <li className="text-sm text-slate-600 flex gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />{" "}
                                  <b>Modular Engagement Options:</b> Clients can
                                  choose from full-service execution, offer
                                  document-only, or strategic advisory.{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* e20 */}
                        <div className="row mt-12">
                          <div className="col-lg-12" id="e20">
                            <h3 className="text-2xl font-black text-[#001529] mb-6 text-center">
                              Why Choose India IPO InvIT Advisory
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <b className="text-[#001529] block mb-2">
                                  Regulatory Precision:
                                </b>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  Deep expertise in the SEBI InvIT regime and
                                  evolving conversion norms.
                                </p>
                              </div>
                              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <b className="text-[#001529] block mb-2">
                                  Institutional Network:
                                </b>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  Access to high-quality institutional, anchor
                                  and retail investor participation.
                                </p>
                              </div>
                              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <b className="text-[#001529] block mb-2">
                                  Governance Focus:
                                </b>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  Compliance architecture from inception to
                                  post-listing float monitoring and trustee
                                  coordination.
                                </p>
                              </div>
                              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <b className="text-[#001529] block mb-2">
                                  Flexible Advisory Model:
                                </b>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  Engage us for full turnkey projects,
                                  documentation support, or standalone advisory.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* e21 */}
                        <div className="row mt-12 pt-10 border-t border-slate-200">
                          <div className="col-lg-12" id="e21">
                            <h3 className="text-2xl font-black text-[#001529] mb-4">
                              Build Your Public InvIT With Confidence
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                              Our InvIT advisory model prepares sponsors to
                              execute a smooth transformation of their private
                              InvITs to public units within the emerging SEBI
                              framework. We assist you in bringing the compliant
                              and successful InvIT public issue through
                              strategic structuring, preparation of the Offer
                              Document, engagement of investors, execution and
                              governance of the issue.{" "}
                            </p>
                          </div>

                          <div className="col-lg-12 mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                            <p className="text-sm text-slate-600 leading-relaxed">
                              Understand how IPOs work through our{" "}
                              <Link
                                to="/ipo-process"
                                className="text-[#f59e08] font-bold hover:underline"
                              >
                                IPO Process
                              </Link>{" "}
                              guide. Stay updated with upcoming listings in the{" "}
                              <Link
                                to="/reports"
                                className="text-[#f59e08] font-bold hover:underline"
                              >
                                IPO Calendar
                              </Link>
                              and read insights on our{" "}
                              <Link
                                to="/ipo-blogs"
                                className="text-[#f59e08] font-bold hover:underline"
                              >
                                IPO Company Reviews — GMP, Subscription Status &
                                Allotment.
                              </Link>
                              Explore our blog for IPO guidance.
                            </p>
                          </div>
                        </div>

                        <div className="container my-10">
                          <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                              <Button
                                asChild
                                className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black rounded-full px-12 h-14 shadow-lg hover:scale-105 transition-all"
                              >
                                <Link to="/contact">Contact Us</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-12 relative">
                    <div className="w-full space-y-20">
                      <div id="overview" className="scroll-mt-24">
                        <div>
                          <div className="flex items-center gap-3 mb-5">
                            <div
                              className="w-1 h-8 rounded-full"
                              style={{ background: cfg.accent }}
                            />
                            <h2 className="text-3xl font-black text-[#001529]">
                              Overview
                            </h2>
                          </div>
                          <p className="text-slate-600 text-base leading-relaxed mb-5">
                            {service.fullDescription}
                          </p>
                          {service.overviewParagraph2 && (
                            <p className="text-slate-600 text-base leading-relaxed">
                              {service.overviewParagraph2}
                            </p>
                          )}
                        </div>
                      </div>

                      <div id="benefits" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className="w-1 h-8 rounded-full"
                            style={{ background: cfg.accent }}
                          />
                          <h2 className="text-3xl font-black text-[#001529]">
                            Key Benefits
                          </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {service.keyBenefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl hover:shadow-md transition-all flex flex-col items-center text-center gap-3 group h-full"
                            >
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                                style={{ background: `${cfg.accent}18` }}
                              >
                                <CheckCircle
                                  className="h-5 w-5"
                                  style={{ color: cfg.accent }}
                                />
                              </div>
                              <span className="font-bold text-slate-800 leading-tight text-[11px] sm:text-xs">
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div id="process" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-7">
                          <div
                            className="w-1 h-8 rounded-full"
                            style={{ background: cfg.accent }}
                          />
                          <h2 className="text-3xl font-black text-[#001529]">
                            Our Step-by-Step Approach
                          </h2>
                        </div>
                        <div className="space-y-4">
                          {service.processSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl hover:shadow-md transition-all flex items-start gap-5 group"
                            >
                              <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-md group-hover:scale-105 transition-transform"
                                style={{
                                  background: `linear-gradient(135deg, #001529, #003380)`,
                                }}
                              >
                                {String(idx + 1).padStart(2, "0")}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-slate-900 text-base mb-1">
                                  {step.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                              <div
                                className="hidden md:flex w-8 h-8 rounded-full items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: `${cfg.accent}18` }}
                              >
                                {/* <ArrowRight className="h-4 w-4" style={{ color: cfg.accent }} /> */}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div
                        id="included"
                        className="bg-gradient-to-br from-[#001529] to-[#003380] rounded-3xl p-8 md:p-10 scroll-mt-24"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
                          <h2 className="text-2xl font-black text-white">
                            What's Included in Your Engagement
                          </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            "Dedicated Senior Relationship Manager",
                            "Full Regulatory Documentation Support",
                            "SEBI & Exchange Filing Management",
                            "Investor Roadshow Assistance",
                            "Legal & Secretarial Coordination",
                            "Post-Transaction Compliance Support",
                            "Real-time Deal Status Dashboard",
                            "Expert Due Diligence Team",
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#f59e08]/20 flex items-center justify-center shrink-0">
                                <CheckCircle className="h-3 w-3 text-[#f59e08]" />
                              </div>
                              <span className="text-white/80 text-sm font-medium">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div id="industries" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className="w-1 h-8 rounded-full"
                            style={{ background: cfg.accent }}
                          />
                          <h2 className="text-3xl font-black text-[#001529]">
                            Industries We Serve
                          </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {[
                            "Manufacturing",
                            "Technology",
                            "Real Estate",
                            "Infrastructure",
                            "Healthcare & Pharma",
                            "FMCG",
                            "Retail & D2C",
                            "Energy & Renewables",
                            "Financial Services",
                            "Education",
                            "Logistics",
                            "Agri-Tech",
                            "Media & Entertainment",
                            "Hospitality",
                            "Auto & EV",
                          ].map((sector, i) => (
                            <div
                              key={i}
                              className="px-4 py-3 rounded-xl text-xs font-bold border transition-all hover:scale-105 cursor-default flex items-center justify-center text-center leading-tight shadow-sm"
                              style={{
                                background:
                                  i % 3 === 0
                                    ? `${cfg.accent}12`
                                    : i % 3 === 1
                                      ? "rgba(0,21,41,0.04)"
                                      : "#ffffff",
                                borderColor:
                                  i % 3 === 0 ? `${cfg.accent}30` : "#e2e8f0",
                                color: i % 3 === 0 ? cfg.accent : "#475569",
                              }}
                            >
                              {sector}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 rounded-full" style={{ background: cfg.accent }} />
                        <h2 className="text-3xl font-black text-[#001529]">Client Testimonials</h2>
                      </div>
                      <div className="overflow-hidden">
                        <div ref={testimonialRef} className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory md:flex-col md:gap-4 transition-all">
                          {testimonials.map((t, i) => (
                            <div key={i}
                              className="shrink-0 w-[280px] md:w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative snap-center"
                            >
                              <div
                                className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                                style={{ background: `linear-gradient(90deg, #001529, ${cfg.accent})` }}
                              />
                              <div className="flex items-start gap-4">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
                                  style={{ background: `linear-gradient(135deg, #001529, ${cfg.accent})` }}
                                >
                                  {t.name.charAt(0)}
                                </div>
                                <div>
                                  <MessageSquare className="h-5 w-5 mb-2" style={{ color: cfg.accent }} />
                                  <p className="text-slate-600 text-sm leading-relaxed italic mb-3">"{t.quote}"</p>
                                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                                  <div className="text-slate-400 text-xs">{t.designation}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div> */}

                      <div id="faq" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                          <div
                            className="w-1 h-8 rounded-full"
                            style={{ background: cfg.accent }}
                          />
                          <h2 className="text-3xl font-black text-[#001529]">
                            Frequently Asked Questions
                          </h2>
                        </div>
                        <div className="space-y-3">
                          {(service.faqs || commonFaqs).map((faq, i) => (
                            <FAQItem key={i} faq={faq} index={i} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                    <div
                      className="h-2"
                      style={{
                        background: `linear-gradient(90deg, #001529, ${cfg.accent})`,
                      }}
                    />
                    <div className="p-7 text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5"
                        style={{ background: "#001529" }}
                      >
                        <Phone className="w-7 h-7 text-[#f59e08]" />
                      </div>
                      <h3 className="text-2xl font-black text-[#001529] mb-2">
                        Ready to Start?
                      </h3>
                      <p className="text-slate-500 mb-7 text-sm leading-relaxed">
                        Consult with our experts to understand how our{" "}
                        <strong>{service.title}</strong> advisory can accelerate
                        your growth journey.
                      </p>
                      <Button
                        asChild
                        className="w-full py-6 text-base font-black rounded-xl shadow-lg transition-transform hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${cfg.accent}, #d97706)`,
                          color: "#001529",
                          boxShadow: `0 4px 20px ${cfg.accent}40`,
                        }}
                      >
                        <Link to="/contact">
                          Contact Us <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </Button>
                      <div className="mt-5 pt-5 border-t border-slate-100">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                          Or Call Us Directly At
                        </p>
                        <a
                          href="tel:+917428337280"
                          className="text-lg font-black hover:underline"
                          style={{ color: "#001529" }}
                        >
                          +91-74283-37280
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div
                      className="px-6 py-4 border-b border-slate-100 flex items-center gap-3"
                      style={{ background: "#001529" }}
                    >
                      <Building2 className="h-4 w-4 text-[#f59e08]" />
                      <h3 className="font-black text-white text-sm uppercase tracking-widest">
                        Related Services
                      </h3>
                    </div>
                    <div className="p-3">
                      {servicesData
                        .filter(
                          (s) =>
                            s.slug !== slug && s.category === service.category,
                        )
                        .slice(0, 4)
                        .map((s, i) => (
                          <Link
                            key={i}
                            to={`/${s.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: `${cfg.accent}15` }}
                            >
                              <div
                                style={{ color: cfg.accent }}
                                className="[&>svg]:h-4 [&>svg]:w-4"
                              >
                                {s.icon}
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-[#001529] leading-tight">
                              {s.title}
                            </span>
                            <ChevronRight className="h-4 w-4 text-slate-300 ml-auto group-hover:text-[#f59e08] transition-colors shrink-0" />
                          </Link>
                        ))}
                      <Link
                        to="/ipo-services"
                        className="flex items-center justify-center gap-2 mt-2 p-3 rounded-xl text-sm font-black transition-colors"
                        style={{ color: cfg.accent }}
                      >
                        View All Services <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-[#001529] rounded-2xl p-6">
                    <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">
                      Quick Info
                    </h4>
                    <div className="space-y-3">
                      {[
                        { label: "Category", value: service.category },
                        { label: "Regulatory Body", value: "SEBI, NSE, BSE" },
                        { label: "Advisory Mode", value: "Offline + Online" },
                        {
                          label: "Languages",
                          value: "English, Hindi, Regional",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <span className="text-white/50 text-xs font-semibold">
                            {item.label}
                          </span>
                          <span className="text-white/90 text-xs font-bold">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-5 border-t border-white/10">
                      <a
                        href="mailto:info@indiaipo.in"
                        className="flex items-center gap-2 text-[#f59e08] text-sm font-bold hover:underline"
                      >
                        <Mail className="h-4 w-4" /> info@indiaipo.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">

              <h2 className="text-3xl md:text-4xl font-black text-[#001529] mb-4">
                Benefits of Choosing{" "}
                <span className="text-[#f59e08]">India IPO</span>
              </h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base">
                We combine deep capital markets expertise, a structured advisory
                approach, hands-on execution and a strong investor network to
                deliver end-to-end support across every stage of your capital
                journey.
              </p>
            </div>
            <div className="overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6"
              >
                {whyUs.map((item, i) => (
                  <div
                    key={i}
                    className="shrink-0 w-[280px] md:w-auto bg-[#F8FAFC] rounded-2xl p-7 border border-slate-200 hover:shadow-lg hover:-translate-y-1.5 transition-all group snap-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#001529] to-[#003380] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                      <item.icon className="h-7 w-7 text-[#f59e08]" />
                    </div>
                    <h3 className="text-base font-black text-[#001529] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking: Latest Blogs Section */}
        {recentBlogs.length > 0 && (
          <section className="py-6 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-4">

                  <h2 className="text-3xl md:text-4xl font-black text-[#001529]">
                    Latest IPO{" "}
                    <span className="text-[#f59e08]">Insights & Blogs</span>
                  </h2>
                  <p className="text-slate-500 font-medium max-w-2xl text-sm">
                    Stay updated with the latest trends, news and expert
                    analysis in the Indian capital markets and IPO landscape.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 group"
                >
                  <Link to="/blogs">
                    Explore All Blogs{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentBlogs.map((blog, i) => (
                  <Link
                    key={i}
                    to={`/blogs/${blog.slug}`}
                    className="group bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#f59e08]/30 transition-all flex flex-col h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={
                          blog.image?.startsWith("http")
                            ? blog.image
                            : blog.image?.startsWith("uploads")
                              ? `/${blog.image}`
                              : blog.image?.startsWith("/uploads")
                                ? blog.image
                                : blog.image
                                  ? `/uploads/${blog.image}`
                                  : "/placeholder-ipo.jpg"
                        }
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {/* <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                        <Calendar className="h-3 w-3" />
                        {(() => {
                          const validCreated = blog.created_at && !blog.created_at.startsWith("0000") && !isNaN(new Date(blog.created_at).getTime());
                          const validUpdated = blog.updated_at && !blog.updated_at.startsWith("0000") && !isNaN(new Date(blog.updated_at).getTime());
                          const displayDate = validCreated ? new Date(blog.created_at) : (validUpdated ? new Date(blog.updated_at) : new Date());
                          return displayDate.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          });
                        })()}
                      </div> */}
                      <h3 className="text-lg font-black text-[#001529] mb-3 group-hover:text-[#f59e08] transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <div className="mt-auto pt-5 border-t border-slate-200 flex items-center text-[#f59e08] font-black text-xs uppercase tracking-widest gap-2">
                        Read Full Insight{" "}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <LatestNews />

        <section className="bg-gradient-to-r from-[#001529] via-[#002147] to-[#003380] py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
              style={{
                background: "#f59e08",
                filter: "blur(80px)",
                transform: "translate(20%,-30%)",
              }}
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">

            <h2 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
              Ready to Unlock Your Company's
              <br />
              <span className="text-[#f59e08]">Full Financial Potential?</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-base font-medium mb-10 leading-relaxed">
              Our first consultation is always free. Let our advisors assess
              your eligibility, explain the roadmap in detail and lay out a
              transparent cost structure so you can make an informed decision
              with zero pressure.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="font-black rounded-xl px-10 h-14 text-base shadow-2xl transition-transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #f59e08, #d97706)",
                  color: "#001529",
                  boxShadow: "0 8px 32px rgba(245,158,8,0.35)",
                }}
              >
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" /> Talk to an Expert
                </Link>
              </Button>
              <Button
                asChild
                variant="outlineWhite"
                className="rounded-xl px-10 h-14 text-base font-bold shadow-xl"
              >
                <a href="mailto:info@indiaipo.in">
                  <Mail className="mr-2 h-5 w-5" /> info@indiaipo.in
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
