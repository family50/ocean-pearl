import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 1. حركة الماوس السلسة
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    // 2. اكتشاف العناصر التفاعلية (أزرار، روابط، كروت)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // يتحول الماوس إذا وقف على زر، رابط، أو عنصر يحمل كلاس category-card
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.category-card') ||
        target.closest('.explore-btn')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* التنسيقات مدمجة في نفس الصفحة */}
      <style>{`
        body {
          cursor: none !important; /* إخفاء الماوس الأصلي من كامل الموقع */
        }
        
        a, button, .category-card {
          cursor: none !important; /* التأكيد على إخفائه فوق العناصر التفاعلية */
        }

        .custom-cursor {
          width: 12px;
          height: 12px;
          background-color: #ddad0e; /* الذهبي الملكي */
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          left: 0;
          top: 0;
          mix-blend-mode: difference;
          transition: width 0.3s, height 0.3s, background-color 0.4s ease, box-shadow 0.4s ease, mix-blend-mode 0.3s;
          box-shadow: 0 0 10px rgba(221, 173, 14, 0.5);
        }

        /* الحالة عند الوقوف على عنصر تفاعلي (أبيض مضيء) */
        .custom-cursor.hovered {
          background-color: #ffffff; /* أبيض نقي */
         
          mix-blend-mode: normal;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 
                      0 0 40px rgba(255, 255, 255, 0.4);
        }
      `}</style>

      <div 
        ref={cursorRef} 
        className={`custom-cursor ${isHovered ? 'hovered' : ''}`} 
      />
    </>
  );
};

export default CustomCursor;