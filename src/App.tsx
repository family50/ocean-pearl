import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
import AssetPreloader from './dateloding'; // المكون الجديد اللي أنشأناه

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // تحديث ScrollTrigger بمجرد انتهاء التحميل لضمان حساب المسافات صح
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          {/* المكون ده بيحمل الصور والفيديوهات في الخلفية */}
          <AssetPreloader onComplete={() => setIsLoading(false)} />
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
    </>
  );
}

export default App;