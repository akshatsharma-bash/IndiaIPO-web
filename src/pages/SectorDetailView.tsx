import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ipoListApi, sectorApi } from "@/services/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Loader2, ArrowLeft, Search, TrendingUp, Calendar, Landmark, Percent, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const SectorDetailView = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matchedSector, setMatchedSector] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ highest: 0, lowest: 0, median: 0, count: 0 });

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[&,]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const loadSectorAndIpos = async () => {
      setLoading(true);
      try {
        // 1. Fetch all sectors to find the matching one by ID or slugified name
        const sectors = await sectorApi.getAll();
        const found = sectors.find(
          (s: any) => String(s.id) === sectorId || (s.name && slugify(s.name) === sectorId)
        );

        if (!found) {
          setLoading(false);
          return;
        }

        setMatchedSector(found);

        // 2. Fetch all IPOs for this sector
        const res = await ipoListApi.getAll({
          by_sector: "true",
          sector_name: found.name,
          limit: "100", // Load all to show comprehensive list
        });

        setItems(res.data || []);

        // Calculate size stats
        const sizes = (res.data || [])
          .map((item: any) => {
            const val = item.issue_size;
            if (typeof val === "string") return parseFloat(val.replace(/[^0-9.]/g, ""));
            return typeof val === "number" ? val : 0;
          })
          .filter((v: number) => !isNaN(v) && v > 0);

        if (sizes.length > 0) {
          const sorted = [...sizes].sort((a, b) => a - b);
          const highest = sorted[sorted.length - 1];
          const lowest = sorted[0];
          const mid = Math.floor(sorted.length / 2);
          const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
          setStats({ highest, lowest, median, count: res.data.length });
        } else {
          setStats({ highest: 0, lowest: 0, median: 0, count: res.data.length });
        }

      } catch (err) {
        console.error("Failed to load sector IPO details", err);
      } finally {
        setLoading(false);
      }
    };

    loadSectorAndIpos();
  }, [sectorId]);

  const filteredItems = items.filter(
    (item) =>
      item.issuer_company?.toLowerCase().includes(search.toLowerCase()) ||
      item.issue_category?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateStr: any) => {
    if (!dateStr || dateStr === "0") return "TBA";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "TBA" : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#3B71CA] mx-auto mb-4" />
            <p className="text-slate-500 font-semibold">Loading sector data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!matchedSector) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sector Not Found</h2>
          <p className="text-slate-500 mb-6">The requested industry sector could not be located.</p>
          <Link to="/all-sectors" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#001529] text-white rounded-xl text-sm font-semibold hover:bg-[#002147] transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to All Sectors
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEOHead
        title={`${matchedSector.name} Sector IPOs List in India | India IPO`}
        description={`Explore all Initial Public Offerings (IPOs) in the ${matchedSector.name} sector. View comprehensive list, size, P/E ratio, and expert insights.`}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-[#001529] py-12 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#003380,transparent)] opacity-40 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate("/all-sectors")}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sectors
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>

              <h1 className="text-3xl md:text-5xl font-black capitalize tracking-tight">
                {matchedSector.name.toLowerCase()} <span className="text-[#f59e08]">IPOs</span>
              </h1>
              <p className="text-white/60 mt-3 font-medium max-w-xl text-sm">
                Comprehensive performance and metrics tracker of public listings in the {matchedSector.name.toLowerCase()} industry.
              </p>
            </div>

            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                placeholder="Search company in this sector…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:bg-white/15 focus:border-[#f59e08]/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Stats Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
                <h3 className="text-slate-800 font-black text-xs uppercase tracking-widest mb-6">Sector Summary</h3>
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Total IPOs</span>
                    <span className="text-slate-800 font-bold text-base">{stats.count}</span>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Highest Size</span>
                    <span className="text-slate-800 font-bold text-base">
                      {stats.highest > 0 ? `₹${stats.highest.toFixed(2)} Cr` : "TBA"}
                    </span>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Median Size</span>
                    <span className="text-slate-800 font-bold text-base">
                      {stats.median > 0 ? `₹${stats.median.toFixed(2)} Cr` : "TBA"}
                    </span>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Lowest Size</span>
                    <span className="text-slate-800 font-bold text-base">
                      {stats.lowest > 0 ? `₹${stats.lowest.toFixed(2)} Cr` : "TBA"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* IPOs Table Area */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">{filteredItems.length} Companies Listed</span>
                </div>

                {filteredItems.length === 0 ? (
                  <div className="py-20 text-center">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-semibold">No companies found in this sector matching your query.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#001529] text-white">
                          <th className="py-4 px-5 font-semibold text-xs uppercase tracking-widest whitespace-nowrap">Company Name</th>
                          <th className="py-4 px-5 font-semibold text-xs uppercase tracking-widest whitespace-nowrap text-center">Type</th>
                          <th className="py-4 px-5 font-semibold text-xs uppercase tracking-widest whitespace-nowrap text-right">IPO Size (Cr)</th>
                          <th className="py-4 px-5 font-semibold text-xs uppercase tracking-widest whitespace-nowrap text-center">P/E Ratio</th>
                          <th className="py-4 px-5 font-semibold text-xs uppercase tracking-widest whitespace-nowrap text-center">Issue Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredItems.map((item, idx) => (
                          <tr
                            key={item.id}
                            onClick={() => navigate(`/all-ipos/${item.id}`, { state: { type: "sector" } })}
                            className={cn(
                              "transition-all cursor-pointer hover:bg-blue-50/40 group",
                              idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                            )}
                          >
                            <td className="py-5 px-5">
                              <span className="text-[#001529] font-black text-sm group-hover:text-blue-700 transition-colors">
                                {item.issuer_company}
                              </span>
                            </td>
                            <td className="py-5 px-5 text-center">
                              <span className={cn(
                                "inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                                item.issue_category?.toLowerCase() === "sme"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              )}>
                                {item.issue_category || "SME"}
                              </span>
                            </td>
                            <td className="py-5 px-5 text-right text-slate-700 font-bold text-sm">
                              {item.issue_size && item.issue_size !== "0" && item.issue_size !== 0 ? `₹${item.issue_size} Cr` : "TBA"}
                            </td>
                            <td className="py-5 px-5 text-center text-slate-700 font-semibold text-sm">
                              {item.ipo_pe_ratio && item.ipo_pe_ratio !== "0" && item.ipo_pe_ratio !== 0 ? item.ipo_pe_ratio : "TBA"}
                            </td>
                            <td className="py-5 px-5 text-center text-slate-500 font-medium text-sm">
                              {formatDate(item.open_date)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SectorDetailView;
