import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// --- إضافة استيرادات المكتبة هنا ---
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { LoadingProvider } from './LoadingProvider';
// استيراد المكونات
import ScrollToTop from './ScrollToTop';
import Home from './home.tsx';
import Header from './header.tsx';
import Menu from './menu';
import Apout from './apout'; 
import Taple from './taple';
import Billing from './billing';
import Products from './productss';
import SingleProduct from './single-product';
import CustomCursor from './mouth'; 
import Payment from './Payment';
import Loading from './loding';

// استيراد المكون الجديد وملف البيانات
import AssetPreloader from './dateloding'; // تأكد من أن الاسم يطابق اسم الملف الجديد
import { PAGE_ASSETS } from './assetsData';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // 1. استخدام useCallback لمنع إعادة إنشاء الدالة في كل رندر
  // ده بيحل مشكلة الـ ESLint Warning وبيمنع الـ Preloader من إعادة التشغيل
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // 2. تحديث ScrollTrigger بمجرد انتهاء التحميل
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
  <SkeletonTheme 
  baseColor="#0f1115"       /* لون الخلفية الثابتة (مثلاً كحلي غامق جداً أو أسود ملكي) */
  highlightColor="#1a1d23"  /* لون اللمعة اللي بتتحرك (لازم يكون أفتح سيكة من الأساسي) */
>
    <LoadingProvider isLoading={isLoading}>
      {isLoading ? (
        <>
          {/* المكون الجديد: بنمرر له صور الصفحة الرئيسية فقط للسرعة */}
          <AssetPreloader 
            assets={PAGE_ASSETS.HOME} 
            onComplete={handleLoadingComplete} 
            minWaitTime={3000} // وقت عرض شاشة الـ Loading بالفخامة المطلوبة
          />
          {/* صفحة الـ Loading اللي المستخدم بيشوفها */}
          <Loading />
        </>
      ) : (
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <Header /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/productss/:categoryName" element={<Products />} />
            <Route path="/single-product/:productId" element={<SingleProduct />} />
            <Route path="/about" element={<Apout />} />
            <Route path="/taple" element={<Taple />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Router>
        
      )}
      </LoadingProvider>
      </SkeletonTheme>
    </>
  );
}

export default App;