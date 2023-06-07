import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsShop } from "react-icons/bs";
import {
  MdOutlineHome,
  MdSettings,
  MdListAlt,
  MdOutlineInbox,
  MdCategory,
} from "react-icons/md";

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
    icon: <MdCategory />,
    name: "Categories",
    path: "/categories",
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

export default function Nav() {
  const pathname = usePathname();
  const inactiveLink = "flex items-center space-x-2 p-1";
  const activeLink = inactiveLink + " bg-white text-blue-900 rounded-l-lg ";

  return (
    <aside className="text-white p-4 pr-0">
      <Link href="/" className="flex items-center space-x-2 mb-4 p-4">
        <BsShop />
        <span>E-komas admin</span>
      </Link>

      <nav className="text-white flex-col space-y-2">
        {navItems.map(({ icon, name, path }) => {
          if (path === "/")
            return (
              <Link
                href={path}
                key={name}
                className={pathname === "/" ? activeLink : inactiveLink}
              >
                {icon}
                <span>{name}</span>
              </Link>
            );
          return (
            <Link
              href={path}
              key={name}
              className={pathname.includes(path) ? activeLink : inactiveLink}
            >
              {icon}
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
