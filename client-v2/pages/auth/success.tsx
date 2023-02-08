import { NextPage } from "next";
import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      window.close();
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return <h2>Đăng nhập thành công!</h2>;
};

SuccessPage.getLayout = (page: NextPage) => {
  return <>{page}</>;
};

export default SuccessPage;
