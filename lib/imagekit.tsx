'use client';

import { ImageKitProvider } from '@imagekit/next';

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export function ImageKitWrapper({ children }: { children: React.ReactNode }) {
  if (!urlEndpoint) {
    console.warn('ImageKit URL endpoint not configured');
    return <>{children}</>;
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {children}
    </ImageKitProvider>
  );
}