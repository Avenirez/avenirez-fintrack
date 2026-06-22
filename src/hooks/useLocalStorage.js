import { useState, useEffect } from 'react';

/**
 * Custom React Hook: useLocalStorage
 * Menyimpan dan membaca state dari localStorage secara otomatis.
 * Ini menggantikan fungsi saveTransactions() dan saveBudget() di Vanilla JS.
 */
export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
