/**
 * GlobalCanonical
 *
 * Renders a baseline canonical <link> for every page using react-helmet-async.
 * When a page mounts its own <SEOHead canonicalPath="…"> the Helmet provider
 * deduplicates and the per-page value wins (last-write wins for <link rel="canonical">).
 *
 * This component lives inside <BrowserRouter> so it can read useLocation().
 */
import { Helmet } from "react-helmet-async";
import { useCanonicalUrl } from "@/hooks/useCanonicalUrl";

const GlobalCanonical = () => {
  const canonicalUrl = useCanonicalUrl();

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default GlobalCanonical;
