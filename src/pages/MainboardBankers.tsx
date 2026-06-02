import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {
  MapPin,
  Search,
  ArrowRight,
  Building2,
  Globe,
  FileText,
  CheckCircle,
  ChevronRight,
  X,
  Phone,
  Mail,
  Shield,
  Star,
  TrendingUp,
  Users,
  Award,
  Home,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  MessageSquare,
  ChevronLeft,
  GitCompare,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getImageUrl, formatIndianNumber } from "@/lib/utils";

const MotionLink = motion(Link);

interface MainboardBanker {
  id: number;
  title: string;
  sub_title: string;
  slug: string;
  mcat_id: string | number;
  image: string;
  description: string;
  meta_title: string;
  meta_desc: string;
  meta_keywords: string;
  noOfiposofar: string;
  totalfundraised: string;
  avgiposize: string;
  avglisting_gain: string;
  avgsubscription: string;
  faqs: string;
  nseemer: string;
  bsesme: string;
  yearwise_ipolisting: string;
  sme_ipos_by_size: string;
  sme_ipos_by_subscription: string;
  cemail: string;
  cmobile: string;
  caddress: string;
  cweblink: string;
  established_year: number | null;

  name?: string;
  logo_url?: string;
  location?: string;
  sebi_registration?: string;
  website?: string;
  total_ipos?: number;
  total_raised?: number | string;
  avg_size?: number | string;
  avg_subscription?: number | string;
}

const safeParseJSON = (str: string) => {
  if (!str) return [];
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
};

const N = "#001529";
const G = "#f59e08";
const G2 = "#d97706";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

// ── Compare Bar ──────────────────────────────────────────────────────────────
const CompareBar = ({
  selected,
  onRemove,
  onClear,
  onCompare,
}: {
  selected: MainboardBanker[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onCompare: () => void;
}) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed left-0 right-0 z-[998] px-3 pb-[80px] md:pb-4"
    style={{ bottom: 0 }}
  >
    <div
      className="max-w-3xl mx-auto rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${N}, #002f6c)`,
        boxShadow: "0 -4px 40px rgba(0,21,41,0.5)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 p-3 md:p-4">
        <GitCompare className="w-5 h-5 shrink-0" style={{ color: G }} />
        <p className="text-white font-black text-xs md:text-sm flex-1 min-w-[140px]">
          {selected.length === 1
            ? "1 selected — pick 1 more"
            : "2 selected — ready to compare!"}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-1.5 bg-white/10 rounded-xl px-2.5 py-1.5 border border-white/20"
            >
              <span className="text-white text-xs font-black max-w-[80px] md:max-w-[110px] truncate">
                {b.title}
              </span>
              <button
                onClick={() => onRemove(b.id)}
                className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors ml-1"
              >
                <X className="w-2.5 h-2.5 text-white" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClear}
          className="text-white/50 hover:text-white text-xs font-bold transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onCompare}
          disabled={selected.length < 2}
          className="flex items-center gap-2 px-4 h-9 rounded-xl font-black text-xs transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: `linear-gradient(135deg, ${G}, ${G2})`,
            color: N,
          }}
        >
          <GitCompare className="w-3.5 h-3.5" /> Compare Now
        </button>
      </div>
    </div>
  </motion.div>
);

