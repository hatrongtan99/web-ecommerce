export function getStorage(
    key: string,
    storage: 'localStorage' | 'sessionStorage'
) {
    if (window !== undefined) return window[storage].getItem(key);
}

export function setStorage(
    key: string,
    value: any,
    storage: 'localStorage' | 'sessionStorage'
) {
    if (window !== undefined) {
        window[storage].setItem(key, JSON.stringify(value));
    }
}
