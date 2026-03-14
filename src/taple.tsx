import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import './taple.css';
import { useLayoutEffect } from 'react'; // تأكد من استيرادها
const Taple = () => {
    const [step, setStep] = useState(1);
    const [guests, setGuests] = useState("2");
    const [seating, setSeating] = useState({ id: 'main', name: 'Main Dining Hall', price: 50 });
    const [formData, setFormData] = useState({ name: '', email: '', notes: '', extraGuests: '' });
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

const subtitleRef = useRef(null);
const cardRef = useRef(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    useLayoutEffect(() => {
    const tl = gsap.timeline();

    // أنميشن ظهور العنوان والوصف (من الأعلى للأسفل مع تلاشي)
    tl.fromTo([titleRef.current, subtitleRef.current], 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
    )
    // أنميشن ظهور الكارت (تأثير تكبير خفيف من الأسفل)
    .fromTo(cardRef.current, 
        { y: 60, opacity: 0, scale: 0.9, blur: "10px" }, 
        { y: 0, opacity: 1, scale: 1, blur: "0px", duration: 1.2, ease: "expo.out" },
        "-=0.6" // يبدأ قبل انتهاء أنميشن العنوان بـ 0.6 ثانية
    );
}, []);

    const guestCount = guests === "+8" ? (parseInt(formData.extraGuests) || 0) : parseInt(guests);
    const totalPrice = guestCount * seating.price;

    const validateStep = () => {
        const newErrors: { [key: string]: string } = {};
        if (step === 1) {
            const bookingDate = localStorage.getItem('last_booking_date');
            if (!bookingDate) newErrors.date = "Please select a booking date";
            if (!guests) newErrors.guests = "Please select number of persons";
            if (guests === "+8" && (!formData.extraGuests || parseInt(formData.extraGuests) <= 0)) {
                newErrors.extraGuests = "Please specify group size";
            }
        }
        if (step === 3) {
            if (!formData.name.trim()) newErrors.name = "Full name is required";
            if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = "Valid email is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep()) return;
        gsap.to(".step-content", {
            x: -30, opacity: 0, duration: 0.4, onComplete: () => {
                setStep(prev => prev + 1);
                gsap.fromTo(".step-content", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
            }
        });
    };

    const prevStep = () => {
        gsap.to(".step-content", {
            x: 30, opacity: 0, duration: 0.4, onComplete: () => {
                setStep(prev => prev - 1);
                gsap.fromTo(".step-content", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 });
            }
        });
    };

    const handleConfirm = () => {
        if (!validateStep()) return;

        const finalData = {
            customerName: formData.name,
            wing: seating.name,
            totalGuests: guestCount,
            totalPrice: totalPrice,
            date: localStorage.getItem('last_booking_date')
        };
        localStorage.setItem('ocean_pearl_reservation', JSON.stringify(finalData));

        const tl = gsap.timeline();
        tl.to(".booking-card", {
            y: -30,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.inOut"
        })
        .call(() => {
            setIsSuccess(true);
        })
        .fromTo(".success-message-overlay", 
            { opacity: 0, y: 40, scale: 0.8 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
        );
    };

    const closeSuccess = () => {
        gsap.to(".success-message-overlay", {
            opacity: 0,
            scale: 1.05,
            duration: 0.4,
            onComplete: () => {
                setIsSuccess(false);
                setStep(1);
                setFormData({ name: '', email: '', notes: '', extraGuests: '' });
                setGuests("2");
                localStorage.removeItem('last_booking_date');
                gsap.fromTo(".booking-card", 
                    { y: 30, opacity: 0, scale: 0.95 }, 
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
                );
            }
        });
    };

    return (
        <div className="booking-page-container">
            <div className="booking-bg-overlay">
                <img src="/Japanese-Ambience.png" alt="Restaurant" className="bg-img" />
            </div>

            <div className="booking-content-wrapper">
                <h1 ref={titleRef} className="booking-main-title">Ocean Pearl</h1>
                <p ref={subtitleRef} className="booking-subtitle">Exquisite Japanese Dining Experience</p>

                <div className="booking-relative-container">
                    {/* طبقة النجاح (منفصلة عن الكارت) */}
                    {isSuccess && (
                        <div className="success-message-overlay">
                            <div className="success-glow"></div>
                            <div className="success-icon-gold">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#bf953f" strokeWidth="2.5">
                                    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h2>Reservation Confirmed</h2>
                            <p>We are waiting for you, <br/><strong>{formData.name}</strong></p>
                            <button onClick={closeSuccess} className="gold-action-btn">Done</button>
                        </div>
                    )}

                    <div ref={cardRef} className={`booking-card ${isSuccess ? 'card-hidden' : ''}`}>
                        <div className="progress-bar">
                            <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}><span>01</span></div>
                            <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
                            <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}><span>02</span></div>
                            <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
                            <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}><span>03</span></div>
                        </div>

                        <div className="step-content">
                            {step === 1 && (
                                <div className="booking-step">
                                    <h3>Select Date & Guests</h3>
                                    <div className="date-input-wrapper">
                                        <label className="date-label">Select Your Preferred Date</label>
                                        {errors.date && <span className="error-msg">{errors.date}</span>}
                                        <input 
                                            type="date" 
                                            className={`luxury-input quick ${errors.date ? 'input-error' : ''}`} 
                                            onChange={(e) => {
                                                localStorage.setItem('last_booking_date', e.target.value);
                                                setErrors({...errors, date: ''});
                                            }} 
                                        />
                                    </div>
                                    <div className="date-input-wrapper">
                                        {errors.guests && <span className="error-msg">{errors.guests}</span>}
                                        <select 
                                            className={`luxury-input ${errors.guests ? 'input-error' : ''}`} 
                                            value={guests} 
                                            onChange={(e) => {
                                                setGuests(e.target.value);
                                                setErrors({...errors, guests: ''});
                                            }}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <option key={num} value={num.toString()}>{num} Persons</option>
                                            ))}
                                            <option value="+8">+8 Groups</option>
                                        </select>
                                    </div>
                                    {guests === "+8" && (
                                        <div className="date-input-wrapper">
                                            {errors.extraGuests && <span className="error-msg">{errors.extraGuests}</span>}
                                            <input 
                                                type="number" 
                                                placeholder="Enter number of guests" 
                                                className={`luxury-input fade-in ${errors.extraGuests ? 'input-error' : ''}`} 
                                                value={formData.extraGuests}
                                                onChange={(e) => {
                                                    setFormData({...formData, extraGuests: e.target.value});
                                                    setErrors({...errors, extraGuests: ''});
                                                }}
                                            />
                                        </div>
                                    )}
                                    <button onClick={nextStep} className="gold-action-btn">Continue</button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="booking-step">
                                    <h3>Seating Preference</h3>
                                    <div className="seating-grid">
                                        <div className={`seat-card ${seating.id === 'main' ? 'selected' : ''}`} 
                                             onClick={() => setSeating({id:'main', name:'Main Hall', price: 50})}>
                                            <h4>Main Hall</h4>
                                            <p>$50 <span>/ guest</span></p>
                                        </div>
                                        <div className={`seat-card ${seating.id === 'terrace' ? 'selected' : ''}`}
                                             onClick={() => setSeating({id:'terrace', name:'Terrace', price: 75})}>
                                            <h4>Terrace</h4>
                                            <p>$75 <span>/ guest</span></p>
                                        </div>
                                        <div className={`seat-card ${seating.id === 'vip' ? 'selected' : ''}`}
                                             onClick={() => setSeating({id:'vip', name:'VIP Suite', price: 150})}>
                                            <h4>VIP Suite</h4>
                                            <p>$150 <span>/ guest</span></p>
                                        </div>
                                    </div>
                                    <div className="total-badge">Estimated Total: ${totalPrice}</div>
                                    <div className="btn-group">
                                        <button onClick={prevStep} className="back-btn">Back</button>
                                        <button onClick={nextStep} className="gold-action-btn">Next</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="booking-step">
                                    <h3>Confirm Reservation</h3>
                                    <div className="date-input-wrapper">
                                        {errors.name && <span className="error-msg">{errors.name}</span>}
                                        <input type="text" placeholder="Full Name" 
                                               className={`luxury-input ${errors.name ? 'input-error' : ''}`} 
                                               value={formData.name}
                                               onChange={(e) => {
                                                   setFormData({...formData, name: e.target.value});
                                                   setErrors({...errors, name: ''});
                                               }} />
                                    </div>
                                    <div className="date-input-wrapper">
                                        {errors.email && <span className="error-msg">{errors.email}</span>}
                                        <input type="email" placeholder="Email Address" 
                                               className={`luxury-input ${errors.email ? 'input-error' : ''}`}
                                               value={formData.email}
                                               onChange={(e) => {
                                                   setFormData({...formData, email: e.target.value});
                                                   setErrors({...errors, email: ''});
                                               }} />
                                    </div>
                                    <div className="summary-box">
                                        <p>Guests: {guestCount} | Wing: {seating.name}</p>
                                        <p className="total-text">Total: ${totalPrice}</p>
                                    </div>
                                    <div className="btn-group">
                                        <button onClick={prevStep} className="back-btn">Back</button>
                                        <button onClick={handleConfirm} className="gold-action-btn">Confirm</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Taple;