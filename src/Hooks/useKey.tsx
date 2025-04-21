import { useEffect } from 'react';

export function useKey(key: string, action: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action?.();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, action]);
  return [key, action];
}
