import SafeArea from "@/components/custom/SafeArea";
import UsersSection from "@/components/custom/UsersSection";
import React from "react";

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      <SafeArea>
        <UsersSection />
      </SafeArea>
    </div>
  );
};

export default Dashboard;
