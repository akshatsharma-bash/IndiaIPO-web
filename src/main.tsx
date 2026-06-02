import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ Chunk/Lazy-load fail hota hai to auto-reload (white screen avoid)
const shouldReloadOnChunkError = (msg?: string) =>
    !!msg && msg.includes("Failed to fetch dynamically imported module");

window.addEventListener("error", (event: any) => {
    if (shouldReloadOnChunkError(event?.message)) {
        window.location.reload();
    }
});

window.addEventListener("unhandledrejection", (event: any) => {
    const message =
        event?.reason?.message || (typeof event?.reason === "string" ? event.reason : "");
    if (shouldReloadOnChunkError(message)) {
        window.location.reload();
    }
});

createRoot(document.getElementById("root")!).render(<App />);