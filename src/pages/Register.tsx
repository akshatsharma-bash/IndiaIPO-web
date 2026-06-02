import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  UserPlus, Mail, Lock, Eye, EyeOff, User,
  ShieldCheck, TrendingUp, BarChart2, Zap, ChevronRight, CheckCircle2,
} from "lucide-react";
import loginPanelImg from "@/assets/login_panel.png";
import logoImg from "@/assets/logo.png";

const benefits = [
  { icon: <TrendingUp className="h-4 w-4" />, text: "Real-time IPO GMP Alerts" },
  { icon: <BarChart2 className="h-4 w-4" />, text: "Live Market Insights" },
  { icon: <ShieldCheck className="h-4 w-4" />, text: "SEBI Registered Platform" },
  { icon: <Zap className="h-4 w-4" />, text: "Instant Subscription Updates" },
];

const passwordStrength = (pwd: string) => {
  if (!pwd) return { level: 0, label: "", color: "" };
  if (pwd.length < 6) return { level: 1, label: "Too short", color: "bg-red-500" };
  if (pwd.length < 8) return { level: 2, label: "Weak", color: "bg-orange-500" };
  if (/[A-Z]/.test(pwd) && /\d/.test(pwd)) return { level: 4, label: "Strong", color: "bg-green-500" };
  return { level: 3, label: "Medium", color: "bg-amber-500" };
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = passwordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <SEOHead
        title="Register – India IPO"
        description="Create your India IPO account to track IPOs, get real-time GMP alerts, and access expert market insights."
      />

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col">
        <img
          src={loginPanelImg}
          alt="IPO Market"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.75) 60%, rgba(15,23,42,0.95) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full p-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <img src={logoImg} alt="IndiaIPO Logo" className="h-9 w-auto" />
            <span className="text-white font-extrabold text-xl tracking-tight">
              India<span className="text-amber-400">IPO</span>
            </span>
          </motion.div>

          {/* Middle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-700/20 border border-amber-600/30 text-amber-400 text-xs font-bold mb-5">
              <UserPlus className="h-3.5 w-3.5" />
              Join 10,000+ Smart Investors
            </span>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Your Gateway to<br />
              <span className="text-amber-400">India's Best</span><br />
              IPO Opportunities
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm mb-8">
              Get access to real-time data, expert analysis, and GMP alerts
              — all in one platform built for serious investors.
            </p>

            {/* Benefits list */}
            <div className="flex flex-col gap-3">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-300 text-sm"
                >
                  <span className="w-7 h-7 rounded-lg bg-amber-700/20 border border-amber-600/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                    {b.icon}
                  </span>
                  {b.text}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="border-t border-white/10 pt-6"
          >
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} India IPO · Trusted by investors across India
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Form) ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 relative overflow-hidden">
        {/* grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-blue-800/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <img src={logoImg} alt="IndiaIPO" className="h-8 w-auto" />
            <span className="text-white font-extrabold text-lg">
              India<span className="text-amber-400">IPO</span>
            </span>
          </div>

          {/* Card */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-7">
              <div className="w-12 h-12 rounded-xl bg-amber-700/20 border border-amber-600/30 flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-amber-400" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">Create Account</h1>
              <p className="text-slate-400 text-sm mt-1">
                Join India IPO and start tracking smarter
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    id="register-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/60 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    id="register-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/60 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {/* Password strength bar */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${strength.level >= lvl ? strength.color : "bg-slate-700"
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{strength.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    id="register-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full pl-10 pr-12 py-3 rounded-xl bg-slate-800/60 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${confirmPassword.length > 0
                        ? passwordsMatch
                          ? "border-green-600/60 focus:ring-green-600/40"
                          : "border-red-600/60 focus:ring-red-600/40"
                        : "border-slate-700/60 focus:ring-amber-600/50 focus:border-amber-600/60"
                      }`}
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    {confirmPassword.length > 0 && (
                      <CheckCircle2
                        className={`h-4 w-4 transition-colors ${passwordsMatch ? "text-green-500" : "text-red-500"
                          }`}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                id="register-submit"
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-3.5 mt-2 bg-amber-700 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-900/30 transition-all text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating Account…
                  </>
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-slate-600 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>

            {/* Terms notice */}
            <p className="mt-4 text-center text-[11px] text-slate-600 leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link to="/terms-conditions" className="text-slate-500 hover:text-amber-400 transition-colors underline underline-offset-2">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-slate-500 hover:text-amber-400 transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
