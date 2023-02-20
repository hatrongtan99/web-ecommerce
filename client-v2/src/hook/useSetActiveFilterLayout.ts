import { MouseEvent, useState } from "react";
import useInitStateFilter from "./useInitStateFilter";

const useSetActiveFilterLayout = (field: string) => {
    const initValue = useInitStateFilter(field);
    const [active, setActive] = useState<string[]>(initValue);

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.dataset.id!;
        const exist = active.find((i) => i == id);
        if (exist) {
            setActive(active.filter((i) => i !== id));
        } else {
            setActive([...active, id]);
        }
    };
    return { active, handleClick };
};

export default useSetActiveFilterLayout;
