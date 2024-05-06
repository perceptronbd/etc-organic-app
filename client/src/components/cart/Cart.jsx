// Overview
// The Cart component is a reusable React component designed to display the contents of a shopping cart, including the total price of items, any applicable discounts, and the final price.

// Props
// cartItems: An array of objects, where each object represents an item in the cart. Each item object should include at least the following properties:
// _id: A unique identifier for the item.
// productName: The name of the product.
// salesPrice: The sales price of the product.
// quantity: The quantity of the product in the cart.

// State
// total: A state variable that holds the total price of all items in the cart. It is calculated by multiplying the salesPrice of each item by its quantity and summing these values.

// Usage
// To use the Cart component, you need to pass an array of cart item objects as the cartItems prop. Each item object should include at least the properties mentioned above.

// Example:
// const cartItems = [
//  { _id: '1', productName: 'Product A', salesPrice: 100, quantity: 2 },
//  { _id: '2', productName: 'Product B', salesPrice: 200, quantity: 1 },
//  // More items...
// ];

// <Cart cartItems={cartItems} />

import { useEffect, useState } from "react";

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

export default Cart;
