import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuData } from './Products'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './roductss.css';

gsap.registerPlugin(ScrollTrigger);

const Products: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const currentCategory = menuData.find(cat => cat.categoryName === categoryName);
    const [curationNumber] = useState(() => Math.floor(Math.random() * 100));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    useLayoutEffect(() => {
        if (!currentCategory) return;

        const refreshTrigger = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('load', refreshTrigger);

        const ctx = gsap.context(() => {
            
            // تهيئة مبدئية: التأكد من أن الكروت مرئية وقابلة للأنميشن
            gsap.set(".product-card-luxe", { opacity: 0, y: 60 });

            // --- STAGE 1: HERO ANIMATION ---
            const tlHero = gsap.timeline({ 
                defaults: { ease: "power3.out", duration: 1.2 } 
            });

            tlHero.from(".welcome-text-top", { y: -50, opacity: 0 })
                .from(".hero-3d-container", { x: 100, opacity: 0, scale: 0.9 }, "-=0.5")
                .from(".hero-text-content", { x: -100, opacity: 0 }, "<")
                .from(".luxe-middle-divider", { scaleY: 0, opacity: 0 }, "<");

            // --- STAGE 2: PHILOSOPHY ---
            const tlPhil = gsap.timeline({
                scrollTrigger: {
                    trigger: ".stage-philosophy",
                    start: "top 80%", 
                    toggleActions: "play none none none"
                }
            });

            tlPhil.from(".philosophy-image", { scale: 0.8, filter: "blur(15px)", opacity: 0, duration: 1.5 })
                .from(".philosophy-title", { y: 40, opacity: 0 }, "-=1.2")
                .from(".philosophy-text", { y: 30, opacity: 0 }, "-=1")
                .from(".signature-gold", { opacity: 0 }, "-=0.5");

            // --- STAGE 3: ARCHIVE ---
            // أنميشن العنوان بشكل منفصل لضمان ظهوره
            gsap.from(".archive-title", { 
                y: 30, 
                opacity: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: ".archive-title",
                    start: "top 90%",
                }
            });

            // أنميشن الكروت (تم تعديل الـ trigger ليكون العنوان أو الشبكة نفسها)
            gsap.to(".product-card-luxe", { 
                y: 0, 
                opacity: 1, 
                stagger: 0.1, 
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".products-grid-luxe", // نستخدم الشبكة كـ trigger
                    start: "top 85%", // يبدأ عندما يصل أعلى الشبكة لـ 85% من الشاشة
                    onEnter: () => console.log("Cards Animation Started") // للتأكد في الـ console
                }
            });

        }, containerRef);

        // تحديث الحسابات مرتين (واحدة فوراً وواحدة بعد ثانية) لضمان دقة الأبعاد
        refreshTrigger();
        const timer = setTimeout(refreshTrigger, 1200);

        return () => {
            ctx.revert();
            clearTimeout(timer);
            window.removeEventListener('load', refreshTrigger);
        };
    }, [categoryName, currentCategory]);

    if (!currentCategory) return <div className="error-msg">Royal Archive Not Found</div>;

    return (
        <div className="products-page-wrapper" ref={containerRef} style={{ overflowX: 'hidden' }}>
            
            {/* STAGE 1 */}
            <section className="stage-screen stage-hero-3d">
                <div className="hero-welcome-header">
                    <h2 className="welcome-text-top">Grand Curation</h2>
                </div>
                
                <div className="hero-3d-wrapper">
                    <div className="hero-3d-glow-base"></div>
                    <div className="hero-text-content">
                        <div className="hero-pre-title">
                            <span className="line"></span>
                            <span className="gold-label">Curation No. {curationNumber}</span>
                        </div>
                        <h1 className="hero-title-main">{currentCategory.categoryName}</h1>
                        <p className="hero-subtitle">{currentCategory.categoryTagline}</p>
                    </div>

                    <div className="luxe-middle-divider">
                        <div className="luxe-separator-complex">
                            <span className="dot top"></span>
                            <span className="line"></span>
                            <span className="dot bottom"></span>
                        </div>
                    </div>

                    <div className="hero-3d-container">
                        <div className="image-relative-box">
                            <img src={currentCategory.image3d} alt="Royal Centerpiece" className="hero-3d-image floating-element" />
                        </div>
                    </div>
                </div>

                <div className="scroll-hint">
                    <span className="scroll-text">Descend into Luxury</span>
                    <div className="scroll-line-container"><span className="scroll-line"></span></div>
                </div>
            </section>

            {/* STAGE 2 */}
            <section className="stage-screen stage-philosophy">
                <div className="philosophy-content">
                    <div className="text-side">
                        <h2 className="philosophy-title">The Art of <br/><span>Oceanic Mastery</span></h2>
                        <p className="philosophy-text">
                            Beyond the flavors lies an ancestral heritage, where every 
                            ingredient is treated as a jewel. Our <strong>{currentCategory.categoryName}</strong> 
                            collection is not just a menu; it is a curated exhibition of the sea's 
                            rare treasures, plated for the elite.
                        </p>
                        <div className="signature-gold">Authentic & Refined</div>
                    </div>
                    <div className="image-side">
                        <div className="glow-aura"></div>
                        <img src={currentCategory.image3d2} alt="3D Art Piece" className="philosophy-image" />
                    </div>
                </div>
            </section>

            {/* STAGE 3: THE ROYAL ARCHIVE */}
            <section className="stage-screen stage-archive" style={{ paddingBottom: '100px' }}>
                <div className="archive-intro">
                    <h2 className="archive-title">Selected Masterpieces</h2>
                </div>

                <div className="products-grid-luxe">
                    {currentCategory.items.map((item) => (
                        <div 
                            className="product-card-luxe" 
                            key={item.id} 
                            onClick={() => navigate(`/single-product/${item.id}`)}
                        >
                            <div className="card-visual">
                                <img src={item.image} alt={item.name} className="prod-img-standard" />
                                {item.highlight && <div className="luxe-badge">{item.highlight}</div>}
                            </div>
                            
                            <div className="card-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-desc">{item.description}</p>
                                <div className="details-footer">
                                    <span className="item-price">{item.price}</span>
                                    <button className="explore-link">Details <span className="arrow">→</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer-container">
                <div className="footer-brand-section">
                    <img src="/family-group.png" className="footer-logo" alt="Family-Group" />
                    <h2 className="footer-company-name">FAMILY-GROUP</h2>
                </div>
                <div className="footer-social-section">
                   <a href="#" className="social-link-item"><i className="fab fa-linkedin-in"></i><span>LinkedIn</span></a>
                   <a href="#" className="social-link-item"><i className="fab fa-x-twitter"></i><span>X-Platform</span></a>
                   <a href="#" className="social-link-item"><i className="fab fa-github"></i><span>GitHub</span></a>
                   <a href="#" className="social-link-item"><i className="fab fa-tiktok"></i><span>Journal</span></a>
                   <a href="#" className="social-link-item"><i className="fas fa-envelope"></i><span>Contact</span></a>
                </div>
                <p className="footer-description">
                    “Where code meets craftsmanship. <span>FAMILY-GROUP</span> architects the digital identities 
                    of tomorrow.”
                </p>
                <div className="footer-bottom-bar">
                    <span className="footer-copyright">© 1447 Ocean Pearl — All Rights Reserved</span>
                    <span className="footer-location-tag">CRAFTED IN EGYPT • BEYOND STANDARDS</span>
                </div>
            </footer>
        </div>
    );
};

export default Products;