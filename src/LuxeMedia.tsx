import React, { forwardRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useGlobalLoading } from './useGlobalLoading';

interface LuxeMediaProps {
  src: string;
  alt?: string;
  className?: string; // كلاس الصورة أو الفيديو
  wrapperClassName?: string; // كلاس إضافي للحاوية الخارجية لو احتجت
  type?: 'img' | 'video';
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
  controls?: boolean;
  style?: React.CSSProperties; 
}

const LuxeMedia = forwardRef<HTMLElement, LuxeMediaProps>((props, ref) => {
  const { src, alt, className, wrapperClassName, type = 'img', style, ...rest } = props;
  const { isReady: globalReady } = useGlobalLoading();
  
  // حالة التأكد من اكتمال تحميل الملف تماماً
  const [isAssetLoaded, setIsAssetLoaded] = useState(false);

  // الشرط المزدوج للظهور: العداد العالمي خلص + الملف نزل بالكامل
  const shouldShow = globalReady && isAssetLoaded;

  return (
    <div 
      className={`luxe-media-wrapper ${wrapperClassName || ''}`} 
      style={{ 
        display: 'contents', // تجعل الـ div "شفاف" ولا يؤثر على الـ Flex/Grid Layout
        position: 'relative' 
      }}
    >
      {/* 1. السكيلتون: يظهر فقط في مكان العنصر قبل التحميل */}
      {!shouldShow && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
           <Skeleton 
            className={className} 
            containerClassName="skeleton-wrapper" 
            height="100%" 
            width="100%"
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
          />
        </div>
      )}

      {/* 2. الميديا */}
      {type === 'img' ? (
        <img 
          src={src} 
          alt={alt || "Ocean Pearl"} 
          className={`${className} ${shouldShow ? 'fade-in-image' : 'hidden-media'}`} 
          ref={ref as React.Ref<HTMLImageElement>}
          onLoad={() => setIsAssetLoaded(true)}
          style={{ 
            ...style, // يحترم الـ opacity والـ styles الأصلية من الـ CSS
            visibility: shouldShow ? 'visible' : 'hidden',
          }}
          {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
      ) : (
        <video 
          src={src} 
          className={`${className} ${shouldShow ? 'fade-in-image' : 'hidden-media'}`}
          ref={ref as React.Ref<HTMLVideoElement>}
          onLoadedData={() => setIsAssetLoaded(true)}
          muted={rest.muted}
          autoPlay={rest.autoPlay}
          loop={rest.loop}
          playsInline={rest.playsInline}
          poster={rest.poster}
          controls={rest.controls}
          style={{ 
            ...style,
            visibility: shouldShow ? 'visible' : 'hidden'
          }}
        />
      )}
    </div>
  );
});

LuxeMedia.displayName = 'LuxeMedia';

export default LuxeMedia;