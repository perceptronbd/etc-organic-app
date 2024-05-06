// This component represents a single product item in the list.
// It displays the product name, a checkbox to add/remove the product from the cart, and buttons to increase or decrease the quantity of the product.
// It handles the checkbox change event to add or remove the product from the cart.
// It updates the product quantity and triggers the addToCart function when the quantity changes.

import { useEffect, useState } from "react";
import { RxPlus, RxMinus } from "react-icons/rx";
import { Checkbox } from "../../components";

const SalesProductItem = ({ product, addToCart }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [productData, setProductData] = useState(product);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      addToCart(productData);
    } else {
      addToCart(productData, true); // Remove item from cart
    }
  };

  const handleDecrease = () => {
    if (productData.quantity > 0) {
      setProductData({ ...productData, quantity: productData.quantity - 1 });
    }
  };

  const handleIncrease = () => {
    setProductData({ ...productData, quantity: productData.quantity + 1 });
  };

  useEffect(() => {
    const handleQuantityChange = () => {
      if (productData.quantity === 0) {
        addToCart(productData, true); // Remove item from cart
        setIsChecked(false);
      } else {
        addToCart(productData);
        setIsChecked(true);
      }
    };

    handleQuantityChange();
  }, [productData]);

  return (
    <div className="pr-4">
      <div className="mb-4 grid max-w-sm grid-cols-2 items-center gap-10">
        <div className="flex items-center">
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            disabled={productData.quantity < 1}
          />
          <span className="ml-2 truncate">{productData.productName}</span>
        </div>
        <div className="grid w-full grid-cols-3 items-center gap-3 ">
          <button
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black text-3xl transition-all duration-150 hover:border-[#0C924F] hover:text-[#0C924F]"
            onClick={handleDecrease}
            disabled={productData.quantity < 1}
          >
            <RxMinus className="text-sm" />
          </button>
          <p className="text-center font-semibold"> {productData.quantity}</p>
          <div className="flex justify-end">
            <button
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-black text-2xl transition-all duration-150 hover:border-[#0C924F] hover:text-[#0C924F]"
              onClick={handleIncrease}
            >
              <RxPlus className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesProductItem;
