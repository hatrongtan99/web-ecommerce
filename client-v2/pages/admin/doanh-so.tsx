import { NextPage } from "next";
import React from "react";
import LayoutAdmin from "~components/layout/admin/LayoutAdmin";

const DoanhSoPage = () => {
  return <LayoutAdmin>daonh so</LayoutAdmin>;
};

DoanhSoPage.getLayout = function (page: NextPage) {
  return <>{page}</>;
};

export default DoanhSoPage;
