import { ReactElement } from "react";
import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import SidebarAdmin from "./sidebarAdmin/SidebarAdmin";

const LayoutAdmin = ({ children }: { children: ReactElement }) => {
  return (
    <PerisrtLogin>
      <RequireAuth authValid={["Admin"]}>
        <SidebarAdmin>{children}</SidebarAdmin>
      </RequireAuth>
    </PerisrtLogin>
  );
};

export default LayoutAdmin;
