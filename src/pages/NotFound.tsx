import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, TrendingUp, BarChart2, Activity } from "lucide-react";
import notFoundImg from "@/assets/404_illustration1.webp";
import Header from "@/components/Header";
import Footer3 from "@/components/Footer";

const quickLinks = [
  { label: "IPO Calendar", href: "/all-ipos", icon: <BarChart2 className="h-4 w-4" /> },
  { label: "IPO Blogs", href: "/ipo-blogs", icon: <Activity className="h-4 w-4" /> },
  { label: "Market Insights", href: "/ipo-knowledge", icon: <TrendingUp className="h-4 w-4" /> },
];

const NotFound = () => {
  const location = useLocation();
  const [dots, setDots] = useState(".");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Animated ellipsis effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

        {/* Decorative blurred blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-800/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-3xl w-full text-center">

          {/* 404 badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-700/20 text-amber-400 border border-amber-700/30 mb-6 backdrop-blur-sm"
          >
            <Search className="h-3.5 w-3.5" />
            Page Not Found
          </motion.div>

          {/* 404 number */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            className="text-[120px] md:text-[180px] font-extrabold leading-none tracking-tighter bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #d97706 30%, #e2e8f0 60%, #94a3b8 100%)",
            }}
          >
            404
          </motion.h1>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto my-2 max-w-md"
          >
            <motion.img
              src={notFoundImg}
              alt="404 – Page not found illustration"
              className="w-full max-h-64 object-contain drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* glow under image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-amber-600/20 blur-2xl rounded-full" />
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed mb-2 max-w-lg mx-auto"
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-slate-600 text-sm mb-10 font-mono"
          >
            Searching for <span className="text-amber-500 font-bold">{location.pathname}</span>{dots}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-900/30 transition-all active:scale-95 text-base"
            >
              <Home className="h-5 w-5" />
              Return to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl border border-white/10 backdrop-blur-sm transition-all active:scale-95 text-base"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
              Or explore these sections
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg border border-slate-700/50 text-sm font-medium transition-all backdrop-blur-sm"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer3 />
    </>
  );
};

export default NotFound;
