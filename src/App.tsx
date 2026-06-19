import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "./components/WhatsAppButton";
const JigyasaChatButton = lazy(() => import("./components/JigyasaChatButton"));
// import ApkDownloadButton from "./components/ApkDownloadButton";
import MobileNav from "./components/MobileNav";
import ScrollToTop from "./components/ScrollToTop";
import GlobalCanonical from "./components/GlobalCanonical";



import Index2 from "./pages/Index2";
import { WeeklyDigest } from "./components/WeeklyDigest";


const IPOCalendar = lazy(() => import("./pages/IPOCalendar"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
// const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const IPOCalculator = lazy(() => import("./pages/IPOCalculator"));
const IPOFeasibility = lazy(() => import("./pages/IPOFeasibility"));
const Investors = lazy(() => import("./pages/Investors"));
const NewsUpdates = lazy(() => import("./pages/NewsUpdates"));
const NewsDetails = lazy(() => import("./pages/NewsDetails"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Careers = lazy(() => import("./pages/Careers"));
const Reports = lazy(() => import("./pages/Reports"));
const SectorIPOs = lazy(() => import("./pages/SectorIPOs"));
const IPOKnowledge = lazy(() => import("./pages/IPOKnowledge"));
const IPOProcess = lazy(() => import("./pages/IPOProcess"));
const PreIPOProcess = lazy(() => import("./pages/PreIPOProcess"));
const IPOBlogs = lazy(() => import("./pages/IPOBlogs"));
const IPOBlogDetails = lazy(() => import("./pages/IPOBlogDetails"));
const IPOArticleBlogs = lazy(() => import("./pages/IPOArticleBlogs"));
const IPOArticleDetails = lazy(() => import("./pages/IPOArticleDetails"));
const MerchantBankersPage = lazy(() => import("./pages/MerchantBankers"));
const MainboardBankersPage = lazy(() => import("./pages/MainboardBankers"));
const MerchantBankersRouter = lazy(() => import("./pages/MerchantBankersRouter"));
const SmeIpoConsultant = lazy(() => import("./pages/services/SmeIpoConsultant"));
const MainlineIpoConsultant = lazy(() => import("./pages/services/MainlineIpoConsultant"));
const FollowOnPublicOffer = lazy(() => import("./pages/services/FollowOnPublicOffer"));
const PreIpoConsultant = lazy(() => import("./pages/services/PreIpoConsultant"));
const PrivateMunicipalDebt = lazy(() => import("./pages/services/PrivateMunicipalDebt"));
const InvitPrivateIssue = lazy(() => import("./pages/services/InvitPrivateIssue"));

// Social Stock Exchange Pages
const SSEIntroduction = lazy(() => import("./pages/social-stock-exchange/SSEIntroduction"));
const EligibilityCriteria = lazy(() => import("./pages/social-stock-exchange/EligibilityCriteria"));
const RegistrationNPO = lazy(() => import("./pages/social-stock-exchange/RegistrationNPO"));
const ListingProcessZCZP = lazy(() => import("./pages/social-stock-exchange/ListingProcessZCZP"));
const ListedNPOs = lazy(() => import("./pages/social-stock-exchange/ListedNPOs"));
const Intermediaries = lazy(() => import("./pages/social-stock-exchange/Intermediaries"));
const PostListingRequirements = lazy(() => import("./pages/social-stock-exchange/PostListingRequirements"));

const ManageKnowledge = lazy(() => import("./pages/admin/ManageKnowledge"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ManageIPOs = lazy(() => import("./pages/admin/ManageIPOs"));
const ManageBlogs = lazy(() => import("./pages/admin/ManageBlogs"));
const ManageNews = lazy(() => import("./pages/admin/ManageNews"));
const ManageLeads = lazy(() => import("./pages/admin/ManageLeads"));
const ManageInvestors = lazy(() => import("./pages/admin/ManageInvestors"));
const ManageIPOFeasibility = lazy(() => import("./pages/admin/ManageIPOFeasibility"));
const ManageAdminBlogs = lazy(() => import("./pages/admin/ManageAdminBlogs"));
const ManageCSR = lazy(() => import("./pages/admin/ManageCSR"));
const ManageMarketSnaps = lazy(() => import('./pages/admin/ManageMarketSnaps'));
const MarketSnaps = lazy(() => import('./pages/MarketSnaps'));
const CSR = lazy(() => import("./pages/CSR"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers"));
const ManageReports = lazy(() => import("./pages/admin/ManageReports"));
const ManageSubscriptions = lazy(() => import("./pages/admin/ManageSubscriptions"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));
const ManagePages = lazy(() => import("./pages/admin/ManagePages"));
const ManageNavigation = lazy(() => import("./pages/admin/ManageNavigation"));
const ManageBanners = lazy(() => import("./pages/admin/ManageBanners"));
const ManageMerchantBankers = lazy(() => import("./pages/admin/ManageMerchantBankers"));
const ManageBankerCategories = lazy(() => import("./pages/admin/ManageBankerCategories"));
const ManageMainboardBankers = lazy(() => import("./pages/admin/ManageMainboardBankers"));
const ManageCareerApplications = lazy(() => import("./pages/admin/ManageCareerApplications"));
const ManageCareerRoles = lazy(() => import("./pages/admin/ManageCareerRoles"));
const NotificationView = lazy(() => import("./pages/NotificationView"));
const ManageNotifications = lazy(() => import("./pages/admin/ManageNotifications"));
const ManageVideos = lazy(() => import("./pages/admin/ManageVideos"));
const ManagePopup = lazy(() => import("./pages/admin/ManagePopup"));
const ManageMagazines = lazy(() => import("./pages/admin/ManageMagazines"));
const Registrars = lazy(() => import("./pages/Registrars"));
const ManageRegistrars = lazy(() => import("./pages/admin/ManageRegistrars"));
const ManageRegistrarFaqs = lazy(() => import("./pages/admin/ManageRegistrarFaqs"));
const DailyReporter = lazy(() => import("./pages/DailyReporter"));
const DailyReporterViewer = lazy(() => import("./pages/DailyReporterViewer"));
const WeeklyReporterViewer = lazy(() => import("./pages/WeeklyReporterViewer"));
const ManageDailyDigests = lazy(() => import("./pages/admin/ManageDailyDigests"));
const ManageWeeklyDigests = lazy(() => import("./pages/admin/ManageWeeklyDigests"));
const DailyDigestCampaign = lazy(() => import("./pages/admin/DailyDigestCampaign"));

const RegistrarDetails = lazy(() => import("./pages/RegistrarDetails"));
const Sectors = lazy(() => import("./pages/Sectors"));
const SectorDetailView = lazy(() => import("./pages/SectorDetailView"));
const IpoDetailView = lazy(() => import("./pages/IpoDetailView"));
const ManageSectors = lazy(() => import("./pages/admin/ManageSectors"));
const ManageSectorIPOs = lazy(() => import("./pages/admin/ManageSectorIPOs"));
const ConsultantPage = lazy(() => import("./pages/ConsultantPage"));
const ConsultantDetail = lazy(() => import("./pages/ConsultantDetail"));
const MerchantBankerDetail = lazy(() => import("./pages/MerchantBankerDetail"));
const ManageConsultants = lazy(() => import("./pages/admin/ManageConsultants"));
const ManageConsultantEnquiries = lazy(() => import("./pages/admin/ManageConsultantEnquiries"));
const ManageMerchantEnquiries = lazy(() => import("./pages/admin/ManageMerchantEnquiries"));
const ManageAnnualReportRequests = lazy(() => import("./pages/admin/ManageAnnualReportRequests"));
const MerchantContact = lazy(() => import("./pages/MerchantContact"));
const MerchantBankerCompare = lazy(() => import("./pages/MerchantBankerCompare"));
const NotFound = lazy(() => import("./pages/NotFound"));
const IPOServices = lazy(() => import("./pages/IPOServices"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const IpoWorldMagazine = lazy(() => import("./pages/IpoWorldMagazine"));
const MagazineViewer = lazy(() => import("./pages/MagazineViewer"));


const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  </div>
);



const PhpRedirect = () => {
  const location = useLocation();


  const cleanSlug = location.pathname
    .replace("/", "")
    .replace(".php", "");


  return (
    <Navigate
      to={`/ipo-blogs/${cleanSlug}${location.search}`}
      replace
    />
  );
};

const NewsRedirect = () => {
  const { slug } = useParams();
  return (
    <Navigate
      to={`/news/detail/${slug}`}
      replace
    />
  );
};



const AnimatedRoutes = () => {
  const location = useLocation();
  return (

    <div
      key={location.pathname}


    >
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={<Index2 />} />
          <Route path="/all-ipos" element={<IPOCalendar />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ipo-services" element={<IPOServices />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          {/* <Route path="/blog/:slug" element={<BlogDetails />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/ipo-calculator" element={<IPOCalculator />} /> */}
          <Route path="/ipo-eligibility-check" element={<IPOFeasibility />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/news" element={<NewsUpdates />} />
          <Route path="/news/:slug" element={<NewsRedirect />} />
          <Route path="/ipo-video-updates" element={<MarketSnaps />} />
          <Route path="/our-csr" element={<CSR />} />
          <Route path="/career" element={<Careers />} />
          <Route path="/news/detail/:slug" element={<NewsDetails />} />
          <Route path="/daily-ipo-digest" element={<DailyReporter />} />
          <Route path="/daily-ipo-digest/view/:id" element={<DailyReporterViewer />} />
          <Route path="/daily-reporter/:slug" element={<IPOBlogDetails />} />

          <Route path="/weekly-ipo-report" element={<WeeklyDigest />} />
          <Route path="/weekly-ipo-report/view/:id" element={<WeeklyReporterViewer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:slug" element={<Reports />} />
          <Route path="/mainline-ipos" element={<Reports />} />
          <Route path="/sme-ipos" element={<Reports />} />
          <Route path="/sme-ipo-sector" element={<SectorIPOs />} />
          <Route path="/sme-ipos/sector/:id" element={<SectorIPOs />} />
          <Route path="/mainboard-ipo-sector" element={<SectorIPOs />} />
          <Route path="/ipos/sector/:id" element={<SectorIPOs />} />
          <Route path="/all-sectors" element={<Sectors />} />
          <Route path="/sector/:sectorId" element={<SectorDetailView />} />
          <Route path="/all-ipos/:id" element={<IpoDetailView />} />
          <Route path="/ipo-knowledge" element={<IPOKnowledge />} />
          <Route path="/ipo-process" element={<IPOProcess />} />
          <Route path="/pre-ipo-process-guidance" element={<PreIPOProcess />} />
          <Route path="/ipo-knowledge/:slug" element={<IPOKnowledge />} />
          <Route path="/ipo-blogs" element={<IPOBlogs />} />
          <Route path="/ipo-blogs/:slug" element={<IPOBlogDetails />} />
          <Route path="/:oldSlug.php" element={<PhpRedirect />} />
          <Route path="/blogs" element={<IPOArticleBlogs />} />
          <Route path="/blogs/:slug" element={<IPOArticleDetails />} />
          <Route path="/sector-wise-ipo-list-in-india" element={<Sectors />} />
          <Route path="/merchant-bankers/compare" element={<MerchantBankerCompare />} />
          <Route path="/merchant-bankers/:category" element={<MerchantBankersRouter />} />
          <Route path="/merchant-contact" element={<MerchantContact />} />
          <Route path="/notifications/:slug" element={<NotificationView />} />
          <Route path="/nse-emerge-eligibility-criteria" element={<NotificationView slugOverride="nse-emerge-eligibility-criteria" />} />
          <Route path="/bse-sme-ipo-eligibility" element={<NotificationView slugOverride="bse-sme-ipo-eligibility" />} />
          <Route path="/ipo-registrar-list" element={<Registrars />} />
          <Route path="/ipo-registrar-list/:slug" element={<RegistrarDetails />} />
          <Route path="/consultant" element={<ConsultantPage />} />
          <Route path="/consultant/:slug" element={<ConsultantDetail />} />
          <Route path="/merchant-banker/:slug" element={<MerchantBankerDetail />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/ipo-world-magazine" element={<IpoWorldMagazine />} />
          <Route path="/ipo-world-magazine/view/:id" element={<MagazineViewer />} />

          {/* Social Stock Exchange Subpages */}
          <Route path="/social-stock-exchange/sse-introduction" element={<SSEIntroduction />} />
          <Route path="/social-stock-exchange/eligibility-criteria-to-qualify-social-enterprise" element={<EligibilityCriteria />} />
          <Route path="/social-stock-exchange/registration-of-npo-on-sse" element={<RegistrationNPO />} />
          <Route path="/social-stock-exchange/listing-process-of-zczp-on-sse" element={<ListingProcessZCZP />} />
          <Route path="/social-stock-exchange/listed-npos-and-registered-npos" element={<ListedNPOs />} />
          <Route path="/social-stock-exchange/intermediaries-involved-in-the-listing-of-zczp" element={<Intermediaries />} />
          <Route path="/social-stock-exchange/post-listing-requirements-for-npo" element={<PostListingRequirements />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/ipos" element={<ManageIPOs />} />
          <Route path="/admin/blogs" element={<ManageBlogs />} />
          <Route path="/admin/news" element={<ManageNews />} />
          <Route path="/admin/leads" element={<ManageLeads />} />
          <Route path="/admin/investors" element={<ManageInvestors />} />
          <Route path="/admin/ipo-feasibility" element={<ManageIPOFeasibility />} />
          <Route path="/admin/ipo-blogs" element={<ManageAdminBlogs />} />
          <Route path="/admin/csr" element={<ManageCSR />} />
          <Route path="/admin/market-snaps" element={<ManageMarketSnaps />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/reports" element={<ManageReports />} />
          <Route path="/admin/seo" element={<AdminSEO />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/pages" element={<ManagePages />} />
          <Route path="/admin/navigation" element={<ManageNavigation />} />
          <Route path="/admin/banners" element={<ManageBanners />} />
          <Route path="/admin/banker-categories" element={<ManageBankerCategories />} />
          <Route path="/admin/merchant-bankers" element={<ManageMerchantBankers />} />
          <Route path="/admin/mainboard-bankers" element={<ManageMainboardBankers />} />
          <Route path="/admin/career-applications" element={<ManageCareerApplications />} />
          <Route path="/admin/career-roles" element={<ManageCareerRoles />} />
          <Route path="/admin/knowledge" element={<ManageKnowledge />} />
          <Route path="/admin/notifications" element={<ManageNotifications />} />
          <Route path="/admin/videos" element={<ManageVideos />} />
          <Route path="/admin/subscriptions" element={<ManageSubscriptions />} />
          <Route path="/admin/popup" element={<ManagePopup />} />
          <Route path="/admin/magazines" element={<ManageMagazines />} />
          <Route path="/admin/registrars" element={<ManageRegistrars />} />
          <Route path="/admin/registrar-faqs" element={<ManageRegistrarFaqs />} />
          <Route path="/admin/sectors" element={<ManageSectors />} />
          <Route path="/admin/sector-ipos" element={<ManageSectorIPOs />} />
          <Route path="/admin/daily-digests" element={<ManageDailyDigests />} />
          <Route path="/admin/weekly-digests" element={<ManageWeeklyDigests />} />
          <Route path="/admin/daily-digest-campaign" element={<DailyDigestCampaign />} />

          <Route path="/admin/consultants" element={<ManageConsultants />} />
          <Route path="/admin/consultant-enquiries" element={<ManageConsultantEnquiries />} />
          <Route path="/admin/merchant-enquiries" element={<ManageMerchantEnquiries />} />
          <Route path="/admin/annual-report-requests" element={<ManageAnnualReportRequests />} />

          <Route path="/sme-ipo-consultant" element={<SmeIpoConsultant />} />
          <Route path="/mainline-ipo-consultant" element={<MainlineIpoConsultant />} />
          <Route path="/fpo" element={<FollowOnPublicOffer />} />
          <Route path="/pre-ipo-consultant" element={<PreIpoConsultant />} />
          <Route path="/privately-issued-municipal-debt-securities" element={<PrivateMunicipalDebt />} />
          <Route path="/invit-private-issue-advisory" element={<InvitPrivateIssue />} />
          <Route path="/:slug" element={<ServiceDetail />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </div>

  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

            {/* Global fallback canonical – overridden per-page by <SEOHead> */}
            <GlobalCanonical />
            <ScrollToTop />
            <AnimatedRoutes />
            <MobileNav />
            {/* Floating buttons — stacked together */}
            <div className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col items-end gap-3">
              <Suspense fallback={null}>
                <JigyasaChatButton />
              </Suspense>
              <WhatsAppButton />
            </div>

        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
