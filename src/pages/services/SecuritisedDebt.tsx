import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { CheckCircle } from "lucide-react";

const SecuritisedDebt = () => {
  const slug = "securitised-debt-instruments-sdi";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full space-y-20">
          <div className="service-content-box service-content scroll-mt-24">
            <div className="row pt-2">
              <div className="col-lg-12" id="sme-ipo-consultation">
                <h2>Introduction to Securitised Debt Instruments (SDIs)</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">Securitised Debt Instruments (SDIs) segment in India provides a significant tool for the transformation of illiquid assets, such as loans and receivables, into marketable securities. These instruments are issued via Special Purpose Distinct Entities (SPDEs), usually established in the form of trusts and listed on recognised stock exchanges, subject to regulation by SEBI.</p>
                <p className="mt-4 text-slate-600">The SDIs are like fixed-income securities and are governed by the SEBI (Issue and Listing of Securitised Debt Instruments and Security Receipts) Regulations, 2008 and are uniquely positioned for institutional investors looking for exposure in asset-backed fixed-income securities. These instruments help banks, NBFCs, housing finance companies and other originators to release capital and move risk off-balance sheet, at the same time providing investors an opportunity to receive structured returns from known cash flows.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-4">What is a Securitised Debt Instrument?</h2>
                <p className="mt-2 text-slate-600">A Securitised Debt Instrument (SDI) is a financial asset that has been created by a securitisation process that pools one or more types of underlying assets that produce stable cash flows (principally loan repayments). The underlying assets are then transferred to a legally independent SPDE, which issues the instruments to the investors.</p>
                <p className="mt-4 text-slate-600">This form of securitisation helps convert illiquid receivables into tradable securities and spreads risk across a diversified pool.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-6">Structure of SDI Transactions</h2>
                <p className="text-slate-600 mb-6">The SDI ecosystem involves multiple regulated participants:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { t: "Originator", d: "The entity assigning debt or receivable to SPDE (e.g., Bank, NBFC)." },
                     { t: "SPDE", d: "A bankruptcy-remote trust established to issue SDIs." },
                     { t: "Trustee", d: "SEBI-registered, responsible for compliance and investor protection." },
                     { t: "Servicer", d: "Company that collects receivables and performs distributions." },
                     { t: "Credit Enhancer", d: "Provides guarantees or reserves to diminish risk." },
                     { t: "Liquidity Provider", d: "Ensures smooth cash flows if delays arise." }
                   ].map((p, pi) => (
                     <div key={pi} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="font-black text-[#001529] mb-2">{p.t}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{p.d}</p>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12">
                 <h2 className="text-2xl font-black mb-6">Characteristics of SDIs</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      "Asset-backed: Based on predictable cash flows",
                      "Bankruptcy Remote: Shielded from originator risk",
                      "Structured Returns: Tranche-based payments",
                      "Rated Instruments: Mandatory SEBI credit rating",
                      "Tradable: Listed on recognized exchanges"
                    ].map((c, ci) => (
                      <div key={ci} className="flex gap-3 items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
                        <CheckCircle className="h-4 w-4 text-[#f59e08] shrink-0" />
                        <span className="text-xs font-bold text-orange-900">{c}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="row mt-16">
               <div className="col-lg-12">
                  <h3 className="text-2xl font-black mb-8 text-[#001529]">Comparison: SDIs vs Corporate Bonds</h3>
                  <div className="overflow-x-auto rounded-[2rem] border border-slate-200 shadow-xl bg-white">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                       <thead className="bg-[#001529] text-white">
                         <tr>
                           <th className="py-5 px-8 text-sm font-black uppercase tracking-widest w-[25%]">Parameter</th>
                           <th className="py-5 px-8 text-sm font-black uppercase tracking-widest text-[#f59e08] w-[37.5%]">SDIs</th>
                           <th className="py-5 px-8 text-sm font-black uppercase tracking-widest w-[37.5%]">Corporate Bonds</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         {[
                           { p: "Backed By", s: "Asset pool of receivables", c: "Issuer’s balance sheet" },
                           { p: "Returns", s: "Structured cash flow-based", c: "Fixed or floating coupon" },
                           { p: "Investors", s: "Institutions, QIBs, HNIs", c: "Retail + Institutional" },
                           { p: "Credit Rating", s: "Mandatory (2 CRAs for public)", c: "Usually mandatory" },
                           { p: "Tradable", s: "Yes, on exchanges", c: "Yes" },
                           { p: "Regulation", s: "SEBI", c: "SEBI" }
                         ].map((row, ri) => (
                           <tr key={ri} className="hover:bg-slate-50 transition-colors group">
                              <th className="py-5 px-8 text-sm font-black text-slate-800 bg-slate-50/50 group-hover:bg-slate-100 transition-colors">{row.p}</th>
                              <td className="py-5 px-8 text-sm font-bold text-[#f59e08]">{row.s}</td>
                              <td className="py-5 px-8 text-sm text-slate-500 font-medium">{row.c}</td>
                           </tr>
                         ))}
                       </tbody>
                    </table>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default SecuritisedDebt;
