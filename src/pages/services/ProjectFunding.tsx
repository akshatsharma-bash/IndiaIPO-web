import React from "react";
import ServicePageLayout from "./ServiceLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

const ProjectFunding = () => {
  const slug = "project-funding-services";

  return (
    <ServicePageLayout slug={slug}>
      <div className="flex flex-col gap-12 relative">
        <div className="w-full space-y-20">
          <div id="funding-overview" className="service-content-box service-content scroll-mt-24">
            <p className="text-slate-700 text-lg leading-relaxed">
              At <strong className="text-[#f59e08]">India IPO</strong>, we provide specialised project funding advisory to help businesses secure the right capital for growth and expansion. Whether it is infrastructure development, capacity expansion, or new ventures, we structure funding solutions and coordinate with lenders and investors to ensure efficient execution.
            </p>
            <div className="row pt-2">
              <div className="col-lg-12" id="project-funding">
                <p>
                  At <b>India IPO</b>, we provide specialized <b>Project Funding Services</b> that help businesses to raise funds to finance their projects. Whether it is a new venture, infrastructure development, product launch, or business expansion, we make sure that companies access the right funding solutions with strategic guidance at each step.
                </p>
                <p className="mt-3">India IPO possesses years of experience in the capital markets and regulatory systems, which offer a seamless process of project financing and connecting businesses with reputable investors and structuring funding mechanisms that minimize risks and maximize growth opportunities.</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-12" id="e2">
                <h2>What are Project Funding Services?</h2>
                <p>Project Funding Services are professional services that assist businesses and entrepreneurs in raising the financial capital needed to execute a specific project. These services include a systematic procedure of determining the financing requirements of a project, developing a financing strategy, preparing regulatory-compliant documents and linking the business with the right investors or financial institutions.</p>
                <div className="orhp m-2">
                  Project Funding can be used for:
                  <ul>
                    <li>Infrastructure Development (e.g., factories, commercial spaces, logistics parks)</li>
                    <li>New Product Launches</li>
                    <li>Business Expansions & Diversifications</li>
                    <li>Large-scale Equipment Purchase & Technology Upgrades</li>
                    <li>Renewable Energy & Green Projects</li>
                    <li>Industry-Specific Major Projects (Manufacturing, Healthcare, Real Estate, etc.)</li>
                  </ul>
                </div>
                <p className="mt-4">Project Funding is generally not the same as general business funding or working capital loans, because it is used to fund a specific project or initiative with clear financial objectives, schedules and deliverables. The funds may be obtained by debt financing, equity investment, structured finance or a combination of the above funding models, depending on the project needs.</p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-12" id="e3">
                <h2>Why Do Businesses Need Project Funding Services?</h2>
                <p>Many businesses, especially SMEs, startups and even large corporations, face challenges in raising project-specific funds due to:</p>
                <div className="orhp m-2">
                  <ul>
                    <li>Limited access to investor networks</li>
                    <li>Complex regulatory and documentation processes</li>
                    <li>High risk of equity dilution while raising capital</li>
                    <li>Lack of expertise in structuring funding deals that balance growth with financial risk</li>
                  </ul>
                </div>
                <div className="orhp mt-6 mb-2">
                  <b>This is where Project Funding Services comes into play. They help businesses:</b>
                  <ul>
                    <li>Identify the best-suited funding options (Debt/Equity/Hybrid)</li>
                    <li>Structure the funding deal in a way that aligns with business objectives</li>
                    <li>Ensure full legal and regulatory compliance (especially SEBI guidelines)</li>
                    <li>Connect with credible investors and financial institutions who are genuinely interested in funding the project</li>
                    <li>Manage the entire process smoothly, from documentation to fund disbursement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-8">
              <div className="col-lg-12" id="e4">
                <h2>Why Choose India IPO for Project Funding Services?</h2>
                <div className="space-y-6 mt-4">
                  <div>
                    <h3>1. Comprehensive Understanding of Project Financial Needs</h3>
                    <p className="orhp m-2">Every project is unique. The first step is to familiarize ourselves with your business model, financial objectives and project needs. India IPO professionals will conduct a thorough study to determine the scope, timeframe and capital requirements of your venture and will ensure that the funding mechanism is perfectly aligned with your business goals.</p>
                  </div>
                  <div>
                    <h3>2. Customized Funding Structures for Optimal Results</h3>
                    <p className="orhp m-2">We design customized funding strategies for your project’s specific needs. It may be debt funding, structured financing, or hybrid capital systems, but our team will make sure that you can obtain capital at terms that allow you to grow sustainably. Our Project Funding Services are aimed at developing funding solutions that do not result in excessive equity dilution, which means that you will be able to maintain control over your business.</p>
                  </div>
                  <div>
                    <h3>3. Regulatory-Compliant Documentation and Advisory</h3>
                    <p className="orhp m-2">Companies may experience the challenge of going through complicated legal and compliance procedures. India IPO will also make sure that all the documentation is done in a very precise manner and is fully compliant with SEBI (Securities and Exchange Board of India) guidelines and other statutory authorities. This helps in minimising compliance risks and an easy funding process.</p>
                  </div>
                  <div>
                    <h3>4. Strategic Investor Network for Targeted Project Funding</h3>
                    <p className="orhp m-2">One of the core strengths of India IPO’s Project Funding Services is a large network of financial institutions, private equity firms, venture capitalists and project-specific investors that it provides. We link your business with funding partners who are not only interested in financing your projects but are also keen on making the capital raised not only sufficient but also strategically advantageous.</p>
                  </div>
                  <div>
                    <h3>5. End-to-End Project Funding Execution Support</h3>
                    <p className="orhp m-2">From the initial planning and investor matchmaking to negotiations, documentation and final fund disbursement, India IPO offers <b>end-to-end execution support</b>. Our team works as an extended arm of your business, managing the entire process with precision so that you can focus on driving your project forward.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-8" id="e10">
              <div className="col-lg-12">
                <h3>Benefits of India IPO’s Project Funding Services</h3>
                <div className="orhp m-2">
                  <ul>
                    <li>Holistic Project Assessment & Funding Advisory</li>
                    <li>End-to-End Funding Support for Specific Projects</li>
                    <li>Custom-Built Financing Structures (Debt, Equity, Hybrid)</li>
                    <li>SEBI-Compliant Documentation & Advisory</li>
                    <li>Access to High-Quality Investor Networks</li>
                    <li>Capital Raising without Diluting Ownership</li>
                    <li>Efficient Process Management to Save Time and Resources</li>
                    <li>Expert in Risk Management and Strategic Deal-Making</li>
                    <li>Transparent, Hassle-Free Execution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="call-to-action" className="bg-[linear-gradient(135deg,_rgb(245,158,8),_rgb(217,119,6))] rounded-[3rem] p-12 md:p-20 text-center space-y-8 border border-orange-100 scroll-mt-24">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-4xl font-black text-[#001529]">Fuel Your Growth Today</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Finding the right funding is complicated. India IPO makes it efficient, transparent, and growth-oriented.
              Let us turn your project vision into a successful reality.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-[#001529] hover:bg-slate-800 text-[#f59e08] h-16 rounded-2xl px-12 font-black text-lg">
              <Link to="/contact">Start Your Journey <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <div className="flex items-center gap-4 px-10 border border-slate-200 rounded-2xl bg-white h-16 shadow-lg">
              <Phone className="h-6 w-6 text-[#f59e08]" />
              <div className="text-left leading-none">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Direct Help</div>
                <div className="text-xl font-black text-[#001529]">+91-74283-37280</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
};

export default ProjectFunding;
