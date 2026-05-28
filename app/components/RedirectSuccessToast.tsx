'use client'

import { useEffect } from 'react';
import { toast } from 'sonner';

export default function RedirectSuccessToast() {
  useEffect(() => {
    // Check if redirect was successful
    if (sessionStorage.getItem('redirectSuccess') === 'true') {
      // Clear the flag
      sessionStorage.removeItem('redirectSuccess');
      
      // Show success toast
      toast.success("Redirect Successful!", {
        duration: 2000,
        style: {
          background: 'linear-gradient(to bottom, #00E135, #00865B)',
          color: 'white',
          border: '2px solid #059669',
          fontWeight: 'bolder',
          borderRadius: '12px',
          fontSize: '16px',
          fontFamily: 'monospace'
        }
      });
    }
  }, []);

  return null; // This component doesn't render anything
}