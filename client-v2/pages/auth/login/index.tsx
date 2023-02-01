import { NextPage } from "next";

import FormLayout from "~components/auth/formLoginRegis/FormLayout";
import FormLoginUi from "~components/auth/formLoginRegis/FormLoginUi";

const LoginPage = () => {
  return (
    <FormLayout>
      <FormLoginUi />
    </FormLayout>
  );
};

LoginPage.getLayout = (page: NextPage) => {
  return <>{page}</>;
};

export default LoginPage;
