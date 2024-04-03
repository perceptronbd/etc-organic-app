import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Component } from "./components/Component";
import { useAuth } from "./context/AuthContext";
import {
  AddEmployee,
  Voucher,
  AddProduct,
  CashWithdraw,
  EditProduct,
  Employees,
  Home,
  Login,
  Orders,
  Overview,
  ProductList,
  Purchase,
  PurchaseReport,
  Referers,
  Sales,
  SalesReport,
  StockQuantity,
  UpdateEmployee,
} from "./pages";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/login" element={!user ? <Login /> : <Navigate to={"/overview"} />} />
      <Route path="/component" element={<Component />} />
      <Route exact path="/" element={user ? <Home /> : <Navigate to={"/login"} />}>
        <Route path="overview" element={<Overview />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-list/add-product" element={<AddProduct />} />
        <Route path="product-list/edit-product/:id" element={<EditProduct />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="sales" element={<Sales />} />
        <Route path="sales-report" element={<SalesReport />} />
        <Route path="purchase-report" element={<PurchaseReport />} />
        <Route path="cash-withdraw" element={<CashWithdraw />} />
        <Route path="orders" element={<Orders />} />
        <Route path="employees" element={<Employees />} />
        <Route path="employees/add-employee" element={<AddEmployee />} />
        <Route path="stockQuantity" element={< StockQuantity/>} />
        <Route path="referers" element={< Referers/>} />
        <Route path="vouchers" element={<Voucher/>} />
        <Route path="employees/update-employee/:item" element={<UpdateEmployee />} />
      </Route>
    </Routes>
  );
}
