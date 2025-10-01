import { useEffect, useState } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQueryList = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    try {
      mediaQueryList.addEventListener("change", handler);
    } catch (_) {
      // Safari < 14 fallback
      mediaQueryList.addListener(handler);
    }
    setMatches(mediaQueryList.matches);
    return () => {
      try {
        mediaQueryList.removeEventListener("change", handler);
      } catch (_) {
        mediaQueryList.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
