import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle, ChevronRight, FileSearch, LineChart, Target, ShieldCheck, Landmark } from "lucide-react";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/lib/utils";

const PreIPOProcess = () => {
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="Pre-IPO Process Guidance | Complete Readiness for Unlisted Companies"
        description="Comprehensive Pre-IPO consulting. Discover how to prepare your company financially, legally, and strategically 1-2 years before an Initial Public Offering in India."
        keywords="Pre-IPO preparation, IPO readiness, Corporate governance, Private Equity before IPO, HNI funding, Financial Restructuring, SME IPO preparation"
      />
      <Header />

      <main className="flex-grow">

        <section
          className="pt-20 pb-28 px-4 relative overflow-hidden bg-[#001529]"
        >

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

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
              style={{ background: '#f59e08', filter: 'blur(100px)', opacity: 0.05, transform: 'translate(25%,-25%)' }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full"
              style={{ background: '#3b82f6', filter: 'blur(80px)', opacity: 0.05, transform: 'translate(-20%,20%)' }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(35 95% 52%), hsl(45 93% 65%))',
                  color: 'white'
                }}
              >
                <FileSearch className="w-12 h-12 md:w-16 md:h-16" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-white/70 mb-4 font-medium">
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white">Pre-IPO Guidance</span>
                </div>


                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Pre-IPO Guidance for a Successful Public Listing
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
                  Our Pre-IPO guidance helps companies navigate the 18–24 month journey to listing through structured financial preparation, governance alignment, and strategic positioning for public markets.
                </p>
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-background relative -mt-10 rounded-t-[40px] z-20">
          <div className="container mx-auto px-4 space-y-16">


            <div className="prose prose-lg prose-headings:text-foreground prose-p:text-muted-foreground max-w-none">

              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                Pre IPO Process Guidance - Your Complete Roadmap to a Successful IPO
              </h2>
              <p className="leading-relaxed">
                Going public is one of the most defining moments in a company's history. It opens the doors to large-scale capital infusion, enhanced market credibility and long-term strategic growth. However, the path to a successful IPO does not begin on the day of filing; it begins well before, with thorough and structured preparation.
              </p>
              <p className="leading-relaxed mt-4">
                The pre-IPO process is not merely about assembling documents. It requires the company to be ready from within, legally, financially, operationally and strategically to meet the rigorous standards of India's capital markets. At India IPO, we offer specialised Pre-IPO Process Guidance to help you transition from a private enterprise to a publicly listed company in a structured, compliant, and well-timed manner.
              </p>
            </div>


            <div className="space-y-12">
              <div className="py-4">
                <h2 className="text-3xl font-bold mb-3 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                  <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                  Why Pre-IPO Guidance Is Essential
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Many companies approach the IPO process without a clear understanding of what SEBI, stock exchanges and investors actually expect. This lack of preparation often leads to avoidable and costly consequences:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <CheckCircle className="w-6 h-6 shrink-0 mt-1 text-primary" />
                    <div>
                      <h4 className="font-bold text-lg">Regulatory Delays</h4>
                      <p className="text-muted-foreground">Incomplete or non-compliant filings invite queries from SEBI or stock exchanges, potentially pushing your IPO timeline back by several months</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="w-6 h-6 shrink-0 mt-1 text-primary" />
                    <div>
                      <h4 className="font-bold text-lg">Higher Costs</h4>
                      <p className="text-muted-foreground">Last-minute document rework, emergency audits and unplanned legal revisions add significant expense to the process</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="w-6 h-6 shrink-0 mt-1 text-primary" />
                    <div>
                      <h4 className="font-bold text-lg">Missed Market Windows</h4>
                      <p className="text-muted-foreground">Poor readiness can cause a company to miss the optimal market cycle, resulting in lower investor interest and subdued valuations</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle className="w-6 h-6 shrink-0 mt-1 text-primary" />
                    <div>
                      <h4 className="font-bold text-lg">Investor Scepticism</h4>
                      <p className="text-muted-foreground">Weak corporate governance, inconsistent financial records, or a lack of disclosure transparency can undermine investor confidence before the IPO even opens</p>
                    </div>
                  </li>
                </ul>
                <p className="text-black/90 leading-relaxed mt-8 font-medium italic">
                  With structured pre-IPO guidance, these risks are identified and addressed well in advance, allowing your company to enter the market prepared, credible and strategically positioned.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-3 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                  <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                  Our Pre-IPO Process Guidance Services
                </h2>
                <p className=" text-muted-foreground mb-10 ">
                  We provide end-to-end pre-IPO support across all critical dimensions of IPO preparation.
                </p>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>IPO Readiness Assessment</h3>
                  <p className="text-muted-foreground mb-6">
                    We begin with a comprehensive evaluation of your company's current readiness for a public offering. This includes:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Reviewing financial performance, revenue trends and profitability metrics</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Assessing the quality of corporate governance practices and internal controls</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Identifying gaps in SEBI compliance and stock exchange listing requirements</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Evaluating market positioning, business scalability and investor appeal</span>
                    </li>
                  </ul>
                  <p className="mt-8 text-sm font-bold text-primary uppercase tracking-wider">
                    This assessment serves as the foundation for your IPO preparation strategy.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>IPO Structuring and Strategic Planning</h3>
                  <p className="text-muted-foreground mb-6">
                    No two companies are alike and therefore no two IPO strategies should be identical. We work closely with your leadership team to customise an approach that aligns with your business objectives:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground"><strong>IPO Route:</strong> Determining whether a Mainboard IPO, SME IPO, or another listing platform is most appropriate for your company's size and stage</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground"><strong>Timing:</strong> Identifying the right market cycle to maximise investor interest and achieve the best possible valuation</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground"><strong>Issue Size and Valuation:</strong> Striking the right balance between the quantum of funds raised and the promoter's shareholding post-listing</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground"><strong>Shareholding Structure:</strong> Ensuring that promoter, investor and public shareholding proportions are aligned with SEBI norms</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Financial Preparation and Compliance Alignment</h3>
                  <p className="text-muted-foreground mb-6">
                    Investors and regulators demand complete financial transparency. We guide your finance team through:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Restating financial accounts in accordance with SEBI requirements and Ind-AS (Indian Accounting Standards) norms</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Conducting and coordinating statutory and internal audits</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Resolving historical compliance issues that could attract regulatory scrutiny</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Establishing systems for quarterly financial disclosures and investor reporting post-listing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Legal and Regulatory Advisory</h3>
                  <p className="text-muted-foreground mb-6">
                    The IPO process must adhere strictly to SEBI regulations, the Companies Act, 2013 and stock exchange listing requirements. We ensure that:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Legal due diligence is conducted thoroughly, without gaps or oversights</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">The Draft Red Herring Prospectus (DRHP) is prepared in full compliance with SEBI's Issue of Capital and Disclosure Requirements (ICDR) Regulations</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">All necessary board and shareholder approvals are duly obtained</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Any required corporate restructuring is completed before filing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Documentation and DRHP Preparation</h3>
                  <p className="text-muted-foreground mb-6">
                    The DRHP is your company's first formal introduction to investors and regulators. A well-crafted DRHP can make a meaningful difference to how your offering is perceived. We assist in:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Drafting a clear and compelling company profile, business model narrative and risk factor disclosures</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Ensuring all information is accurate, complete and presented in an investor-friendly manner</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Coordinating with merchant bankers and legal advisors to finalise offer documents within prescribed timelines</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Branding, Storytelling and Investor Positioning</h3>
                  <p className="text-muted-foreground mb-6">
                    Numbers alone do not drive IPO success; how a company presents its story matters equally. We help you build a compelling investment narrative that communicates:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-6">
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Your company's growth journey, market opportunity and future roadmap</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Competitive strengths and sustainable business advantages</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Corporate governance credentials and, where applicable, ESG (Environmental, Social and Governance) commitments</span>
                    </li>
                  </ul>
                  <p className="mt-8 text-muted-foreground leading-relaxed font-medium italic">
                    A well-positioned IPO story builds investor confidence and supports stronger subscription outcomes.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Coordination with IPO Ecosystem Stakeholders</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    An IPO involves multiple parties: merchant bankers, legal advisors, auditors, registrars, PR agencies and stock exchanges all working simultaneously. We serve as your central coordination point, managing timelines, aligning stakeholders and ensuring nothing falls through the gaps.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6" style={{ color: 'hsl(220 72% 25%)' }}>Pre-IPO Marketing and Investor Outreach</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Before the IPO opens for subscription, we collaborate with merchant bankers to conduct roadshows, investor presentations, and analyst briefings. These activities build awareness, generate institutional and retail interest and lay the groundwork for a well-subscribed offering.
                  </p>
                </div>
              </div>
            </div>


            <div className="py-6">
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                Our Step-by-Step Pre-IPO Roadmap
              </h2>
              <p className="text-muted-foreground mb-12 ">
                We follow a structured, phased methodology to ensure complete IPO preparedness:
              </p>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative">

                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

                {[
                  { step: 1, title: "Eligibility Study and Initial Consultation", desc: "Understanding your business goals, fundraising objectives and current readiness" },
                  { step: 2, title: "Strategic Structuring", desc: "Finalising the IPO route, issue size, valuation approach and fundraising targets" },
                  { step: 3, title: "Compliance and Governance Audit", desc: "Identifying and closing regulatory gaps before SEBI scrutiny" },
                  { step: 4, title: "Financial and Legal Preparation", desc: "Ensuring all financial records, legal filings and corporate documents meet public company standards" },
                  { step: 5, title: "DRHP Drafting and Filing", desc: "Preparing a clear, compliant and compelling prospectus for SEBI submission" },
                  { step: 6, title: "SEBI and Exchange Approval Coordination", desc: "Managing regulatory queries and facilitating timely approvals" },
                  { step: 7, title: "Pre-IPO Marketing", desc: "Engaging institutional investors, analysts and retail audiences to build demand" },
                  { step: 8, title: "IPO Launch Support", desc: "Overseeing the subscription period through to successful listing on the stock exchange" }
                ].map((item, idx) => (
                  <div key={idx} className={`relative flex items-start gap-6 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12 '}`}>
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-bold text-xl shadow-lg z-10">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-foreground">{item.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-3 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                The Phenomenon of "Pre-IPO Funding"
              </h2>
              <div className="prose prose-lg prose-p:text-muted-foreground max-w-none">
                <p className="leading-relaxed">
                  Apart from operational readiness, one of the most critical aspects of the Pre-IPO phase is <strong>Pre-IPO Placement or Funding</strong>. Rather than waiting for the public issue to discover the company's valuation, promoters opt to raise emergency or growth capital 6 to 12 months prior to the IPO from select High Net Worth Individuals (HNIs), Private Equity (PE) funds, or Sovereign wealth funds.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-8 mb-4">
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                    <CheckCircle className="w-6 h-6 shrink-0 text-success" />
                    <span className="font-medium text-foreground">Establishes a solid "floor valuation" before pricing the main IPO.</span>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                    <CheckCircle className="w-6 h-6 shrink-0 text-success" />
                    <span className="font-medium text-foreground">Brings "smart money" (strategic institutional investors) onto the cap table.</span>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                    <CheckCircle className="w-6 h-6 shrink-0 text-success" />
                    <span className="font-medium text-foreground">Reduces the overall size of the public issue, minimizing absolute listing risk.</span>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                    <CheckCircle className="w-6 h-6 shrink-0 text-success" />
                    <span className="font-medium text-foreground">Vastly improves market sentiment when retail investors see large funds backing it.</span>
                  </div>
                </div>
                <p className="leading-relaxed text-sm italic border-l-4 border-warning pl-4 py-2 bg-warning/5 rounded-r-lg mt-8">
                  <strong>Regulatory Note:</strong> If a Pre-IPO placement is completed after the filing of the Draft Red Herring Prospectus (DRHP) with SEBI, the size of the fresh issue in the IPO is proportionately reduced. Furthermore, shares allotted to pre-IPO investors are subject to strict lock-in periods post-listing.
                </p>
              </div>
            </div>



            <div className="py-12 border-t border-border mt-12">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3" style={{ color: 'hsl(220 72% 25%)' }}>
                <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                Why Choose India IPO for Pre-IPO Guidance?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    { title: "Proven Track Record", desc: "Experience across multiple successful IPO launches spanning diverse industries" },
                    { title: "Full-Spectrum Expertise", desc: "Integrated coverage of financial, legal, regulatory and strategic requirements" },
                    { title: "Founder-Centric Approach", desc: "Strategies built around your long-term business vision, not a one-size-fits-all template" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <CheckCircle className="w-6 h-6 shrink-0 text-primary mt-1" />
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Regulatory Precision", desc: "In-depth knowledge of SEBI regulations and stock exchange listing norms" },
                    { title: "Trusted Partner Network", desc: "Access to a strong network of SEBI-registered merchant bankers, statutory auditors, legal firms and PR agencies" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <CheckCircle className="w-6 h-6 shrink-0 text-primary mt-1" />
                      <div>
                        <h4 className="font-bold text-lg">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'hsl(220 72% 25%)' }}>Begin Your IPO Journey the Right Way</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  A successful IPO is built long before the SEBI filing date. With the right Pre-IPO Process Guidance, your company can enter the capital markets fully prepared - minimising regulatory risks, avoiding costly delays and maximising valuation potential.
                </p>
              </div>

              <div className="mt-12 bg-secondary/30 p-8 rounded-3xl border border-border">
                <h4 className="text-xl font-bold mb-4" style={{ color: 'hsl(220 72% 25%)' }}>Maximise Valuation. Minimise Delays. List with Confidence with India IPO's Pre-IPO Guidance.</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Understand how IPOs work through our <Link to="/ipo-process" className="text-[#f59e08] font-bold hover:underline">IPO Process</Link> guide. Stay updated with upcoming listings via the <Link to="/all-ipos" className="text-[#f59e08] font-bold hover:underline">IPO Calendar</Link> and read expert analysis at <Link to="/ipo-blogs" className="text-[#f59e08] font-bold hover:underline">IPO Company Reviews — GMP, Subscription Status & Allotment</Link>. Explore our <Link to="/service/corporate-finance-services" className="text-[#f59e08] font-bold hover:underline">Corporate Finance Services</Link>, <Link to="/service/business-valuation" className="text-[#f59e08] font-bold hover:underline">Business Valuation Services</Link> and <Link to="/service/rights-issue-advisory" className="text-[#f59e08] font-bold hover:underline">Rights Issue Advisory</Link> for comprehensive IPO guidance.
                </p>
              </div>
            </div>

            <div className="mt-20 p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001529 0%, #002147 55%, #003380 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: '#f59e08', filter: 'blur(60px)', transform: 'translate(30%,-30%)' }} />
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 relative z-10 flex items-center justify-center gap-3">
                <div className="w-1 h-8 rounded-full bg-[#f59e08] shrink-0" />
                Don't Wait Until the <strong style={{ color: "#f59e08" }}>Last Minute</strong>
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium relative z-10">
                A botched DRHP filing due to poor preparation can delay your IPO by years. Engage with our Pre-IPO experts today to architect a foolproof listing strategy.
              </p>
              <div className="flex flex-wrap gap-4 justify-center relative z-10">
                <Link to="/contact">
                  <button className="px-10 py-4 text-lg font-black rounded-xl transition-all hover:scale-105 shadow-xl" style={{ background: 'linear-gradient(135deg, #f59e08, #d97706)', color: '#001529', boxShadow: '0 8px 32px rgba(245,158,8,0.35)' }}>
                    Start Pre-IPO Advisory
                  </button>
                </Link>
                <Link to="/ipo-eligibility-check">
                  <button className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-black rounded-xl transition-all hover:bg-white/5 shadow-sm hidden md:inline-block">
                    Check IPO Eligibility
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PreIPOProcess;
