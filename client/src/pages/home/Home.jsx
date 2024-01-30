import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { getBranch } from "../../redux/slices/branchSlice";
import { getAllProducts } from "../../redux/slices/productSlice";

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getBranch());
  }, [dispatch]);

  return (
    <div className="flex h-screen w-full bg-background">
      <Toaster richColors />
      <Sidebar />
      <Outlet />
    </div>
  );
};
