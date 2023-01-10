import { useEffect, useState } from 'react';

const useDebounce = (init: string, delay: number = 300) => {
    const [value, setValue] = useState(init);
    useEffect(() => {
        const id = setTimeout(() => {
            setValue(init);
        }, delay);
        return () => {
            clearTimeout(id);
        };
    }, []);

    return value;
};

export default useDebounce;
