import { useRouter } from "next/router";
import { useState } from 'react';
import { useDispatch } from "react-redux";

import Button from "~/components/custom/button";
import loadProductByCategory from "~/utils/loadProductByCategory";


const ButtonLoadExtraProducts = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {page = '1', category, ...rest} = router.query;

    const [pageNumber, setPageNumber] = useState<number>(Number(page || 1));

    const handlePlusPage = () => {
        setPageNumber(pageNumber + 1);
        router.push({
            pathname: router.pathname,
            query: {...router.query, page: pageNumber + 1}
        }, undefined, {shallow: true});
        loadProductByCategory(dispatch, category as string, (pageNumber + 1).toString(), rest);
    }

  return (
    <div className='d-flex justify-content-center' style={{margin: '10px 0'}}>
        <Button size='lg' onClick={handlePlusPage}>
            Xem thêm ... 
        </Button>
    </div>
  )
}

export default ButtonLoadExtraProducts