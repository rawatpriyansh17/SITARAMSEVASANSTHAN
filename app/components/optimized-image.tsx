'use client';

import { Image as IKImage } from '@imagekit/next';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  transformation?: Array<Record<string, string | number | boolean>>;
}

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  sizes,
  transformation 
}: OptimizedImageProps) {
  // Check if it's an ImageKit URL
  const isImageKitUrl = src.includes('ik.imagekit.io');
  
  if (isImageKitUrl) {
    return (
      <IKImage
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        transformation={transformation}
        loading="lazy"
      />
    );
  }
  
  // Fallback to Next.js Image for local images
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      loading="lazy"
    />
  );
}
