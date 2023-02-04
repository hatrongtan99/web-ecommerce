import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

import Button from "~components/custom/button/Button";

import styles from "./description.module.scss";
const cx = classNames.bind(styles);

const Description = ({ desc }: { desc: any }) => {
  const [showFull, setShowFull] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(true);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef !== null) {
      const x = divRef.current?.getBoundingClientRect();
      if (x && x.height <= 500) {
        setShowBtn(false);
      }
    }
  }, [divRef]);

  return (
    <div className={cx("description", { full: showFull })}>
      <div dangerouslySetInnerHTML={{ __html: desc?.desc }} ref={divRef} />
      {showBtn && (
        <>
          <div className={cx("overlay", { hiden: !showFull == false })}>
            <Button
              size="sm"
              variant="secondary-border"
              rightIcon={<IoMdArrowDropdown />}
              onClick={() => setShowFull(true)}
            >
              Xem thêm nội dung
            </Button>
          </div>
          <div className="d-flex justify-content-center align-items-end">
            <Button
              size="sm"
              variant="secondary-border"
              rightIcon={<IoMdArrowDropup />}
              onClick={() => setShowFull(false)}
            >
              Thu Gọn
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Description;
