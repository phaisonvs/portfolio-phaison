
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  highlight?: boolean;
  isAnchor?: boolean;
}

const navItems: NavItem[] = [
  { name: "Experiência", href: "/#experience", isAnchor: true },
  { name: "Projetos", href: "/projects" },
  { name: "Contato", href: "/#contact", highlight: true, isAnchor: true },
];

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    
    // Reset scroll position when navigating to a new page (not an anchor)
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
    isScrolled
      ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-3"
      : "bg-transparent"
  );

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.1 + i * 0.1 
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: "auto",
      transition: { duration: 0.3 }
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    // Extract the anchor ID from the href
    const id = href.split('#')[1];
    const element = document.getElementById(id);
    
    if (element) {
      // If we're on a different page, navigate to the home page first
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      
      // Calculate offset for fixed header
      const headerOffset = 100; // Approximate height of header with padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Close the mobile menu
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2"
        >
          <Link to="/" className="text-xl font-medium flex items-center gap-2">
            <span className="text-2xl font-bold">MJ</span>
          </Link>
        </motion.div>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 rounded-md focus:outline-none"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.isAnchor ? (
                        <button
                          onClick={(e) => handleAnchorClick(e, item.href)}
                          className={cn(
                            "text-sm font-medium px-3 py-2 rounded-md transition-colors w-full text-left",
                            item.highlight 
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white relative overflow-hidden glow-button-animation" 
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className={cn(
                            "text-sm font-medium px-3 py-2 rounded-md transition-colors block",
                            item.highlight 
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white relative overflow-hidden glow-button-animation" 
                              : location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                                ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link
                    to="/admin"
                    className="text-sm font-medium px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                {item.highlight ? (
                  <button
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all relative overflow-hidden group glow-button-animation"
                  >
                    <span className="relative z-10">{item.name}</span>
                  </button>
                ) : item.isAnchor ? (
                  <button
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white text-gray-600 dark:text-gray-300`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                      location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                        ? "text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <Link
              to="/admin"
              className="text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white flex items-center gap-1"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>
            <ThemeToggle />
          </div>
        )}
      </div>
    </nav>
  );
}
