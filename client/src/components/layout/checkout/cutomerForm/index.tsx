import classNames from "classnames/bind";
import Button from "~/components/custom/button";
import styles from './customerForm.module.scss';

const cx = classNames.bind(styles);

const CustomerForm = () => {
  return (
    <form className={cx('customer-form')}>
        <div className={cx('title')}>
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
        </div>

        <div className={cx('checkbox')}>
            <input id='male' type="radio" name='type-sex' defaultChecked/>
            <label htmlFor='male' >Anh</label>
            <input id='female' type="radio" name='type-sex'/>
            <label htmlFor='female'>Chị</label>
        </div>

        <div className="form-group">
            <div className='row my-3'>
                <div className='col-6'>
                    <input className='form-control' placeholder='Your name'/>
                </div>
                <div className='col-6'>
                    <input className='form-control' placeholder='Your email'/>
                </div>
            </div>

            <div className="col-12 my-3">
                <input className='form-control' placeholder='Your phone'/>
            </div>

            <div className="col-12 my-3">
                <input className='form-control' placeholder='Your address'/>
            </div>

            <div className="col-12 my-3">
                <textarea className='form-control' placeholder='Your address'/>
            </div>
        </div>

        <div className='text-center'>
            <Button type='submit' size='md' style={{padding: '4px 20px'}}>
                GỬI THÔNG TIN ĐẶT HÀNG
            </Button>
        </div>
    </form>
  )
}

export default CustomerForm