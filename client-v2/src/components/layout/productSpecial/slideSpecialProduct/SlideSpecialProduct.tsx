import { useState } from "react";

import SlideShow from "~components/common/product/slideShow/SlideShow";
import ProductItem from "~components/common/product/productItem/ProductItem";

const SlideSpecialProduct = ({ data }: { data: any }) => {
  data = [data[data.length - 1], ...data];
  data = [data[1], ...data];

  const [indexImg, setIndexImg] = useState<number>(4);
  const [needTransition, setNeedTransition] = useState(true);
  const [isMove, setIsMove] = useState(false);

  const handleMoveSlide = (value: string) => {
    if (isMove) return;
    if (value == "next") {
      setIndexImg(indexImg + 1);
      setNeedTransition(true);
    } else if (value == "prev") {
      setIndexImg(indexImg - 1);
      setNeedTransition(true);
    }
    setIsMove(true);
  };

  const handleTransitionEnd = () => {
    if (indexImg == data.length - 5) {
      setNeedTransition(false);
      setIndexImg(3);
    } else if (indexImg == 3) {
      setNeedTransition(false);
      setIndexImg(data.length - 5);
    }
    setIsMove(false);
  };

  let style = {
    transform: `translateX(${indexImg * -25}%)`,
    transition: `${needTransition ? "all 0.25s ease 0s" : "none"}`,
  };

  return (
    <SlideShow
      handleMoveSlide={handleMoveSlide}
      handleTransitionEnd={handleTransitionEnd}
      style={style}
    >
      {data.map((product: any, index: number) => {
        return (
          <div className={`col-3`} key={index}>
            <ProductItem brandImg={false} product={product} />
          </div>
        );
      })}
    </SlideShow>
  );
};

export default SlideSpecialProduct;
