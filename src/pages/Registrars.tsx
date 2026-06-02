import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, ArrowRight, Search, Activity, Users, Globe, ChevronLeft, ChevronRight, Shield, Home, CheckCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Registrar {
  id: number; name: string; image: string; slug: string;
  sme_ipo: string; mainboard_ipo: string; location: string;
  dic: string; registrar_year: string; latest_sme: string;
  latest_mainbord: string; status: string;
}

const N = "#001529", G = "#f59e08", G2 = "#d97706";

const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return (path.startsWith("/") ? "" : "/") + path;
};

const Registrars = () => {
  const navigate = useNavigate();
  const [registrars, setRegistrars] = useState<Registrar[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [bannerVideo, setBannerVideo] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`/api/banners?page=${encodeURIComponent(pathname)}`);
        if (res.ok) {
          const data = await res.json();
          const videoBanner = data.find((b: any) => b.video_url);
          if (videoBanner) setBannerVideo(videoBanner.video_url);
        }
      } catch (err) { console.error(err); }
    };
    fetchBanners();
  }, [pathname]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/registrars?page=${page}&limit=9`);
        if (res.ok) {
          const body = await res.json();
          setRegistrars(body.data || []);
          setTotalPages(body.pagination?.totalPages || 1);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
    window.scrollTo(0, 0);
  }, [page]);

  const filtered = registrars.filter(r =>
    (r.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      <SEOHead
        title="List of IPO Registrars in India | India IPO — Official RTA Directory"
        description="Explore the comprehensive list of official IPO Registrars in India. Check their track record, serviced IPOs, Mainboard & SME history, and contact details."
        keywords="IPO registrars India, official RTA, registrar and transfer agent, SME IPO registrar, mainboard IPO registrar list"
      />
      <Header />
      <main>

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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5"
              style={{ background: G, filter: "blur(100px)", transform: "translate(25%,-25%)" }} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 z-1"
            style={{ background: `linear-gradient(90deg, ${N}, ${G}, ${N})` }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-8 flex-wrap justify-center">
              <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/90 font-semibold">IPO Registrars</span>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-black uppercase tracking-widest"
                style={{ background: "rgba(245,158,8,0.2)", color: G, border: "1px solid rgba(245,158,8,0.35)" }}>
                <Activity className="h-3.5 w-3.5" /> Trusted Intermediaries
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
                List Of <span style={{ color: G }}> IPO Registrars</span>
              </h1>
              <p className="text-white/65 max-w-2xl mx-auto mb-8 text-base md:text-lg font-medium leading-relaxed">

                Explore SEBI-registered IPO registrars managing share allotment, refunds and investor registry services across Mainboard and SME issues.

              </p>


              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  placeholder="Search by Registrar Name or Location…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm font-medium focus:outline-none focus:bg-white/15 focus:border-[#f59e08]/50 transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>


        <section style={{ background: `linear-gradient(135deg, ${N}, #003380)` }} className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, value: "100%", label: "Official RTAs" },
                { icon: Building2, value: "20+", label: "Active Registrars" },
                { icon: Activity, value: "1000+", label: "IPOs Processed" },
                { icon: Globe, value: "Pan-India", label: "Coverage" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center py-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                    <s.icon className="h-5 w-5" style={{ color: G }} />
                  </div>
                  <p className="text-xl font-black text-white mb-0.5">{s.value}</p>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 rounded-full" style={{ background: G }} />
              <h2 className="text-2xl font-black" style={{ color: N }}>
                List of IPO Registrars
                <span className="text-slate-400 text-base font-semibold ml-2">({registrars.length} listed)</span>
              </h2>
            </div>

            {loading ? (
              <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[13px] font-black uppercase tracking-wider text-slate-500">
                        <th className="px-6 py-4">Registrar & Logo</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4 text-center">Established</th>
                        <th className="px-6 py-4 text-center">Mainboard IPOs</th>
                        <th className="px-6 py-4 text-center">SME IPOs</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(6)].map((_, i) => (
                        <tr key={i} className="border-b border-slate-100 animate-pulse">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-slate-200 shrink-0" />
                              <div className="space-y-1.5">
                                <div className="h-4 bg-slate-200 rounded w-40" />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-slate-200 rounded w-24" />
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="h-5 bg-slate-200 rounded-full w-14 mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="h-6 bg-slate-200 rounded w-8 mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <div className="h-6 bg-slate-200 rounded w-8 mx-auto" />
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div className="h-9 bg-slate-200 rounded-lg w-28 ml-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <Building2 className="h-14 w-14 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-black mb-2" style={{ color: N }}>No registrars found</h3>
                <p className="text-slate-400 font-medium">Try adjusting your search criteria.</p>
                <button onClick={() => setSearch("")} className="mt-4 text-sm font-black" style={{ color: G }}>Clear Search</button>
              </div>
            ) : (
              <div className="overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-[#001529]/5 text-xs md:text-sm font-black uppercase tracking-wider" style={{ color: N }}>
                        <th className="px-6 py-4">Registrar & Logo</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4 text-center">Established</th>
                        <th className="px-6 py-4 text-center">Mainboard IPOs</th>
                        <th className="px-6 py-4 text-center">SME IPOs</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filtered.map((r, idx) => (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.04 }}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                          onClick={() => navigate(`/ipo-registrar-list/${r.slug}`)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-lg border border-slate-200 bg-white p-1.5 flex items-center justify-center shadow-sm group-hover:border-[#f59e08]/40 transition-colors overflow-hidden shrink-0">
                                {r.image ? (
                                  <img src={getImageUrl(r.image)} alt={r.name} className="w-full h-full object-contain" />
                                ) : (
                                  <Building2 className="h-7 w-7 text-slate-300" />
                                )}
                              </div>
                              <div>
                                <span className="font-black text-sm md:text-base lg:text-lg group-hover:text-[#f59e08] transition-colors" style={{ color: N }}>
                                  {r.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5 text-slate-700 text-xs md:text-sm lg:text-base font-semibold">
                              <MapPin className="h-4 w-4 text-[#f59e08]" />
                              {r.location || "Head Office, India"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            {r.registrar_year ? (
                              <span className="inline-flex items-center gap-1 text-[11px] md:text-xs lg:text-sm font-black px-3 py-1.5 rounded-full"
                                style={{ background: "rgba(0,21,41,0.06)", color: N }}>
                                <Calendar className="h-3.5 w-3.5" /> {r.registrar_year}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-sm font-medium">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center justify-center font-black text-sm md:text-base lg:text-lg px-3.5 py-1.5 rounded-lg bg-slate-100/70" style={{ color: N }}>
                              {r.mainboard_ipo || "0"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center whitespace-nowrap">
                            <span className="inline-flex items-center justify-center font-black text-sm md:text-base lg:text-lg px-3.5 py-1.5 rounded-lg" style={{ background: "rgba(245,158,8,0.1)", color: G2 }}>
                              {r.sme_ipo || "0"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right whitespace-nowrap">
                            <div
                              className="inline-flex items-center gap-1.5 px-4 h-10 rounded-lg font-black text-xs md:text-sm transition-all group-hover:scale-105"
                              style={{ background: `linear-gradient(135deg, ${N}, #003380)`, color: "white", boxShadow: "0 2px 8px rgba(0,21,41,0.15)" }}>
                              View Details <ArrowRight className="h-4 w-4" />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="flex items-center gap-1 px-5 h-11 rounded-xl font-black text-sm text-white transition-all disabled:opacity-40"
                  style={{ background: N }}>
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className="w-11 h-11 rounded-xl font-black text-sm transition-all"
                    style={page === i + 1
                      ? { background: G, color: N, boxShadow: "0 4px 12px rgba(245,158,8,0.35)" }
                      : { background: "#f1f5f9", color: "#475569" }}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="flex items-center gap-1 px-5 h-11 rounded-xl font-black text-sm text-white transition-all disabled:opacity-40"
                  style={{ background: N }}>
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </section>


        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest"
                  style={{ background: "rgba(245,158,8,0.12)", color: G2, border: "1px solid rgba(245,158,8,0.25)" }}>
                  <Activity className="h-3.5 w-3.5" /> Role of a Registrar
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight" style={{ color: N }}>
                  Role of a Registrar in <span style={{ color: G }}>IPO Allotment</span>
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: Users, title: "Share Processing", color: N,
                      desc: "Registrars manage IPO applications, validate bids, and reconcile investor data across retail, HNI, and institutional categories."
                    },
                    {
                      icon: Activity, title: "Basis of Allotment", color: G2,
                      desc: "They finalise the allotment in coordination with stock exchanges and SEBI, ensuring fair and compliant distribution."
                    },
                    {
                      icon: Globe, title: "Fund Blocking & Refund Handling", color: N,
                      desc: "During the IPO process, they manage ASBA/UPI fund blocking and ensure timely refunds or mandate revocations for unsuccessful applicants."
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                        style={{ background: i === 1 ? "rgba(245,158,8,0.1)" : "rgba(0,21,41,0.06)" }}>
                        <item.icon className="h-7 w-7" style={{ color: item.color }} />
                      </div>
                      <div>
                        <h4 className="font-black text-lg mb-1" style={{ color: N }}>{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                    alt="Market Analysis" className="w-full h-72 object-cover" />
                  <div className="p-8" style={{ background: N }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6" style={{ color: G }} />
                      </div>
                      <div>
                        <p className="font-black text-white text-base">Official Registrar Support</p>
                        <p className="text-white/55 text-xs font-medium">Connected with all major RTA agents in India</p>
                      </div>
                    </div>
                    <Link to="/contact"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-sm mt-4 transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${G}, ${G2})`, color: N }}>
                      Get Registrar Guidance <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


        <section className="py-16 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${N}, #002147, #003380)` }}>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-black text-white mb-3">Need Help Choosing a <span style={{ color: G }}>Registrar?</span></h2>
            <p className="text-white/60 max-w-lg mx-auto font-medium mb-8">Our experts help you select the right registrar for your IPO and ensure smooth allotment processes.</p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 h-14 rounded-xl font-black text-base transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${G}, ${G2})`, color: N, boxShadow: "0 8px 32px rgba(245,158,8,0.35)" }}>
              Contact Our Experts <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Registrars;
