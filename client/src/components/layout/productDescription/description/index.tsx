import {useState} from 'react';
import classNames from "classnames/bind";
import Link from 'next/link';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';

import Button from "~/components/custom/button";

import styles from './description.module.scss';
const cx = classNames.bind(styles);

const Description = () => {

  const [showFull, setShowFull] = useState<boolean>(false)
  return (
    <div className={cx('description', {full: showFull})}>
      <p className={cx('description__content')}>
        <Link href='/'>Máy khoan búa Milwaukee M18 CHX-0X0</Link> mới chỉ xuất hiện trên thị trường gần đây nhưng đã nhanh chóng trở thành loại máy khoan búa được ưa chuộng. Sản phẩm đến từ thương hiệu Milwaukee hàng đâu tại Mỹ chuyên cung cấp sản phẩm máy khoan, máy cắt, máy cưa,... chất lượng cao. 
      </p>
      <p>Quý khác lưu ý: <strong>Sản phẩm gồm thân máy chính, không có pin và sạc.</strong> </p>

      <h2>Thiết kế nổi bật của máy khoan búa Milwaukee M18 CHX-0X0</h2>
      <p>Milwaukee M18 CHX-0X0 được biết đến là dòng <Link href='/'>máy khoan búa</Link> được thiết kế để sử dụng lực đập mạnh mẽ vào thẳng vật liệu, giúp dễ dàng khoan các vật liệu. Thiết kế với hai màu chủ đạo đỏ và đen nổi bật tạo nên thương hiệu Milwaukee. </p>

      <img src='https://maydochuyendung.com/img/uploads/user_74/images/may-khoan/may-khoan-bua-milwaukee-m18-chx-502c.jpg' alt=''/>
      <i>Máy khoan cao cấp độ bền cao, chống rung hiệu quả</i>
      <p>Lớp vỏ nhựa kết hợp với cao su được bọc ở tay cầm chắc chắn, chống chịu được va đập. Kết cấu máy chắc chắn nâng cao khả năng chống rung. Đặc biệt, công nghệ chống rung AVS sẽ giúp làm giảm độ rung ở mức cao nhất giúp máy hoạt động êm ái, không gây tê mỏi tay khi thao tác với máy trong thời gian dài. </p>
      <p>Tay cầm phụ xoay 360 độ giúp người dùng dễ dàng tìm được điểm tựa để thực hiện khoan được thuận lợi. Trọng lượng của máy chưa đầy 3kg kết hợp tay cầm chính linh hoạt để có thể thực hiện khoan ở nhiều vị trí khác nhau. </p>
      <h2>Máy khoan búa Milwaukee M18 CHX-0X0 - Lực đập 2.5J, tốc độ không tải 1400 vòng/phút</h2>
      <p>Milwaukee M18 CHX-0X0 cũng là dòng <Link href='/'>máy khoan cầm tay</Link> sử dụng động cơ không chổi than POWERSTATE ™, nâng cao hiệu suất làm việc lên 25% so với động cơ thông thường. Lực đập của máy đạt 2.5J, độ rung thấp ở mức 8.9m/s2. Tốc độ không tải đạt 1400 vòng/phút, tốc độ đập đạt tới 4900 vòng/phút.</p>
      <img src='https://maydochuyendung.com/img/uploads/user_74/images/may-khoan/may-khoan-bua-milwaukee-m18-chx-0x0-bare-4.jpg' alt=''/>
      <i>Máy khoan Milwaukee M18 CHX-0X0 lực đập mạnh mẽ, khoan trên nhiều vật liệu</i>
      <p>Máy khoan búa hoạt động với 4 chế độ là việc: búa quay, búa quay và đục. Người dùng có thể sử dụng máy để thực hiện các công việc khoan bê tông, khoan tường dễ dàng. Thiết kế FIXEC có khả năng tay đổi mâm cặp để khoan trên nhiều bề mặt vật liệu. </p>
      <img src='https://maydochuyendung.com/img/uploads/user_74/images/may-khoan/may-khoan-bua-milwaukee-m18-chx-0x0-bare-2.jpg' alt=''/>
      <i>Máy hoạt động với 3 chức năng khoan búa, khoan thường, đục</i>
      <p>Milwaukee M18 CHX-0X0 có khả năng khoan trên bê tông là 26mm, khoan sắt 13mm, khoan gỗ 30mm, khoan trên gạch, đá vôi là 65mm. Đây chắc chắn cũng là dòng máy khoan động lực cung cấp các chức năng hoạt động tốt nhất cho người dùng. </p>
      <h2>Công nghệ hiện đại</h2>
      <p>Hãng Milwaukee tiếp tục ứng dụng các công nghệ hiện đại vào sản xuất máy khoan búa Milwaukee M18 CHX-0X0 đảm bảo máy vận hành được ổn định nhất.</p>
      <ul>
        <li>Công nghệ FUEL ™ mang đến khả năng cho máy hoạt động với tốc độ nhanh, độ bền cao, pin bền lâu khi làm việc cả ngày chỉ với một lần sạc duy nhất. </li>
        <li>Công nghệ REDLINK PLUS ™ Intelligence - Hệ thống bo mạch điện tử thông minh nâng cao sự liên kết giữa công cụ, pin, bộ sạc, kiểm soát và bảo vệ máy chống sự cố quá tải, quá nhiệt. </li>
        <li>Công nghệ bộ pin REDLITHIUM ™ -ION bền lâu, tiết kiệm năng lượng, nâng cao công suất hoạt động lên tới 30%, thời gian sạc nhanh chóng, tiết kiệm năng lượng pin tối ưu. </li>
      </ul>
      <img src='https://maydochuyendung.com/img/uploads/user_74/images/may-khoan/may-khoan-bua-milwaukee-m18-chx-0x0-bare-2.jpg' alt=''/>
      <i>REDLITHIUM ™ -ION bền lâu, nâng cao hiệu suất làm việc</i>
      <p>Máy khoan búa Milwaukee M18 CHX-0X0 hoạt động ổn định, vận hành bền bỉ để trở thành công cụ cầm tay hỗ trợ đắc lực cho các công việc khoan chuyên nghiệp. Máy đang được phân phối chính hãng 100%, cam kết chất tại Maydochuyendung.com. Đơn vị tư vấn chuyên nghiệp, báo giá cạnh tranh và bảo hành uy tín cho mọi khách hàng. </p>

      <div className={cx('overlay', {hiden: !showFull == false})}>
        <Button size='sm' variant="secondary-border" rightIcon={<IoMdArrowDropdown/>} onClick={() => setShowFull(true)}>
          Xem thêm nội dung
        </Button>
      </div>
      <div className='d-flex justify-content-center align-items-end'>
        <Button size='sm' variant="secondary-border" rightIcon={<IoMdArrowDropup/>} onClick={() => setShowFull(false)}>
          Thu Gọn
        </Button>
      </div>
    </div>
  )
}

export default Description