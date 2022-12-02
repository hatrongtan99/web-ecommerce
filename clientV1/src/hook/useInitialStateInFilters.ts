import {useRouter} from 'next/router';

const useInitialStateInFilters = (keyQuery: string) => {
    const router = useRouter();
    if (router.query[keyQuery]) {
        const valueQuery = router.query[keyQuery] as string
        return valueQuery.split(',')
    }
  return []
}

export default useInitialStateInFilters