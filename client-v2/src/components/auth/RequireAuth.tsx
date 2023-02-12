import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "~hook/useAuth";
import Link from "next/link";

const RequireAuth = ({
  children,
  authValid,
}: {
  children: ReactNode;
  authValid: string[];
}) => {
  const router = useRouter();

  const { auth, setRedirect } = useAuth();

  useEffect(() => {
    if (!auth?.success || !auth.token) {
      setRedirect({ pathname: router.pathname, query: router.query });
      router.push("/auth/login");
    }
  }, [auth, router, setRedirect]);

  if (auth?.token && authValid.includes(auth.user.role)) {
    return <>{children}</>;
  }

  if (auth?.token) {
    return (
      <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
        you can't access this resource.
        <Link href={"/"}>
          <p style={{ fontSize: "1rem" }}>Click here to back home</p>
        </Link>
      </h2>
    );
  }

  return null;
};

export default RequireAuth;
