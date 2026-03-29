import React, {  useRef } from 'react';
import { useParams } from 'react-router-dom';
import type { MenuItem, MenuCategory } from './Products';
import { menuData } from './Products';
import gsap from 'gsap';
import './single-product.css';
import { useLayoutEffect } from 'react'; // تأكد من استيرادها
import LuxeMedia from './LuxeMedia';

const SingleProduct: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
const [isAdded, setIsAdded] = React.useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // البحث عن المنتج في قاعدة البيانات
const product = menuData
    .flatMap((category: MenuCategory) => category.items) // تحديد نوع category
    .find((item: MenuItem) => item.id === Number(productId)); // تحديد نوع item
// ... داخل المكون وقبل الـ return
useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // أنميشن الكارت الرئيسي
        gsap.fromTo(cardRef.current, 
            { 
                opacity: 0, 
                y: 50, 
                scale: 0.95,
                filter: "blur(10px)" // تأثير ضبابي يختفي تدريجياً
            }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                filter: "blur(0px)",
                duration: 1.2, 
                ease: "power4.out",
                clearProps: "all" // تنظيف الخصائص بعد الانتهاء لضمان عمل الـ CSS Responsive
            }
        );

        // أنميشن داخلي لمحتويات النص (اختياري لزيادة الفخامة)
        gsap.from(".product-content-side > *", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1, // ظهور العناصر واحد تلو الآخر
            ease: "power2.out",
            delay: 0.5 // يبدأ بعد ظهور الكارت قليلاً
        });
    }, cardRef);

    return () => ctx.revert(); // تنظيف الأنميشن عند الخروج
}, []);
  

const handleAddToCart = () => {
    if (!product || isAdded) return;

    type CartItem = MenuItem & { quantity: number; totalPrice: number };
    const existingCart: CartItem[] = JSON.parse(localStorage.getItem('ocean_pearl_cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === product.id);

    if (existingItemIndex > -1) {
        const item = existingCart[existingItemIndex];
        item.quantity += 1;
        item.totalPrice = item.quantity * product.price;
    } else {
        const newItem: CartItem = { ...product, quantity: 1, totalPrice: product.price };
        existingCart.push(newItem);
    }

    localStorage.setItem('ocean_pearl_cart', JSON.stringify(existingCart));

    // --- الأنميشن الجديد ---
    setIsAdded(true); // تغيير النص والأيقونة
    
    const tl = gsap.timeline();
    tl.to(".buy-btn-luxe", { 
        backgroundColor: "#28a745", // لون أخضر فخم
        scale: 1.05, 
        duration: 0.3 
    })
    .to(".buy-btn-luxe", { 
        scale: 1, 
        duration: 0.2, 
        ease: "back.out" 
    });

    // إعادة الزر لوضعه الطبيعي بعد ثانيتين
    setTimeout(() => {
        setIsAdded(false);
        gsap.to(".buy-btn-luxe", { backgroundColor: "#C6A75C", duration: 0.5 });
    }, 2000);
};
    if (!product) return <div className="error-luxe">Product Not Found</div>;
    

    return (
        <div className="single-product-wrapper">

            <div className="main-product-card" ref={cardRef}>
                {/* الجانب الأيسر: المحتوى النصي */}
                <div className="product-content-side">
                    <span className="luxe-category-label">Royal Selection</span>
                    <h1 className="product-main-title">{product.name}</h1>
                    <p className="product-main-desc">{product.description}</p>
                    
                    <div className="ingredients-section">
                        <h3>Detailed Composition</h3>
                        <ul className="ingredients-list-gold">
                            {product.detailedIngredients?.map((ing: string, i: number) => (
                               <li key={i}>{ing}</li>
                             ))}
                        </ul>
                    </div>

                    <div className="price-action-area">
                       <div className="price-tag-luxe">
    <span className="currency-symbol">$</span>
    <span className="price-number">{product.price}</span>
    <span className="price-decimal">.00</span>
</div>
<button className={`buy-btn-luxe ${isAdded ? 'success' : ''}`} onClick={handleAddToCart}>
    {isAdded ? (
        <>
            <i className="fa-solid fa-check" style={{ marginRight: '8px' }}></i>
            Added to Collection
        </>
    ) : (
        "Experience This Jewel"
    )}
</button>
                    </div>
                </div>

                {/* الجانب الأيمن: الصورة */}
                <div className="product-visual-side">
                    <div className="image-gold-frame">
                        <LuxeMedia src={product.image} alt={product.name} className="product-primary-img" />
                        {product.highlight && <div className="floating-badge">{product.highlight}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;