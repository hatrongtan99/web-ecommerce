import { MouseEvent, useState } from 'react';
import { Brands } from '~types/brand.type';

const useSetActiveFilterLayout = () => {
    const [active, setActive] = useState<string[]>([]);

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
