import React from "react";
import { Button } from "@/components/ui/button";
import SafeArea from "./SafeArea";

interface NavigationProps {
  children?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <nav className="flex bg-secondary shadow-md border-b border-primary/10">
      <SafeArea>
        <div className="py-4">
          <Button asChild variant="link">
            <a href="/">Dashboard</a>
          </Button>
          <Button variant="link">
            <a href="/register">Register</a>
          </Button>
        </div>
      </SafeArea>
    </nav>
  );
};

export default Navigation;
