import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Download, ExternalLink, Fullscreen, Loader2, Share2, BookOpen, X, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getImageUrl } from "@/lib/utils";

interface Magazine {
  id: string;
  title: string;
  pdf: string;
  language: string;
  pdf_lock: boolean | number;
  report_images: string;
  created_at?: string;
}

const MagazineViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMagazine = async () => {
      try {
        const res = await fetch(`/api/magazines/${id}`);
        if (!res.ok) throw new Error("Magazine not found");
        const data = await res.json();
        
        if (Number(data.pdf_lock) === 1) {
          toast.error("This is a premium edition. Please subscribe to view.");
          navigate("/ipo-world-magazine");
          return;
        }
        
        setMagazine(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load magazine");
        navigate("/ipo-world-magazine");
      } finally {
        setLoading(false);
      }
    };

    fetchMagazine();
  }, [id, navigate]);

  // Handle ESC key to exit full screen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium">Preparing your edition...</p>
      </div>
    );
  }

  if (!magazine) return null;

  const pdfUrl = getImageUrl(magazine.pdf);

  return (
    <div className={`min-h-screen bg-[#F8FAFC] flex flex-col ${isFullScreen ? 'overflow-hidden fixed inset-0 z-[100]' : ''}`}>
      <SEOHead 
        title={`${magazine.title} | IPO World Magazine`}
        description={`Read the ${magazine.language} edition of ${magazine.title}. Exclusive IPO insights and analysis.`}
      />
      
      {!isFullScreen && <Header />}

      <main className={`flex-grow flex flex-col ${isFullScreen ? 'h-screen' : ''}`}>
        {/* Reader Toolbar - Hide in full screen or show a mini version */}
        {!isFullScreen && (
          <div className="bg-white border-b border-border sticky top-[68px] z-30 py-3 shadow-sm">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="rounded-lg hover:bg-slate-100"
                >
                  <Link to="/ipo-world-magazine">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Link>
                </Button>
                <div className="h-6 w-px bg-border hidden sm:block" />
                <div>
                  <h1 className="text-sm md:text-base font-bold text-[#001529] line-clamp-1 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    {magazine.title}
                  </h1>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                    {magazine.language} Edition
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-lg gap-2 border-border"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: magazine.title,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link copied to clipboard");
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden md:inline">Share</span>
                </Button>
                
                <Button 
                  className="bg-[#001529] hover:bg-[#002a52] text-white rounded-lg gap-2"
                  size="sm"
                  onClick={() => window.open(pdfUrl, '_blank')}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden md:inline">Download PDF</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Viewer Container */}
        <div className={`flex-grow ${isFullScreen ? 'p-0' : 'container mx-auto px-4 py-8 max-w-6xl'}`}>
           <div 
             ref={iframeRef}
             className={`bg-white shadow-2xl overflow-hidden border border-border relative group transition-all duration-500 ${
               isFullScreen 
                ? 'w-full h-full border-none rounded-none' 
                : 'rounded-2xl h-[80vh] md:h-[90vh]'
             }`}
           >
              <iframe 
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full border-none"
                title={magazine.title}
              />
              
              {/* Full Screen Toggle Button */}
              <div className={`absolute bottom-6 right-6 transition-opacity ${isFullScreen ? 'opacity-40 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <Button 
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="bg-white/90 backdrop-blur text-[#001529] hover:bg-white border shadow-xl rounded-full px-6 py-6"
                >
                  {isFullScreen ? (
                    <>
                      <Minimize className="h-4 w-4 mr-2" />
                      Exit Full Screen
                    </>
                  ) : (
                    <>
                      <Maximize className="h-4 w-4 mr-2" />
                      View Full Screen
                    </>
                  )}
                </Button>
              </div>

              {/* Close Button in Full Screen */}
              {isFullScreen && (
                <button 
                  onClick={() => setIsFullScreen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
           </div>
           
           {!isFullScreen && (
             <div className="mt-8 text-center text-muted-foreground text-sm pb-10">
               <p>Having trouble viewing? <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Click here to open PDF directly</a></p>
             </div>
           )}
        </div>
      </main>

      {!isFullScreen && <Footer />}
    </div>
  );
};

export default MagazineViewer;

