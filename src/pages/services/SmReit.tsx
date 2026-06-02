import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const SmReit = () => {
  const slug = "sm-reit-structuring-listing-services";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full space-y-20">
          <div className="service-content-box service-content">
            <div className="row pt-2">
              <div className="col-lg-12" id="e1">
                <h2>Empowering Mid-Sized Real Estate Sponsors to Unlock Capital through SM REITs</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">The mid-market real estate business in India is moving towards a new phase of capital efficiency. The launch of Small and Medium Real Estate Investment Trusts (SM REITs) in the SEBI 2024 regulatory framework provides a formal, listed channel through which asset-intensive real estate players can monetize income-generating assets without the need to divest assets fully or use complicated debt arrangements.</p>
                <p className="mt-4">At <b>India IPO</b>, we specialize in designing and executing <b>SM REIT issues end-to-end</b>, ensuring full compliance with SEBI norms, structuring flexibility and complete support from ideation to listing.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e2">
                <h2 className="text-2xl font-black mb-4">What is an SM REIT?</h2>
                <p className="mt-2 text-slate-600">An SM REIT is a regulated real estate investment structure under the Securities and Exchange Board of India (SEBI) where capital is pooled alongside shares against a portfolio of income-generating, completed real estate assets, the asset value of which is between ₹50 crore and ₹500 crore.</p>
              </div>
            </div>

            <div className="row mt-8">
              <div className="col-lg-12" id="e3">
                <h3 className="text-xl font-bold mb-4">Key Features:</h3>
                <div className="orhp m-2">
                  <ul className="space-y-3">
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> SPV ownership in the form of a Trust</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> The asset portfolio should be 95% complete and revenue-earning</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> SPVs can only be a 100% entity of the SM REIT</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> A compulsory requirement for units to be listed on an exchange</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> No investment in under-construction assets permitted</li>
                    <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-[#f59e08] shrink-0" /> The Sponsor and Investment Manager terms may be identical</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e4">
                <h2 className="text-2xl font-black mb-6">India IPO's SM REIT Advisory Service</h2>
                <p className="text-slate-600 mb-8">Our services are extensive and modular for the real estate companies that are willing to structure and list SM REITs as per the SEBI (REIT) Amendment Regulations, 2024.</p>

                <div className="space-y-10">
                  <div id="e5">
                    <h3 className="text-lg font-black mb-3">1. Initial Assessment & Eligibility</h3>
                    <div className="orhp m-2 text-sm text-slate-600">
                      <ul className="space-y-2">
                        <li>Evaluation of the quality and yield attributes of the asset and lease in rent</li>
                        <li>Title verification and legal due diligence</li>
                        <li>Monetization and REIT structure financial modeling</li>
                        <li>Special Purpose Vehicle (SPV) Ready Assessment and Structuring Plan</li>
                      </ul>
                    </div>
                  </div>

                  <div id="e6">
                    <h3 className="text-lg font-black mb-3">2. Structuring the SM REIT Entity</h3>
                    <div className="orhp m-2 text-sm text-slate-600">
                      <ul className="space-y-2">
                        <li>Drafting and registration of Trust Deeds under the Indian Trusts Act</li>
                        <li>Formation and registration of SPVs to hold property</li>
                        <li>Organization of the Investment Manager and Trustee Functions</li>
                        <li>Establishment of scheme-specific asset segregation</li>
                      </ul>
                    </div>
                  </div>

                  <div id="e7">
                    <h3 className="text-lg font-black mb-3">3. Regulatory & Compliance Execution</h3>
                    <div className="orhp m-2 text-sm text-slate-600">
                      <ul className="space-y-2">
                        <li>Drafting of the Offer Document and filing through a SEBI-registered Merchant Banker</li>
                        <li>Liaison with legal, financial and valuation professionals</li>
                        <li>Obtaining the SEBI and specified exchange approvals</li>
                        <li>Ensuring full compliance with SEBI (REIT) and SEBI (NCS) Regulations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12" id="e10">
                <h2 className="text-2xl font-black mb-8 text-[#001529]">SM REIT Regulatory Conditions</h2>
                <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-[#001529] text-white">
                      <tr>
                        <th className="py-5 px-8 text-sm font-black uppercase tracking-widest w-[40%]">Regulatory Parameter</th>
                        <th className="py-5 px-8 text-sm font-black uppercase tracking-widest text-[#f59e08] w-[60%]">Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { p: "Asset Portfolio Value", r: "₹50 crore to ₹500 crore (Per Scheme)" },
                        { p: "Investment Criteria", r: "95% in completed revenue-generating assets" },
                        { p: "Minimum Unit Price", r: "₹10,00,000 per unit (demat form only)" },
                        { p: "Leverage Limit", r: "Max 49% of scheme asset value" },
                        { p: "IM Net Worth", r: "₹20 crore (₹10 crore liquid mandatory)" },
                        { p: "Distribution Mandate", r: "100% of NDCF must be distributed quarterly" },
                        { p: "Lock-in Requirement", r: "IM to hold 5%–15% of units initially" }
                      ].map((row, ri) => (
                        <tr key={ri} className="hover:bg-slate-50 transition-colors group">
                          <th className="py-5 px-8 text-sm font-black text-slate-800 bg-slate-50/50 group-hover:bg-slate-100 transition-colors">{row.p}</th>
                          <td className="py-5 px-8 text-sm text-[#f59e08] font-bold">{row.r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12" id="e11">
                <h2 className="text-2xl font-black mb-6">Migration Support for FOPs & Pre-Existing Structures</h2>
                <p className="text-slate-600 mb-6">In the case of current Fractional Ownership Platforms (FOPs) or privately pooled real estate structures:</p>
                <div className="orhp m-2 text-sm text-slate-600">
                  <ul className="space-y-3">
                    <li className="flex gap-3"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> India IPO offers migration counseling, documentation and compliance filing</li>
                    <li className="flex gap-3"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> Compulsory implementation of SEBI within 6 months of regulation</li>
                    <li className="flex gap-3"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> Current unitholders may be converted into SM REIT schemes</li>
                    <li className="flex gap-3"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> Conversion support involves SPV establishment and asset transfer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-12 py-12 border-t border-slate-100">
              <div className="col-lg-12" id="e13 text-center">
                <h3 className="text-2xl font-black text-[#001529] mb-4">Build Your SM REIT with Confidence</h3>
                <p className="text-slate-600 max-w-3xl mx-auto mb-8">India IPO is your strategic advisory partner and we will take you through all the stages of SM REIT issuance, including Eligibility, listing and long-term governance. As a developer, asset manager, FOP, or sponsor, we assist you in designing capital markets-ready platforms that scale and sustain.</p>
                <div className="flex flex-wrap justify-center gap-6 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Link to="/ipo-process" className="hover:text-[#f59e08] transition-colors">IPO Process</Link>
                  <Link to="/all-ipos" className="hover:text-[#f59e08] transition-colors">IPO Calendar</Link>
                  <Link to="/ipo-blogs" className="hover:text-[#f59e08] transition-colors">IPO Company Reviews</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default SmReit;
