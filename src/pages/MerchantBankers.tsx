import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {
  ExternalLink,
  MapPin,
  Search,
  TrendingUp,
  ArrowRight,
  Shield,
  Building2,
  Phone,
  CheckCircle,
  Award,
  Users,
  Globe,
  MessageSquare,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart,
  Home,
  Star,
  Zap,
  GitCompare,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const MotionDiv = motion.div;
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getImageUrl, formatIndianNumber } from "@/lib/utils";

interface Banker {
  id: string;
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
  ipos: string;
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
  created_at?: string;

  logo_url?: string;
  name?: string;
  website?: string;
  location?: string;
  email?: string;
  phone?: string;
  total_ipos?: string | number;
  total_raised?: string | number;
  avg_size?: string | number;
  avg_subscription?: string | number;
  avg_listing_gain?: string | number;
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

const ConnectModal = ({
  banker,
  onClose,
}: {
  banker: Banker;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0, y: 20 }}
      className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
    >
      <div
        className="p-8 text-white relative text-center flex flex-col items-center"
        style={{ background: `linear-gradient(135deg, ${N}, #003380)` }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
        <div className="w-16 h-16 rounded-xl bg-white mb-4 p-2 shadow-xl overflow-hidden flex items-center justify-center shrink-0">
          {banker.image ? (
            <img
              src={getImageUrl(banker.image)}
              alt={banker.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-black text-2xl"
              style={{ color: N }}
            >
              {banker.title?.[0]}
            </div>
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
            to={`/merchant-contact?ipo_type=${banker.mcat_id === "SME" ? "SME IPO" : "Mainboard IPO"}&banker=${encodeURIComponent(banker.title)}`}
            className="block"
          >
            <button
              className="w-full h-12 rounded-xl font-black transition-all hover:scale-105 shadow-lg text-sm"
              style={{
                background: `linear-gradient(135deg, ${G}, ${G2})`,
                color: N,
                boxShadow: "0 4px 16px rgba(245,158,8,0.35)",
              }}
            >
              Contact Now
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
);

// ─── Compare Bar (floating bottom) ───────────────────────────────────────────
const CompareBar = ({
  selected,
  onRemove,
  onClear,
  onCompare,
}: {
  selected: Banker[];
  onRemove: (id: string) => void;
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
      className="max-w-4xl mx-auto rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${N}, #002f6c)`,
        boxShadow: "0 -4px 40px rgba(0,21,41,0.5)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 p-3 md:p-4">
        <GitCompare className="w-5 h-5 shrink-0" style={{ color: G }} />
        <p className="text-white font-black text-sm md:text-base flex-1 min-w-[160px]">
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
              <span className="text-white text-sm font-black max-w-[80px] md:max-w-[110px] truncate">
                {b.title}
              </span>
              <button
                onClick={() => onRemove(b.id)}
                className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors ml-1"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={onClear}
          className="text-white/50 hover:text-white text-sm font-bold transition-colors"
        >
          Clear
        </button>
        <button
          onClick={onCompare}
          disabled={selected.length < 2}
          className="flex items-center gap-2 px-5 h-10 rounded-xl font-black text-sm transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: `linear-gradient(135deg, ${G}, ${G2})`,
            color: N,
          }}
        >
          <GitCompare className="w-4 h-4" /> Compare Now
        </button>
      </div>
    </div>
  </motion.div>
);

// ─── Compare Row helper ───────────────────────────────────────────────────────
const CmpRow = ({
  label,
  a,
  b,
  highlight,
}: {
  label: string;
  a: string | number;
  b: string | number;
  highlight?: boolean;
}) => {
  const same = String(a) === String(b);
  return (
    <tr className={highlight ? "bg-amber-50/60" : "bg-white"}>
      <td className="px-4 py-3 text-sm font-black text-slate-500 uppercase tracking-widest text-center border-r border-slate-100 w-[30%]">
        {label}
      </td>
      <td
        className={`px-4 py-4 text-base font-black text-center border-r border-slate-100 w-[35%] ${same ? "text-slate-600" : "text-emerald-600"}`}
      >
        {a || "—"}
      </td>
      <td
        className={`px-4 py-4 text-base font-black text-center w-[35%] ${same ? "text-slate-600" : "text-blue-600"}`}
      >
        {b || "—"}
      </td>
    </tr>
  );
};

// ─── Compare Modal ────────────────────────────────────────────────────────────
const CompareModal = ({
  bankers,
  onClose,
}: {
  bankers: [Banker, Banker];
  onClose: () => void;
}) => {
  const [a, b] = bankers;
  const imgA = a.image ? getImageUrl(a.image) : null;
  const imgB = b.image ? getImageUrl(b.image) : null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 mb-8"
        style={{ background: "#F8FAFC" }}
      >
        {/* Header */}
        <div
          className="relative p-6"
          style={{ background: `linear-gradient(135deg, ${N}, #003380)` }}
        >
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-2 mb-6">
            <GitCompare className="w-5 h-5" style={{ color: G }} />
            <h2 className="text-white font-black text-xl">
              Merchant Banker Comparison
            </h2>
          </div>
          {/* Banker headers */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { bk: a, imgSrc: imgA },
              { bk: b, imgSrc: imgB },
            ].map(({ bk, imgSrc }, idx) => (
              <div key={bk.id} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2 shrink-0 shadow-lg overflow-hidden">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={bk.title}
                      className="w-full h-full object-contain"
                      onError={(e: any) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-xl font-black" style={{ color: N }}>
                      {bk.title?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="text-[10px] font-black uppercase tracking-widest mb-1"
                    style={{ color: idx === 0 ? "#34d399" : "#60a5fa" }}
                  >
                    {idx === 0 ? "Banker A" : "Banker B"}
                  </div>
                  <p className="text-white font-black text-sm leading-snug">
                    {bk.title}
                  </p>
                  {bk.sub_title && (
                    <p className="text-white/50 text-sm font-medium mt-0.5">
                      {bk.sub_title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: N }}>
                <th className="px-4 py-4 text-sm font-black text-white/50 uppercase tracking-widest text-center border-r border-white/10 w-[30%]">
                  Metric
                </th>
                <th
                  className="px-4 py-4 text-sm font-black uppercase tracking-widest text-center border-r border-white/10 w-[35%]"
                  style={{ color: "#34d399" }}
                >
                  {a.title}
                </th>
                <th
                  className="px-4 py-4 text-sm font-black uppercase tracking-widest text-center w-[35%]"
                  style={{ color: "#60a5fa" }}
                >
                  {b.title}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <CmpRow
                label="Total IPOs"
                a={a.noOfiposofar || a.total_ipos || "—"}
                b={b.noOfiposofar || b.total_ipos || "—"}
                highlight
              />
              <CmpRow
                label="Total Fund Raised (Cr)"
                a={
                  formatIndianNumber(a.totalfundraised || a.total_raised) || "—"
                }
                b={
                  formatIndianNumber(b.totalfundraised || b.total_raised) || "—"
                }
              />
              <CmpRow
                label="Avg IPO Size (Cr)"
                a={formatIndianNumber(a.avgiposize || a.avg_size) || "—"}
                b={formatIndianNumber(b.avgiposize || b.avg_size) || "—"}
                highlight
              />
              <CmpRow
                label="Avg Subscription"
                a={a.avgsubscription ? `${a.avgsubscription}x` : "—"}
                b={b.avgsubscription ? `${b.avgsubscription}x` : "—"}
              />
              <CmpRow
                label="Avg Listing Gain"
                a={a.avglisting_gain || "—"}
                b={b.avglisting_gain || "—"}
                highlight
              />
              <CmpRow
                label="NSE Emerge"
                a={a.nseemer || "—"}
                b={b.nseemer || "—"}
              />
              <CmpRow
                label="BSE SME"
                a={a.bsesme || "—"}
                b={b.bsesme || "—"}
                highlight
              />
              <CmpRow
                label="Email"
                a={a.cemail || a.email || "—"}
                b={b.cemail || b.email || "—"}
              />
              <CmpRow
                label="Phone"
                a={a.cmobile || a.phone || "—"}
                b={b.cmobile || b.phone || "—"}
                highlight
              />
              <CmpRow
                label="Website"
                a={a.cweblink || a.website || "—"}
                b={b.cweblink || b.website || "—"}
              />
              <CmpRow
                label="Location"
                a={a.caddress || a.location || "—"}
                b={b.caddress || b.location || "—"}
                highlight
              />
            </tbody>
          </table>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <a
            href={`/merchant-contact?banker=${encodeURIComponent(a.title)}`}
            className="flex-1 h-11 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, #34d399, #059669)`,
              color: "white",
            }}
          >
            <Mail className="w-4 h-4" /> Contact {a.title}
          </a>
          <a
            href={`/merchant-contact?banker=${encodeURIComponent(b.title)}`}
            className="flex-1 h-11 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, #60a5fa, #2563eb)`,
              color: "white",
            }}
          >
            <Mail className="w-4 h-4" /> Contact {b.title}
          </a>
          <button
            onClick={onClose}
            className="h-11 px-6 rounded-xl font-black text-sm border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const MerchantBankersPage = ({ type }: { type: "SME" | "Mainboard" }) => {
  const isSME = type.toLowerCase() === "sme";
  const [bankers, setBankers] = useState<Banker[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;
  const [hasMore, setHasMore] = useState(false);
  const [detailBanker, setDetailBanker] = useState<Banker | null>(null);
  const [connectBanker, setConnectBanker] = useState<Banker | null>(null);
  const [relatedBankers, setRelatedBankers] = useState<Banker[]>([]);
  const [compareList, setCompareList] = useState<Banker[]>([]);

  const toggleCompare = (banker: Banker, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareList((prev) => {
      const exists = prev.find((b) => b.id === banker.id);
      if (exists) return prev.filter((b) => b.id !== banker.id);
      if (prev.length >= 2) return prev;
      return [...prev, banker];
    });
  };
  const removeFromCompare = (id: string) =>
    setCompareList((p) => p.filter((b) => b.id !== id));

  const handleCompareNow = () => {
    if (compareList.length < 2) return;
    const typeParam = isSME ? "sme" : "mainboard";
    navigate(
      `/merchant-bankers/compare?a=${compareList[0].id}&b=${compareList[1].id}&type=${typeParam}`,
    );
  };
  const [bannerVideo, setBannerVideo] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { category } = useParams<{ category: string }>();

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
    const api = isSME ? "/api/bankers" : "/api/mainboard-bankers";
    fetch(
      `${api}?page=${page}&limit=${limit}&search=${encodeURIComponent(debouncedSearch)}&category=${encodeURIComponent(category || "list-of-sme-merchant-bankers")}`,
    )
      .then((r) => r.json())
      .then((body) => {
        const data = body.data || [];
        if (page === 1) setBankers(data);
        else setBankers((p) => [...p, ...data]);
        setHasMore(body.pagination ? page < body.pagination.totalPages : false);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }, [type, page, debouncedSearch, category]);

  const pageTitle = isSME
    ? "List of SME Merchant Bankers"
    : "List of Mainboard Merchant Bankers";

  const fetchDetailBanker = async (bankerId: string | number) => {
    try {
      setRelatedBankers([]);
      const api = isSME ? "/api/bankers" : "/api/mainboard-bankers";
      const res = await fetch(`${api}/${bankerId}`);
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
        } catch (e) { }

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

    const imgSrc = detailBanker.image
      ? detailBanker.image.startsWith("http")
        ? detailBanker.image
        : window.location.origin +
        (detailBanker.image.startsWith("/") ? "" : "/") +
        detailBanker.image
      : detailBanker.logo_url
        ? detailBanker.logo_url.startsWith("http")
          ? detailBanker.logo_url
          : window.location.origin + detailBanker.logo_url
        : null;

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
          .bd p{margin-bottom:1rem;color:#475569;line-height:1.8;font-size:.95rem;font-weight:500}
          .bd h2,.bd h3,.bd h4{color:#001529;font-weight:900;margin:1.2rem 0 .5rem}
          .bd h2{font-size:1.3rem;border-bottom:2px solid #f59e08;padding-bottom:.4rem}
          .bd ul{list-style:none;padding:0;margin:.8rem 0}
          .bd ul li{display:flex;align-items:flex-start;gap:.5rem;margin-bottom:.4rem;color:#475569;font-size:.9rem}
          .bd ul li::before{content:'';width:6px;height:6px;border-radius:50%;background:#f59e08;flex-shrink:0;margin-top:.4rem}
          .bd a{color:#001529;text-decoration:underline;text-decoration-color:#f59e08;font-weight:600}
          .bd strong,.bd b{color:#001529;font-weight:700}
          .bd img{max-width:100%;border-radius:1rem;margin:1rem 0;box-shadow:0 4px 20px rgba(0,0,0,.1)}
          .bd table{width:100%;border-collapse:collapse;margin:1rem 0}
          .bd th{background:#001529;color:#f59e08;padding:.5rem 1rem;text-align:left;font-size:.8rem;font-weight:800}
          .bd td{border:1px solid #e2e8f0;padding:.5rem 1rem;color:#475569;font-size:.85rem}
        `}</style>

        <SEOHead
          title={`${detailBanker.meta_title || detailBanker.title} | India IPO Merchant Banker`}
          description={
            detailBanker.meta_desc ||
            detailBanker.description
              ?.replace(/<[^>]*>?/gm, "")
              .substring(0, 160)
          }
          keywords={
            detailBanker.meta_keywords || "Merchant Banker, SME IPO, BRLM India"
          }
        />
        <Header />
        <main className="flex-1">
          <div
            className="pt-6 md:pt-12 pb-28 px-4 relative overflow-hidden"
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
                  {isSME ? "SME" : "Mainboard"}
                </button>
                <ChevronRight className="h-3.5 w-3.5 text-white/20" />
                <span className="text-white truncate max-w-[200px] sm:max-w-[400px]">
                  {detailBanker.title}
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full max-w-[320px] aspect-square md:w-44 md:h-44 rounded-2xl bg-white flex items-center justify-center p-3 shadow-2xl shrink-0 border-4 border-white/10 overflow-hidden">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={detailBanker.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e: any) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-5xl font-black" style={{ color: N }}>
                      {detailBanker.title?.[0]}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-4 text-sm font-black uppercase tracking-widest"
                    style={{
                      background: "rgba(245,158,8,0.2)",
                      color: G,
                      border: "1px solid rgba(245,158,8,0.35)",
                    }}
                  >
                    <Shield className="h-3.5 w-3.5" /> Expert Merchant Banker
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                    {detailBanker.title}
                  </h1>
                  {detailBanker.sub_title && (
                    <p className="text-white/65 text-base font-semibold mb-5">
                      {detailBanker.sub_title}
                    </p>
                  )}
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => setConnectBanker(detailBanker)}
                      className="flex items-center gap-2 px-6 h-11 rounded-xl font-black text-sm transition-all hover:scale-105 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${G}, ${G2})`,
                        color: N,
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
                    value:
                      detailBanker.noOfiposofar ||
                      detailBanker.total_ipos ||
                      "—",
                  },
                  {
                    label: "Total Fund Raised(CR)",
                    value:
                      formatIndianNumber(
                        detailBanker.totalfundraised ||
                        detailBanker.total_raised,
                      ) || "—",
                  },
                  {
                    label: "Avg IPO Size(CR)",
                    value:
                      formatIndianNumber(
                        detailBanker.avgiposize || detailBanker.avg_size,
                      ) || "—",
                  },
                  {
                    label: "Avg Subscription",
                    value:
                      detailBanker.avgsubscription + "x" ||
                      detailBanker.avg_subscription ||
                      "—",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center py-6 px-4"
                  >
                    <p
                      className="text-3xl md:text-4xl font-black mb-1"
                      style={{ color: i % 2 === 0 ? N : G2 }}
                    >
                      {s.value}
                    </p>
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">
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
                    <SecHdr
                      icon={Building2}
                      label="About this Merchant Banker"
                    />
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
                    <SecHdr icon={Building2} label="IPO Listing by Exchange" />
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
                            {detailBanker.nseemer || "—"}
                          </p>
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">
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
                            {detailBanker.bsesme || "—"}
                          </p>
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">
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
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">
                            Avg Listing Gain
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {yearwise.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={LineChart} label="Year-wise IPO Listing" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr style={{ background: "#F8FAFC" }}>
                            <th className="px-5 py-4 text-left text-sm font-black uppercase tracking-widest text-slate-500">
                              Year
                            </th>
                            <th className="px-5 py-4 text-center text-sm font-black uppercase tracking-widest text-slate-500">
                              IPOs
                            </th>
                            {yearwise[0]?.amount !== undefined && (
                              <th className="px-5 py-4 text-right text-sm font-black uppercase tracking-widest text-slate-500">
                                Amount
                              </th>
                            )}
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
                                className="px-5 py-4 font-black text-base"
                                style={{ color: N }}
                              >
                                {item.year || item.label || `Year ${idx + 1}`}
                              </td>
                              <td className="px-5 py-4 text-center">
                                <span
                                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-black"
                                  style={{
                                    background: "rgba(245,158,8,0.12)",
                                    color: G2,
                                  }}
                                >
                                  {item.count ||
                                    item.value ||
                                    item.ipos ||
                                    item.no_of_ipos ||
                                    0}{" "}
                                  IPOs
                                </span>
                              </td>
                              {item.amount !== undefined && (
                                <td className="px-5 py-4 text-right font-bold text-base text-slate-600">
                                  {item.amount}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {subData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={PieChart} label="IPOs by Subscription Rate" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr style={{ background: "#F8FAFC" }}>
                            <th className="px-5 py-4 text-left text-sm font-black uppercase tracking-widest text-slate-500">
                              Category
                            </th>
                            <th className="px-5 py-4 text-right text-sm font-black uppercase tracking-widest text-slate-500">
                              Count / Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {subData.map((item: any, idx: number) => {
                            const colors = [
                              N,
                              G2,
                              "#0369a1",
                              "#15803d",
                              "#7c3aed",
                              "#dc2626",
                            ];
                            return (
                              <tr
                                key={idx}
                                className={
                                  idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                                }
                              >
                                <td className="px-5 py-4 font-semibold text-base text-slate-700">
                                  {item.title ||
                                    item.category ||
                                    item.label ||
                                    `Category ${idx + 1}`}
                                </td>
                                <td className="px-5 py-4 text-right">
                                  <span
                                    className="font-black text-base"
                                    style={{
                                      color: colors[idx % colors.length],
                                    }}
                                  >
                                    {item.subscription ||
                                      item.count ||
                                      item.value ||
                                      "—"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {sizeData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr icon={BarChart3} label="IPOs by Size Category" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr style={{ background: "#F8FAFC" }}>
                            <th className="px-5 py-4 text-left text-sm font-black uppercase tracking-widest text-slate-500">
                              Size Range
                            </th>
                            <th className="px-5 py-4 text-right text-sm font-black uppercase tracking-widest text-slate-500">
                              No. of IPOs
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sizeData.map((item: any, idx: number) => (
                            <tr
                              key={idx}
                              className={
                                idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                              }
                            >
                              <td className="px-5 py-4 font-semibold text-base text-slate-700">
                                {item.title ||
                                  item.label ||
                                  item.category ||
                                  `Range ${idx + 1}`}
                              </td>
                              <td className="px-5 py-4 text-right">
                                <span
                                  className="font-black text-base"
                                  style={{ color: N }}
                                >
                                  {item.size || item.count || item.value || "—"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {faqsData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <SecHdr
                      icon={MessageSquare}
                      label="Frequently Asked Questions"
                    />
                    <div className="p-2">
                      <Accordion type="single" collapsible className="w-full">
                        {faqsData.map((faq: any, idx: number) => (
                          <AccordionItem
                            key={idx}
                            value={`faq-${idx}`}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <AccordionTrigger
                              className="px-4 py-4 text-left font-black text-sm hover:text-[#f59e08] transition-colors"
                              style={{ color: N }}
                            >
                              {faq.question || faq.q || "Question?"}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-slate-500 text-sm leading-relaxed font-medium">
                              {faq.answer || faq.a || "Answer goes here."}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                )}

                {relatedBankers.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mt-6">
                    <SecHdr icon={Users} label="Top Merchant Bankers" />
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedBankers.map((rb) => (
                        <Link
                          key={rb.id}
                          to={`/merchant-banker/${rb.slug}`}
                          className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-2 shrink-0 flex items-center justify-center overflow-hidden">
                            {rb.logo_url || rb.image ? (
                              <img
                                src={getImageUrl(rb.logo_url || rb.image)}
                                alt={rb.title || rb.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Building2 className="w-6 h-6 text-slate-200" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-base text-[#001529] group-hover:text-primary transition-colors truncate">
                              {rb.title || rb.name}
                            </p>
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              View Profile{" "}
                              <ChevronRight className="inline-block w-4 h-4" />
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-5">
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
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      {(detailBanker.cemail || detailBanker.email) && (
                        <a
                          href={`mailto:${detailBanker.cemail || detailBanker.email}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(0,21,41,0.06)" }}
                          >
                            <Mail className="h-4 w-4" style={{ color: N }} />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Email
                            </p>
                            <p
                              className="text-base font-semibold break-all group-hover:text-[#f59e08] transition-colors"
                              style={{ color: N }}
                            >
                              {detailBanker.cemail || detailBanker.email}
                            </p>
                          </div>
                        </a>
                      )}
                      {(detailBanker.cmobile || detailBanker.phone) && (
                        <a
                          href={`tel:${detailBanker.cmobile || detailBanker.phone}`}
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(245,158,8,0.08)" }}
                          >
                            <Phone className="h-4 w-4" style={{ color: G2 }} />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Phone
                            </p>
                            <p
                              className="text-base font-semibold group-hover:text-[#f59e08] transition-colors"
                              style={{ color: N }}
                            >
                              {detailBanker.cmobile || detailBanker.phone}
                            </p>
                          </div>
                        </a>
                      )}
                      {(detailBanker.caddress || detailBanker.location) && (
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: "rgba(0,21,41,0.06)" }}
                          >
                            <MapPin className="h-4 w-4" style={{ color: N }} />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Address
                            </p>
                            <p className="text-base font-medium text-slate-600 leading-relaxed">
                              {detailBanker.caddress || detailBanker.location}
                            </p>
                          </div>
                        </div>
                      )}
                      {(detailBanker.cweblink || detailBanker.website) && (
                        <a
                          href={webUrl(
                            detailBanker.cweblink || detailBanker.website,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: "rgba(0,21,41,0.06)" }}
                          >
                            <Globe className="h-4 w-4" style={{ color: N }} />
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-0.5">
                              Website
                            </p>
                            <p
                              className="text-base font-semibold group-hover:text-[#f59e08] transition-colors truncate max-w-[160px]"
                              style={{ color: N }}
                            >
                              {detailBanker.cweblink || detailBanker.website}
                            </p>
                          </div>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setConnectBanker(detailBanker)}
                      className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-black text-sm mt-6 transition-all hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${N}, #003380)`,
                        color: "white",
                        boxShadow: "0 4px 16px rgba(0,21,41,0.3)",
                      }}
                    >
                      <Mail className="h-4 w-4" /> Send Enquiry
                    </button>
                  </div>

                  <div className="border-t border-slate-100 p-6">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                      Quick Summary
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          label: "Total IPOs",
                          val:
                            detailBanker.noOfiposofar ||
                            detailBanker.total_ipos,
                        },
                        {
                          label: "Fund Raised",
                          val: formatIndianNumber(
                            detailBanker.totalfundraised ||
                            detailBanker.total_raised,
                          ),
                        },
                        {
                          label: "Avg IPO Size",
                          val: formatIndianNumber(
                            detailBanker.avgiposize || detailBanker.avg_size,
                          ),
                        },
                        {
                          label: "Avg Subscription",
                          val:
                            detailBanker.avgsubscription ||
                            detailBanker.avg_subscription,
                        },
                        {
                          label: "Avg Listing Gain",
                          val:
                            detailBanker.avglisting_gain ||
                            detailBanker.avg_listing_gain,
                        },
                        { label: "NSE Emerge", val: detailBanker.nseemer },
                        { label: "BSE SME", val: detailBanker.bsesme },
                      ]
                        .filter(
                          (s) =>
                            s.val &&
                            String(s.val).trim() &&
                            String(s.val) !== "0",
                        )
                        .map((s, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-semibold text-slate-400">
                              {s.label}
                            </span>
                            <span
                              className="text-sm font-black"
                              style={{ color: N }}
                            >
                              {s.val}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div
                  className="rounded-2xl p-6 relative overflow-hidden"
                  style={{ background: N }}
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{
                      background: G,
                      filter: "blur(30px)",
                      transform: "translate(30%,-30%)",
                    }}
                  />
                  <Award className="h-10 w-10 mb-4" style={{ color: G }} />
                  <h4 className="font-black text-white text-lg mb-2">
                    Planning Your IPO?
                  </h4>
                  <p className="text-white/65 text-sm mb-6 leading-relaxed">
                    Connect with top expert merchant bankers for a seamless IPO
                    journey.
                  </p>
                  <Link
                    to="/ipo-eligibility-check"
                    className="flex items-center justify-center gap-2 w-full h-11 rounded-xl font-black text-sm transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${G}, ${G2})`,
                      color: N,
                    }}
                  >
                    Check Your IPO Eligibility{" "}
                    <ArrowRight className="h-4 w-4" />
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
        title={`${pageTitle} | India IPO — Official Bankers Directory`}
        description={`Complete directory of ${isSME ? "SME" : "Mainboard"} merchant bankers in India with IPO stats, contact details, and performance data.`}
        keywords={`${pageTitle}, expert advisors, IPO merchant bankers, BRLM India, ${isSME ? "BSE SME NSE Emerge" : "NSE BSE mainboard"} IPO lead manager`}
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
            <div className="flex items-center gap-2 text-white/50 text-sm mb-8 flex-wrap justify-start">
              <Link
                to="/"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/90 font-semibold">
                {isSME ? "SME" : "Mainboard"} Merchant Bankers
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl text-left"
            >

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-5 leading-tight">
                {isSME ? "SME" : "Mainboard"}{" "}
                <span style={{ color: G }}>Merchant Bankers</span>
              </h1>
              <p className="text-white/65 max-w-2xl mb-10 text-lg md:text-xl font-medium leading-relaxed">
                {isSME
                  ? "Access a curated network of SEBI-registered Merchant Bankers for SME IPOs on BSE SME and NSE Emerge, backed by expert advisory and execution support."
                  : "India's top expert Merchant Bankers for Mainline IPO advisory and book running."}
              </p>

              <div className="max-w-xl  relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  placeholder="Search by merchant banker name or keywords…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:bg-white/15 focus:border-[#f59e08]/50 transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-start">
                <Link
                  to={
                    isSME
                      ? "/merchant-bankers/list-of-mainboard-merchant-bankers"
                      : "/merchant-bankers/list-of-sme-merchant-bankers"
                  }
                  className="flex items-center gap-2 px-8 h-12 rounded-xl font-black text-base text-white border border-white/25 hover:bg-white/10 transition-all"
                >
                  View {isSME ? "Mainboard" : "SME"} Bankers{" "}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/ipo-eligibility-check"
                  className="flex items-center gap-2 px-8 h-12 rounded-xl font-black text-base transition-all hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${G}, ${G2})`,
                    color: N,
                  }}
                >
                  <Zap className="h-5 w-5" /> Check Your IPO Eligibility
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* <section
          style={{ background: `linear-gradient(135deg, ${N}, #003380)` }}
          className="py-8"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Users,
                  value: "100+",
                  label: isSME ? "SME Bankers" : "Mainboard Bankers",
                },
                { icon: Shield, value: "100%", label: "Official Status" },
                { icon: TrendingUp, value: "25+ Yrs", label: "Track Record" },
                {
                  icon: Award,
                  value: isSME ? "1000+" : "500+",
                  label: isSME ? "SME IPOs" : "Mainboard IPOs",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center py-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                    <s.icon className="h-6 w-6" style={{ color: G }} />
                  </div>
                  <p className="text-2xl font-black text-white mb-0.5">
                    {s.value}
                  </p>
                  <p className="text-sm text-white/55 font-semibold uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1.5 h-10 rounded-full"
                  style={{ background: G }}
                />
                <h2 className="text-3xl font-black" style={{ color: N }}>
                  {pageTitle}
                </h2>
              </div>
              {isSME && (
                <p className="text-slate-600 text-base md:text-[16px] leading-relaxed text-justify">
                  Interested in listing your SME on the stock exchange? This
                  curated list of merchant bankers will assist you. From capital
                  restructuring and fundraising to the promotion of an IPO and a
                  post-issue process of compliance management, these specialists
                  will assist you with each step of your SME IPO journey. Use
                  this list to find the best merchant banker for assessing share
                  value, managing various aspects of an IPO and liaising with
                  regulatory authorities. Additionally, promoters will be able
                  to find the top 10 merchant bankers in India and select the
                  best fit to lead their IPO.
                </p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 h-72 animate-pulse"
                  />
                ))}
              </div>
            ) : bankers.length === 0 ? (
              <div className="bg-white text-center py-24 rounded-2xl border-2 border-dashed border-slate-200">
                <Building2 className="w-14 h-14 mx-auto mb-4 text-slate-200" />
                <h3 className="text-xl font-black mb-2" style={{ color: N }}>
                  No merchant bankers found
                </h3>
                <p className="text-slate-400 font-medium">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bankers.map((banker, i) => (
                    <motion.div
                      key={banker.id}
                      onClick={() =>
                        navigate(`/merchant-banker/${banker.slug}`)
                      }
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i % limit) * 0.05 }}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer group flex flex-col"
                    >
                      <div
                        className="h-1 w-full"
                        style={{
                          background: `linear-gradient(90deg, ${N}, ${G})`,
                        }}
                      />

                      <div className="p-5 flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shrink-0 shadow-sm group-hover:border-[#f59e08]/40 transition-colors overflow-hidden">
                          {banker.image ? (
                            <img
                              src={getImageUrl(banker.image)}
                              alt={banker.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span
                              className="text-2xl font-black"
                              style={{ color: N }}
                            >
                              {banker.title?.[0]}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className="text-lg font-black leading-snug line-clamp-2 transition-colors group-hover:text-[#f59e08]"
                            style={{ color: N }}
                          >
                            {banker.title}
                          </h3>
                          {banker.sub_title && (
                            <span
                              className="inline-block mt-1.5 text-sm font-black px-2 py-0.5 rounded-full uppercase tracking-widest"
                              style={{
                                background: "rgba(245,158,8,0.12)",
                                color: G2,
                              }}
                            >
                              {banker.sub_title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className="grid grid-cols-4 gap-0 mx-5 mb-5 rounded-xl overflow-hidden border border-slate-100"
                        style={{ background: "#F8FAFC" }}
                      >
                        {[
                          {
                            val: banker.noOfiposofar || "0",
                            lbl: "IPOs",
                            c: N,
                          },
                          {
                            val:
                              formatIndianNumber(banker.totalfundraised) ||
                              "₹0",
                            lbl: "Raised",
                            c: G2,
                          },
                          {
                            val: formatIndianNumber(banker.avgiposize) || "NA",
                            lbl: "Avg Sz",
                            c: N,
                          },
                          {
                            val: banker.avgsubscription || "0x",
                            lbl: "Avg Sub",
                            c: G2,
                          },
                        ].map((s, si) => (
                          <div
                            key={si}
                            className="py-4 text-center border-r border-slate-100 last:border-r-0"
                          >
                            <p
                              className="text-base font-black"
                              style={{ color: s.c }}
                            >
                              {s.val}
                            </p>
                            <p className="text-[11px] text-slate-400 uppercase font-black mt-0.5 tracking-widest">
                              {s.lbl}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Compare toggle */}
                      <div className="px-5 pb-1">
                        <button
                          onClick={(e) => toggleCompare(banker, e)}
                          disabled={
                            compareList.length >= 2 &&
                            !compareList.find((b) => b.id === banker.id)
                          }
                          className={`w-full h-10 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all border ${compareList.find((b) => b.id === banker.id)
                            ? "border-amber-400 bg-amber-50 text-amber-700"
                            : "border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            }`}
                        >
                          {compareList.find((b) => b.id === banker.id) ? (
                            <>
                              <Check className="w-4 h-4" /> Selected for Compare
                            </>
                          ) : (
                            <>
                              <GitCompare className="w-4 h-4" /> Add to Compare
                            </>
                          )}
                        </button>
                      </div>

                      <div className="px-5 pb-5 mt-2 flex gap-3">
                        <Link
                          to={`/merchant-banker/${banker.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 h-11 rounded-xl font-black text-sm border transition-all flex items-center justify-center hover:text-white"
                          style={{ borderColor: "rgba(0,21,41,0.2)", color: N }}
                        >
                          View Details
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/merchant-contact?ipo_type=${isSME ? "SME IPO" : "Mainboard IPO"}&banker=${encodeURIComponent(banker.title)}`,
                            );
                          }}
                          className="flex-1 h-11 rounded-xl font-black text-sm transition-all hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${G}, ${G2})`,
                            color: N,
                            boxShadow: "0 4px 12px rgba(245,158,8,0.3)",
                          }}
                        >
                          Connect
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={loadingMore}
                      className="inline-flex items-center gap-2 px-10 h-14 rounded-xl font-black text-base text-white transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(135deg, ${N}, #003380)`,
                        boxShadow: "0 8px 32px rgba(0,21,41,0.25)",
                      }}
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />{" "}
                          Loading…
                        </>
                      ) : (
                        <>
                          Load More Bankers <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section
          className="py-20 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${N}, #002147, #003380)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
            style={{
              background: G,
              filter: "blur(80px)",
              transform: "translate(20%,-30%)",
            }}
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to <span style={{ color: G }}>Go Public?</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto font-medium mb-10 text-base leading-relaxed">
              Our team of expert advisors and merchant bankers will guide you
              through every step of your IPO journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 h-14 rounded-xl font-black text-base transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${G}, ${G2})`,
                  color: N,
                  boxShadow: "0 8px 32px rgba(245,158,8,0.35)",
                }}
              >
                Get Free Consultation <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/ipo-eligibility-check"
                className="inline-flex items-center gap-2 px-8 h-14 rounded-xl font-black text-base text-white border border-white/25 hover:bg-white/10 transition-all"
              >
                Check Eligibility
              </Link>
            </div>
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

export const SMEMerchantBankers = () => <MerchantBankersPage type="SME" />;
export const MainboardMerchantBankers = () => (
  <MerchantBankersPage type="Mainboard" />
);

const MerchantBankersRoute = () => {
  const { category } = useParams<{ category: string }>();
  const normalizedCategory =
    category?.toLowerCase() === "mainboard" ? "Mainboard" : "SME";
  return <MerchantBankersPage type={normalizedCategory} />;
};
export default MerchantBankersRoute;
