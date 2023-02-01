import { useRouter } from "next/router";
import { useEffect } from "react";

const pageLienHe = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return <div>lien he</div>;
};

export default pageLienHe;
