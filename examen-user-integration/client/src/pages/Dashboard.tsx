import Navigation from "@/components/custom/Navigation";
import { Button } from "@/components/ui/button";
import React from "react";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      <Navigation />
      <Button>Hello world</Button>
    </div>
  );
};

export default Dashboard;
