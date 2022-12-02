import { useRouter } from "next/router";
import { useState } from 'react';
import { useDispatch } from "react-redux";

import Button from "~/components/custom/button";
import { loadProductByCategory } from "~/utils/loadProduct";

interface ButtonLoadExtraProductsProps {
    metaData: {
        totalCount: number;
        restProducts: number
    },
    categoryProps?: string
}

const ButtonLoadExtraProducts = ({metaData, categoryProps}: ButtonLoadExtraProductsProps) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {page, category, ...rest} = router.query;

    const [pageNumber, setPageNumber] = useState<number>(Number(page || 1));

    const handlePlusPage = () => {
        setPageNumber(pageNumber + 1);
        router.push({
            pathname: router.pathname,
            query: {...router.query, page: pageNumber + 1}
        }, undefined, {shallow: true});
        loadProductByCategory(dispatch, category as string || categoryProps as string, (pageNumber + 1).toString(), rest);
    }

  return (
    metaData.restProducts > 0 ?
        <div className='d-flex justify-content-center' style={{margin: '10px 0'}}>
            <Button size='lg' onClick={handlePlusPage}>
                Xem thêm {metaData.restProducts} 
            </Button>
        </div> 
    : null
  )
}

export default ButtonLoadExtraProducts