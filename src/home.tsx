import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './home.css';
import { Link } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

function Home() {
  // --- Refs التعريفات ---

  const section1Ref = useRef<HTMLElement>(null);
  const leftBgRef = useRef<HTMLDivElement>(null);
  const rightBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroPlateRef = useRef<HTMLDivElement>(null);
  
  const section2Ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const section3Ref = useRef<HTMLDivElement>(null);
  const section3TitleRef = useRef<HTMLDivElement>(null);

  const section4Ref = useRef<HTMLDivElement>(null);
  const section4ContentRef = useRef<HTMLDivElement>(null);
  const section4ImageRef = useRef<HTMLImageElement>(null);
  // 1. أضف هذا الـ Ref في البداية
const scrollContainerRef = useRef<HTMLDivElement>(null);

// 2. أضف دالة الـ Scroll
const scrollByButton = (direction: 'left' | 'right') => {
  if (scrollContainerRef.current) {
    const scrollAmount = 350; // مقدار الإزاحة عند كل ضغطة
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

  useEffect(() => {
    // 1. حركة الماوس المخصص
    


    // --- أنميشن السيكشن الأول (عند التحميل) ---
// إنشاء جدول زمني (Timeline) لترتيب الحركات واحدة تلو الأخرى بشكل متسلسل
const tl1 = gsap.timeline();

tl1.fromTo(leftBgRef.current, 
  { x: '100%', opacity: 0 }, // القيمة الابتدائية: الخلفية البيضاء خارج الشاشة تماماً من اليسار مع اختفاء
  { 
    x: '0%',               // القيمة النهائية: العودة لمكانها الأصلي في المنتصف
    opacity: 1,            // ظهور كامل
    duration: 2,         // مدة الحركة ثانية ونصف
    ease: "power3.out"       // نوع الحركة: انسيابية جداً (تبدأ سريعة وتنتهي ببطء شديد)
  }
)
.fromTo(rightBgRef.current, 
  { x: '-100%', opacity: 0 }, // القيمة الابتدائية: الخلفية السوداء خارج الشاشة تماماً من اليمين مع اختفاء
  { 
    x: '0%',               // القيمة النهائية: العودة لمكانها الأصلي في المنتصف
    opacity: 1,            // ظهور كامل
    duration: 2,         // نفس مدة حركة الجزء الأيسر للتزامن
    ease: "power3.out"       // نفس نوع الانسيابية
  }, 
  "<"                      // علامة الـ (Less Than): تعني "ابدأ هذه الحركة مع بداية الحركة التي تسبقها مباشرة"
)
.fromTo(heroTextRef.current, 
  { 
    opacity: 0,            // البداية: مختفي تماماً
    y: 30,                 // البداية: نازل لأسفل بمقدار 30 بكسل
    filter: "blur(10px)"   // البداية: تأثير ضبابي قوي (فخامة سينمائية)
  }, 
  { 
    opacity: 1,            // النهاية: ظاهر تماماً
    y: 0,                  // النهاية: العودة لمكانه الطبيعي (يرتفع للأعلى ببطء)
    filter: "blur(0px)",   // النهاية: وضوح تام واختفاء الضباب
    duration: 2.5,         // مدة الظهور ثانية وجزئين
    ease: "power3.out"     // نوع الحركة: خروج قوي وناعم
  }, 
  "-=0.5"                  // الـ Offset: ابدأ هذا الأنميشن قبل نهاية الأنميشن السابق بـ 0.5 ثانية (تداخل)
)
.fromTo(heroPlateRef.current, 
  { 
    x: '100%',             // البداية: الطبق خارج الشاشة تماماً من اليمين
    opacity: 0,            // البداية: مختفي
    rotate: 20,            // البداية: مائل بزاوية 20 درجة
    scale: 0.8             // البداية: حجمه أصغر (80%) ليعطي إحساس بالعمق
  }, 
  { 
    x: '0%',               // النهاية: العودة لمكانه الطبيعي في اليسار
    opacity: 1,            // النهاية: ظهور كامل
    rotate: 0,             // النهاية: اعتدال الزاوية تماماً
    scale: 1,              // النهاية: العودة للحجم الطبيعي (100%)
    duration: 3,         // مدة طويلة نسبياً ليعطي إحساساً بوزن الطبق وفخامته
    ease: "power4.out"     // نوع الحركة: حركة فيزيائية ناعمة جداً
  }, 
  "<"                      // ابدأ حركة الطبق مع بداية ظهور النص في نفس اللحظة
);

    // --- أنميشن السيكشن الثاني (Video Section) ---
    gsap.fromTo(section2Ref.current, 
      { opacity: 0, y: 100 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 80%",
          toggleActions: "play none none none"
        } 
      }
    );

    // --- أنميشن السيكشن الثالث (Menu Selection) ---
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: section3Ref.current,
        start: "top 50%",
        toggleActions: "play none none none"
      }
    });

    tl3.fromTo(section3TitleRef.current, 
         { y: -50, opacity: 0, filter: "blur(5px)" }, 
         { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 }
       )
       .fromTo(".section3-item", 
         { y: 80, opacity: 0, scale: 0.9 }, 
         { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "power4.out" }, 
         "-=0.4"
       );

    // --- أنميشن السيكشن الرابع (Luxury CTA) - لمستنا الفخمة الجديدة ---
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: section4Ref.current,
        start: "top 60%", // يبدأ عندما يقترب السيكشن من الظهور
        toggleActions: "play none none none"
      }
    });

    tl4.fromTo(section4Ref.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(section4ImageRef.current, 
      { scale: 1.3, opacity: 0, y: 50 }, 
      { scale: 1, opacity: 1, y: 0, duration: 2, ease: "power2.out" }, 
      "0" // يبدأ مع بداية التايم لاين
    )
    .fromTo(section4ContentRef.current, 
      { y: 100, opacity: 0, filter: "blur(15px)" }, 
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }, 
      "-=1.5"
    )
    .fromTo(".gold-btn-section4", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, 
      "-=0.8"
    );

    return () => {
      
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="home-container">

      {/* Section 1: Hero */}
      <section ref={section1Ref} className="home-continer-section1">
        <div className="background">
          <div ref={rightBgRef} className="right"></div>
          <div ref={leftBgRef} className="left"></div>
        </div>
        <div ref={heroTextRef} className="section1-text">
          <h1 className="text-home-section1">
            <span className="text-white">OCEAN</span> 
            <span className="text-gold"> PEARL</span>
          </h1>
          <p className="text-gold-p">Authentic Artistry</p>
        </div>
        <div ref={heroPlateRef} className="dish-section1">
          <img src="/dish.png" alt="Signature Sushi" className="dish-section1-img" />
        </div>
      </section>

      {/* Section 2: Video */}
      <section ref={section2Ref} className="home-container-section2">
        <div className="video-container-section2">
          <video 
            ref={videoRef}
            src="/02177287268058700000000000000000000ffffc0a8ac5dabe60f.mp4" 
            muted autoPlay loop playsInline 
            className="autoplay-video"
          ></video>
          <div className="video-overlay-section2">
            <div className="overlay-content">
               <span className="overlay-line"></span>
               <h2 className="video-overlay-text-section2">The Art of the Blade</h2>
               <span className="overlay-line"></span>
            </div>
          </div>
        </div>
      </section>

     {/* Section 3: Signature Selection */}
      <div ref={section3Ref} className="home-container-section3">
        <div ref={section3TitleRef} className="text-center-section3">
          <h3 className="section3-title">Chef's Signature</h3>
          <div className="section3-underline"></div>
          {/* أزرار التحكم الفخمة - تظهر فقط في الشاشات الصغيرة عبر CSS */}
    <div className="section3-scroll-controls">
      <button onClick={() => scrollByButton('left')} className="scroll-btn left">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button onClick={() => scrollByButton('right')} className="scroll-btn right">
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
        </div>

        <div  ref={scrollContainerRef} className="section3-plates-grid">
          <div className="section3-item">
            <div className="section3-photo-wrapper">
              <img src="/dish1.png" alt="Dish 1" className="section3-img" />
            </div>
            <div className="section3-info">
              <h4 className="section3-item-name">Oarfish Sashimi</h4>
              <span className="section3-item-ingredients">Yuzu • Truffle • Gold Leaf</span>
              <p className="section3-item-price">$120.00</p>
            </div>
          </div>

          <div className="section3-item">
            <div className="section3-photo-wrapper">
              <img src="/dish2.png" alt="Dish 2" className="section3-img" />
            </div>
            <div className="section3-info">
              <h4 className="section3-item-name">Black Pearl Risotto</h4>
              <span className="section3-item-ingredients">Squid Ink • Scallops • Saffron</span>
              <p className="section3-item-price">$95.00</p>
            </div>
          </div>

          <div className="section3-item">
            <div className="section3-photo-wrapper">
              <img src="/dish3.png" alt="Dish 3" className="section3-img" />
            </div>
            <div className="section3-info">
              <h4 className="section3-item-name">Imperial Wagyu</h4>
              <span className="section3-item-ingredients">A5 Grade • Asparagus • Red Wine</span>
              <p className="section3-item-price">$185.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Luxury CTA - الأنميشن المضاف هنا */}
      <div ref={section4Ref} className="home-container-section4">
        <img 
          ref={section4ImageRef}
          src="/Gemini_Generated_Image_6iqxc86iqxc86iqx_no_bg.png" 
          className="section4-bg-silk" 
          alt="Luxury Texture" 
        />
        <div ref={section4ContentRef} className="section4-content">
          <p className="section4-subtitle">Reserve Your Table</p>
          <h2 className="section4-title">An Unforgettable Culinary Journey Awaits</h2>
          <div className="section4-buttons">
            <Link to="/taple">
            <button className="gold-btn-section4">Reserve a table</button>
            </Link>
            <Link to="/menu" >
            <button className="gold-btn-section4 btn-dark">View Full Menu</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer-container">
        <div className="footer-brand-section">
          <img src="/family-group.png" className="footer-logo" alt="Family-Group" />
          <h2 className="footer-company-name">FAMILY-GROUP</h2>
        </div>

        <div className="footer-social-section">
          <a href="https://www.linkedin.com/in/family-group-69a419395" className="social-link-item"><i className="fab fa-linkedin-in"></i><span>LinkedIn</span></a>
          <a href="https://x.com/FamilyGroup8320" className="social-link-item"><i className="fab fa-x-twitter"></i><span>X-Platform</span></a>
          <a href="https://github.com/family50" className="social-link-item"><i className="fab fa-github"></i><span>GitHub</span></a>
          <a href="https://www.tiktok.com/@familygroup974" className="social-link-item"><i className="fab fa-tiktok"></i><span>Journal</span></a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=familygroup832005@gmail.com" className="social-link-item"><i className="fas fa-envelope"></i><span>Contact</span></a>
        </div>

        <p className="footer-description">
          “Where code meets craftsmanship. <span>FAMILY-GROUP</span> architects the digital identities 
          of tomorrow, ensuring that every pixel of <span>Ocean Pearl</span> resonates 
          with absolute excellence.”
        </p>

        <div className="footer-bottom-bar">
          <span className="footer-copyright">© 1447 Ocean Pearl — All Rights Reserved</span>
          <span className="footer-location-tag">CRAFTED IN EGYPT • BEYOND STANDARDS</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;