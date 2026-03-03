// hooks/useScan.ts
import { useState } from 'react';
import type { ScanResponse } from '@/lib/types/scan.types';

type ScanApiError = { message: string; };

export const useScan = () => {
  const [data, setData] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false); // New state

  const executeScan = async (url: string) => {
    // Prevent multiple concurrent requests
    if (isRequesting) {
      console.log('Request already in progress, skipping new one.');
      return;
    }

    setIsLoading(true);
    setIsRequesting(true); // Set requesting flag
    setData(null);
    setError(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error((result as ScanApiError).message || 'An unknown error occurred.');
      }

      setData(result.data as ScanResponse);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      setIsRequesting(false); // Reset requesting flag
    }
  };

  return { data, error, isLoading, isRequesting, executeScan }; // Expose isRequesting if needed by UI
};
