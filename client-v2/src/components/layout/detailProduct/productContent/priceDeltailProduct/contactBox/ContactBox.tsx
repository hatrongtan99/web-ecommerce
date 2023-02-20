import classNames from "classnames/bind";
import { BsFillTelephoneInboundFill } from "react-icons/bs";

import styles from "../../priceDeltailProduct/priceDeltailProduct.module.scss";

const cx = classNames.bind(styles);

const ContactBox = () => {
    return (
        <div className={cx("contact-box")}>
            {/* <div className='row'>
        <div className='col-3 d-flex'>
          <BsFillTelephoneInboundFill/>
          <p>Hotline</p>
        </div>
        <div className='col-9'>
          test
        </div>
      </div> */}
        </div>
    );
};

export default ContactBox;
