import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './header.css';

import { NavLink } from 'react-router-dom';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // أنميشن الدخول
    gsap.fromTo(".header-main", 
      { y: -150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    if (window.innerWidth <= 750) {
      gsap.fromTo(".mobile-bottom-fixed",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    // أنميشن الهيدر العلوي
    gsap.fromTo(".header-main", 
      { y: -150, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    // أنميشن البار السفلي للموبايل فقط
    if (window.innerWidth <= 750) {
      gsap.fromTo(".mobile-bottom-bar-fixed",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

return (
    <>
      {/* 1. الهيدر العلوي: يظل فخماً وسينمائياً */}
      <header className={`header-main ${isScrolled ? 'header-active' : ''}`}>
        <div className="header-inner">
          
          {/* الجانب الأيسر: الروابط الملكية الديناميكية */}
          <nav className="nav-group side-nav desktop-only">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item-link-luxe active-page" : "nav-item-link-luxe"}>
              Home
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-item-link-luxe active-page" : "nav-item-link-luxe"}>
              Menu
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item-link-luxe active-page" : "nav-item-link-luxe"}>
              About Us
            </NavLink>
          </nav>

          {/* اللوجو في المنتصف */}
          <div className="header-brand">
            <div className="brand-vertical-line"></div>
            <h1 className="brand-name">OCEAN<span>PEARL</span></h1>
            <div className="brand-vertical-line"></div>
          </div>

          {/* الجانب الأيمن (Billing + Reserve) */}
          <nav className="nav-group side-nav right-side">
<NavLink 
  to="/billing" 
  className={({ isActive }) => 
    `${isActive ? "nav-item-link-luxe active-page" : "nav-item-link-luxe"} hide-tablet`
  }
>
  Billing
</NavLink>
            
            <NavLink to="/taple" className="reserve-link-wrapper">
              <button className="booking-button-luxe">
                <span className="btn-text">Reserve a table</span>
                <span className="btn-line"></span>
              </button>
            </NavLink>
          </nav>


         

        </div>
        <div className="header-bottom-glow"></div>
      </header>

      {/* 2. البار السفلي للموبايل: منفصل تماماً خارج وسم الـ header لكسر الـ GSAP Context */}
 <nav className="mobile-bottom-bar-fixed">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-item-link-mobile active-luxe" : "nav-item-link-mobile"}>
          <i className="fas fa-home-alt mobile-icon"></i>
          <span>Home</span>
        </NavLink>
             
        <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-item-link-mobile active-luxe" : "nav-item-link-mobile"}>
          <i className="fas fa-utensils mobile-icon"></i>
          <span>Menu</span>
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item-link-mobile active-luxe" : "nav-item-link-mobile"}>
          <i className="fas fa-crown mobile-icon"></i>
          <span>About Us</span>
        </NavLink>

        <NavLink to="/billing" className={({ isActive }) => isActive ? "nav-item-link-mobile active-luxe" : "nav-item-link-mobile"}>
          <i className="fas fa-file-invoice-dollar mobile-icon"></i>
          <span>Billing</span>
        </NavLink>
      </nav>
    </>
  );
};

export default Header;