import React, { createContext, useEffect, useState } from "react";
import {
  addToCart,
  decreaseQuantity,
  getCartDetails,
  increaseQuantity,
} from "../api";
import { Style, log } from "../utils/log";
import { trycatch } from "../utils/trycatch";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    log("=======CartContext fetchCartDetails=======", [], Style.effects);
    const fetchCartDetails = async () => {
      const [res, err] = await trycatch(getCartDetails());
      if (err) {
        log("...CartContext fetchCartDetails err:", [err], Style.danger);
        return;
      }
      log("...CartContext fetchCartDetails res:", [res], Style.success);
      const { data, status } = res;
      if (status === 200) {
        setCart(data);
        setProducts(data.products);
      } else {
        setMessage(data.message);
      }
    };

    fetchCartDetails();
  }, []);

  const updateProductDetails = async (details) => {
    const { _id, quantity } = details;

    log("...CartContext updateProductDetails...", [], Style.function);
    setLoading(true);
    const [addToCartRes, addToCartErr] = await trycatch(
      addToCart(_id, quantity),
    );
    if (addToCartErr) {
      log(
        "...CartContext updateProductDetails addToCart :",
        [addToCartErr],
        Style.danger,
      );
      setLoading(false);
      return;
    }
    log(
      "...CartContext updateProductDetails addToCart:",
      [addToCartRes],
      Style.success,
    );
    const { data, status } = addToCartRes;
    if (status !== 200) {
      setLoading(false);
      setMessage(data.message);
      return;
    }
    setCart(data);
    const [getCartRes, getCartErr] = await trycatch(getCartDetails());
    if (getCartErr) {
      log(
        "...CartContext updateProductDetails getCartDetails:",
        [getCartErr],
        Style.danger,
      );
      setLoading(false);
      return;
    }
    log(
      "...CartContext updateProductDetails getCartDetails:",
      [getCartRes],
      Style.success,
    );
    const { data: cartData, status: cartStatus } = getCartRes;
    if (cartStatus !== 200) {
      setLoading(false);
      setMessage(cartData?.message);
      return;
    }
    setProducts(cartData.products);
    setLoading(false);
    setMessage("পণ্য কার্ট যোগ করা হয়েছে");
  };

  const incQty = async (productId) => {
    log("...CartContext incQty...", [], Style.function);
    setLoading(true);
    const [increaseRes, increaseErr] = await trycatch(
      increaseQuantity(productId),
    );
    if (increaseErr) {
      log("...CartContext incQty:", [increaseErr], Style.danger);
      setLoading(false);
      return;
    }
    log("...CartContext incQty addToCart:", [increaseRes], Style.success);
    const { status: incQtyStatus } = increaseRes;
    if (incQtyStatus !== 200) {
      setLoading(false);
      setMessage("Something went wrong");
      return;
    }
    const [getCartRes, getCartErr] = await trycatch(getCartDetails());
    if (getCartErr) {
      log("...CartContext incQty getCartDetails:", [getCartErr], Style.danger);
      setLoading(false);
      return;
    }
    log("...CartContext incQty getCartDetails:", [getCartRes], Style.success);
    const { data, status: getCartStatus } = getCartRes;
    if (getCartStatus !== 200) {
      setLoading(false);
      setMessage(data.message);
      return;
    }
    setCart(data);
    setProducts(data.products);
    setLoading(false);
    setMessage("পণ্য কার্ট যোগ করা হয়েছে");
  };

  const decQty = async (productId) => {
    log("...CartContext decQty...", [], Style.function);
    setLoading(true);
    const [decreaseRes, decreaseErr] = await trycatch(
      decreaseQuantity(productId),
    );
    if (decreaseErr) {
      log("...CartContext decQty:", [decreaseErr], Style.danger);
      setLoading(false);
      return;
    }
    log("...CartContext decQty addToCart:", [decreaseRes], Style.success);
    const { status: decreaseStatus } = decreaseRes;
    if (decreaseStatus !== 200) {
      setLoading(false);
      setMessage("Something went wrong");
      return;
    }
    const [getCartRes, getCartErr] = await trycatch(getCartDetails());
    if (getCartErr) {
      log("...CartContext decQty getCartDetails:", [getCartErr], Style.danger);
      setLoading(false);
      return;
    }
    log("...CartContext decQty getCartDetails:", [getCartRes], Style.success);
    const { data, status: cartStatus } = getCartRes;
    if (cartStatus !== 200) {
      setLoading(false);
      setMessage(data.message);
      return;
    }
    setCart(data);
    setProducts(data.products);
    setLoading(false);
    setMessage("পণ্য কার্ট যোগ করা হয়েছে");
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        loading,
        message,
        updateProductDetails,
        incQty,
        decQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
