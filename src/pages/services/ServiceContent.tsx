import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { ServiceData } from "@/data/servicesData";

const FAQItem = ({ faq }: { faq: { q: string; a: string } }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors gap-4"
      >
        <span className="font-bold text-slate-800 text-sm leading-snug">{faq.q}</span>
        {open
          ? <ChevronUp className="h-5 w-5 text-[#f59e08] shrink-0" />
          : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
          {faq.a}
        </div>
      )}
    </div>
  );
};

const ServiceContent = ({ service }: { service: ServiceData }) => {
  const commonFaqs = [
    {
      q: "How do I know if this service is right for my company?",
      a: "We assess your financial performance, eligibility criteria and growth plans to determine whether this is the right fit and whether you are ready for the next stage."
    },
    {
      q: "How long does the process typically take?",
      a: "The timeline usually ranges from 3 to 6 months, depending on your company’s preparedness, documentation and regulatory approvals at each stage."
    },
  ];
  const faqsToUse = (service.faqs && service.faqs.length > 0) ? service.faqs : commonFaqs;

  return (
    <div className="flex flex-col gap-12 relative">
      <div id="overview" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-3xl font-black text-[#001529]">Overview</h2>
        </div>
        <p className="text-slate-600 text-base leading-relaxed mb-5">{service.fullDescription}</p>
        {service.overviewParagraph2 && <p className="text-slate-600 text-base leading-relaxed">{service.overviewParagraph2}</p>}
      </div>

      <div id="benefits" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-3xl font-black text-[#001529]">Key Benefits</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {service.keyBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl hover:shadow-md transition-all flex flex-col items-center text-center gap-3 group h-full">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ background: `rgba(245,158,8,0.1)` }}>
                <CheckCircle className="h-5 w-5 text-[#f59e08]" />
              </div>
              <span className="font-bold text-slate-800 leading-tight text-[11px] sm:text-xs">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="process" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-3xl font-black text-[#001529]">Our Step-by-Step Approach</h2>
        </div>
        <div className="space-y-4">
          {service.processSteps.map((step, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl hover:shadow-md transition-all flex items-start gap-5 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-md group-hover:scale-105 transition-transform" style={{ background: `linear-gradient(135deg, #001529, #003380)` }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-base mb-1">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="included" className="bg-gradient-to-br from-[#001529] to-[#003380] rounded-3xl p-8 md:p-10 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-2xl font-black text-white">What's Included in Your Engagement</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Dedicated Senior Relationship Manager", "Full Regulatory Documentation Support", "SEBI & Exchange Filing Management", "Investor Roadshow Assistance", "Legal & Secretarial Coordination", "Post-Transaction Compliance Support", "Real-time Deal Status Dashboard", "Expert Due Diligence Team"].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#f59e08]/20 flex items-center justify-center shrink-0"><CheckCircle className="h-3 w-3 text-[#f59e08]" /></div>
              <span className="text-white/80 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="industries" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-3xl font-black text-[#001529]">Industries We Serve</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "Manufacturing", "Technology", "Real Estate", "Infrastructure",
            "Healthcare & Pharma", "FMCG", "Retail & D2C", "Energy & Renewables",
            "Financial Services", "Education", "Logistics", "Agri-Tech",
            "Media & Entertainment", "Hospitality", "Auto & EV",
          ].map((sector, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded-xl text-xs font-bold border transition-all hover:scale-105 cursor-default flex items-center justify-center text-center leading-tight shadow-sm bg-white border-slate-200 text-slate-600 hover:border-[#f59e08]/30"
            >
              {sector}
            </div>
          ))}
        </div>
      </div>

      <div id="faq" className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 rounded-full bg-[#f59e08]" />
          <h2 className="text-3xl font-black text-[#001529]">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqsToUse.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>
      </div>
    </div>
  );
};

export default ServiceContent;
