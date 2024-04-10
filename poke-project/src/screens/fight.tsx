import React from "react";

interface FightProps {
  children?: React.ReactNode;
  id: number;
}

function randomInt(min: number, max: number, disallowed: number): number {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random === disallowed ? randomInt(min, max, disallowed) : random;
}

const Fight: React.FC<FightProps> = ({ id }) => {
  return (
    <div>
      <h1>
        This is {id} vs {randomInt(0, 100, id)}
      </h1>
    </div>
  );
};

export default Fight;
