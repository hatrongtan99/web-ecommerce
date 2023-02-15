import { ReactElement } from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";
import { GetStaticProps } from "next";

const AdminIndex = () => {
  return <div>AdminIndex</div>;
};

AdminIndex.getLayout = (page: ReactElement) => {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      destination: "/admin/doanh-so",
      permanent: false,
    },
  };
};

export default AdminIndex;
