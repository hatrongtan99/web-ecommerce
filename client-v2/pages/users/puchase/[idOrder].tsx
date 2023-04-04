import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { getDetailOrderByUser } from "~api/order.api";
import Sidebar from "~components/layout/users/sidebar/Sidebar";
import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import DetailOrder from "~components/layout/users/detailOrder/DetailOrder";
import useAuth from "~hook/useAuth";

const DetailOrderUserPage = () => {
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const { auth } = useAuth();
    const { data, isSuccess } = useQuery(
        ["order-user", router.query.idOrder],
        () =>
            getDetailOrderByUser(axiosPrivate, router.query.idOrder as string),
        {
            // initialData: () => {
            //     return queryClient.getQueryData(["list-order", auth?.user._id])?.find((data) => {});
            // },
        }
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
