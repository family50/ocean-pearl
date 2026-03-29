import { useEffect } from 'react';

// قائمة الموارد (تقدر تضيف لها أي مسار جديد بسهولة)
const assetsToPreload = [
  '/dish.png',
  '/dish1.png',
  '/dish2.png',
  '/dish3.png',
  '/Gemini_Generated_Image_6iqxc86iqxc86iqx_no_bg.png',
  '/02177287268058700000000000000000000ffffc0a8ac5dabe60f.mp4' // الفيديو
];

const AssetPreloader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const preload = async () => {
      const promises = assetsToPreload.map((url) => {
        return new Promise((resolve) => {
          if (url.endsWith('.mp4')) {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto';
            video.oncanplaythrough = () => resolve(true);
            video.onerror = () => resolve(true);
          } else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });

      const minTime = new Promise((res) => setTimeout(res, 3000)); // وقت التحميل الأدنى

      await Promise.all([...promises, minTime]);
      onComplete(); // نخبر App.tsx إننا خلصنا
    };

    preload();
  }, [onComplete]);

  return null; // لا نحتاج لرندر أي شيء في الـ UI
};

export default AssetPreloader;