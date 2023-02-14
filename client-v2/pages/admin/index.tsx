import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const AdminIndex = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/doanh-so");
  }, []);
  return <div>AdminIndex</div>;
};

AdminIndex.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default AdminIndex;
