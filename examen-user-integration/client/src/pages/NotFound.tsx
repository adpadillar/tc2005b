import React from "react";

interface NotFoundProps {
  children?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default NotFound;
