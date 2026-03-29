import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import './Payment.css';
import { Link } from 'react-router-dom';
import LuxeMedia from './LuxeMedia';
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const Payment: React.FC = () => {
    // 1. الحالة (States)
    const [cartItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('ocean_pearl_cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [hasReservation] = useState<boolean>(() => {
        return !!localStorage.getItem('ocean_pearl_reservation');
    });

    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [transactionId, setTransactionId] = useState<string>('');
    const [formData, setFormData] = useState({
        fullName: '', address: '', phonePrimary: '', 
        phoneSecondary: '', cardNumber: '', cardExpiry: '', cardCVC: ''
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    // 2. المراجع (Refs) - تم تصحيح التكرار هنا
    const invoiceRef = useRef<HTMLDivElement>(null);
    const emptyCartRef = useRef<HTMLDivElement>(null);
    const mainBoxRef = useRef<HTMLDivElement>(null);

    // 3. حسبة السعر الإجمالي
    const totalPrice = useMemo(() => {
        const storedRes = localStorage.getItem('ocean_pearl_reservation');
        const resPrice = storedRes ? (JSON.parse(storedRes).totalPrice || 0) : 0;
        const itemsPrice = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
        return itemsPrice + resPrice;
    }, [cartItems]);

    // 4. الأنميشن الرئيسي (ظهور الصفحة)
    useEffect(() => {
        // أنميشن نموذج الدفع
        if (mainBoxRef.current && !isPaid) {
            gsap.fromTo(mainBoxRef.current, 
                { opacity: 0, y: 40, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "power4.out", delay: 0.2 }
            );
            gsap.fromTo(".payment-side", 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.5, stagger: 0.3, ease: "power3.out", delay: 0.5 }
            );
        }

        // أنميشن العربة الفارغة
        if (emptyCartRef.current && cartItems.length === 0 && !hasReservation) {
            gsap.fromTo(".luxury-stack-wrapper > *", 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2, stagger: 0.4, ease: "expo.out" }
            );
            gsap.to(".static-hero-card", {
                y: -15, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut"
            });
        }
    }, [cartItems.length, hasReservation, isPaid]);

    // 5. أنميشن الفاتورة الفخم (عند النجاح فقط)
    useEffect(() => {
        if (isPaid && invoiceRef.current) {
            gsap.fromTo(invoiceRef.current, 
                { opacity: 0, scale: 0.9, y: 50 },
                { opacity: 1, scale: 1, y: 0, duration: 2.2, ease: "expo.out" } // انسيابية عالية
            );
        }
    }, [isPaid]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handlePayment = () => {
        const required = ['fullName', 'address', 'phonePrimary', 'cardNumber', 'cardExpiry', 'cardCVC'];
        const newErrors: Record<string, boolean> = {};
        required.forEach(f => { if (!formData[f as keyof typeof formData]) newErrors[f] = true; });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            gsap.to(".main-payment-box", { x: -4, duration: 0.1, repeat: 4, yoyo: true });
            return;
        }

        const id = "LNR-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setTransactionId(id);

        gsap.to(".main-payment-box", { 
            opacity: 0, 
            scale: 0.95, 
            y: -20,
            duration: 0.8, 
            ease: "power2.in",
            onComplete: () => {
                setIsPaid(true);
                localStorage.removeItem('ocean_pearl_cart');
                localStorage.removeItem('ocean_pearl_reservation');
            }
        });
    };

    const formatCurrency = (amount: number) => amount.toLocaleString('en-US') + ' SAR';

    // --- بقية الـ Render Logic (return) تظل كما هي تماماً في الكود الخاص بك ---
    // --- Render Logic ---

    // 1. شاشة الفاتورة (بعد الدفع)
 /* --- Royal Invoice Screen --- */
if (isPaid) {
    return (
        <div className="invoice-outer-wrapper">
            <div className="invoice-card" ref={invoiceRef}>
                <div className="invoice-seal">O</div> {/* Visual Emblem */}
                
                <div className="invoice-header">
                    <div className="success-check">
                        <i className="fas fa-check"></i>
                    </div>
                    <h1 className="gold-text">Payment Confirmed</h1>
                    <p className="order-number">ORDER REF: {transactionId}</p>
                </div>

                <div className="invoice-body">
                    <div className="invoice-section">
                        <h4>GUEST INFORMATION</h4>
                        <div className="invoice-row">
                            <span>Client Name</span>
                            <span className="val">{formData.fullName}</span>
                        </div>
                        <div className="invoice-row">
                            <span>Destination</span>
                            <span className="val">{formData.address}</span>
                        </div>
                    </div>

                    <div className="invoice-divider"></div>

                    <div className="invoice-section">
                        <h4>TRANSACTION DETAILS</h4>
                        <div className="invoice-row">
                            <span>Status</span>
                            <span className="val status-paid">SUCCESSFUL</span>
                        </div>
                        <div className="invoice-row total-row">
                            <span>Total Investment</span>
                            <span className="gold-price">{formatCurrency(totalPrice)}</span>
                        </div>
                    </div>
                </div>

                <div className="invoice-footer">
                    <p className="footer-note">A digital receipt has been dispatched to your contact.</p>
<button 
    className="back-home-btn" 
    onClick={() => {
        // إعادة تحميل الصفحة بالكامل
        window.location.reload();
    }}
>
    RETURN TO COLLECTION
    <div className="btn-shine"></div>
</button>
                </div>
            </div>
            
            <div className="invoice-bg-glow"></div>
        </div>
    );
}

    // 2. شاشة السلة الفارغة أو نموذج الدفع
    return (
        <div className="payment-page-wrapper">
            {cartItems.length === 0 && !hasReservation ? (
 <div className="empty-cart-container" ref={emptyCartRef}>
    {/* التغليف الرئيسي العمودي */}
    <div className="luxury-stack-wrapper">
        
        {/* 1. الكارت ثابت وضخم في البداية */}
        <div className="static-hero-card">
            <LuxeMedia src="visa-card.png" alt="Luxury Card" className="grand-card-img" />
            <div className="card-shadow-under"></div>
        </div>

        {/* 2. النصوص تحت الكارت مباشرة */}
        <div className="hero-text-content">
            <span className="gold-subtitle">ESTABLISHED ELEGANCE</span>
            
            <h2 className="grand-luxury-title">
                YOUR COLLECTION <br/>
                <span className="italic-gold">IS CURRENTLY EMPTY</span>
            </h2>
            
            <div className="luxury-line-separator"></div>

            <p className="luxury-minimal-desc">
                True prestige is a choice. <br/>
                Explore our curated selection of signature masterpieces.
            </p>

            {/* 3. الزرار في النهاية */}
       <Link to="/menu" style={{ textDecoration: 'none', display: 'inline-block', width: '100%', maxWidth: 'fit-content' }}>
    <button className="royal-discover-btn">
        DISCOVER THE ESSENCE
        <div className="btn-glimmer"></div>
    </button>
</Link>
        </div>
    </div>
</div>
            ) : (
                <div className="main-payment-box" ref={mainBoxRef}>
                    <div className="payment-side shipping-side">
                        <div className="side-header"><h3>Shipping & Contact</h3></div>
                        <div className="input-grid">
                            <div className={`input-group ${errors.fullName ? 'error' : ''}`}>
                                <label>Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your name" />
                            </div>
                            <div className={`input-group ${errors.address ? 'error' : ''}`}>
                                <label>Shipping Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
                            </div>
                            <div className="phone-row">
                                <div className={`input-group ${errors.phonePrimary ? 'error' : ''}`}>
                                    <label>Phone</label>
                                    <input type="tel" name="phonePrimary" value={formData.phonePrimary} onChange={handleInputChange} placeholder="+966..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="payment-side checkout-side">
                        <div className="side-header"><h3>Secure Checkout</h3></div>
                        <div className="card-visual-wrapper">
        <div className="card-glow-effect"></div>
        <LuxeMedia 
            src="visa-card.png" 
            alt="Premium Card" 
            className="user-visa-card" 
        />
    </div>
                        <div className="card-input-grid">
                            <div className={`input-group ${errors.cardNumber ? 'error' : ''}`}>
                                <label>Card Number</label>
                                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="expiry-cvc-row">
                                <div className={`input-group ${errors.cardExpiry ? 'error' : ''}`}>
                                    <label>Expiry</label>
                                    <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" />
                                </div>
                                <div className={`input-group ${errors.cardCVC ? 'error' : ''}`}>
                                    <label>CVC</label>
                                    <input type="text" name="cardCVC" value={formData.cardCVC} onChange={handleInputChange} placeholder="***" />
                                </div>
                            </div>
                        </div>
                        <div className="mini-summary">
                            <div className="summary-line"><span>Total</span><span className="gold-amount">{formatCurrency(totalPrice)}</span></div>
                            <button className="pay-now-btn" onClick={handlePayment}>Confirm & Pay <div className="btn-shine"></div></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;