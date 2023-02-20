import React from "react";
import { useQuery } from "@tanstack/react-query";

import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import Perchase from "~components/layout/users/perchase/Perchase";
import Sidebar from "~components/layout/users/sidebar/Sidebar";
import useAuth from "~hook/useAuth";
import { getOrderByUser } from "~api/order.api";
import useAxiosPrivate from "~hook/useAxiosPrivate";

const UsersPuchasePage = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const { data, isSuccess } = useQuery(
        ["list-order", auth?.user._id],
        () => getOrderByUser(axiosPrivate),
        {
            enabled: auth !== null && !!auth.token,
            refetchOnWindowFocus: false,
        }
    );
    return (
        <PerisrtLogin>
            <RequireAuth authValid={["Admin", "User"]}>
                <Sidebar>{isSuccess && <Perchase data={data?.data} />}</Sidebar>
            </RequireAuth>
        </PerisrtLogin>
    );
};

export default UsersPuchasePage;
