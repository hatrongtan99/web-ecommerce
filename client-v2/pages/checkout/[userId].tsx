import PerisrtLogin from "~components/auth/PerisrtLogin";
import RequireAuth from "~components/auth/RequireAuth";
import CheckoutProductList from "~components/layout/checkout/checkoutProductList/CheckoutProductList";
import CheckoutTop from "~components/layout/checkout/checkoutTop/CheckoutTop";
import CustomerForm from "~components/layout/checkout/cutomerForm/CustomerForm";

const CheckoutPage = () => {
    return (
        <main className="main-content">
            <PerisrtLogin>
                <RequireAuth authValid={["User", "Admin"]}>
                    <div className="container">
                        <div className="col-6 offset-3">
                            <CheckoutTop />

                            <CheckoutProductList />

                            <CustomerForm />
                        </div>
                    </div>
                </RequireAuth>
            </PerisrtLogin>
        </main>
    );
};

export default CheckoutPage;
