import React, { useEffect, useState } from "react";
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

    // if(isChecked){

    //   handleQuantityChange();
    // }

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

const Cart = ({ cartItems }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      totalPrice += cartItem.salesPrice * cartItem.quantity;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <div className="max-h-[67vh] min-w-full overflow-y-auto rounded-lg border ">
      <div className="sticky top-0 z-10 grid w-full grid-cols-3 gap-4 bg-white p-4 pb-3 font-medium ">
        <h6 className="text-start">Product</h6>
        <h6>Quantity</h6>
        <h6>Ind. Price</h6>
      </div>
      <div className="p-4 py-0">
        {!cartItems.length ? (
          <div className={`${total === 0 ? "block" : "hidden"} py-5 `}>No product added</div>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="grid w-full grid-cols-3">
              <p className="truncate py-2 ">{item.productName}</p>
              <p className="py-2 text-center">{item.quantity}</p>
              <p className="py-2 text-center ">{item.salesPrice * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      <div className="w-full p-4 pt-2">
        <div className=" h-[1px] w-full bg-black" />
        <div className="pr- flex flex-col gap-y-4">
          <p className="w-full pt-1 text-right font-semibold">Total: {total}</p>
          <p className="text-right">
            <span className="font-semibold"> Discount:</span>
            <span className="ml-2 bg-[#EEEEEE] px-1">{total < 300 ? "0" : "200"} </span>
          </p>

          <p className="text-right font-semibold">
            Final Price: {total < 300 ? <span>{total}</span> : <span>{total - 200}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

const SalesProducts = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);
  console.log("cartItems", cartItems);

  const addToCart = (product, remove = false) => {
    if (remove) {
      // Remove item from cart
      const updatedCartItems = cartItems.filter((item) => item._id !== product._id);
      setCartItems(updatedCartItems);
    } else {
      const itemIndex = cartItems.findIndex((item) => item._id === product._id);

      if (itemIndex !== -1) {
        // If product already exists in the cart, update quantity and individual price
        const updatedCartItems = [...cartItems];
        updatedCartItems[itemIndex].quantity = product.quantity;
        setCartItems(updatedCartItems);
      } else {
        // If product does not exist in the cart, add it
        setCartItems([...cartItems, { ...product }]);
      }
    }
  };

  return (
    <div className="grid min-h-[390px] w-full grid-cols-2 gap-4">
      <div className="max-h-[67vh] overflow-y-auto">
        {products.length === 0 ? (
          <div className="font-semibold capitalize text-rose-400">
            No Product Found for this Branch!!
          </div>
        ) : (
          products.map((product) => (
            <SalesProductItem key={product._id} product={product} addToCart={addToCart} />
          ))
        )}
      </div>
      <div>
        <Cart cartItems={cartItems} />
      </div>
    </div>
  );
};

export default SalesProducts;
