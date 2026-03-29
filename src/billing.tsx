import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import './billing.css';
import { Link } from 'react-router-dom';

// 1. تعريف الأنواع لراحة TypeScript
interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    totalPrice: number;
}

interface Reservation {
    wing: string;
    date: string;
    totalGuests: number;
    totalPrice: number;
}

const Billing: React.FC = () => {
    // تحديد النوع صراحة لمنع خطأ 'never'
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('ocean_pearl_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [reservation, setReservation] = useState<Reservation | null>(() => {
        const savedRes = localStorage.getItem('ocean_pearl_reservation');
        return savedRes ? JSON.parse(savedRes) : null;
    });

    const containerRef = useRef(null);
    const emptyCartRef = useRef(null); // مرجع لشاشة العربة الفارغة

    // حساب ما إذا كانت العربة فارغة تماماً
    const isCartEmpty = useMemo(() => cartItems.length === 0 && !reservation, [cartItems, reservation]);

    // 2. كود الأنميشن (دخول الصفحة + تتابع الكروت)
    useEffect(() => {
        // أنميشن الحاوية الرئيسية
        if (containerRef.current) {
            gsap.fromTo(containerRef.current, 
                { 
                    opacity: 0, 
                    y: 50, 
                    scale: 0.98 
                }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 1.5, 
                    ease: "power4.out", 
                    delay: 0.2 
                }
            );
        }

        // أنميشن الكروت (تظهر واحد تلو الآخر) - يعمل فقط إذا وجدت عناصر
        if (!isCartEmpty) {
            gsap.fromTo(".luxe-item-card", 
                { 
                    opacity: 0, 
                    x: -20 
                }, 
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1, 
                    stagger: 0.1, 
                    ease: "back.out(1.7)", 
                    delay: 0.5 
                }
            );
        } 
    }, [isCartEmpty]);
   useEffect(() => {
    if (isCartEmpty && emptyCartRef.current) {
        // إنشاء الخط الزمني الرئيسي بسرعة متوسطة (1.8 ثانية مثالية للطفو)
        const tl = gsap.timeline({
            repeat: -1,
            yoyo: true,
            defaults: { 
                ease: "sine.inOut", // Sine يعطي أنعم حركة ممكنة للطفو
                duration: 1.8       // سرعة متوسطة: أسرع من 3 وأبطأ من 1.2
            } 
        });

        // 1. حركة الطبق: يطفو بهدوء مع ميلان جانبي بسيط جداً
        tl.to(".empty-luxe-platter", {
            y: -30,             
            rotationZ: 2,       // ميلان بسيط جداً للفخامة
            rotationX: 8,       // عمق 3D هادئ
            scale: 1.03,        
        }, 0);

        // 2. الظل: يتبع الحركة بنعومة فائقة
        tl.to(".platter-real-shadow", {
            scaleX: 0.7,        
            opacity: 0.15,       
            filter: "blur(18px)", 
            y: 10,              
        }, 0); 

        // 3. التوهج: يتنفس مع الطبق (Breathing Glow)
        tl.to(".platter-glow-effect", {
            scale: 1.3,
            opacity: 0.4,
            duration: 1.8,      
        }, 0);

        // ملاحظة: تم حذف الـ Micro-shiver (الهزة العشوائية) بناءً على طلبك
    }
}, [isCartEmpty]);



















    // 2. استخدام useMemo لحساب الإجمالي بدقة
    const subtotal = useMemo(() => {
        const cartTotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
        const reservationTotal = reservation ? reservation.totalPrice : 0;
        return cartTotal + reservationTotal;
    }, [cartItems, reservation]);

    const serviceFee = subtotal * 0.05;
    const finalTotal = subtotal + serviceFee;

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prevCart => {
            const updated = prevCart.map(item => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty, totalPrice: newQty * item.price };
                }
                return item;
            });
            localStorage.setItem('ocean_pearl_cart', JSON.stringify(updated));
            return updated;
        });
    };

    const removeItem = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('ocean_pearl_cart', JSON.stringify(updated));
    };

    const removeReservation = () => {
        setReservation(null);
        localStorage.removeItem('ocean_pearl_reservation');
    };

    return (
        <div className="billing-page-container" ref={containerRef}>
            <div className="luxury-overlay"></div> {/* خلفية متدرجة خفيفة */}
            
            <main className="billing-wrapper">
                {isCartEmpty ? (
                    /* --- بداية تصميم العربة الفارغة --- */
                    <section className="empty-cart-display-wrapper" ref={emptyCartRef}>
                        <div className="empty-luxe-platter-container">
                            <img 
                                src="./The-Cart-is-empty .png" 
                                alt="Imperial Golden Platter" 
                                className="empty-luxe-platter" 
                            />
                            <div className="platter-real-shadow"></div>
                        </div>
                        
                        <div className="empty-selection-meta">
                            <h2 className="empty-selection-heading">Your palate awaits its masterpiece.</h2>
                            <p className="empty-selection-text">
                                Design your signature selection on this empty imperial palette.
                                <br />
                                <span>Treasures from the Ocean Pearl are just a selection away.</span>
                            </p>
                            <Link to="/menu">
                            <button className="start-selection-btn" >
                                Explore Our Collection Now
                                <div className="btn-shine"></div>
                            </button>
                            </Link>
                        </div>
                    </section>
                    /* --- نهاية تصميم العربة الفارغة --- */
                ) : (
                    <>
                        <header className="billing-hero">
                            <div className="hero-content">
                                <span className="gold-tag">Private Concierge Collection</span>
                                <h1 className="luxury-title">
                                    Signature <span>Selection</span>
                                </h1>
                            </div>
                            <div className="hero-divider"></div>
                        </header>

                        <div className="billing-main-grid">
                            <section className="items-list-container">
                                <h1 className="section-label">Selected Treasures</h1>

                                {reservation && (
                                    <div className="luxe-item-card reservation">
                                        <button className="delete-icon" onClick={removeReservation}>Cancel</button>
                                        <div className="item-meta">
                                            <span className="type-label">Exclusive Booking</span>
                                            <h3>{reservation.wing}</h3>
                                            <p className="reservation-info">
                                                Scheduled for <span>{reservation.date}</span> with <span>{reservation.totalGuests} Guests</span>
                                            </p>
                                        </div>
                                        <span className="price">${reservation.totalPrice}</span>
                                    </div>
                                )}

                                <div className="products-scroll-area">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="luxe-item-card product">
                                            <button className="text-remove" onClick={() => removeItem(item.id)}>Remove</button>
                                            
                                            <div className="item-img-wrapper">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            
                                            <div className="item-meta">
                                                <h3>{item.name}</h3>
                                                <span className="unit-price">${item.price} / Essence unit</span>
                                            </div>

                                            <div className="luxe-stepper">
                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span className="qty-val">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>

                                            <span className="total-item-price">${item.totalPrice}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <aside className="billing-summary-sidebar">
                                <div className="summary-sticky-card">
                                    <h2 className="summary-heading">Investment Summary</h2>
                                    
                                    <div className="summary-details">
                                        <div className="detail-row">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Prestige Service (5%)</span>
                                            <span>${serviceFee.toFixed(2)}</span>
                                        </div>
                                        <div className="detail-row shipping">
                                            <span>Complimentary Shipping</span>
                                            <span className="free-tag">Free</span>
                                        </div>
                                    </div>

                                    <div className="total-grand-section">
                                        <span className="label">Total Amount</span>
                                        <span className="amount">${finalTotal.toFixed(2)}</span>
                                    </div>
                                    <Link to="/payment">
                                    <button className="confirm-payment-btn">
                                        <span>Proceed to Secure Payment</span>
                                        <div className="btn-shine"></div>
                                    </button>
                                    </Link>
                                    <p className="secure-note">🔒 Encrypted Secure Checkout</p>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Billing;