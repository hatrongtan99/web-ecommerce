import { useEffect, RefObject } from "react";

const useClickOutSide = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: () => void
) => {
    useEffect(() => {
        const mouseEvent = (e: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) {
                return;
            }
            callback();
        };

        document.addEventListener("mousedown", mouseEvent);
        document.addEventListener("touchstart", mouseEvent);
        return () => {
            document.removeEventListener("mousedown", mouseEvent);
            document.removeEventListener("touchstart", mouseEvent);
        };
    }, []);
};
export default useClickOutSide;
