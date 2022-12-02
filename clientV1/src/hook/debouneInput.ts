import {useState, useEffect} from 'react';

export default function debounceInput(value: string, timer: number) { 
    const [debounceValue, setValueDebounce] = useState<string>(value)

    useEffect(() => {
        const idSetTimeout = setTimeout(() => setValueDebounce(value), timer);

        return () => {
            clearTimeout(idSetTimeout)
        }
    }, [timer, value])

    return debounceValue
}