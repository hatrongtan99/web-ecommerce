import { NextPage } from "next";
import FormLayout from "~components/auth/formLoginRegis/FormLayout";
import FormRegisterUi from "~components/auth/formLoginRegis/FormRegisterUi";

const RegisterPage = () => {
  return (
    <FormLayout>
      <FormRegisterUi />
    </FormLayout>
  );
};

RegisterPage.getLayout = (page: NextPage) => {
  return <>{page}</>;
};

export default RegisterPage;
