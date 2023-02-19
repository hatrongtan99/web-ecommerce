import { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";
import { GetServerSideProps } from "next";

const AdminIndex = () => {
  return <></>;
};

AdminIndex.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/admin/doanh-so",
      permanent: false,
    },
  };
};

export default AdminIndex;
