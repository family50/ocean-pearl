// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

 function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. إيقاف أي أنميشن سكرول معرف في الـ CSS قسرياً
    document.documentElement.style.scrollBehavior = "auto";
    
    // 2. التصفير اللحظي
    window.scrollTo(0, 0);
    
    // 3. (اختياري) إعادة الوضع كما كان بعد فترة قصيرة جداً إذا كنت تحتاجه في أماكن أخرى
    const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = ""; 
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
export default ScrollToTop;