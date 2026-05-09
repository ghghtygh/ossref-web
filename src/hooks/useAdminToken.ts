import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ossref-admin-token';

export function useAdminToken(): {
  token: string | null;
  clear: () => void;
} {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setToken(e.newValue);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function clear() {
    window.localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }

  return { token, clear };
}
