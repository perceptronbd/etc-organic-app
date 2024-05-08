// Description:
// The SalesProducts component displays a list of products and a shopping cart. Users can add or remove products from the cart, and the cart will display the total price, discount, and final price.

// Props:
// products: An array of product objects, where each object has the following properties:
// _id: The unique identifier for the product.
// productName: The name of the product.
// category: The category of the product.
// branch: The branch of the product
// salesPrice: The price of the product.
// quantity: The initial quantity of the product.

// Components:
// The SalesProducts component is composed of two main sub-components:
// 1. SalesProductItem: check SalesProductItem.jsx
// 2. Cart: check documentation on Cart.jsx

// Functionality:
// The SalesProducts component manages the state of the cart items using the useState hook.
// The addToCart function is responsible for adding or removing products from the cart. It checks if the product already exists in the cart and updates the quantity accordingly.

// Usage:
// <SalesProducts products={/* Array of product objects */} />

import React, { useState } from "react";
import Cart from "../../components/cart/Cart";
import SalesProductItem from "./SalesProductItem";

const SalesProducts = ({ products }) => {
  const [cartItems, setCartItems] = useState([]);

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
