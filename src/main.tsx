// import "@fontsource-variable/inter";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ✅ Global fetch interceptor to automatically attach Authorization header for API requests
const originalFetch = window.fetch;
window.fetch = async function (input, init) {
    let url = "";
    if (typeof input === "string") {
        url = input;
    } else if (input instanceof URL) {
        url = input.href;
    } else if (input && typeof input === "object" && "url" in input) {
        url = (input as any).url || "";
    }

    if (url.includes("/api/")) {
        const token = localStorage.getItem("token");
        if (token) {
            init = init || {};
            init.headers = init.headers || {};
            
            if (init.headers instanceof Headers) {
                if (!init.headers.has("Authorization")) {
                    init.headers.set("Authorization", `Bearer ${token}`);
                }
            } else if (Array.isArray(init.headers)) {
                const hasAuth = init.headers.some(([key]) => key.toLowerCase() === "authorization");
                if (!hasAuth) {
                    init.headers.push(["Authorization", `Bearer ${token}`]);
                }
            } else {
                const headersObj = init.headers as Record<string, string>;
                const hasAuth = Object.keys(headersObj).some(key => key.toLowerCase() === "authorization");
                if (!hasAuth) {
                    headersObj["Authorization"] = `Bearer ${token}`;
                }
            }
        }
    }
    return originalFetch.call(this, input, init);
};


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