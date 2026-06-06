

import { useEffect, useState, useCallback } from "react";

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export interface UseRecaptchaOptions {
  lazy?: boolean;
}

export function useRecaptcha(options?: UseRecaptchaOptions) {
  const [isReady, setIsReady] = useState(false);

  const hideBadge = () => {
    const style = document.createElement("style");
    style.id = "recaptcha-badge-hide";
    style.textContent = `.grecaptcha-badge { visibility: hidden !important; opacity: 0 !important; }`;
    if (!document.getElementById("recaptcha-badge-hide")) {
      document.head.appendChild(style);
    }
  };

  const loadRecaptcha = useCallback(() => {
    if (!SITE_KEY) return;

    // Agar script already loaded hai toh skip
    if (document.getElementById("recaptcha-v3-script")) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => setIsReady(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "recaptcha-v3-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
          // Badge hide karo (invisible mode)
          hideBadge();
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!options?.lazy) {
      loadRecaptcha();
    }
  }, [options?.lazy, loadRecaptcha]);

  const waitForRecaptcha = (): Promise<void> => {
    return new Promise((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve());
      } else {
        const interval = setInterval(() => {
          if (window.grecaptcha) {
            clearInterval(interval);
            window.grecaptcha.ready(() => resolve());
          }
        }, 100);
        // Timeout after 10 seconds to avoid infinite loop
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, 10000);
      }
    });
  };

  /**
   * reCAPTCHA token generate karo form submit se pehle
   * @param action - Form ka naam (lowercase, underscore), e.g. 'contact_form'
   * @returns token string ya null (agar error)
   */
  const getToken = useCallback(
    async (action: string): Promise<string | null> => {
      if (!SITE_KEY) {
        console.warn("⚠️ VITE_RECAPTCHA_SITE_KEY not set in .env");
        return null;
      }
      try {
        loadRecaptcha();
        await waitForRecaptcha();
        if (!window.grecaptcha) {
          throw new Error("grecaptcha not loaded");
        }
        const token = await window.grecaptcha.execute(SITE_KEY, { action });
        return token;
      } catch (err) {
        console.error("reCAPTCHA token generation failed:", err);
        return null;
      }
    },
    [loadRecaptcha]
  );

  return { getToken, isReady, loadRecaptcha };
}
