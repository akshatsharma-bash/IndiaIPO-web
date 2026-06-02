import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Target, ArrowRight, Phone } from "lucide-react";

const MainstreamReit = () => {
  const slug = "mainstream-reit-structuring";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full space-y-20">
          <div id="reit-overview" className="service-content-box service-content scroll-mt-24">
            <div className="row pt-2">
              <div className="col-lg-12" id="e1">
                <h2>Bringing Institutional Real Estate to the Public Markets</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">The real estate industry in India is transforming asset-based models to capital-intensive approaches. To developers, asset owners and investment platforms with large-scale income-generating assets, Real Estate Investment Trusts (REITs) provide an opportunity of a lifetime to raise long-term capital without losing property control.</p>
                <p className="mt-4">REITs unlock the value of stabilized rental portfolios by turning them into publicly traded units that allow constant income distributions to investors and liquidity to sponsors. Now it is the right time to consider issuing REITs in India with a strong regulatory framework of SEBI and an increasing appetite of investors.</p>
                <p className="mt-4">India IPO being one of the best REIT issue consultants India enables you to design, structure and list your REIT in a fully regulatory-compliant, investor-friendly and execution-assisted manner- from concept to IPO and beyond.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e2">
                <h2 className="text-2xl font-black mb-4">What is a REIT?</h2>
                <p className="mt-2 text-slate-600">A REIT (Real Estate Investment Trust) is an investment vehicle that is based on trusts that own and manage income-producing real estate and pass most of its income to the unit holders. REITs are listed on the stock exchange and are governed by SEBI to provide transparency, governance and retail/institutional investor confidence.</p>
              </div>
            </div>

            <div className="row mt-8">
              <div className="col-lg-12" id="e3">
                <h3 className="text-xl font-bold mb-4">Key Highlights:</h3>
                <div className="orhp m-2">
                  <ul className="space-y-3">
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> Pooling of capital in a trust structure by public investors</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> Portfolio consists of office parks, malls, warehouses, etc.</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> Compulsory listing and income distribution quarterly</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> Units are traded on NSE/BSE just as equity shares</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> Open to retail, HNI and institutional investors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e4">
                <h2 className="text-2xl font-black mb-6">India IPO’s End-to-End REIT Advisory Services</h2>
                <p className="text-slate-600 mb-8">As a real estate developer, sponsor group, private equity owner or asset manager, we support you to transfer your yield-generating asset portfolio to the REIT market in India in an efficient and compliant way.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-4">1. Initial Eligibility & Structuring</h3>
                    <div className="orhp text-sm">
                      <ul className="space-y-2">
                        <li>Technical and commercial due diligence on assets</li>
                        <li>Lease audit and tenant quality analysis</li>
                        <li>Title verification and legal documentation review</li>
                        <li>Capital structuring & income simulation models</li>
                        <li>SPV consolidation and property transfer planning</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-4">2. REIT Trust & Entity Formation</h3>
                    <div className="orhp text-sm">
                      <ul className="space-y-2">
                        <li>Drafting and registration of the REIT Trust under the Indian Trusts Act</li>
                        <li>Formation of SPVs (Special Purpose Vehicles)</li>
                        <li>Appointment of Sponsor, Manager and Trustee</li>
                        <li>Defining scheme structure and segregation of assets</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-4">3. Regulatory Advisory & SEBI Compliance</h3>
                    <div className="orhp text-sm">
                      <ul className="space-y-2">
                        <li>Preparation and filing of REIT Offer Document</li>
                        <li>Coordination with legal, financial and valuation experts</li>
                        <li>SEBI (REIT) Regulations, 2014 compliance</li>
                        <li>SEBI (ICDR) Regulations compliance</li>
                        <li>Approval management with SEBI and stock exchanges</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-4">4. Intermediary Management & Due Process</h3>
                    <div className="orhp text-sm">
                      <ul className="space-y-2">
                        <li>Appointment of Independent Trustee</li>
                        <li>Selection of SEBI-registered Valuer</li>
                        <li>Coordination with Custodians, Registrars, Auditors</li>
                        <li>Setting up escrow and depository systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="regulatory" className="bg-[#001529] rounded-[3rem] p-10 md:p-14 text-white overflow-hidden relative scroll-mt-24 mt-20">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #f59e08 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
              <div className="relative z-10 space-y-10">
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-black">SEBI REIT Regulatory Framework</h3>
                  <p className="text-white/40 text-sm font-medium">Core parameters for listing a successful REIT in India</p>
                </div>
                <div className="overflow-x-auto rounded-[2rem] border border-white/10 shadow-2xl">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-[#f59e08] w-[40%]">Parameter</th>
                        <th className="py-6 px-8 text-xs font-black uppercase tracking-widest text-[#f59e08] w-[60%]">SEBI Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { l: "Minimum Asset Value", r: "₹500 crore+ (primarily completed, income-generating assets)" },
                        { l: "Minimum Issue Size", r: "₹250 crore public issue" },
                        { l: "Sponsor Commitment", r: "Minimum 15% holding for at least 3 years" },
                        { l: "Public Holding", r: "At least 25% of total units post-issue" },
                        { l: "Distribution Mandate", r: "Minimum 90% of NDCF to be distributed" },
                        { l: "Leverage Limit", r: "Up to 49% of asset value (expandable up to 70%)" },
                        { l: "Investment Rule", r: "Minimum 80% in completed, income-generating assets" }
                      ].map((row, ri) => (
                        <tr key={ri} className="hover:bg-white/5 transition-colors group">
                          <td className="py-6 px-8 text-sm font-black text-white/90 bg-white/5 group-hover:bg-white/10 transition-colors">{row.l}</td>
                          <td className="py-6 px-8 text-sm font-bold text-white/70">{row.r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div id="use-cases" className="space-y-8 scroll-mt-24 mt-20">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#f59e08] rounded-full" />
                <h2 className="text-3xl md:text-4xl font-black text-[#001529]">Ideal REIT Use Cases</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Grade-A Office Parks & IT SEZs", "Retail Malls & High-Street Portfolios", "Industrial Logistics & Warehousing Assets", "Stabilised, Income-Generating Real Estate Portfolios"
                ].map((ind, ii) => (
                  <div key={ii} className="p-6 shadow-xl bg-slate-50 border border-slate-200 rounded-3xl flex items-center gap-4 group hover:bg-[#f59e08]/10 transition-all">
                    <div className="w-1.5 h-8 bg-slate-200 group-hover:bg-[#f59e08] rounded-full transition-colors" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#001529] leading-tight">{ind}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="why-us" className="bg-[linear-gradient(135deg,_rgb(245,158,8),_rgb(217,119,6))] border border-orange-100 p-12 md:p-16 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 scroll-mt-24">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h3 className="text-3xl font-black text-[#001529]">Why <strong className="text-white">India IPO?</strong></h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Proven track record in listing large-scale capital market instruments.",
                "Strong compliance frameworks and extensive regulatory network.",
                "Elite partner ecosystem of professional Merchant Bankers and Trustees.",
                "Post-issue support for Governance, Investor Relations, and Reporting."
              ].map((point, pi) => (
                <div key={pi} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" />
                  <span className="text-sm font-bold text-slate-700">{point}</span>
                </div>
              ))}
            </div>
            <Button asChild className="bg-[#001529] hover:bg-[#003366] text-white h-14 rounded-2xl px-10 font-bold mt-4 w-full md:w-auto">
              <Link to="/contact">Monetize Your Leased Assets <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
          <div className="w-full md:w-1/3 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-[#f59e08]">
              <Target className="h-8 w-8" />
            </div>
            <h4 className="font-black text-[#001529]">Launch Your REIT</h4>
            <p className="text-slate-400 text-xs font-bold leading-relaxed">For portfolios of ₹500 crore+ in leased assets.</p>
            <div className="text-2xl font-black text-[#001529]">+91-74283-37280</div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default MainstreamReit;
