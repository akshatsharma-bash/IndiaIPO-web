import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MerchantBankersPage from "./MerchantBankers";
import MainboardBankersPage from "./MainboardBankers";
import { Loader2 } from "lucide-react";

const MerchantBankersRouter = () => {
  const { category } = useParams<{ category: string }>();
  const [type, setType] = useState<"SME" | "Mainboard" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    
    // Default routes
    if (category === "list-of-mainboard-merchant-bankers") {
      setType("Mainboard");
      setLoading(false);
      return;
    }
    if (category === "list-of-sme-merchant-bankers") {
      setType("SME");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/banker-subcategories")
      .then(res => res.json())
      .then(data => {
        const cats = data.data || [];
        const cat = cats.find((c: any) => c.slug === category);
        if (cat && cat.type === "mainboard") {
          setType("Mainboard");
        } else {
          setType("SME"); // Default to SME if not found or is SME
        }
      })
      .catch(() => setType("SME"))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (type === "Mainboard") {
    return <MainboardBankersPage />;
  }

  // Pass type="SME" explicitly so it doesn't crash
  return <MerchantBankersPage type="SME" />;
};

export default MerchantBankersRouter;
