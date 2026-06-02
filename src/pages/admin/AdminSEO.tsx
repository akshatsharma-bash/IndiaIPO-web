import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Upload, Image as ImageIcon, Search, Plus, Pencil, Trash2,
  Globe, Tag, FileText, Link, X, ChevronDown, Check, ExternalLink
} from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import { BASE_URL } from "@/hooks/useCanonicalUrl";

// ── Types ──────────────────────────────────────────────────────────────────
interface SeoPage {
  id: number;
  page_path: string;
  page_label: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  canonical: string;
  schema_json: string;
  updated_at: string;
}

const EMPTY: Omit<SeoPage, "id" | "updated_at"> = {
  page_path: "",
  page_label: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  og_image: "",
  canonical: "",
  schema_json: "",
};

// ── Quick-add suggestions ──────────────────────────────────────────────────
const PAGE_SUGGESTIONS = [
  { label: "Homepage", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Services", path: "/services" },
  { label: "IPO Blogs", path: "/ipo-blogs" },
  { label: "All IPOs", path: "/all-ipos" },
  { label: "SME IPOs", path: "/sme-ipos" },
  { label: "Mainline IPOs", path: "/mainline-ipos" },
  { label: "IPO Registrar List", path: "/ipo-registrar-list" },
  { label: "SME Merchant Bankers", path: "/merchant-bankers/list-of-sme-merchant-bankers" },
  { label: "Mainboard Merchant Bankers", path: "/merchant-bankers/list-of-mainboard-merchant-bankers" },
  { label: "IPO Process", path: "/ipo-process" },
  { label: "Pre-IPO Process", path: "/pre-ipo-process" },
  { label: "IPO Eligibility Check", path: "/ipo-eligibility-check" },
  { label: "IPO Knowledge Base", path: "/ipo-knowledge" },
  { label: "Career", path: "/career" },
  { label: "News", path: "/news" },
  { label: "Investors", path: "/investors" },
  { label: "Reports", path: "/daily-ipo-digest" },
  { label: "Service: SME IPO", path: "/services/sme-ipo-consultation" },
  { label: "Service: Mainline IPO", path: "/services/mainline-ipo-consultation" },
  { label: "Service: FPO", path: "/services/follow-on-public-offer-fpo" },
  { label: "Service: Pre-IPO Funding", path: "/services/pre-ipo-funding-services" },
  { label: "Service: Business Valuation", path: "/services/business-valuation" },
  { label: "Service: REIT", path: "/services/reit" },
  { label: "Service: Social Stock Exchange", path: "/services/social-stock-exchange" },
  { label: "Blogs (Article)", path: "/blogs" },
  { label: "Consultants", path: "/consultant" },
  { label: "SME IPO Sector", path: "/sme-ipo-sector" },
  { label: "Mainboard IPO Sector", path: "/mainboard-ipo-sector" },
];

// ── Char counter colour ───────────────────────────────────────────────────
const charColor = (len: number, max: number) =>
  len > max ? "text-red-500 font-bold" : len > max * 0.85 ? "text-amber-500" : "text-muted-foreground";

// ═══════════════════════════════════════════════════════════════════════════
const AdminSEO = () => {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [globalUploading, setGlobalUploading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [globalSeo, setGlobalSeo] = useState({ meta_title: "", meta_description: "", og_image: "", keywords: "" });
  const [globalSaving, setGlobalSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"pages" | "global">("pages");

  // ── Fetch page SEO list ─────────────────────────────────────────────────
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/seo-pages");
      const data = await res.json();
      setPages(data.data || []);
    } catch {
      toast.error("Failed to load SEO pages");
    } finally {
      setLoading(false);
    }
  };

  // ── Fetch global SEO ───────────────────────────────────────────────────
  const fetchGlobal = async () => {
    try {
      const res = await fetch("/api/seo");
      const data = await res.json();
      if (data && !data.error) setGlobalSeo(data);
    } catch {}
  };

  useEffect(() => { fetchPages(); fetchGlobal(); }, []);

  // ── Image upload ──────────────────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Max 2MB allowed"); return; }
    setUploading(true);
    const fd = new FormData();
    fd.append("folder", "seo");
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setForm(f => ({ ...f, og_image: url }));
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message);
    } finally { setUploading(false); }
  };

  // ── Global Image upload ───────────────────────────────────────────────
  const handleGlobalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Max 2MB allowed"); return; }
    setGlobalUploading(true);
    const fd = new FormData();
    fd.append("folder", "seo");
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setGlobalSeo(g => ({ ...g, og_image: url }));
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message);
    } finally { setGlobalUploading(false); }
  };

  // ── Save page SEO ────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.page_path.trim()) { toast.error("Page path is required"); return; }
    if (!form.meta_title.trim()) { toast.error("Meta title is required"); return; }
    setSaving(true);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `/api/seo-pages/${editId}` : "/api/seo-pages";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? "Updated!" : "Saved!");
        setShowForm(false);
        setEditId(null);
        setForm({ ...EMPTY });
        fetchPages();
      } else {
        toast.error(data.error || "Save failed");
      }
    } catch { toast.error("Error saving"); }
    finally { setSaving(false); }
  };

  // ── Delete page SEO ──────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this SEO entry?")) return;
    try {
      const res = await fetch(`/api/seo-pages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success("Deleted"); fetchPages(); }
      else toast.error(data.error);
    } catch { toast.error("Delete failed"); }
  };

  // ── Save global SEO ──────────────────────────────────────────────────
  const handleGlobalSave = async () => {
    setGlobalSaving(true);
    try {
      const res = await fetch("/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(globalSeo),
      });
      const data = await res.json();
      if (data.success) toast.success("Global SEO saved!");
      else toast.error(data.error || "Save failed");
    } catch { toast.error("Error"); }
    finally { setGlobalSaving(false); }
  };

  // ── Edit a page ──────────────────────────────────────────────────────
  const startEdit = (p: SeoPage) => {
    setEditId(p.id);
    setForm({
      page_path: p.page_path,
      page_label: p.page_label,
      meta_title: p.meta_title,
      meta_description: p.meta_description,
      meta_keywords: p.meta_keywords || "",
      og_image: p.og_image || "",
      canonical: p.canonical || "",
      schema_json: p.schema_json || "",
    });
    setShowForm(true);
    setShowSuggestions(false);
  };

  // ── Pick suggestion ──────────────────────────────────────────────────
  const pickSuggestion = (s: { label: string; path: string }) => {
    setForm(f => ({
      ...f,
      page_path: s.path,
      page_label: f.page_label || s.label,
      canonical: f.canonical || "",
    }));
    setShowSuggestions(false);
  };

  const filtered = pages.filter(p =>
    p.page_path.toLowerCase().includes(search.toLowerCase()) ||
    p.page_label.toLowerCase().includes(search.toLowerCase())
  );

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" /> SEO Manager
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage meta tags for every page — services, blogs, IPOs, and more
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeTab === "pages" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("pages")}
            >
              Page SEO
            </Button>
            <Button
              variant={activeTab === "global" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("global")}
            >
              Global / Homepage
            </Button>
          </div>
        </div>

        {/* ── GLOBAL TAB ──────────────────────────────────────────────── */}
        {activeTab === "global" && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-5 max-w-2xl">
            <p className="text-xs text-muted-foreground border-l-4 border-primary pl-3">
              Homepage aur fallback meta tags yahan set karein.
            </p>
            {[
              { label: "Meta Title *", key: "meta_title", max: 60, type: "input" },
              { label: "Meta Description *", key: "meta_description", max: 160, type: "textarea" },
              { label: "Keywords", key: "keywords", max: 300, type: "input" },
              { label: "OG Image URL", key: "og_image", max: 500, type: "image" },
            ].map(({ label, key, max, type }) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium">{label}</label>
                  <span className={`text-xs ${charColor((globalSeo as any)[key]?.length || 0, max)}`}>
                    {(globalSeo as any)[key]?.length || 0}/{max}
                  </span>
                </div>
                {type === "textarea" ? (
                  <Textarea rows={3} value={(globalSeo as any)[key] || ""} onChange={e => setGlobalSeo(g => ({ ...g, [key]: e.target.value }))} />
                ) : type === "image" ? (
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={globalSeo.og_image || ""}
                        onChange={e => setGlobalSeo(g => ({ ...g, og_image: e.target.value }))}
                        placeholder="https://… or upload below"
                      />
                      <label className={`flex items-center justify-center gap-2 h-9 cursor-pointer border-2 border-dashed rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors ${globalUploading ? "opacity-50 animate-pulse" : "border-border hover:border-primary"}`}>
                        <Upload className="w-4 h-4" />
                        {globalUploading ? "Uploading…" : "Upload Image (max 2MB)"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleGlobalUpload} disabled={globalUploading} />
                      </label>
                    </div>
                    <div className="w-24 h-16 rounded-lg border-2 border-border bg-muted overflow-hidden flex items-center justify-center flex-shrink-0">
                      {globalSeo.og_image ? (
                        <img src={getImageUrl(globalSeo.og_image)} alt="OG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                ) : (
                  <Input value={(globalSeo as any)[key] || ""} onChange={e => setGlobalSeo(g => ({ ...g, [key]: e.target.value }))} />
                )}
              </div>
            ))}
            <Button onClick={handleGlobalSave} disabled={globalSaving} className="w-full">
              {globalSaving ? "Saving..." : "Save Global SEO"}
            </Button>
          </div>
        )}

        {/* ── PAGES TAB ──────────────────────────────────────────────── */}
        {activeTab === "pages" && (
          <>
            {/* Toolbar */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by path or label…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <Button
                onClick={() => {
                  setEditId(null);
                  setForm({ ...EMPTY });
                  setShowForm(true);
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" /> Add Page SEO
              </Button>
            </div>

            {/* ── FORM ─────────────────────────────────────────────── */}
            {showForm && (
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 space-y-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-lg">{editId ? "Edit" : "Add"} Page SEO</h2>
                  <button onClick={() => { setShowForm(false); setEditId(null); }} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Path row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Page Path *</label>
                    <div className="relative">
                      <Input
                        value={form.page_path}
                        onChange={e => setForm(f => ({ ...f, page_path: e.target.value }))}
                        placeholder="/services/sme-ipo"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSuggestions(s => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Suggestions dropdown */}
                    {showSuggestions && (
                      <div className="absolute z-50 mt-1 bg-popover border border-border rounded-xl shadow-xl max-h-56 overflow-y-auto w-80">
                        {PAGE_SUGGESTIONS.filter(s =>
                          !pages.find(p => p.page_path === s.path && p.id !== editId)
                        ).map(s => (
                          <button
                            key={s.path}
                            type="button"
                            onClick={() => pickSuggestion(s)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center justify-between gap-2"
                          >
                            <span className="font-medium">{s.label}</span>
                            <span className="text-muted-foreground text-xs">{s.path}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">e.g. /services/sme-ipo or select from list ↑</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Page Label (Admin only)</label>
                    <Input
                      value={form.page_label}
                      onChange={e => setForm(f => ({ ...f, page_label: e.target.value }))}
                      placeholder="SME IPO Service Page"
                    />
                  </div>
                </div>

                {/* Meta title */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Meta Title *</label>
                    <span className={`text-xs ${charColor(form.meta_title.length, 70)}`}>
                      {form.meta_title.length}/70
                    </span>
                  </div>
                  <Input
                    value={form.meta_title}
                    onChange={e => setForm(f => ({ ...f, meta_title: e.target.value }))}
                    placeholder="SME IPO Consultation Services | India IPO"
                  />
                </div>

                {/* Meta description */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium">Meta Description</label>
                    <span className={`text-xs ${charColor(form.meta_description.length, 160)}`}>
                      {form.meta_description.length}/160
                    </span>
                  </div>
                  <Textarea
                    rows={3}
                    value={form.meta_description}
                    onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))}
                    placeholder="Expert SME IPO consultation and advisory services..."
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Keywords</label>
                  <Input
                    value={form.meta_keywords}
                    onChange={e => setForm(f => ({ ...f, meta_keywords: e.target.value }))}
                    placeholder="SME IPO, India IPO, BSE SME, NSE Emerge"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Comma separated</p>
                </div>

                {/* OG Image */}
                <div>
                  <label className="text-sm font-medium mb-2 block">OG Image</label>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <Input
                        value={form.og_image}
                        onChange={e => setForm(f => ({ ...f, og_image: e.target.value }))}
                        placeholder="https://… or upload below"
                      />
                      <label className={`flex items-center justify-center gap-2 h-9 cursor-pointer border-2 border-dashed rounded-lg text-sm text-muted-foreground hover:bg-muted/50 transition-colors ${uploading ? "opacity-50" : "border-border hover:border-primary"}`}>
                        <Upload className="w-4 h-4" />
                        {uploading ? "Uploading…" : "Upload Image (max 2MB)"}
                        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                      </label>
                    </div>
                    <div className="w-24 h-16 rounded-lg border-2 border-border bg-muted overflow-hidden flex items-center justify-center flex-shrink-0">
                      {form.og_image ? (
                        <img src={getImageUrl(form.og_image)} alt="OG Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Canonical */}
                <div>
                  <label className="text-sm font-medium mb-1 block">Canonical URL (optional)</label>
                  <Input
                    value={form.canonical}
                    onChange={e => setForm(f => ({ ...f, canonical: e.target.value }))}
                    placeholder="Leave blank — auto-generated from path"
                  />
                </div>

                {/* Schema JSON */}
                <div>
                  <label className="text-sm font-medium mb-1 block">JSON-LD Schema (optional)</label>
                  <Textarea
                    rows={4}
                    value={form.schema_json}
                    onChange={e => setForm(f => ({ ...f, schema_json: e.target.value }))}
                    placeholder='{"@context": "https://schema.org", "@type": "FAQPage", ...}'
                    className="font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Paste valid JSON-LD schema. Do not include {'<script>'} tags.</p>
                </div>

                {/* Google Preview */}
                <div className="bg-muted/40 border rounded-xl p-4 space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Google Preview</p>
                  <p className="text-blue-600 text-sm font-medium leading-tight truncate">
                    {form.meta_title || "Page Title Here"}
                  </p>
                  <p className="text-green-700 text-xs">
                    {BASE_URL.replace(/^https?:\/\//, '')}{form.page_path || "/page"}
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {form.meta_description || "Meta description will appear here…"}
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSave} disabled={saving} className="flex-1">
                    {saving ? "Saving…" : editId ? "Update" : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* ── TABLE ──────────────────────────────────────────────── */}
            {loading ? (
              <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm gap-2">
                <Globe className="w-10 h-10 opacity-20" />
                {search ? "No pages match your search" : "No page SEO configured yet — click 'Add Page SEO' above"}
              </div>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/60 border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="text-left px-4 py-3">Page</th>
                      <th className="text-left px-4 py-3 hidden md:table-cell">Meta Title</th>
                      <th className="text-left px-4 py-3 hidden lg:table-cell">Description</th>
                      <th className="text-left px-4 py-3 hidden sm:table-cell">OG Image</th>
                      <th className="text-right px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map(p => (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-foreground truncate max-w-[160px]">
                            {p.page_label || p.page_path}
                          </p>
                          <a
                            href={p.page_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-0.5"
                          >
                            {p.page_path} <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <p className="truncate max-w-[200px] text-foreground">{p.meta_title || "—"}</p>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <p className="truncate max-w-[220px] text-muted-foreground text-xs">{p.meta_description || "—"}</p>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {p.og_image ? (
                            <img
                              src={getImageUrl(p.og_image)}
                              alt="og"
                              className="w-12 h-8 rounded object-cover border border-border"
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Count */}
            {filtered.length > 0 && (
              <p className="text-xs text-muted-foreground text-right">
                {filtered.length} page{filtered.length !== 1 ? "s" : ""} configured
              </p>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSEO;