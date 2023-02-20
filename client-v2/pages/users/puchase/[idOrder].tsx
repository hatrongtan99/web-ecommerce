import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { getDetailOrderByUser } from "~api/order.api";
import Sidebar from "~components/layout/users/sidebar/Sidebar";
import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import DetailOrder from "~components/layout/users/detailOrder/DetailOrder";

const DetailOrderUserPage = () => {
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const { data, isSuccess } = useQuery(
        ["order-user", router.query.idOrder],
        () => getDetailOrderByUser(axiosPrivate, router.query.idOrder as string)
    );

    return (
        <PerisrtLogin>
            <RequireAuth authValid={["Admin", "User"]}>
                <Sidebar>
                    {isSuccess && <DetailOrder order={data.data.order} />}
                </Sidebar>
            </RequireAuth>
        </PerisrtLogin>
    );
};

export default DetailOrderUserPage;
