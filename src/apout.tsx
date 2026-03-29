import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './apout.css';
import { useEffect, useRef } from 'react';
import LuxeMedia from './LuxeMedia';
gsap.registerPlugin(ScrollTrigger);

function About() {
    // مصفوفة المراجع للسكاشن مع تحديد النوع لـ TypeScript
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const ctaImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        // --- 1. Animation for Section 1: Hero (ظهور درامي ناعم) ---
        const hero = sectionRefs.current[0];
        if (hero) {
            gsap.fromTo(hero.querySelectorAll('.reveal-text, .about-hero-title, .hero-separator-container'), 
                { opacity: 0, y: 30, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 2, ease: "power4.out", stagger: 0.3 }
            );
        }

// --- 2. Animation for Section 2: Philosophy (تعديل: ظهور علوي وتقسيم نصوص) ---
const philosophy = sectionRefs.current[1];
if (philosophy) {
    // أنميشن النصوص (العنوان والفقرة) - تظهر من الأعلى للأسفل
    const textElements = philosophy.querySelectorAll('.philosophy-title, .title-separator, .philosophy-p');
    
    gsap.fromTo(textElements,
        { 
            y: -50,          // قيمة ابتدائية فوق مكانه
            opacity: 0,      // مخفي
            filter: "blur(10px)" 
        },
        { 
            y: 0,            // مكانه الأصلي
            opacity: 1,      // ظاهر
            filter: "blur(0px)",
            duration: 1.2, 
            ease: "power3.out",
            stagger: 0.3,    // هذا سيجعل العنوان ثم الخط ثم الفقرة يظهرون بالتوالي (سطر سطر)
            scrollTrigger: { 
                trigger: philosophy, 
                start: "top 60%" 
            }
        }
    );
   
 
}

     // --- 3. Animation for Section 3: Ocean Motion (تأثير التوسع الدرامي) ---
const oceanMotion = sectionRefs.current[2];
if (oceanMotion) {
    const videoWrapper = oceanMotion.querySelector('.video-wrapper');
    const videoContent = oceanMotion.querySelector('.background-video');

    // أنميشن الحاوية (التوسع والظهور)
    gsap.fromTo(videoWrapper,
        { 
            opacity: 0, 
            scale: 0.8,              // يبدأ أصغر قليلاً
            clipPath: "inset(20% 20% 20% 20% round 40px)", // يبدأ كإطار داخلي بـ Radius
        },
        { 
            opacity: 1, 
            scale: 1, 
            clipPath: "inset(0% 0% 0% 0% round 0px)", // يتمدد ليملأ الشاشة بالكامل
            duration: 2.5, 
             ease: "power3.out",
            scrollTrigger: { 
                trigger: oceanMotion, 
                start: "top 60%", 
                once: true,          // يعمل مرة واحدة فقط عند السكرول
                toggleActions: "play none none none" 
            }
        }
    );

    // أنميشن إضافي للفيديو نفسه (Zoom خفيف للداخل)
    if (videoContent) {
        gsap.fromTo(videoContent,
            { scale: 1.4, filter: "brightness(0) blur(15px)" },
            { 
                scale: 1, 
                filter: "brightness(1) blur(0px)", 
                duration: 3, 
                ease: "power3.out",
                scrollTrigger: { 
                    trigger: oceanMotion, 
                    start: "top 60%",
                    once: true 
                }
            }
        );
    }
}

        // --- 4. Animation for Section 4: Craft (ظهور الكروت بالتوالي) ---
// --- 4. Animation for Section 4: Craft (دخول جانبي متزامن للكروت) ---
const craft = sectionRefs.current[3];
if (craft) {
    const cards = craft.querySelectorAll('.craft-card');
    
    if (cards.length >= 2) {
        // الكارت الأول (اليسار): يأتي من اليسار (x: -150)
        gsap.fromTo(cards[0],
            { 
                x: -150,          // يبدأ من أقصى اليسار
                opacity: 0, 
                
               
            },
            { 
                x: 0,             // مكانه الأصلي
                opacity: 1, 
               
                duration: 2, 
                ease: "expo.out",
                scrollTrigger: { 
                    trigger: craft, 
                    start: "top 60%",
                    once: true 
                }
            }
        );

        // الكارت الثاني (اليمين): يأتي من اليمين (x: 150)
        gsap.fromTo(cards[1],
            { 
                x: 150,           // يبدأ من أقصى اليمين
                opacity: 0, 
                
                
            },
            { 
                x: 0,             // مكانه الأصلي
                opacity: 1, 
               
                duration: 2,      // نفس المدة ليحدثا معاً
                ease: "expo.out",
                scrollTrigger: { 
                    trigger: craft, 
                    start: "top 60%",
                    once: true 
                }
            }
        );
    }
}

        // --- 5. Animation for Section 5: CTA (أنميشن Parallax للصورة كما طلبت) ---
        const ctaSection = sectionRefs.current[4];
        if (ctaImageRef.current) {
            gsap.fromTo(ctaImageRef.current,
                { y: "30%", opacity: 0, scale: 1.1 },
                { y: "0%", opacity: 1, scale: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaSection,
                        start: "top 50%",
                        end: "bottom top",
                        scrub: 1,
                    }
                }
            );
        }
        // ظهور نصوص الـ CTA
        if (ctaSection) {
            gsap.fromTo(ctaSection.querySelectorAll('.cta-content > *'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out",
                  scrollTrigger: { trigger: ctaSection, start: "top 40%" }
                }
            );
        }

    }, []);

    return (
        <div className="about-page">
            {/* Section 1: The Grand Opening (Hero) */}
            <section className="about-hero about-section" ref={(el) => { sectionRefs.current[0] = el; }}>
                <div className="hero-bg-overlay"></div>
                <div className="hero-image-wrapper">
                    <LuxeMedia src="./apout-img.png" alt="Ocean Pearl Restaurant Ambience" className="hero-bg-img" />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-decor-tags left">
                    <span className="tag-item">25.0441° N</span>
                    <span className="tag-line"></span>
                    <span className="tag-item">55.1820° E</span>
                </div>

                <div className="hero-decor-tags right">
                    <span className="tag-item">FINE DINING</span>
                    <span className="tag-line"></span>
                    <span className="tag-item">SINCE 2026</span>
                </div>

                <div className="about-hero-content">
                    <span className="hero-pre-title reveal-text">A Symphony of the Tides</span> 
                    
                    <h1 className="about-hero-title">
                        <span className="white-glow">Infinite</span> <br />
                        <span className="gold-gradient-text">Excellence</span>
                    </h1>
                    
                    <div className="hero-separator-container">
                        <div className="separator-line"></div>
                        <div className="pearl-icon"></div>
                        <div className="separator-line"></div>
                    </div>
                    
                    <p className="hero-subtitle reveal-text">
                        Where culinary artistry meets the silent whispers of the deep blue.
                    </p>
                </div>
            </section>

            {/* Section 2: The Philosophy (Text & Floating Art) */}
            <section className="about-philosophy about-section" ref={(el) => { sectionRefs.current[1] = el; }}>
                <div className="philosophy-bg-pattern"></div>

                <div className="philosophy-content2">
                    <div className="glass-panel">
                        <h2 className="reveal-text philosophy-title2">The Culinary Ethos</h2>
                        <div className="title-separator"></div>
                        <p className="reveal-text philosophy-p">
                            Beyond the shore lies a symphony of flavors waiting to be conducted. At Ocean Pearl, we capture the untamed essence of the deep, refining it through the lens of high-artistry. It is not just dining; it is a sensory pilgrimage to the soul of the ocean, served on a canvas of pure excellence
                        </p>
                    </div>
                </div>

                <div className="philosophy-image reveal-text">
                    <LuxeMedia src="./philosophy.png" alt="Mystical Cuttlefish" className="floating-cuttlefish" />
                    <div className="cuttlefish-glow"></div>
                </div>
            </section>

            {/* Section 3: The Ocean's Heart (Video/Motion Section) */}
            <section className="about-ocean-motion about-section" ref={(el) => { sectionRefs.current[2] = el; }}>
                <div className="video-wrapper">
                    <LuxeMedia
                        type="video" 
                        src="./02177332750425500000000000000000000ffffc0a8ac5dd01040.mp4" 
                        autoPlay loop muted playsInline 
                        className="background-video" 
                    />
                    
                    <div className="video-inner-shadow"></div>
                    <div className="frame-line line-top"></div>
                    <div className="frame-line line-bottom"></div>

                    <div className="side-detail detail-left">EST. 2026</div>
                    <div className="side-detail detail-right">PRISTINE WATERS</div>

                    <div className="video-text-overlay">
                        <h2 className="reveal-text">Sourced from the Abyss</h2>
                        <p className="sub-reveal">Beyond the Tides, Excellence Awaits</p>
                    </div>
                </div>
            </section>

            {/* Section 4: The Ingredients (3D/Grid) */}
            <section className="about-craft about-section" ref={(el) => { sectionRefs.current[3] = el; }}>
                <div className="craft-grid">
                    <div className="craft-card">
                        <LuxeMedia src="./Rare-Abyssal-Treasures.png" alt="Black Pearl" /> 
                        <h3>Rare Abyssal Treasures</h3>
                        <p>From the elusive Bluefin Tuna to the world’s finest Beluga Caviar, we hunt for the ocean’s most guarded secrets.</p>
                    </div>

                    <div className="craft-card">
                        <LuxeMedia src="./Artisanal-Gold.png" alt="Gold Leaf Detail" /> 
                        <h3>Artisanal Gold</h3>
                        <p>Every slice of Sashimi is a masterstroke, adorned with 24k gold leaf to honor the purity of the deep blue.</p>
                    </div>
                </div>
            </section>

            {/* Section 5: The Invitation (Final CTA) */}
            <section className="about-footer-cta about-section" ref={(el) => { sectionRefs.current[4] = el; }}>
                <div className="cta-bg-wrapper">
                    <LuxeMedia 
                        ref={ctaImageRef}
                        src="./cta-bg.png" 
                        alt="Ocean Pearl Crystal Conch Shell" 
                        className="cta-background-artifact"
                        
                    />
                    <div className="top-merge-overlay"></div>
                </div>
                
                <div className="fog-overlay"></div>
                
                <div className="cta-content">
                    <div className="line-divider"></div>
                    <p className="cta-pre-text reveal-text">A Journey Awaits, Your Tale of Taste</p>
                    <h2 className="reveal-text">Begin Your Story With Us</h2>
                    
                    <Link to="/taple" className="majestic-action-btn reveal-text">
                        <span>Reserve Your Seat</span>
                        <div className="hover-sparkle"></div>
                    </Link>
                    
                    <div className="location-stamp reveal-text">
                        <span className="location-city">Cairo, Egypt</span>
                        <span className="location-divider">|</span>
                        <span className="location-excellence">Beyond Excellence</span>
                    </div>
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
}

export default About;