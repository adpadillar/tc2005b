import React from "react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="flex p-4 bg-secondary shadow-md">
      <div>
        <Button asChild variant="link">
          <a href="/">Dashboard</a>
        </Button>
        <Button variant="link">
          <a href="/register">Register</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
