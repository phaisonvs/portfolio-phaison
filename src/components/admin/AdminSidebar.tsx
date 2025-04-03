
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Layers, BarChart, Settings, LogOut } from "lucide-react";

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  path: string;
}

const links: SidebarLink[] = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/admin",
  },
  {
    icon: Layers,
    label: "Projetos",
    path: "/admin/projects",
  },
  {
    icon: BarChart,
    label: "Analytics",
    path: "/admin/analytics",
  },
  {
    icon: Settings,
    label: "Configurações",
    path: "/admin/settings",
  },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function AdminSidebar({ isCollapsed, toggleSidebar }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } z-20`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between h-16">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-xl"
          >
            Admin
          </motion.div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            {isCollapsed ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            )}
          </svg>
        </button>
      </div>

      <div className="py-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg ${
                    isActive
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300"
                  } transition-colors`}
                >
                  <link.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors"
        >
          <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-medium"
            >
              Sair
            </motion.span>
          )}
        </Link>
      </div>
    </div>
  );
}
