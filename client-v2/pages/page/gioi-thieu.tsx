import { useRouter } from "next/router";
import { useEffect } from "react";

const PageGioiThieu = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return <div>giới thiệu công ty</div>;
};

export default PageGioiThieu;
