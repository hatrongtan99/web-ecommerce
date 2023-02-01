import { ReactNode } from "react";
import usePersirtToken from "~hook/usePersirtToken";
import Spinner from "~components/common/spiner/Spiner";

const PerisrtLogin = ({ children }: { children: ReactNode }) => {
  const { isLoading } = usePersirtToken();

  if (isLoading) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default PerisrtLogin;
