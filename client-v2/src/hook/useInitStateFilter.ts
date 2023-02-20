import { useRouter } from "next/router";

const useInitStateFilter = (field: string) => {
    const router = useRouter();
    if (router.query[field]) {
        const valueQuery = router.query[field] as string;
        return valueQuery.split(",");
    }
    return [];
};

export default useInitStateFilter;
