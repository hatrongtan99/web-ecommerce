import {
    ReactNode,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

export const SidebarAdminContext = createContext<{
    resizeSidebar: boolean;
    setResizeNavbar: Dispatch<SetStateAction<boolean>>;
    itemsOpen: number[];
    setItemsOpen: Dispatch<SetStateAction<number[]>>;
} | null>(null);

const SidebarAdminProvider = ({ children }: { children: ReactNode }) => {
    const [resizeSidebar, setResizeNavbar] = useState(false);
    const [itemsOpen, setItemsOpen] = useState<number[]>([]);

    return (
        <SidebarAdminContext.Provider
            value={{ itemsOpen, resizeSidebar, setItemsOpen, setResizeNavbar }}
        >
            {children}
        </SidebarAdminContext.Provider>
    );
};

export default SidebarAdminProvider;
