import React, { forwardRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useGlobalLoading } from './useGlobalLoading';

interface LuxeMediaProps {
  src: string;
  alt?: string;
  className?: string;
  type?: 'img' | 'video';
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  poster?: string;
  controls?: boolean;
  style?: React.CSSProperties; // لدعم الستايلات الممررة يدويًا
}

const LuxeMedia = forwardRef<HTMLElement, LuxeMediaProps>((props, ref) => {
  const { src, alt, className, type = 'img', style, ...rest } = props;
  const { isReady: globalReady } = useGlobalLoading();
  
  // حالة التأكد من تحميل الملف بالكامل (Buffer/Download)
  const [isAssetLoaded, setIsAssetLoaded] = useState(false);

  // لا يظهر العنصر إلا بشرطين: انتهاء عداد الـ Loading واكتمال تحميل الصورة/الفيديو
  const shouldShow = globalReady && isAssetLoaded;

  return (
    <div className="luxe-media-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
      
      {/* 1. السكيلتون الذهبي: يختفي فوراً عند جاهزية الميديا */}
      {!shouldShow && (
        <Skeleton 
          className={className} 
          containerClassName="skeleton-wrapper" 
          height="100%" 
          width="100%"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
        />
      )}

      {/* 2. عرض الميديا (صورة أو فيديو) */}
      {type === 'img' ? (
        <img 
          src={src} 
          alt={alt || "Ocean Pearl"} 
          className={`${className} ${shouldShow ? 'fade-in-image' : 'hidden-media'}`} 
          ref={ref as React.Ref<HTMLImageElement>}
          onLoad={() => setIsAssetLoaded(true)}
          style={{ 
            ...style, // نحافظ على أي ستايل خارجي (بما فيه الـ opacity الأصلي)
            visibility: shouldShow ? 'visible' : 'hidden',
          }}
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