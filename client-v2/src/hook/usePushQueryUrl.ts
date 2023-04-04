import { useQuery, useQueryClient } from "@tanstack/react-query";
import { NextRouter } from "next/router";
import { useEffect } from "react";

function usePushQueryUrl(
    keyQuery: string,
    value: string[],
    router: NextRouter,
    data?: any
) {
    useEffect(() => {
        if (value.length === 0) {
            delete router.query[keyQuery];
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query },
                },
                undefined,
                { shallow: true }
            );
        } else {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, [keyQuery]: value.join(",") },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [keyQuery, value]);
}

export default usePushQueryUrl;
