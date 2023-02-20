import { useContext } from "react";
import { SidebarAdminContext } from "~context/SidebarAdminProvider";

const useSidebar = () => {
    return useContext(SidebarAdminContext);
};

export default useSidebar;
