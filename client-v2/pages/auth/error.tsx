import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      window.close();
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);
  return <h2>Đăng nhập thất bại!</h2>;
};

export default ErrorPage;
