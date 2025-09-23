'use client';

import { LOCAL_STORAGE_KEYS } from '@/shared/constants/localStorage';

export class LocalstorageService {
    static save<T>(key: LOCAL_STORAGE_KEYS, item: T) {
        const json = JSON.stringify(item);
        localStorage.setItem(key, json);
    }

    static get<T>(key: LOCAL_STORAGE_KEYS) {
        const item = localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : null;
    }
}
