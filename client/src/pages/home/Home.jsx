import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Sidebar } from "../../components/sidebar/Sidebar";

export const Home = () => {
  return (
    <div className="flex h-screen w-full bg-background">
      <Toaster richColors />
      <Sidebar />
      <Outlet />
    </div>
  );
};
