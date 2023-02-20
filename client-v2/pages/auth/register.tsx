import { ReactElement } from "react";
import FormLayout from "~components/auth/formLoginRegis/FormLayout";
import FormRegisterUi from "~components/auth/formLoginRegis/FormRegisterUi";

const RegisterPage = () => {
    return (
        <FormLayout>
            <FormRegisterUi />
        </FormLayout>
    );
};

RegisterPage.getLayout = (page: ReactElement) => {
    return <>{page}</>;
};

export default RegisterPage;
