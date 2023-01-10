import classNames from 'classnames/bind';
import Catalog from './catalog/Catalog';
import Description from './description/Description';

import styles from './productDescription.module.scss';
import RatingBox from './ratingBox/RatingBox';

const cx = classNames.bind(styles);

const ProductDescription = () => {
    return (
        <div className={`row`}>
            {/* main description */}
            <div className="row">
                <div className={`col-8 ${cx('description')}`}>
                    <Description />
                </div>
                <div
                    className="col-4"
                    style={{
                        position: 'sticky',
                        top: 0,
                    }}
                >
                    <Catalog />
                </div>
            </div>

            <div className="col-8">
                {/* rating Box */}
                <RatingBox />
            </div>
        </div>
    );
};

export default ProductDescription;
