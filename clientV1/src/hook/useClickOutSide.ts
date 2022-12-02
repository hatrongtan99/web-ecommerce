import { useEffect, RefObject } from "react";

const useClickOutSide = <T extends HTMLElement>(
    ref: RefObject<T>,
    handle: (e: MouseEvent | TouchEvent) => void
) => {

    useEffect(() => {
        const handleClickOutSide = (e: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) {
                return
            }
    
            handle(e)
        }

        document.addEventListener('mousedown', handleClickOutSide)
        document.addEventListener('touchstart', handleClickOutSide);

        return () => {
            document.removeEventListener('mousedown', handleClickOutSide)
            document.removeEventListener('touchstart', handleClickOutSide)
        }
    }, [ref, handle])
}

export default useClickOutSide