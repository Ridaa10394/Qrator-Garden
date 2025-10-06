import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sprout, Home, Lightbulb, FileText, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/generate-ideas", label: "Ideas", icon: Lightbulb },
    { path: "/generate-script", label: "Script", icon: FileText },
    { path: "/generate-seo", label: "SEO", icon: Search },
    { path: "/saved-dashboard", label: "Saved", icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur border-b border-border/50 shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/garden" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-garden rounded-full p-2">
              <Sprout className="w-6 h-6  text-green-800" />
            </div>
            <span className="text-xl font-bold bg-gradient-garden bg-clip-text  text-green-800">
              Qrator Garden
            </span>
          </Link>

          {/* Navigation Items (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 transition-all",
                    isActive(path)
                      ? "shadow-soft bg-primary hover:bg-primary/90"
                      : "hover:bg-accent hover:shadow-soft"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Profile */}
          <Link to="/profile">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-2 hover:bg-accent hover:shadow-soft transition-all",
                isActive("/profile") && "bg-accent shadow-soft"
              )}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-gradient-garden text-primary-foreground text-sm">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Profile</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-border/50">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={isActive(path) ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "flex flex-col items-center gap-1 h-auto p-2 min-w-0",
                  isActive(path)
                    ? "shadow-soft bg-primary hover:bg-primary/90"
                    : "hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
