"use client";

import { CartProductType } from "@/app/Product/[productid]/productDetails";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
const btnStyle = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantity:</div>}
      <div className="flex gap-4 items-center text-base">
        <button
          className="border-[1.2px] border-slate-300 px-2 rounded"
          onClick={handleQtyDecrease}
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyle} onClick={handleQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
