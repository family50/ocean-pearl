import React, { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useGlobalLoading } from './useGlobalLoading';

// 1. بنعرف Props خاصة بالمكون بتاعنا فقط
interface LuxeMediaProps {
  src: string;
  alt?: string;
  className?: string;
  type?: 'img' | 'video';
  // خصائص الفيديو المشهورة بنعرفها يدوي هنا عشان نضمن الـ Compatibility
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
  controls?: boolean;
}

// 2. استخدمنا HTMLElement كـ Ref عام
const LuxeMedia = forwardRef<HTMLElement, LuxeMediaProps>((props, ref) => {
  const { src, alt, className, type = 'img', ...rest } = props;
  const { isReady } = useGlobalLoading();

  if (!isReady) {
    return (
      <Skeleton 
        className={className} 
        containerClassName="skeleton-wrapper" 
        height="100%" 
        width="100%" 
      />
    );
  }

  return (
    <>
      {type === 'img' ? (
        <img 
          src={src} 
          alt={alt || "Ocean Pearl"} 
          className={`${className} fade-in-image`} 
          ref={ref as React.Ref<HTMLImageElement>}
          // بنمرر الـ className والـ alt بس للأمان
        />
      ) : (
        <video 
          src={src} 
          className={`${className} fade-in-image`}
          ref={ref as React.Ref<HTMLVideoElement>}
          // بنمرر خصائص الفيديو اللي فككناها في الـ rest
          muted={rest.muted}
          autoPlay={rest.autoPlay}
          loop={rest.loop}
          playsInline={rest.playsInline}
          poster={rest.poster}
          controls={rest.controls}
        />
      )}
    </>
  );
});

LuxeMedia.displayName = 'LuxeMedia';

export default LuxeMedia;