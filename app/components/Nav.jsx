import Link from "next/link";
import React from "react";
import { BsShop } from "react-icons/bs";
import {
  MdOutlineHome,
  MdSettings,
  MdListAlt,
  MdOutlineInbox,
} from "react-icons/md";

export default function Nav() {
  const navItems = [
    {
      icon: <MdOutlineHome />,
      name: "Dashboard",
      path: "/",
    },
    {
      icon: <MdOutlineInbox />,
      name: "Products",
      path: "/products",
    },

    {
      icon: <MdListAlt />,
      name: "Orders",
      path: "/orders",
    },
    {
      icon: <MdSettings />,
      name: "Settings",
      path: "/settings",
    },
  ];

  const activeLink = "flex items-center space-x-2 p-1";
  const inactiveLink = activeLink + " bg-white text-blue-900 rounded-l-lg ";

  return (
    <aside className="text-white p-4 pr-0">
      <Link href="/" className="flex items-center space-x-2 mb-4 p-4">
        <BsShop />
        <span>E-komas admin</span>
      </Link>

      <nav className="text-white flex-col space-y-2">
        {navItems.map(({ icon, name, path }) => {
          let classList = path !== "/" ? activeLink : inactiveLink;
          
          return (
            <Link href={path} key={name} className={classList}>
              {icon}
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
