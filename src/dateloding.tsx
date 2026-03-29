import { useEffect } from 'react';
import { menuData } from './Products'; // قاعدة بياناتك

const staticAssets = [
  // --- الرئيسية ---
  '/dish.png', '/dish1.png', '/dish2.png', '/dish3.png',
  '/Gemini_Generated_Image_6iqxc86iqxc86iqx_no_bg.png',
  '/02177287268058700000000000000000000ffffc0a8ac5dabe60f.mp4',

  // --- ABOUT ---
  '/apout-img.png', '/philosophy.png', '/Rare-Abyssal-Treasures.png',
  '/Artisanal-Gold.png', '/cta-bg.png', '/family-group.png',
  '/02177332750425500000000000000000000ffffc0a8ac5dd01040.mp4',

  // --- BILLING & PAYMENT (الصور الجديدة) ---
  './The-Cart-is-empty .png', // صورة الطبق الذهبي الفارغ
  'visa-card.png',
  '/Japanese-Ambience.png', // خلفية صفحة الحجز التي استخدمتها في Taple
  '/dish.png',
];

// --- العبقرية هنا: استخراج ديناميكي شامل لكل صور صفحة Products ---
const dynamicAssets = menuData.flatMap(category => [
  category.categoryImage,   // صورة الكارت في صفحة المنيو الرئيسية
  category.image3d,         // الصورة الـ 3D الأولى في صفحة القسم
  category.image3d2,        // الصورة الـ 3D الثانية (Philosophy section)
  ...category.items.map(item => item.image) // صور جميع الأطباق داخل هذا القسم
]);

// دمج الموارد وحذف المتكرر لضمان كفاءة التحميل
const assetsToPreload = Array.from(new Set([...staticAssets, ...dynamicAssets]));

const AssetPreloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const preload = async () => {
      const promises = assetsToPreload.map((url) => {
        if (!url) return Promise.resolve(true);

        return new Promise((resolve) => {
          // تحميل الفيديو
          if (url.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto';
            video.oncanplaythrough = () => resolve(true);
            video.onerror = () => resolve(true);
          } 
          // تحميل الصور
          else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });

      // وقت انتظار (3.5 ثانية) ليظهر الـ Loading Animation الخاص بك بشكل فخم
      const minTime = new Promise((res) => setTimeout(res, 3500));

      await Promise.all([...promises, minTime]);
      onComplete(); // إخفاء صفحة التحميل
    };

    preload();
  }, [onComplete]);

  return null;
};

export default AssetPreloader;