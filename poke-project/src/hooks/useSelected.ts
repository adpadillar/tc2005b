import { useState } from "react";

export const useSelected = (width: number, length: number) => {
  const [selected, setSelected] = useState<number>(0);

  const bounceChecked = (index: number) => {
    if (index < 0) {
      return 0;
    }

    if (index > length - 1) {
      return length - 1;
    }

    return index;
  };

  const handleSelect = (index: number) => setSelected(bounceChecked(index));
  const handleNext = () => setSelected(bounceChecked(selected + 1));
  const handlePrev = () => setSelected(bounceChecked(selected - 1));
  const handleUp = () => setSelected(bounceChecked(selected - width));
  const handleDown = () => setSelected(bounceChecked(selected + width));

  return {
    selected,
    select: handleSelect,
    next: handleNext,
    prev: handlePrev,
    up: handleUp,
    down: handleDown,
  };
};
