import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useEffect } from "react";

import EditableComponent from "~/components/component/editableComponent";
import { useAppDispatch } from "~/redux/hooks";
import { loadProductByCategoryAndSlug } from "~/utils/loadProduct";

import styles from './editProduct.module.scss';

const cx = classNames.bind(styles);

const UpdateProduct = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = router.query.all;
    useEffect(() => {
        if (path) {
            loadProductByCategoryAndSlug(dispatch, path[0], path[1])
        }
    }, [path])

    const handleChange = (v: any) => {
        console.log(v)
    }

    return (
        <div className='offset-2'>
            <h1 className={cx('title')}>Chỉnh sửa sản phẩm</h1>
            <EditableComponent onChange={handleChange}>
                <div>1h1h</div>
            </EditableComponent>
        </div>
    )
}

export default UpdateProduct;