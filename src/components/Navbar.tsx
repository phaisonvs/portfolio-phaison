import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
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
    setIsMenuOpen(false);
    
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const navbarClasses = cn(
    "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
    isScrolled
      ? "bg-gray-950/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-800/50 py-3"
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
    
    const id = href.split('#')[1];
    const element = document.getElementById(id);
    
    if (element) {
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={navbarClasses}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2"
        >
          <Link to="/" className="text-xl font-medium flex items-center gap-2">
            <span className="text-2xl font-bold tracking-wider">MJ</span>
          </Link>
        </motion.div>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 dark:text-gray-300 hover:text-white transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800/50 py-6 px-6"
              >
                <div className="flex flex-col space-y-6">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.isAnchor ? (
                        <button
                          onClick={(e) => handleAnchorClick(e, item.href)}
                          className={cn(
                            "text-base font-medium px-3 py-2 rounded-md transition-colors w-full text-left tracking-wider",
                            item.highlight 
                              ? "bg-emerald-700 hover:bg-emerald-600 text-white relative overflow-hidden glow-button-animation" 
                              : "text-gray-300 hover:text-white"
                          )}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          to={item.href}
                          className={cn(
                            "text-base font-medium px-3 py-2 rounded-md transition-colors block tracking-wider",
                            item.highlight 
                              ? "bg-emerald-700 hover:bg-emerald-600 text-white relative overflow-hidden glow-button-animation" 
                              : location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                                ? "text-emerald-500"
                                : "text-gray-300 hover:text-white"
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-8">
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
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-all relative overflow-hidden group glow-button-animation tracking-wider"
                  >
                    <span className="relative z-10">{item.name}</span>
                  </button>
                ) : item.isAnchor ? (
                  <button
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`text-base font-medium transition-colors hover:text-white text-gray-300 tracking-wider relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-emerald-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-base font-medium transition-colors tracking-wider relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-emerald-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                      location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))
                        ? "text-white after:scale-x-100"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <ThemeToggle />
          </div>
        )}
      </div>
    </nav>
  );
}
