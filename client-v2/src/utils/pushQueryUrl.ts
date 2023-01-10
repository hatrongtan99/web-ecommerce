import { useRouter } from 'next/router';
import { useEffect } from 'react';

function pushQueryUrl(keyQuery: string, value: string[]) {
    const router = useRouter();

    useEffect(() => {
        if (value.length === 0) {
            delete router.query[keyQuery];
            router.push({
                pathname: router.pathname,
                query: { ...router.query },
            });
        } else {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, [keyQuery]: value.join(',') },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [keyQuery, value]);
}

export default pushQueryUrl;
