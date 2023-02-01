import { NextPage } from "next";
import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";

const AdminPage = () => {
  return (
    // <PerisrtLogin>
    //   <RequireAuth authValid={["Admin"]}>
    <div>AdminPage</div>
    //   </RequireAuth>
    // </PerisrtLogin>
  );
};

AdminPage.getLayout = function (page: NextPage) {
  return <>{page}</>;
};

export default AdminPage;
