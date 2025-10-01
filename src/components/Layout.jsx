import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, CheckCircle, Plus, Calendar } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ children, onAddWork }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                Work Tracker
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                asChild
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="h-9 px-3 font-medium"
              >
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
              <Button
                asChild
                variant={
                  location.pathname === "/completed" ? "default" : "ghost"
                }
                size="sm"
                className="h-9 px-3 font-medium"
              >
                <Link to="/completed" className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={onAddWork}
              className="flex items-center space-x-2 h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Work</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
