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
    // محاكاة وقت التحميل أو انتظار تحميل الصور والبيانات
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 ثانية كحد أدنى لضمان رؤية البراندينج
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      {/* الماوس المخصص هنا ليكون فوق كل الصفحات */}
    
      
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