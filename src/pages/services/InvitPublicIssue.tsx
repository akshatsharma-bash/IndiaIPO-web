import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, AreaChart, Lock, Users, ArrowRight, FileText, UserCheck } from "lucide-react";

const InvitPublicIssue = () => {
  const slug = "invit-public-issue-advisory";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="service-content-box service-content">
          <div className="space-y-16">
            <div className="row pt-2">
              <div className="col-lg-12" id="e1">
                <h2 className="text-3xl font-black text-[#001529] mb-6 leading-tight">Unlocking Capital via SEBI‑Compliant Public Issues for Public or Privately‑Listed InvITs</h2>
                <p className="text-lg leading-relaxed text-slate-700">A listed or private-listed InvIT can raise capital in a public issue using a fresh issue and/or an offer-for-sale to institutional, anchor and retail investors. In the case of privately listed InvITs, it transforms them into public InvITs under SEBI guidelines, which provide liquidity, scale and public float requirements.</p>
                <p className="mt-6 text-slate-600 font-medium">At India IPO, we deliver full‑service InvIT Public Issue Advisory, providing capital structuring, drafting of the Offer Document, SEBI coordination, investor engagement, execution and post-listing assurance.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e2">
                <h2 className="text-2xl font-black mb-4">What is an InvIT Public Issue?</h2>
                <p className="text-slate-600 leading-relaxed">The InvIT public issue is a capital raising process through the public issue of units to the investors through a duly filed offer document with SEBI and exchanges. When done by a privately listed InvIT, this provides it with a public InvIT status, which is also subject to SEBI eligibility requirements, including unitholder consent, lock-in of the sponsor, minimum public float levels and disclosure standards.</p>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12" id="e3">
                <h2 className="text-2xl font-black mb-8">InvIT Public Issue: Eligibility & Regulatory Criteria</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-[#001529] flex items-center gap-2">
                      <ShieldCheck className="h-6 w-6 text-[#f59e08]" /> Eligibility Requirements
                    </h3>
                    <div className="orhp ml-2 space-y-3 text-sm text-slate-600">
                      <div className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> <b>Unitholder Approval:</b> 75% approval (by value) required for privately listed InvITs.</div>
                      <div className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> <b>No Defaults:</b> No defaults on payments in the last 3 financial years.</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-[#001529] flex items-center gap-2">
                      <AreaChart className="h-6 w-6 text-[#f59e08]" /> Under-Construction Exposure
                    </h3>
                    <div className="orhp ml-2 space-y-3 text-sm text-slate-600">
                      <div className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> <b>Threshold Limit:</b> Max 10% investment in under-construction infrastructure.</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-[#001529] flex items-center gap-2">
                      <Lock className="h-6 w-6 text-[#f59e08]" /> Lock-In Norms
                    </h3>
                    <div className="orhp ml-2 space-y-3 text-sm text-slate-600">
                      <div className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> <b>Minimum Holding:</b> Sponsors hold 15% units, locked for 18 months.</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-[#001529] flex items-center gap-2">
                      <Users className="h-6 w-6 text-[#f59e08]" /> Public Float
                    </h3>
                    <div className="orhp ml-2 space-y-3 text-sm text-slate-600">
                      <div className="flex gap-2"><CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" /> <b>Public Holding:</b> At least 25% units held by public within 3 years.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-20">
              <div className="col-lg-12">
                <h2 className="text-3xl md:text-4xl font-black text-[#001529] mb-12 text-center">InvIT Public Issue Advisory Service</h2>
                <div className="space-y-10">
                  {[
                    { t: "1. Strategic Structuring & Eligibility", d: "Evaluate public issue Eligibility vs. follow-on routes. Model capital raise size and valuation impact." },
                    { t: "2. Offer Document & SEBI Coordination", d: "Draft Offer Document compliant with SEBI Schedule A. Manage SEBI comment handling and listing approvals." },
                    { t: "3. Investor Allocation & Pricing", d: "Define allocation split—typically 75% institutional/anchor and 25% public/retail." },
                    { t: "4. Subscription & Allotment Execution", d: "Oversee ASBA-based subscription. Administer allotment basis and timely listing." },
                    { t: "5. Post‑Listing Governance", d: "Support ongoing public float monitoring and trustee oversight." }
                  ].map((s, si) => (
                    <div key={si} className="flex gap-8 items-start p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all">
                      <div className="w-14 h-14 rounded-full bg-[#001529] text-[#f59e08] flex items-center justify-center text-xl font-black shrink-0 shadow-lg">{si + 1}</div>
                      <div>
                        <h4 className="text-xl font-black text-[#001529] mb-3">{s.t}</h4>
                        <p className="text-slate-600 leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row mt-20 bg-[#001529] p-10 md:p-16 rounded-[4rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e08] opacity-5 rounded-full -mr-32 -mt-32 blur-3xl" />
              <h3 className="text-3xl font-black mb-10 text-center text-[#f59e08]">Key Post-Issue Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><FileText className="h-6 w-6 text-[#f59e08]" /></div>
                  <p className="text-white/60 leading-relaxed"><b>Allotment Disclosure:</b> Subscription information must be disclosed within 10 days of listing.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><ShieldCheck className="h-6 w-6 text-[#f59e08]" /></div>
                  <p className="text-white/60 leading-relaxed"><b>Marketing Restrictions:</b> No advertisements or promotional media during subscription window.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center"><UserCheck className="h-6 w-6 text-[#f59e08]" /></div>
                  <p className="text-white/60 leading-relaxed"><b>Compliance Officer:</b> Mandatory officer to manage SEBI and post-listing disclosures.</p>
                </div>
              </div>
            </div>

            <div className="row mt-20 text-center">
              <h3 className="text-2xl font-black text-[#001529] mb-8">Build Your Public InvIT With Confidence</h3>
              <Button asChild className="bg-[#f59e08] hover:bg-[#d97706] text-[#001529] font-black h-16 rounded-2xl px-12 text-lg shadow-xl hover:scale-105 transition-all">
                <Link to="/contact">Contact Our Advisory Team <ArrowRight className="ml-2 h-6 w-6" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default InvitPublicIssue;
