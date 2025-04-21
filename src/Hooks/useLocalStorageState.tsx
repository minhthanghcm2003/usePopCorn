import { useState, useEffect } from 'react';
export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedvalue = localStorage.getItem(key);
    return storedvalue ? JSON.parse(storedvalue) : initialState;
  });
  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );
  return [value, setValue];
}
