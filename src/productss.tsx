import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { menuData } from './Products'; 
import gsap from 'gsap';
import './roductss.css';
import LuxeMedia from './LuxeMedia';

const Products: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    
    // مراجع القسم الأول فقط
    const containerRef = useRef<HTMLDivElement>(null);
    const welcomeRef = useRef<HTMLHeadingElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const heroTextRef = useRef<HTMLDivElement>(null);
    const heroDividerRef = useRef<HTMLDivElement>(null);

    const currentCategory = menuData.find(cat => cat.categoryName === categoryName);
    const [curationNumber] = useState(() => Math.floor(Math.random() * 100));

    // التمرير لأعلى الصفحة عند تغيير القسم
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [categoryName]);

    useLayoutEffect(() => {
        if (!currentCategory) return;

        const ctx = gsap.context(() => {
            // --- أنميشن القسم الأول فقط (الظهور الفوري) ---
            const tlHero = gsap.timeline({ 
                defaults: { ease: "power3.out", duration: 1.5 } 
            });

            tlHero.fromTo(welcomeRef.current, 
                { y: -50, opacity: 0 }, 
                { y: 0, opacity: 1 }
            )
            .fromTo(heroImageRef.current, 
                { x: 100, opacity: 0, scale: 0.9 }, 
                { x: 0, opacity: 1, scale: 1 }, 
                "-=0.5"
            )
            .fromTo(heroTextRef.current, 
                { x: -100, opacity: 0 }, 
                { x: 0, opacity: 1 }, 
                "<"
            )
            .fromTo(heroDividerRef.current, 
                { scaleY: 0, opacity: 0 }, 
                { scaleY: 1, opacity: 1 }, 
                "<"
            );

        }, containerRef);

        return () => ctx.revert();
    }, [categoryName, currentCategory]);

    if (!currentCategory) return <div className="error-msg">Royal Archive Not Found</div>;

    return (
        <div className="products-page-wrapper" ref={containerRef}>
            
            {/* STAGE 1: THE GRAND ENTRANCE (الأنيماشن الوحيد هنا) */}
            <section className="stage-screen stage-hero-3d">
                <div className="hero-welcome-header">
                    <h2 className="welcome-text-top" ref={welcomeRef}>Grand Curation</h2>
                </div>
                
                <div className="hero-3d-wrapper">
                    <div className="hero-3d-glow-base"></div>

                    <div className="hero-text-content" ref={heroTextRef}>
                        <div className="hero-pre-title">
                            <span className="line"></span>
                            <span className="gold-label">Curation No. {curationNumber}</span>
                        </div>
                        <h1 className="hero-title-main">
                            {currentCategory.categoryName}
                        </h1>
                        <p className="hero-subtitle">
                            {currentCategory.categoryTagline}
                        </p>
                    </div>

                    <div className="luxe-middle-divider" ref={heroDividerRef}>
                        <div className="luxe-separator-complex">
                            <span className="dot top"></span>
                            <span className="line"></span>
                            <span className="dot bottom"></span>
                        </div>
                    </div>

                    <div className="hero-3d-container" ref={heroImageRef}>
                        <div className="image-relative-box">
                            <LuxeMedia 
                                src={currentCategory.image3d} 
                                alt="Royal Centerpiece" 
                                className="hero-3d-image floating-element" 
                            />
                        </div>
                    </div>
                </div>

                <div className="scroll-hint">
                    <span className="scroll-text">Descend into Luxury</span>
                    <div className="scroll-line-container">
                        <span className="scroll-line"></span>
                    </div>
                </div>
            </section>

            {/* STAGE 2: THE PHILOSOPHY (تظهر بشكل طبيعي بدون أنميشن) */}
            <section className="stage-screen stage-philosophy">
                <div className="philosophy-content">
                    <div className="text-side">
                        <h2 className="philosophy-title">
                            The Art of <br/><span>Oceanic Mastery</span>
                        </h2>
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
                        <LuxeMedia 
                            src={currentCategory.image3d2} 
                            alt="3D Art Piece" 
                            className="philosophy-image" 
                        />
                    </div>
                </div>
            </section>

            {/* STAGE 3: THE ROYAL ARCHIVE (تظهر بشكل طبيعي بدون أنميشن) */}
            <section className="stage-screen stage-archive">
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
                                <LuxeMedia src={item.image} alt={item.name} className="prod-img-standard" />
                                {item.highlight && <div className="luxe-badge">{item.highlight}</div>}
                            </div>
                            
                            <div className="card-details">
                                <h3 className="item-name">{item.name}</h3>
                                <p className="item-desc">{item.description}</p>
                                <div className="details-footer">
                                    <span className="item-price">{item.price}</span>
                                    <button className="explore-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        Details <span className="arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer-container">
                <div className="footer-brand-section">
                    <LuxeMedia src="/family-group.png" className="footer-logo" alt="Family-Group" />
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
};

export default Products;