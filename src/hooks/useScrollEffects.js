import { useState, useEffect, useRef } from "react";

export default function useScrollEffects() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [calcTimestamp, setCalcTimestamp] = useState(0);
  const resultsRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);
      setShowBackToTop(scrollY > 300);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (calcTimestamp !== 0 && resultsRef.current) {
      const offset = 300;
      const elementTop =
        resultsRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - offset, behavior: "smooth" });
    }
  }, [calcTimestamp]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    scrolled,
    showBackToTop,
    scrollToTop,
    calcTimestamp,
    setCalcTimestamp,
    resultsRef,
  };
}
