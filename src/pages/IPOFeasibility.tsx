import { useState, useEffect } from "react";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { toast } from "sonner";
import { CheckCircle, ArrowRight, Building2, TrendingUp, Shield, BarChart3, PieChart, FileText, ArrowUpRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getImgSrc } from "@/utils/image";
import eligibilityBanner from "@/assets/eligibilty-check banners.webp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { X, Sparkles, AlertCircle, PhoneCall, Mail, ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  created_at: string;
}

const IPOFeasibility = () => {
  const [formData, setFormData] = useState({
    business_name: "",
    mobile: "",
    email: "",
    business_type: "",
    vintage: "",
    profit: "",
    networth: "",
  });

  const [loading, setLoading] = useState(false);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [eligibilityStatus, setEligibilityStatus] = useState<"Eligible" | "Not Eligible Yet" | null>(null);
  const { getToken } = useRecaptcha();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/news?status=published&limit=6");
        if (res.ok) {
          const data = await res.json();
          setRecentNews(data.data || data);
        }
      } catch (err) {
        console.error("Failed to fetch recent insights");
      }
    };
    fetchInsights();
    window.scrollTo(0, 0);
  }, []);

  const countWords = (str: string) => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const calculateEligibility = (data: typeof formData) => {
    const { vintage, profit, networth } = data;

    // Basic Eligibility Rule:
    // 1. Must have more than 3 years of vintage
    // 2. Must be profitable (any level > 0)
    // 3. Networth must be at least 1.5 Crore+

    const hasVintage = vintage === "more than 3 year";
    const isProfitable = profit !== "not profitable";
    const hasMinNetworth = networth === "1.5 crore to 5 crore" || networth === "above crores";

    if (hasVintage && isProfitable && hasMinNetworth) {
      return "Eligible";
    }

    return "Not Eligible Yet";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }

    if (countWords(formData.business_name) > 40) {
      toast.error("Business name should not exceed 40 words.");
      return;
    }

    if (!formData.business_type || !formData.vintage || !formData.profit || !formData.networth) {
      toast.error("Please select all eligibility criteria");
      return;
    }

    setLoading(true);
    try {
      const recaptchaToken = await getToken('ipo_feasibility_form');
      const eligibilityResult = calculateEligibility(formData);

      const submissionData = {
        ...formData,
        name: formData.business_name,
        company_name: formData.business_name,
        eligibility: eligibilityResult,
        recaptchaToken
      };

      const res = await fetch("/api/ipo_feasibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (res.ok) {
        setEligibilityStatus(eligibilityResult);
        setShowResultModal(true);
        setFormData({
          business_name: "",
          mobile: "",
          email: "",
          business_type: "",
          vintage: "",
          profit: "",
          networth: "",
        });
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field === "mobile") {
      const sanitized = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: sanitized }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Check IPO Eligibility | India IPO"
        description="Comprehensive IPO Eligibility check. Evaluate your company's readiness for Mainboard or SME IPO with our elite expert advisors."
        keywords="IPO Eligibility, IPO readiness, SME IPO check, Mainboard IPO eligibility"
      />
      <Header />

      <main className="flex-1 space-y-20 pb-20">

        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 z-0">
            <img 
              src={eligibilityBanner} 
              alt="Eligibility Banner" 
              className="w-full h-full object-cover opacity-20 object-center mix-blend-overlay" 
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-accent/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full" />
          </div>

          <div className="container relative z-10 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/20 text-accent font-semibold text-sm mb-8 backdrop-blur-md">
                  <BarChart3 className="w-4 h-4 fill-accent text-foreground" />
                  <span>Strategic Corporate Advisory</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-8">
                  Evaluate Your Potential For An <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-gold-light">Initial Public Offering</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10">
                  Take the first step towards massive capital scaling. Our expert Eligibility check accurately gauges your readiness for the Mainboard or SME exchanges.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="h-14 px-8 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full sm:w-auto font-bold" onClick={() => document.getElementById('Eligibility-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Start Assessment Now
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <section className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Why Assess Your IPO Readiness?</h2>
            <p className="text-muted-foreground text-lg">An IPO is a critical milestone. Assessing Eligibility ensures you understand the regulatory, financial, and strategic transformations required.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp className="h-6 w-6" />, title: "Valuation Insights", desc: "Understand your potential market cap and equity value before proceeding." },
              { icon: <Shield className="h-6 w-6" />, title: "Regulatory Check", desc: "Identify compliance gaps against stringent SEBI exchange norms." },
              { icon: <PieChart className="h-6 w-6" />, title: "Capital Structuring", desc: "Optimize your existing cap table for institutional investor attractiveness." },
              { icon: <Building2 className="h-6 w-6" />, title: "Market Timing", desc: "Gauge the current market sentiment for your specific industry sector." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>


        <section id="Eligibility-form" className="container mx-auto px-4 scroll-mt-28 md:scroll-mt-32">
          <div className="bg-card rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col lg:flex-row relative">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />


            <div className="lg:w-2/5 bg-foreground text-background p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1000')] opacity-10 bg-cover bg-center mix-blend-overlay" />
              <div className="relative z-10 w-full">
                <h3 className="text-3xl font-bold font-heading mb-6">Uncover Your Potential</h3>
                <p className="text-primary-foreground/70 text-lg mb-10 leading-relaxed">
                  Enter your company's core financial and structural details. Our advisory board will run a comprehensive diagnostic and revert with an executive summary.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shrink-0 font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-lg">Submit Data</h4>
                      <p className="text-primary-foreground/60 text-sm">Provide accurate recent metrics.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-lg">Expert Analysis</h4>
                      <p className="text-primary-foreground/60 text-sm">We benchmark against listed peers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0 font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-lg">Eligibility Report</h4>
                      <p className="text-primary-foreground/60 text-sm">Receive a strategic consultation call.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="lg:w-3/5 p-10 md:p-14 bg-card/80 backdrop-blur-md">
              <h2 className="text-2xl font-bold font-heading text-foreground mb-8 border-b border-border pb-4">Confidential Assessment Form</h2>
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Business Name *</label>
                    <Input required className="h-12 bg-background border-border" value={formData.business_name} onChange={(e) => handleChange("business_name", e.target.value)} placeholder="Enter your business name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Contact Number *</label>
                    <Input required className="h-12 bg-background border-border" value={formData.mobile} onChange={(e) => handleChange("mobile", e.target.value)} placeholder="Enter your contact number" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground">Email Address *</label>
                    <Input required type="email" className="h-12 bg-background border-border" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="Enter your email address" />
                  </div>
                </div>

                <div className="pt-8 pb-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                    <h3 className="text-xl font-bold font-heading text-primary">Eligibility Criteria</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Entity Status</label>
                    <select
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.business_type}
                      onChange={(e) => handleChange("business_type", e.target.value)}
                    >
                      <option value="">Select Entity Status</option>
                      <option value="private limited">Private Limited</option>
                      <option value="public limited">Public Limited</option>
                      <option value="partnership firm">Partnership Firm</option>
                      <option value="proprietorship firm">Proprietorship Firm</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Vintage</label>
                    <select
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.vintage}
                      onChange={(e) => handleChange("vintage", e.target.value)}
                    >
                      <option value="">Select Vintage</option>
                      <option value="less than 3 year">Less than 3 year</option>
                      <option value="more than 3 year">More than 3 year</option>
                      <option value="just started">Just started</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      Operating Profit (EBITDA)
                      <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] cursor-help" title="Earnings Before Interest, Taxes, Depreciation, and Amortization">i</div>
                    </label>
                    <select
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.profit}
                      onChange={(e) => handleChange("profit", e.target.value)}
                    >
                      <option value="">Select Operating Profit</option>
                      <option value="not profitable">Not profitable</option>
                      <option value="less than 1 crore">Less than 1 crore</option>
                      <option value="1 -15 crore">1 - 15 crore</option>
                      <option value="more than 15 crore">More than 15 crore</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Net Worth</label>
                    <select
                      required
                      className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.networth}
                      onChange={(e) => handleChange("networth", e.target.value)}
                    >
                      <option value="">Select Net Worth</option>
                      <option value="not positive">Not positive</option>
                      <option value="less than 1. crore">Less than 1. crore</option>
                      <option value="1.5 crore to 5 crore">1.5 crore to 5 crore</option>
                      <option value="above crores">Above 5 Crores</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" size="lg" disabled={loading} className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-primary/20">
                    {loading ? "Submitting assessment..." : "Submit"}
                    {!loading && <CheckCircle className="ml-2 h-5 w-5" />}
                  </Button>
                  {/* <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> All financial data is encrypted and strictly confidential.
                  </p> */}
                </div>
              </form>
            </div>
          </div>
        </section>


        {recentNews.length > 0 && (
          <section className="bg-muted/30 py-20 mt-20 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">Latest Market Insights</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl">Stay updated with the latest IPO trends, market announcements, and financial news curated by our team.</p>
                </div>
                <Button variant="outline" asChild className="shrink-0 rounded-full h-12 px-6">
                  <Link to="/news">View All News <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentNews.slice(0, 6).map((news, idx) => (
                  <Link to={`/news/detail/${news.slug}`} key={news.id} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      {getImgSrc(news.image) ? (
                        <img src={getImgSrc(news.image)!} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <FileText className="w-12 h-12 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold rounded-full">
                          Insights
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(news.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="font-bold text-lg font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {news.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {news.excerpt || "Read more about this latest update inside..."}
                      </p>
                      <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                        Read Full Article <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        status={eligibilityStatus}
        companyName={formData.business_name}
      />

      <Footer />
    </div>
  );
};

const ResultModal = ({ isOpen, onClose, status, companyName }: { isOpen: boolean, onClose: () => void, status: "Eligible" | "Not Eligible Yet" | null, companyName: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen && !isHovered) {
      timeoutId = setTimeout(() => {
        onClose();
      }, 6000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isOpen, isHovered, onClose]);

  if (!status) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[90%] sm:max-w-[460px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl max-h-[90vh] overflow-y-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`h-2 w-full ${status === "Eligible" ? "bg-emerald-500" : "bg-amber-500"}`} />

        <div className="p-5 md:p-7">
          <div className="flex justify-center mb-4 md:mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg ${status === "Eligible"
                ? "bg-emerald-55 text-emerald-600 border border-emerald-100"
                : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}
            >
              {status === "Eligible" ? <Sparkles className="w-8 h-8 md:w-9 md:h-9" /> : <AlertCircle className="w-8 h-8 md:w-9 md:h-9" />}
            </motion.div>
          </div>

          <div className="text-center space-y-2 mb-6">
            <DialogTitle className="text-xl md:text-2xl font-black font-heading tracking-tight text-foreground">
              {status === "Eligible" ? "Strong Potential!" : "Assessment Complete"}
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm text-muted-foreground leading-relaxed px-2 md:px-4">
              {status === "Eligible"
                ? "Excellent news! Your company meets the primary indicators for a successful IPO listing. You are ready to explore the next phase of growth."
                : "Based on the initial metrics, your company might need additional structuring to meet the elite standards for an immediate IPO listing."}
            </DialogDescription>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className={`p-3 md:p-4 rounded-xl border transition-all ${status === "Eligible" ? "bg-emerald-50/50 border-emerald-100" : "bg-slate-50 border-slate-100"
              }`}>
              <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5 md:mb-1">Status</span>
              <span className={`text-sm md:text-base font-black uppercase ${status === "Eligible" ? "text-emerald-700" : "text-slate-700"}`}>
                {status}
              </span>
            </div>
            <div className="p-3 md:p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5 md:mb-1">Exchange</span>
              <span className="text-sm md:text-base font-black text-slate-700">
                {status === "Eligible" ? "SME / Mainboard" : "Consultancy Req."}
              </span>
            </div>
          </div>

          <div className="bg-foreground text-background p-4 md:p-5 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent/20 transition-all" />
            <h4 className="text-xs md:text-sm font-bold mb-2 flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" /> Next Strategic Steps:
            </h4>
            <ul className="space-y-2 text-[10px] md:text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" /> Our elite advisor will call you within 24 hours.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" /> Prepare your last 3 years of audited financials.
              </li>
            </ul>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 h-11 md:h-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-sm md:text-base" onClick={onClose}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IPOFeasibility;
