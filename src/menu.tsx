import React, { useEffect, useRef } from 'react';
import "./menu.css";
import { menuData } from './Products'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'; // استيراد Navigate
// تسجيل الـ Plugin الخاص بالتمرير
gsap.registerPlugin(ScrollTrigger);

const Menu: React.FC = () => {
   
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
   const navigate = useNavigate();
    useEffect(() => {
      
       

        // 1. حركة الماوس


        // 2. أنيميشن الـ Header عند دخول الصفحة
        // القيمة الابتدائية: فوق الشاشة بـ 50px ومخفي
        // القيمة النهائية: مكانه الطبيعي وظاهر بالكامل
        gsap.fromTo(headerRef.current, 
            { y: -50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
        );

        // 3. أنيميشن الكروت عند التمرير (ScrollTrigger) - يظهر مرة واحدة فقط
cardsRef.current.forEach((card) => {
    
    if (card) {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 100, 
                scale: 0.9 
            }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 1.2, // مدة الأنيميشن
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 75%", // يبدأ أول ما الكارت يدخل الشاشة بنسبة بسيطة
                    // ✅ السر هنا: toggleActions بتحدد إيه اللي يحصل في أربع حالات:
                    // (الدخول، الخروج، العودة مرة تانية، الخروج من فوق)
                    // play none none none تعني: "شغّل الأنيميشن مرة واحدة ولا تفعل شيئاً في باقي الحالات"
                    toggleActions: "play none none none",
                    // أو يمكنك استخدام once: true كبديل أسهل
                    once: true 
                }
            }
        );
    }
});

        return () => {
        
            ScrollTrigger.getAll().forEach(t => t.kill()); // تنظيف الـ Triggers
        };
    }, []);

    return (
        <div className="menu-page-container">
           

            {/* أضفنا الـ Ref للهيدر هنا */}
            <div className="menu-header" ref={headerRef}>
                <h1 className="royal-title">The Royal Menu</h1>
                <div className="title-divider">
                    <span className="line"></span>
                    <i className="fas fa-anchor gold-icon"></i>
                    <span className="line"></span>
                </div>
                <p className="menu-subtitle">Explore the depths of culinary perfection</p>
            </div>

            <section className="categories-grid">
                {menuData.map((category, index) => (
                  <div className="category-card" key={index} ref={(el) => { cardsRef.current[index] = el; }}>
                        <div className="card-image-wrapper">
                            <img 
                                src={category.categoryImage} 
                                alt={category.categoryName} 
                                className="category-img" 
                            />
                            <div className="image-overlay"></div>
                            
                            <div className="category-info">
                                <div className="icon-box">
                                    <i className={category.categoryIcon}></i>
                                </div>
                                <div className='text-category-info1'>
                                <h3>{category.categoryName}</h3>
                                <p className="tagline">{category.categoryTagline}</p>
                                </div>
                              <button 
                            className="explore-btn" 
                            onClick={() => navigate(`/productss/${category.categoryName}`)}
                        >
                            Explore Collection
                            <span className="btn-line"></span>
                        </button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Menu;