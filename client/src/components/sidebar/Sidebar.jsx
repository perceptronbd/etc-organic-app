import { ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../button/Button";
import { Text } from "../text/Text";
import { navLinks } from "./navLinks";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();

  const handleLogOut = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="m-2 mr-4 h-[98%] rounded-md bg-foreground">
      <div className={` ${open ? "w-52" : "w-20 "}  relative p-5 duration-300`}>
        <ArrowRightCircle
          className={`absolute -right-3 top-16 h-6 w-6 cursor-pointer rounded-full border-2 border-foreground bg-foreground text-primary  ${
            open ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="m-0 flex items-center gap-x-4">
          <Text
            type="b"
            className={`m-0 text-2xl text-primary duration-200 ${!open && "flex flex-col"}`}
          >
            ETC
            <span className={`text-accent ${!open && "text-xs text-accent"}`}> Organic</span>
          </Text>
        </div>
        <span className="block h-3" />
        <nav className="h-full w-full">
          {navLinks.map((section, index) => (
            <React.Fragment key={index}>
              {open ? (
                <h1 className={`mt-4 text-xs font-medium  text-textColor-light opacity-50 `}>
                  {section.title}
                </h1>
              ) : (
                <div className="my-2 h-1 w-full rounded-full bg-neutral-200" />
              )}
              <ul>
                {section.links.map((link, linkIndex) => (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                          ? `flex cursor-pointer items-center ${
                              !open && "justify-center"
                            } rounded-md p-2 text-lg font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-foreground`
                          : `flex cursor-pointer items-center ${
                              !open && "justify-center"
                            } rounded-md p-2 text-lg font-semibold text-textColor transition-all duration-200 hover:bg-accent hover:text-foreground`
                    }
                    to={link.path}
                    key={linkIndex}
                    title={link.title}
                  >
                    <li className={`s flex cursor-pointer items-center gap-4 rounded-md text-sm`}>
                      {link.icon}
                      <span className={`${!open && "hidden opacity-0"} origin-left`}>
                        {link.title}
                      </span>
                    </li>
                  </NavLink>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div
        className={`absolute bottom-2 flex h-12 2xl:bottom-4 ${
          open ? "w-52" : "w-20"
        } items-center justify-between p-2 text-lg font-semibold transition-all duration-200 ease-in-out hover:cursor-pointer`}
      >
        <Button className="w-full" onClick={() => handleLogOut()} loading={loading}>
          Logout
        </Button>
      </div>
    </div>
  );
};
