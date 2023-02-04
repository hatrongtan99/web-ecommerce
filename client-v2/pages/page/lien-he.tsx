import { useRouter } from "next/router";
import { useEffect } from "react";

const PageLienHe = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return <div>lien he</div>;
};

export default PageLienHe;
