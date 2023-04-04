import { useEffect, ReactElement } from "react";

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

SuccessPage.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default SuccessPage;
