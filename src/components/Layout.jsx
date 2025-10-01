import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Home,
  CheckCircle,
  Plus,
  Calendar as CalendarIcon,
  Menu,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";
import { motion } from "framer-motion";

export function Layout({ children, onAddWork }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: Home,
    },
    {
      path: "/completed",
      label: "Completed",
      icon: CheckCircle,
    },
    {
      path: "/calendar",
      label: "Calendar",
      icon: CalendarIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-8">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden h-9 w-9 p-0"
                  >
                    <motion.div
                      animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] sm:w-[350px] hardware-accelerated"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-6">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      >
                        <Button
                          asChild
                          variant={
                            location.pathname === item.path
                              ? "default"
                              : "ghost"
                          }
                          size="sm"
                          className="h-12 justify-start px-4 font-medium w-full"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link
                            to={item.path}
                            className="flex items-center space-x-3"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <Icon className="h-5 w-5" />
                            </motion.div>
                            <motion.span
                              whileHover={{ x: 4 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              {item.label}
                            </motion.span>
                          </Link>
                        </Button>
                      </motion.div>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <CalendarIcon className="h-4 w-4 text-primary-foreground" />
              </motion.div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Work Tracker
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      asChild
                      variant={
                        location.pathname === item.path ? "default" : "ghost"
                      }
                      size="sm"
                      className="h-9 px-3 font-medium"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.div>
                        <span>{item.label}</span>
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={onAddWork}
                className="flex items-center space-x-2 h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
                <span className="hidden sm:inline">Add Work</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={
          location.pathname === "/calendar"
            ? "bg-background w-full min-h-[calc(100vh-4rem)] px-2"
            : "container mx-auto px-6 py-8"
        }
      >
        {children}
      </main>
    </div>
  );
}
