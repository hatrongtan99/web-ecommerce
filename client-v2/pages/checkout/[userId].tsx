import { useContext } from "react";

import { AuthContext } from "~context/AuthProvider";
import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import CheckoutProductList from "~components/layout/checkout/checkoutProductList/CheckoutProductList";
import CheckoutTop from "~components/layout/checkout/checkoutTop/CheckoutTop";
import CustomerForm from "~components/layout/checkout/cutomerForm/CustomerForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "~hook/useAxiosPrivate";
import { getCartUser } from "~api/cart.api";
import Spinner from "~components/common/spiner/Spiner";

const CheckoutPage = () => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading } = useQuery(
    ["get-cart-user", auth?.user._id],
    () => getCartUser(axiosPrivate),
    { refetchOnWindowFocus: false }
  );

  return (
    <main className="main-content">
      {/* <PerisrtLogin>
        <RequireAuth authValid={["User", "Admin"]}> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="col-6 offset-3">
            <CheckoutTop />

            <CheckoutProductList />

            <CustomerForm />
          </div>
        </div>
      )}

      {/* </RequireAuth>
      </PerisrtLogin> */}
    </main>
  );
};

export default CheckoutPage;
