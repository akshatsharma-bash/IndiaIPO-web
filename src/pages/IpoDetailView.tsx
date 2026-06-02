import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ipoListApi, sectorIpoApi } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Loader2, ArrowLeft, Calendar, Banknote, ShieldAlert, BarChart3, TrendingUp, Percent, LayoutGrid, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const IpoDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const typeParam = location.state?.type; // Read from Router state instead of URL!
  const [loading, setLoading] = useState(true);
  const [ipoData, setIpoData] = useState<any>(null);
  const [source, setSource] = useState<"lists" | "sectors" | null>(null);

  useEffect(() => {
    const fetchIpoDetails = async () => {
      if (!id) return;
      setLoading(true);
      
      try {
        if (typeParam === "sector") {
          // If explicitly marked as sector, try to fetch from sectorIpoApi first to avoid ID collision!
          try {
            const res = await sectorIpoApi.getById(id);
            if (res && res.id) {
              const mappedData = {
                ...res,
                issuer_company: res.name || res.issuer_company,
                issue_category: res.type || res.issue_category,
                issue_size: res.iposize || res.issue_size,
                ipo_pe_ratio: res.pe_ratio || res.ipo_pe_ratio,
                open_date: res.ipo_year || res.open_date,
              };
              setIpoData(mappedData);
              setSource("sectors");
              setLoading(false);
              return;
            }
          } catch (sectorsErr) {
            console.log("Not found in sector_by_ipo, trying primary lists...");
          }

          try {
            const res = await ipoListApi.getById(id);
            if (res && res.id) {
              setIpoData(res);
              setSource("lists");
              setLoading(false);
              return;
            }
          } catch (listsErr) {
            console.error("Not found in primary lists either.");
          }
        } else {
          // Standard flow: Try primary ipo_lists first, fallback to sectors
          try {
            const res = await ipoListApi.getById(id);
            if (res && res.id) {
              setIpoData(res);
              setSource("lists");
              setLoading(false);
              return;
            }
          } catch (listsErr) {
            console.log("Not found in primary ipo_lists table, trying sector_by_ipo...");
          }

          try {
            const res = await sectorIpoApi.getById(id);
            if (res && res.id) {
              const mappedData = {
                ...res,
                issuer_company: res.name || res.issuer_company,
                issue_category: res.type || res.issue_category,
                issue_size: res.iposize || res.issue_size,
                ipo_pe_ratio: res.pe_ratio || res.ipo_pe_ratio,
                open_date: res.ipo_year || res.open_date,
              };
              setIpoData(mappedData);
              setSource("sectors");
              setLoading(false);
              return;
            }
          } catch (sectorsErr) {
            console.error("Not found in sector_by_ipo either.");
          }
        }

        // If both failed, set null
        setIpoData(null);
      } catch (err) {
        console.error("Failed to load IPO details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIpoDetails();
  }, [id, typeParam]);

  const formatDate = (dateStr: any) => {
    if (!dateStr || dateStr === "0" || dateStr === 0) return "TBA";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "TBA" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  };

  const getLatestGmpValue = (gmp: any) => {
    if (!gmp || gmp === "0" || gmp === "—") return "TBA";
    return gmp.toString().startsWith("₹") ? gmp : `₹${gmp}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#3B71CA] mx-auto mb-4" />
            <p className="text-slate-500 font-semibold">Loading IPO details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!ipoData) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">IPO Details Not Found</h2>
            <p className="text-slate-500 mb-8">The system could not retrieve listing data for the requested company ID.</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#001529] text-white rounded-xl text-sm font-semibold hover:bg-[#002147] transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title={`${ipoData.issuer_company} IPO Details, Size, PE Ratio, GMP | India IPO`}
        description={`Comprehensive details of ${ipoData.issuer_company} IPO. Check issue size, price band, lot size, P/E ratio, GMP trends, and dates.`}
      />
      <Header />

      {/* Header Banner */}
      <section className="bg-[#001529] py-14 relative overflow-hidden text-white border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#0052a3,transparent)] opacity-40 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 text-white border border-white/20"
                )}>
                  {ipoData.exchange || "BSE / NSE"}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                  ipoData.issue_category?.toLowerCase() === "sme"
                    ? "bg-amber-500/20 text-[#f59e08] border border-[#f59e08]/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-400/30"
                )}>
                  {ipoData.issue_category || "SME IPO"}
                </span>
                {ipoData.sector_name && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-300 border border-blue-300/10">
                    {ipoData.sector_name}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {ipoData.issuer_company}
              </h1>
              <p className="text-white/60 mt-3 font-medium text-sm max-w-xl">
                Get the latest financial performance metrics, timelines, GMP premium trends, and comprehensive details.
              </p>
            </div>
            
            {/* GMP Card */}
            {ipoData.gmp && ipoData.gmp !== "0" && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:w-64 shrink-0 text-center backdrop-blur-md">
                <p className="text-white/40 text-[11px] font-black uppercase tracking-widest mb-1">Expected GMP Premium</p>
                <div className="text-3xl font-black text-emerald-400 animate-pulse">
                  {getLatestGmpValue(ipoData.gmp)}
                </div>
                <p className="text-white/30 text-[10px] font-semibold mt-2">Subject to market conditions</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Details Section */}
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Main Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Issue Size</p>
                <p className="text-slate-800 text-xl font-black">
                  {ipoData.issue_size && ipoData.issue_size !== "0" && ipoData.issue_size !== 0 ? `₹${ipoData.issue_size} Cr` : "TBA"}
                </p>
                <p className="text-slate-400 text-[11px] font-medium mt-1">Aggregate fund raising</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Percent className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">IPO Valuation P/E</p>
                <p className="text-slate-800 text-xl font-black">
                  {ipoData.ipo_pe_ratio && ipoData.ipo_pe_ratio !== "0" && ipoData.ipo_pe_ratio !== 0 ? `${ipoData.ipo_pe_ratio}x` : "TBA"}
                </p>
                <p className="text-slate-400 text-[11px] font-medium mt-1">Price-to-earnings ratio</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Issue Open Date</p>
                <p className="text-slate-800 text-xl font-black">
                  {formatDate(ipoData.open_date)}
                </p>
                <p className="text-slate-400 text-[11px] font-medium mt-1">Listing schedule timeline</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Details Sheet */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-slate-800 font-bold text-[15px]">Detailed IPO Parameters</h3>
                </div>
                
                <div className="divide-y divide-slate-100 px-6 py-2">
                  <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-500 text-sm font-semibold">Price Band</span>
                    <span className="text-slate-800 font-bold text-sm">
                      {ipoData.issue_lowest_price && ipoData.issue_lowest_price !== "0" && ipoData.issue_lowest_price !== 0 
                        ? `₹${ipoData.issue_lowest_price} - ₹${ipoData.issue_highest_price}` 
                        : (ipoData.issue_highest_price && ipoData.issue_highest_price !== "0" && ipoData.issue_highest_price !== 0 
                          ? `₹${ipoData.issue_highest_price}` 
                          : "TBA")}
                    </span>
                  </div>

                  <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-slate-500 text-sm font-semibold">Minimum Lot Size</span>
                    <span className="text-slate-800 font-bold text-sm">
                      {ipoData.lot_size && ipoData.lot_size !== "0" && ipoData.lot_size !== 0 ? `${ipoData.lot_size} Shares` : "TBA"}
                    </span>
                  </div>

                  {ipoData.close_date && (
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 text-sm font-semibold">Issue Close Date</span>
                      <span className="text-slate-800 font-bold text-sm">{formatDate(ipoData.close_date)}</span>
                    </div>
                  )}

                  {ipoData.listing_date && (
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 text-sm font-semibold">Proposed Listing Date</span>
                      <span className="text-slate-800 font-bold text-sm">{formatDate(ipoData.listing_date)}</span>
                    </div>
                  )}

                  {ipoData.merchant_bankers && (
                    <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-slate-500 text-sm font-semibold">Merchant Banker(s)</span>
                      <span className="text-slate-800 font-bold text-sm text-right max-w-xs">{ipoData.merchant_bankers}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Info Sidebar */}
            <div className="space-y-6">
              
              {/* Blog review link */}
              {ipoData.blog_slug && (
                <div className="bg-gradient-to-br from-blue-600 to-[#001529] text-white rounded-3xl p-6 shadow-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/10 transition-all duration-300" />
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold mb-2">Read Complete Expert Analysis</h4>
                    <p className="text-white/70 text-xs mb-6 font-medium">Check detailed review, subscription status, GMP live updates, and listing forecasts.</p>
                    <button
                      onClick={() => navigate(`/ipo-blogs/${ipoData.blog_slug}`)}
                      className="inline-flex items-center justify-center w-full py-3 bg-amber-500 text-[#001529] font-black rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      View IPO Blog Review <TrendingUp className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Status Alert Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold text-sm mb-1">Live Tracking</h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">This record is automatically synchronized with primary markets. GMP updates are crowdsourced and are for informational purpose only.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IpoDetailView;
