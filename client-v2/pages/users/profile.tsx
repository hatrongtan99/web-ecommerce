import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import Sidebar from "~components/layout/users/sidebar/Sidebar";

const UsersProfilePage = () => {
    return (
        <PerisrtLogin>
            <RequireAuth authValid={["Admin", "User"]}>
                <Sidebar>
                    <div></div>
                </Sidebar>
            </RequireAuth>
        </PerisrtLogin>
    );
};

export default UsersProfilePage;