const MainboardBankersPage = () => {
  const [bankers, setBankers] = useState<MainboardBanker[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;
  const [hasMore, setHasMore] = useState(false);
  const [detailBanker, setDetailBanker] = useState<MainboardBanker | null>(
    null,
  );
  const [connectBanker, setConnectBanker] = useState<MainboardBanker | null>(
    null,
  );
  const [relatedBankers, setRelatedBankers] = useState<MainboardBanker[]>([]);
  const [bannerVideo, setBannerVideo] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<MainboardBanker[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { category } = useParams<{ category: string }>();

  const toggleCompare = (banker: MainboardBanker, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareList((prev) => {
      const exists = prev.find((b) => b.id === banker.id);
      if (exists) return prev.filter((b) => b.id !== banker.id);
      if (prev.length >= 2) return prev;
      return [...prev, banker];
    });
  };
  const removeFromCompare = (id: number) =>
    setCompareList((p) => p.filter((b) => b.id !== id));
  const handleCompareNow = () => {
    if (compareList.length < 2) return;
    navigate(
      `/merchant-bankers/compare?a=${compareList[0].id}&b=${compareList[1].id}&type=mainboard`,
    );
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(
          `/api/banners?page=${encodeURIComponent(pathname)}`,
        );
        if (res.ok) {
          const data = await res.json();
          const videoBanner = data.find((b: any) => b.video_url);
          if (videoBanner) setBannerVideo(videoBanner.video_url);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanners();
  }, [pathname]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (page === 1) setLoading(true);
    else setLoadingMore(true);
    fetch(
      `/api/mainboard-bankers?page=${page}&limit=${limit}&search=${encodeURIComponent(debouncedSearch)}&category=${encodeURIComponent(category || "list-of-mainboard-merchant-bankers")}`,
    )
      .then((r) => r.json())
      .then((body) => {
        const data = body.data || [];
        if (page === 1) setBankers(data);
        else setBankers((prev) => [...prev, ...data]);
        setHasMore(body.pagination ? page < body.pagination.totalPages : false);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }, [page, debouncedSearch, category]);

  const fetchDetailBanker = async (id: number) => {
    try {
      setRelatedBankers([]);
      const res = await fetch(`/api/mainboard-bankers/${id}`);
      if (res.ok) {
        const data = await res.json();
        setDetailBanker(data);

        try {
          const relatedIds = JSON.parse(data.ipos || "[]");
          if (Array.isArray(relatedIds) && relatedIds.length > 0) {
            const relRes = await fetch(
              `/api/bankers?ids=${relatedIds.join(",")}`,
            );
            if (relRes.ok) {
              const relData = await relRes.json();
              setRelatedBankers(relData.data || []);
            }
          }
        } catch (e) {
          console.error("Error fetching related:", e);
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (detailBanker) {
    const yearwise = safeParseJSON(detailBanker.yearwise_ipolisting);
    const sizeData = safeParseJSON(detailBanker.sme_ipos_by_size);
    const subData = safeParseJSON(detailBanker.sme_ipos_by_subscription);
    const faqsData = safeParseJSON(detailBanker.faqs);

    const hasDesc =
      detailBanker.description && detailBanker.description.trim().length > 10;
    const webUrl = (w: string | undefined) =>
      !w ? "#" : w.startsWith("http") ? w : `https://${w}`;

    const SecHdr = ({ icon: Icon, label }: { icon: any; label: string }) => (
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: N }}
      >
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color: G }} />
        </div>
        <h3 className="font-black text-sm uppercase tracking-widest text-white">
          {label}
        </h3>
      </div>
    );

    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "#F8FAFC" }}
      >
        <style>{`
          .bd p { margin-bottom: 1rem; color: #475569; line-height: 1.8; font-size: .95rem; font-weight: 500; }
          .bd h2, .bd h3, .bd h4 { color: #001529; font-weight: 900; margin: 1.2rem 0 .5rem; }
          .bd h2 { font-size: 1.3rem; border-bottom: 2px solid #f59e08; padding-bottom: .4rem; }
          .bd ul { list-style: none; padding: 0; margin: .8rem 0; }
          .bd ul li { display: flex; align-items: flex-start; gap: .5rem; margin-bottom: .4rem; color: #475569; font-size: .9rem; }
          .bd ul li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #f59e08; flex-shrink: 0; margin-top: .4rem; }
          .bd table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
          .bd th { background: #001529; color: #f59e08; padding: .5rem 1rem; text-align: left; font-size: .8rem; font-weight: 800; }
          .bd td { border: 1px solid #e2e8f0; padding: .5rem 1rem; color: #475569; font-size: .85rem; }
        `}</style>
        <SEOHead
          title={`${detailBanker.meta_title || detailBanker.title} | Mainboard Merchant Banker | India IPO`}
          description={
            detailBanker.meta_desc ||
            detailBanker.description?.replace(/<[^>]*>/g, "").substring(0, 160)
          }
          keywords={
            detailBanker.meta_keywords ||
            "Mainboard Merchant Banker, IPO Lead Manager, BRLM India"
          }
        />
        <Header />
        <main className="flex-1">
          <div
            className="pt-14 pb-28 px-4 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${N} 0%, #002147 55%, #003380 100%)`,
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5"
                style={{
                  background: G,
                  filter: "blur(100px)",
                  transform: "translate(25%,-25%)",
                }}
              />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }}
            />

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-white/60 font-bold">
                <button
                  onClick={() => setDetailBanker(null)}
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Home className="h-3.5 w-3.5 text-[#f59e08]" /> Home
                </button>
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                <button
                  onClick={() => setDetailBanker(null)}
                  className="hover:text-white transition-colors"
                >
                  Merchant Bankers
                </button>
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                <button
                  onClick={() => setDetailBanker(null)}
                  className="hover:text-white transition-colors"
                >
                  Mainboard
                </button>
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                <span className="text-white truncate max-w-[200px] sm:max-w-[400px]">
                  {detailBanker.title}
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-white flex items-center justify-center p-3 shadow-2xl shrink-0 border-4 border-white/10 overflow-hidden">
                  {detailBanker.image ? (
                    <img
                      src={getImageUrl(detailBanker.image)}
                      alt={detailBanker.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="w-14 h-14 text-[#001529]/30" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-black uppercase tracking-widest"
                    style={{
                      background: "rgba(245,158,8,0.2)",
                      color: G,
                      border: "1px solid rgba(245,158,8,0.35)",
                    }}
                  >
                    <Shield className="h-3 w-3" /> Official Status
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                    {detailBanker.title}
                  </h1>
                  {detailBanker.sub_title && (
                    <p className="text-white/65 text-base font-semibold mb-5">
                      {detailBanker.sub_title}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setConnectBanker(detailBanker)}
                      className="flex items-center gap-2 px-6 h-11 rounded-xl font-black text-sm text-[#001529] transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${G}, ${G2})`,
                        boxShadow: `0 4px 16px rgba(245,158,8,0.4)`,
                      }}
                    >
                      <Mail className="w-4 h-4" /> Connect Now
                    </button>
                    {(detailBanker.cweblink || detailBanker.website) && (
                      <a
                        href={webUrl(
                          detailBanker.cweblink || detailBanker.website,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 h-11 rounded-xl font-black text-sm text-white border border-white/25 hover:bg-white/10 transition-all"
                      >
                        <Globe className="w-4 h-4" /> Visit Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 -mt-14 relative z-20 pb-20">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 mb-8 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {[
                  {
                    label: "Total IPOs",
                    value: detailBanker.noOfiposofar || "—",
                  },
                  {
                    label: "Total Raised",
                    value:
                      formatIndianNumber(detailBanker.totalfundraised) || "—",
                  },
                  {
                    label: "Avg IPO Size",
                    value: formatIndianNumber(detailBanker.avgiposize) || "—",
                  },
                  {
                    label: "Avg Subscription",
                    value: detailBanker.avgsubscription
                      ? `${detailBanker.avgsubscription}x`
                      : "—",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center py-6 px-4"
                  >
                    <p
                      className="text-2xl md:text-3xl font-black mb-1"
                      style={{ color: i % 2 === 0 ? N : G2 }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {hasDesc && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={FileText} label="About the Company" />
                    <div
                      className="p-6 bd"
                      dangerouslySetInnerHTML={{
                        __html: detailBanker.description,
                      }}
                    />
                  </div>
                )}

                {(detailBanker.nseemer || detailBanker.bsesme) && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={TrendingUp} label="Exchange Distribution" />
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="rounded-xl p-6 text-center"
                          style={{
                            background: "rgba(0,21,41,0.05)",
                            border: "1px solid rgba(0,21,41,0.1)",
                          }}
                        >
                          <p
                            className="text-4xl font-black mb-1"
                            style={{ color: N }}
                          >
                            {detailBanker.nseemer || "0"}
                          </p>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                            NSE Emerge
                          </p>
                        </div>
                        <div
                          className="rounded-xl p-6 text-center"
                          style={{
                            background: "rgba(245,158,8,0.08)",
                            border: "1px solid rgba(245,158,8,0.2)",
                          }}
                        >
                          <p
                            className="text-4xl font-black mb-1"
                            style={{ color: G2 }}
                          >
                            {detailBanker.bsesme || "0"}
                          </p>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                            BSE SME
                          </p>
                        </div>
                      </div>
                      {detailBanker.avglisting_gain && (
                        <div
                          className="mt-4 p-4 rounded-xl text-center"
                          style={{
                            background: "rgba(34,197,94,0.08)",
                            border: "1px solid rgba(34,197,94,0.2)",
                          }}
                        >
                          <p
                            className="text-2xl font-black"
                            style={{ color: "#16a34a" }}
                          >
                            {detailBanker.avglisting_gain}
                          </p>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                            Avg Listing Gain
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {yearwise.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={LineChart} label="Year-wise Performance" />
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#F8FAFC]">
                          <tr>
                            <th className="px-5 py-3 text-left font-black uppercase tracking-widest text-slate-500">
                              Year
                            </th>
                            <th className="px-5 py-3 text-center font-black uppercase tracking-widest text-slate-500">
                              No. of IPOs
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {yearwise.map((item: any, idx: number) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                              }
                            >
                              <td
                                className="px-5 py-3 font-black"
                                style={{ color: N }}
                              >
                                {item.year}
                              </td>
                              <td className="px-5 py-3 text-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-primary/10 text-primary">
                                  {item.no_of_ipos} IPOs
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {subData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr
                      icon={PieChart}
                      label="Mainboard IPOs by Subscription"
                    />
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {subData.map((item: any, idx: number) => {
                          const colors = [
                            {
                              bg: "bg-blue-50/50",
                              text: "text-blue-600",
                              border: "border-blue-100",
                            },
                            {
                              bg: "bg-emerald-50/50",
                              text: "text-emerald-600",
                              border: "border-emerald-100",
                            },
                            {
                              bg: "bg-rose-50/50",
                              text: "text-rose-600",
                              border: "border-rose-100",
                            },
                            {
                              bg: "bg-amber-50/50",
                              text: "text-amber-600",
                              border: "border-amber-100",
                            },
                            {
                              bg: "bg-indigo-50/50",
                              text: "text-indigo-600",
                              border: "border-indigo-100",
                            },
                            {
                              bg: "bg-cyan-50/50",
                              text: "text-cyan-600",
                              border: "border-cyan-100",
                            },
                          ];
                          const c = colors[idx % colors.length];

                          return (
                            <div
                              key={idx}
                              className={`rounded-xl p-5 border ${c.bg} ${c.border} text-center flex flex-col justify-center min-h-[110px] transition-transform hover:scale-[1.02]`}
                            >
                              <p
                                className={`text-2xl font-black mb-1 ${c.text}`}
                              >
                                {item.subscription || "0"}
                              </p>
                              <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                                {item.title}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {sizeData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr
                      icon={BarChart3}
                      label="Mainboard IPOs by IPO Size"
                    />
                    <div className="p-6">
                      <div className="space-y-1">
                        {sizeData.map((item: any, idx: number) => {
                          const colors = [
                            "bg-blue-600",
                            "bg-emerald-600",
                            "bg-rose-600",
                            "bg-amber-500",
                            "bg-cyan-600",
                          ];
                          const c = colors[idx % colors.length];
                          return (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors bg-slate-50/30"
                            >
                              <span className="text-sm font-semibold text-slate-700">
                                {item.title}
                              </span>
                              <span
                                className={`px-4 py-1.5 rounded-md text-xs font-black text-white ${c} shadow-sm min-w-[70px] text-center`}
                              >
                                {item.size || "0"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {faqsData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={MessageSquare} label="Common Inquiries" />
                    <div className="p-2">
                      <Accordion type="single" collapsible className="w-full">
                        {faqsData.map((faq: any, idx: number) => (
                          <AccordionItem
                            key={idx}
                            value={`faq-${idx}`}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <AccordionTrigger
                              className="px-4 py-4 text-left font-black text-sm hover:text-primary transition-colors"
                              style={{ color: N }}
                            >
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-slate-500 text-sm leading-relaxed font-medium">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                )}

                {relatedBankers.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={Users} label="Top Merchant Bankers" />
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedBankers.map((rb) => (
                        <Link
                          key={rb.id}
                          to={`/merchant-banker/${rb.slug}`}
                          className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                            {rb.image ? (
                              <img
                                src={getImageUrl(rb.image)}
                                alt={rb.title}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Building2 className="w-6 h-6 text-slate-200" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-[#001529] group-hover:text-primary transition-colors truncate">
                              {rb.title}
                            </p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              View Profile{" "}
                              <ChevronRight className="inline-block w-3 h-3" />
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                  <div
                    className="h-1.5 w-full"
                    style={{ background: `linear-gradient(90deg, ${N}, ${G})` }}
                  />
                  <div className="p-6">
                    <h3
                      className="font-black text-base mb-5"
                      style={{ color: N }}
                    >
                      Corporate Contact
                    </h3>
                    <div className="space-y-4">
                      {detailBanker.cemail && (
                        <a
                          href={`mailto:${detailBanker.cemail}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(0,21,41,0.06)" }}
                          >
                            <Mail className="h-4 w-4" style={{ color: N }} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Email
                            </p>
                            <p
                              className="text-sm font-semibold truncate group-hover:text-primary transition-colors"
                              style={{ color: N }}
                            >
                              {detailBanker.cemail}
                            </p>
                          </div>
                        </a>
                      )}
                      {detailBanker.cmobile && (
                        <a
                          href={`tel:${detailBanker.cmobile}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(245,158,8,0.08)" }}
                          >
                            <Phone className="h-4 w-4" style={{ color: G2 }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Contact
                            </p>
                            <p
                              className="text-sm font-semibold group-hover:text-primary transition-colors"
                              style={{ color: N }}
                            >
                              {detailBanker.cmobile}
                            </p>
                          </div>
                        </a>
                      )}
                      {detailBanker.caddress && (
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "rgba(0,21,41,0.06)" }}
                          >
                            <MapPin className="h-4 w-4" style={{ color: N }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Head Office
                            </p>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                              {detailBanker.caddress}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setConnectBanker(detailBanker)}
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-xl font-black text-sm mt-6 transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${N}, #003380)`,
                        color: "white",
                        boxShadow: "0 4px 16px rgba(0,21,41,0.3)",
                      }}
                    >
                      <Zap className="h-4 w-4 text-primary" /> Start Inquiry
                    </button>
                  </div>
                </div>

                <div className="bg-[#001529] rounded-2xl p-6 relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{
                      background: G,
                      filter: "blur(30px)",
                      transform: "translate(30%,-30%)",
                    }}
                  />
                  <Award className="h-8 w-8 mb-3" style={{ color: G }} />
                  <h4 className="font-black text-white text-base mb-2">
                    Want to List?
                  </h4>
                  <p className="text-white/55 text-xs mb-5 leading-relaxed">
                    Planning a Mainboard IPO? Get connected with the best Lead
                    Managers.
                  </p>
                  <Link
                    to="/ipo-eligibility-check"
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl font-black text-xs transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${G}, ${G2})`,
                      color: N,
                    }}
                  >
                    Check Business Eligibility{" "}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {connectBanker && (
            <ConnectModal
              banker={connectBanker}
              onClose={() => setConnectBanker(null)}
            />
          )}
        </AnimatePresence>
        <Footer />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F8FAFC" }}
    >
      <SEOHead
        title="Official List of Mainboard Merchant Bankers in India | India IPO"
        description="Comprehensive directory of top tier Mainboard Merchant Bankers in India. Detailed IPO performance, raised amounts, and contact details."
        keywords="Mainboard Merchant Bankers, India IPO Lead Managers, BRLM India directory"
      />
      <Header />

      <main className="flex-grow">
        <section className="py-16 lg:py-24 relative overflow-hidden bg-[#001529]">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-30"
              src={getImageUrl(bannerVideo || "/uploads/video/ccvindia1.mp4")}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#001529]/80 via-[#001529]/40 to-[#001529]" />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5"
              style={{
                background: G,
                filter: "blur(100px)",
                transform: "translate(25%,-25%)",
              }}
            />
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1 z-10"
            style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-8 flex-wrap  font-medium">
              <Link
                to="/"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/90">Mainboard Merchant Bankers</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mr-auto "
            >
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-black uppercase tracking-widest"
                style={{
                  background: "rgba(245,158,8,0.2)",
                  color: G,
                  border: "1px solid rgba(245,158,8,0.35)",
                }}
              >
                <Shield className="h-3.5 w-3.5" /> Sector Leaders
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">
                Mainboard <span style={{ color: G }}>Merchant Bankers</span>
              </h1>
              <p className="text-white/65 max-w-2xl  mb-10 text-base md:text-lg font-medium leading-relaxed">
                Engage with top-tier Category-I Merchant Bankers for large-scale
                IPOs, specialising in complex deal structuring, institutional
                book-building and capital market execution.
              </p>

              <div className="max-w-xl relative mb-10 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by banker name or city..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:bg-white/15 focus:border-primary/50 transition-all shadow-2xl"
                />
              </div>

              <div className="flex flex-wrap gap-4 ">
                <Link
                  to="/merchant-bankers/list-of-sme-merchant-bankers"
                  className="flex items-center gap-2 px-8 h-12 rounded-xl font-black text-sm text-white border border-white/30 hover:bg-white/5 transition-all"
                >
                  Visit SME Directory <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/ipo-eligibility-check"
                  className="flex items-center gap-2 px-8 h-12 rounded-xl font-black text-sm transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${G}, ${G2})`,
                    color: N,
                  }}
                >
                  <Zap className="h-4 w-4" />
                  Check Your IPO Eligibility
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <div className="flex  gap-3 mb-4">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ background: G }}
                />
                <h2 className="text-3xl font-black text-[#001529]">
                  List of Mainboard Merchant Bankers
                </h2>
              </div>
              <p className="text-slate-600 text-base md:text-[16px] leading-relaxed text-justify">
                Merchant bankers, also known as Book Running Lead Managers
                (BRLMs), play an important role in the IPO process in India.
                They offer assistance to companies at every step of the IPO
                journey, from the initial preparation stage to the actual
                listing stage in the stock market. Their services cover
                responsibilities such as structuring the IPO, due diligence,
                pricing documents, preparing and filing documents with the
                regulatory authorities, while ensuring compliance with SEBI
                regulations. Essentially acting as the intermediary between the
                company and the investors, BRLMs facilitate the capital raising
                process for businesses while navigating through the complexities
                of regulatory requirements.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 h-[400px] animate-pulse"
                  />
                ))}
              </div>
            ) : bankers.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <Building2 className="w-20 h-20 mx-auto mb-6 text-slate-100" />
                <h3 className="text-2xl font-black text-[#001529]">
                  No Result Found
                </h3>
                <p className="text-slate-400 mt-2">
                  We couldn't find any merchant matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bankers.map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={fadeUp}
                    onClick={() => navigate(`/merchant-banker/${b.slug}`)}
                    className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer overflow-hidden flex flex-col"
                  >
                    <div className="h-1.5 w-full bg-slate-100 group-hover:bg-primary transition-colors" />
                    <div className="p-7 flex-grow">
                      <div className="flex gap-5 items-start mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-white border border-slate-100 p-3 shadow-inner shrink-0 group-hover:border-primary/30 transition-colors flex items-center justify-center overflow-hidden">
                          {b.image ? (
                            <img
                              src={getImageUrl(b.image)}
                              alt={b.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building2 className="w-10 h-10 text-slate-200" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3
                            className="text-xl font-black leading-tight group-hover:text-primary transition-colors"
                            style={{ color: N }}
                          >
                            {b.title}
                          </h3>
                          {b.noOfiposofar && (
                            <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                              {b.noOfiposofar} IPOs Managed
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Fund Raised
                          </p>
                          <p className="text-sm font-bold text-[#001529]">
                            {formatIndianNumber(b.totalfundraised) || "—"}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                            Avg Subscription
                          </p>
                          <p className="text-sm font-bold text-[#001529]">
                            {b.avgsubscription ? `${b.avgsubscription}x` : "—"}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed">
                        {b.description
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 100) ||
                          "Explore professional merchant banking services and capital market excellence."}
                      </p>
                    </div>

                    {/* Compare toggle */}
                    <div className="px-7 pb-2">
                      <button
                        onClick={(e) => toggleCompare(b, e)}
                        disabled={
                          compareList.length >= 2 &&
                          !compareList.find((c) => c.id === b.id)
                        }
                        className={`w-full h-9 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all border ${compareList.find((c) => c.id === b.id)
                          ? "border-amber-400 bg-amber-50 text-amber-700"
                          : "border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          }`}
                      >
                        {compareList.find((c) => c.id === b.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Selected for
                            Compare
                          </>
                        ) : (
                          <>
                            <GitCompare className="w-3.5 h-3.5" /> Add to
                            Compare
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-7 pt-2 flex gap-3">
                      <Link
                        to={`/merchant-banker/${b.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 h-12 rounded-2xl font-black text-xs border border-slate-200 text-[#001529] hover:bg-slate-50 transition-colors flex items-center justify-center"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/merchant-contact?ipo_type=Mainboard IPO&banker=${encodeURIComponent(b.title)}`,
                          );
                        }}
                        className="flex-1 h-12 rounded-2xl font-black text-xs transition-all hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, ${G}, ${G2})`,
                          color: N,
                          boxShadow: "0 4px 12px rgba(245,158,8,0.3)",
                        }}
                      >
                        Contact Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-16 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingMore}
                  className="rounded-2xl h-14 px-12 font-black border-2 hover:bg-slate-50"
                >
                  {loadingMore ? "Loading..." : "Show More Results"}
                </Button>
              </div>
            )}
          </div>
        </section>

        <section
          className="py-24 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${N}, #003380)` }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #f59e08 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-black text-white mb-6">
              Need a Strategic Advisor?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-10 text-lg font-medium leading-relaxed">
              Our partner merchant bankers are ready to assist you with your
              Mainboard IPO application and market entry.
            </p>
            <Link to="/contact">
              <button
                className="px-12 h-16 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${G}, ${G2})`,
                  color: N,
                  boxShadow: "0 10px 40px rgba(245,158,8,0.4)",
                }}
              >
                Book Free Consultation
              </button>
            </Link>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {connectBanker && (
          <ConnectModal
            banker={connectBanker}
            onClose={() => setConnectBanker(null)}
          />
        )}
        {compareList.length > 0 && (
          <CompareBar
            selected={compareList}
            onRemove={removeFromCompare}
            onClear={() => setCompareList([])}
            onCompare={handleCompareNow}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const ConnectModal = ({
  banker,
  onClose,
}: {
  banker: MainboardBanker;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#001529]/80 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <div
        className="p-8 text-white relative text-center flex flex-col items-center"
        style={{ background: `linear-gradient(135deg, ${N}, #003380)` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }}
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="w-20 h-20 rounded-2xl bg-white mb-6 p-3 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
          {banker.image ? (
            <img
              src={getImageUrl(banker.image)}
              alt={banker.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <Building2 className="w-10 h-10 text-[#001529]/30" />
          )}
        </div>
        <h2 className="text-xl font-black mb-2 leading-tight">
          Connect with {banker.title} through India IPO
        </h2>
        <div className="text-white/50 font-bold text-lg my-1">
          &
        </div>
        <p className="font-extrabold text-sm uppercase tracking-wide" style={{ color: G }}>
          Save upto 20% on IPO Listing Expenses.
        </p>
      </div>

      <div className="p-8">
        <div className="pt-2">
          <Link
            to={`/merchant-contact?ipo_type=Mainboard IPO&banker=${encodeURIComponent(banker.title)}`}
            className="block"
          >
            <button
              className="w-full h-14 rounded-2xl font-black text-sm transition-all hover:scale-105 shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${G}, ${G2})`,
                color: N,
                boxShadow: "0 8px 30px rgba(245,158,8,0.4)",
              }}
            >
              Initiate Full Inquiry
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
);

export default MainboardBankersPage;
