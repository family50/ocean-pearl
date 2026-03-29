import React, { useEffect } from 'react';

interface PreloaderProps {
  assets: string[];
  onComplete?: () => void;
  minWaitTime?: number;
}

const AssetPreloader: React.FC<PreloaderProps> = ({ 
  assets, 
  onComplete, 
  minWaitTime = 0 
}) => {
  useEffect(() => {
    const preload = async () => {
      const uniqueAssets = Array.from(new Set(assets)).filter(url => !!url);
      
      const promises = uniqueAssets.map((url) => {
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

      // انتظار الوقت المحدد
      const minTimePromise = new Promise((res) => setTimeout(res, minWaitTime));

      await Promise.all([...promises, minTimePromise]);

      if (onComplete) {
        onComplete();
      }
    };

    preload();
    // أضفنا كل المتغيرات التي تُستخدم بالداخل لضمان دقة التنفيذ
  }, [assets, onComplete, minWaitTime]); 

  return null;
};

export default AssetPreloader;