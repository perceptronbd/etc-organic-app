import {
  BarChart4,
  Boxes,
  FileBarChart2,
  GanttChartSquare,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Users,
  Wallet,
  Layers2,
  UserCircle,
  Ticket
} from "lucide-react";
export const navLinks = [
  {
    title: "Home",
    links: [
      {
        title: "Overview",
        path: "/overview",
        icon: <GanttChartSquare size={18} />,
      },
    ],
  },
  {
    title: "Dashboard",
    links: [
      {
        title: "Products",
        path: "/product-list",
        icon: <Boxes strokeWidth={1.3} size={18} />,
      },
      {
        title: "Purchase",
        path: "/purchase",
        icon: <ShoppingBag size={18} />,
      },
      { title: "Sales", path: "/sales", icon: <ShoppingCart size={18} /> },
      {
        title: "Stock",
        path: "/stockQuantity",
        icon : <Layers2 />,
      },
      {
        title: "CSB and Referers",
        path: "/referers",
        icon :  <UserCircle />,
      },{
        title: "Vouchers",
        path: "/vouchers",
        icon :  <Ticket />,
      }
    ],
  },
  {
    title: "Reports",
    links: [
      { title: "Sales Report", path: "/sales-report", icon: <BarChart4 size={18} /> },
      {
        title: "Purchase",
        path: "/purchase-report",
        icon: <FileBarChart2 size={18} />,
      },
    ],
  },
  {
    title: "Wallet",
    links: [{ title: "Cash Withdraw", path: "/cash-withdraw", icon: <Wallet size={18} /> }],
  },
  {
    title: "Others",
    links: [
      { title: "Orders", path: "/orders", icon: <ShoppingBasket size={18} /> },
      { title: "Employees", path: "/employees", icon: <Users size={18} /> },
    ],
  },
];
