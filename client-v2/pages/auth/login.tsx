import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import * as cookie from "cookie";

import FormLayout from "~components/auth/formLoginRegis/FormLayout";
import FormLoginUi from "~components/auth/formLoginRegis/FormLoginUi";
import { loginSuccess } from "~api/user.api";
import axios from "axios";

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const ck = cookie.parse((context.req.headers.cookie as string) ?? "");

  if (ck && ck.accessToken) {
    const instant = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL_SERVER,
      headers: {
        "content-type": "application/json",
        "Signed-access-cookie": ck.accessToken,
      },
    });

    try {
      const redirect = await loginSuccess(instant);
      if (redirect.data?.success && redirect.data.token) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {},
  };
};

export default LoginPage;
