import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Link } from "react-router-dom";

const InvitRightsIssue = () => {
  const slug = "invit-rights-issue-advisory-services";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="service-content-box service-content">
          <div className="space-y-10">
            <div className="row pt-2">
              <div className="col-lg-12" id="e1">
                <h2>Unlocking Capital via SEBI‑Compliant Rights Issues for Listed InvITs</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">A rights issue is a strategic mechanism for listed Infrastructure Investment Trusts (InvITs) to raise additional equity capital from existing unitholders. By offering new units at a predetermined ratio and price, InvITs can fund asset acquisitions, repay debt, or finance expansion projects while allowing existing investors to maintain their proportional stake.</p>
                <p className="mt-4">At India IPO, we provide comprehensive InvIT Rights Issue Advisory, covering everything from structuring and pricing to regulatory filings, Rights Entitlement (RE) management and final allotment.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e2">
                <h2 className="text-2xl font-black mb-4">What is an InvIT Rights Issue?</h2>
                <p className="text-slate-600">An InvIT rights issue enables an InvIT to issue new capital by issuing new units to the existing unitholders in proportion to their existing holdings. The mechanism assists sponsors to raise extra capital to buy assets, repay debt, or restructure capital while providing unitholders the first right to keep or grow their investment stake at favorable conditions.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e3">
                <h2 className="text-2xl font-black mb-6">Regulatory Framework & Eligibility</h2>
                <div className="orhp m-2 text-slate-600">
                  The rights issues of InvIT in India are governed by the detailed guidelines of SEBI, mainly under:
                  <ul className="mt-4 space-y-2">
                    <li><b>SEBI (Infrastructure Investment Trusts) Regulations, 2014</b> (with latest amendments)</li>
                    <li><b>SEBI ICDR Regulations</b> for rights issue process alignment.</li>
                  </ul>
                  <h3 className="text-lg font-black text-[#001529] mt-8 mb-4">Key regulatory highlights:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fast-track approvals are available to eligible publicly listed InvITs.</li>
                    <li>Similar requirements are imposed on follow-on offers in terms of minimum public float.</li>
                    <li>Rights issues also need thorough compliance checks to prevent defaults.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-8">Our InvIT Rights Issue Advisory Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">1. Strategic Structuring</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Evaluate the benefits of rights issue compared to alternatives. Design optimal quantum of capital raising and NAV-based pricing plans.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">2. Offer Document Drafting</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Prepare detailed draft offer documents compliant with SEBI requirements, including financial disclosures and asset portfolios.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">3. Investor Communication</h3>
                    <div className="text-sm text-slate-600 leading-relaxed">Develop outreach programs targeting existing unitholders. Guide on application processes via ASBA and UPI.</div>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">4. Allotment Management</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Monitor subscription levels and manage unsubscribed units. Oversight of timely allocations and listing on exchanges.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-16 bg-[#001529] p-10 md:p-14 rounded-[3rem] text-white">
               <h3 className="text-2xl font-black mb-6">Benefits of Our Advisory</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <b className="text-[#f59e08] block mb-2 text-lg">Regulatory Expertise</b>
                    <p className="text-white/60">Deal with complicated SEBI regulations with care so that approvals and disclosures can be made smoothly.</p>
                  </div>
                  <div>
                    <b className="text-[#f59e08] block mb-2 text-lg">Efficient Execution</b>
                    <p className="text-white/60">Mitigate risks with expert coordination across multiple stakeholders, including SEBI and merchant bankers.</p>
                  </div>
               </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-4">Get in Touch</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">Raise capital confidently with an InvIT rights issue customized to SEBI guidelines and today’s investor expectations. Contact India IPO’s InvIT advisory team today for a personalized consultation.</p>
                <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                  <Link to="/ipo-process" className="hover:text-[#f59e08]">IPO Process</Link>
                  <Link to="/reports" className="hover:text-[#f59e08]">IPO Calendar</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default InvitRightsIssue;
