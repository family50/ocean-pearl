import React, { useEffect, useRef, useState } from 'react';
import './mouth.css';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // التحقق إذا كان الجهاز يدعم الماوس (وليس لمس فقط)
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // 1. حركة الماوس
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // 2. اكتشاف العناصر التفاعلية
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // نتحقق من العنصر نفسه أو أقرب عنصر أب يحمل كلاسات معينة
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        !!target.closest('.category-card') ||
        !!target.closest('.explore-btn') ||
        !!target.closest('.gold-action-btn') ||
        !!target.closest('.seat-card');

      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isHovered ? 'hovered' : ''}`} 
    />
  );
};

export default CustomCursor;