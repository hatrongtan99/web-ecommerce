import { useEffect } from "react";
import {useRouter} from 'next/router'

interface Props {
    keyQuery: string;
    value: string[];
}

const addQueryFilterInUrl = ({keyQuery, value}: Props) => {
    const router = useRouter()
  useEffect(() => {
    if (value.length == 0) {
        delete router.query[keyQuery];
        router.push({
            pathname: router.pathname,
            query: {...router.query}
        })
    } else {
        router.push({
            pathname: router.pathname,
            query: {...router.query, [keyQuery]: value.join()}
        }, undefined, {shallow: true})
    }
  }, [value, keyQuery])
}

export default addQueryFilterInUrl