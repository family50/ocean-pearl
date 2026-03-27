import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ScrollToTop from './ScrollToTop'; // 1. استيراد المكون الذي أنشأته
import Home from './home.tsx';
import Header from './header.tsx';
import Menu from './menu';
import Apout from './apout'; 
import Taple from './taple';
import Billing from './billing';
import Products from './productss';
import SingleProduct from './single-product';
import CustomCursor from './mouth'; // حسب مسار الملف عندك
import Payment from './Payment'
import Loading from './loding';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // نحدد الحد الأدنى للوقت (مثلاً 2 ثانية)
    const minTime = new Promise(resolve => setTimeout(resolve, 2000));
    
    // نحدد وقت انتهاء تحميل موارد الصفحة بالكامل
    const pageLoaded = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', resolve);
      }
    });

    // عندما ينتهي الاثنان معاً (التحميل + مرور الوقت)
    Promise.all([minTime, pageLoaded]).then(() => {
      setIsLoading(false);
    });

    return () => window.removeEventListener('load', () => {});
  }, []);
// في ملف App.tsx
useEffect(() => {
  if (!isLoading) {
    // ننتظر قليلاً للتأكد من أن الـ DOM قد استقر
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  }
}, [isLoading]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <Header /> 
          <Routes>
            {/* مساراتك هنا */}
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
    </>
  );
}
export default App;