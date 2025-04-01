
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bell, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  isCollapsed: boolean;
  onLogout: () => void;
}

export function AdminHeader({ isCollapsed, onLogout }: AdminHeaderProps) {
  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-10 transition-all duration-300 ${
        isCollapsed ? "left-16" : "left-64"
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <ThemeToggle />
          <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <img 
                src="/lovable-uploads/1d1a30fb-6f2d-4525-94d3-9dd652079284.png" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="ml-2"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
