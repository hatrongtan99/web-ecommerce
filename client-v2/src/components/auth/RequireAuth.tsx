import { useContext, ReactNode, useEffect } from "react";
import { AuthContext } from "~context/AuthProvider";
import { useRouter } from "next/router";

const RequireAuth = ({
  children,
  authValid,
}: {
  children: ReactNode;
  authValid: string[];
  publicPage?: boolean;
}) => {
  const router = useRouter();

  const { auth, setRedirect } = useContext(AuthContext);

  useEffect(() => {
    if (!auth?.success || !auth.token) {
      setRedirect({ pathname: router.pathname, query: router.query });
      router.push("/auth/login");
    }
  }, [auth, router, setRedirect]);

  if (auth?.success && authValid.includes(auth.user.role)) {
    return <>{children}</>;
  }

  if (auth?.success) {
    return <h2>you can't access this resource</h2>;
  }

  return null;
};

export default RequireAuth;
