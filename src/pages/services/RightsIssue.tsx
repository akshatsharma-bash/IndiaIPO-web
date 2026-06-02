import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Link } from "react-router-dom";

const RightsIssue = () => {
  const slug = "rights-issue-advisory";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full space-y-20">
          <div className="service-content-box service-content scroll-mt-24">
            <div className="row pt-2">
              <div className="col-lg-12" id="e1">
                <h2>Unlock Growth Capital Through Strategic Rights Issues with India IPO</h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-700">At India IPO, we specialize in offering comprehensive Rights Issue Advisory Services to companies that are willing to raise funds by offering shares to their existing shareholders. A rights issue is a powerful instrument that can help companies to consolidate their balance sheet, finance growth strategies, boost shareholders' value and reduce debt without losing control under their current ownership structure.</p>
                <p className="mt-4">We assist promoters, family-owned businesses, MSMEs and listed companies in navigating the entire rights issue process from regulatory compliance to successful capital mobilisation — with a customized and strategic approach.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12" id="e2">
                <h2 className="text-2xl font-black mb-4">What is a Rights Issue?</h2>
                <p className="mt-2 text-slate-600">A Rights Issue is a way in which a company can raise extra capital by giving its existing shareholders the option of buying some new shares at a discounted rate, in proportion to their current shareholding. This strategy helps companies to raise money while allowing existing shareholders to keep their shares or even increase them.</p>
                <p className="mt-4 text-slate-600">Rights Issues are less expensive, faster than the public offering and are favoured in raising capital when the companies do not want to dilute the promoter shareholding to a large extent.</p>
              </div>
            </div>

            <div className="row mt-12">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-6">Why Opt for Rights Issue Advisory Services?</h2>
                <p className="text-slate-600 mb-8">The Rights Issue is a complex process requiring regulatory, strategic and operational procedures. Through the Rights Issue Advisory Services of India IPO, businesses enjoy the following:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">Expert Structuring & Strategy</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">We design the most appropriate rights issue format- the issue size, ratio, pricing, renounceability and timing to fit your business plans and shareholders' interests.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">Regulatory & SEBI Compliance</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">We make sure that you are compliant on an end-to-end basis with SEBI guidelines, stock exchange requirements and Companies Act requirements. We also compile and submit all the necessary documents, such as the Letter of Offer (LoF).</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">Valuation & Pricing Advisory</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Proper pricing of the issue is very important. We will undertake thorough valuation tests and market surveys to advise on a competitive but attractive pricing policy for your shareholders.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <h3 className="text-lg font-black mb-3">End-to-End Execution Management</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">India IPO takes care of the entire process of your rights issue, right from the appointment of intermediaries (merchant bankers, RTA, legal advisors) to timelines, disclosures and listing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-16 bg-[#001529] p-10 md:p-14 rounded-[3rem] text-white">
              <h3 className="text-2xl font-black mb-6">Benefits of Rights Issue for Companies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { t: "Cost-Effective Fundraising", d: "Lower issuance costs than comparison to public offerings." },
                  { t: "Control Retention", d: "Existing promoters can maintain or increase their shareholding." },
                  { t: "Faster Process", d: "Rights issues are quicker to execute with less regulatory burden." },
                  { t: "Market Confidence", d: "A sign that promoters are confident in the business's growth." }
                ].map((b, bi) => (
                  <div key={bi} className="space-y-2">
                    <h4 className="font-bold text-[#f59e08]">{b.t}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">{b.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-lg-12">
                <h2 className="text-2xl font-black mb-8">Our Rights Issue Advisory Process</h2>
                <div className="space-y-8">
                  {[
                    { t: "1. Initial Assessment & Eligibility", d: "Understanding capital requirements and business objectives. Assessing the appropriateness of rights issues." },
                    { t: "2. Structuring & Planning", d: "Choosing size, ratio, price and renounceability. Development of indicative timelines." },
                    { t: "3. Documentation & Compliance", d: "Preparing Letter of Offer, public announcements and SEBI filings." },
                    { t: "4. Execution & Launch", d: "Coordinating with stock exchanges, intermediaries and regulators. Managing the subscription period." },
                    { t: "5. Post-Issue Support", d: "Facilitating listing of new shares and regulatory reporting." }
                  ].map((s, si) => (
                    <div key={si} className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 font-black text-[#001529]">{si + 1}</div>
                      <div>
                        <h4 className="font-black text-[#001529] mb-1">{s.t}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{s.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row mt-16 pt-12 border-t border-slate-100">
              <p className="text-slate-400 text-sm text-center">
                Understand how IPOs work through our <Link to="/ipo-process" className="text-[#f59e08] font-bold">IPO Process</Link> guide.
                Stay updated with the <Link to="/all-ipos" className="text-[#f59e08] font-bold">IPO Calendar</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default RightsIssue;
