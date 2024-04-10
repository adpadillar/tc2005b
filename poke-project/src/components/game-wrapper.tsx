import styles from "./game-wrapper.module.css";

import React, { useCallback, useEffect } from "react";

type MovementHandler = () => void;
type Movements =
  | "up"
  | "down"
  | "left"
  | "right"
  | "a"
  | "b"
  | "start"
  | "select";

interface GameWrapperProps {
  children?: React.ReactNode;
  controlDriver?: Partial<Record<Movements, MovementHandler>>;
}

const GameWrapper: React.FC<GameWrapperProps> = ({
  children,
  controlDriver,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          return controlDriver?.up?.();
        case "ArrowDown":
          return controlDriver?.down?.();
        case "ArrowLeft":
          return controlDriver?.left?.();
        case "ArrowRight":
          return controlDriver?.right?.();
        case "a":
          return controlDriver?.a?.();
        case "b":
          return controlDriver?.b?.();
        case "Enter":
          return controlDriver?.start?.();
        case "Shift":
          return controlDriver?.select?.();
      }
    },
    [controlDriver]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.gameboy}>
      <div className={styles.display}>{children}</div>
      {/* The controls will go here */}
      <div className={styles.controls}>
        <div className={styles.controls_top}>
          <div className={styles.d_pad}>
            <div className={styles.empty} />
            <div
              className={styles.filled_vertical}
              onClick={controlDriver?.up}
            />
            <div className={styles.empty} />

            <div
              className={styles.filled_horizontal}
              onClick={controlDriver?.left}
            />
            <div
              className={styles.filled_horizontal}
              onClick={controlDriver?.right}
            />

            <div
              className={styles.filled_vertical}
              onClick={controlDriver?.down}
            />
            <div className={styles.empty} />
            <div className={styles.empty} />
          </div>

          <div className={styles.a_and_b}>
            <div
              className={styles.red_button_hitbox}
              onClick={controlDriver?.b}
            >
              <div className={styles.red_button} />
              <p className={styles.red_button_label}>B</p>
            </div>
            <div
              className={styles.red_button_hitbox}
              onClick={controlDriver?.a}
            >
              <div className={styles.red_button} />
              <p className={styles.red_button_label} onClick={controlDriver?.a}>
                A
              </p>
            </div>
          </div>
        </div>
        <div className={styles.controls_bottom}>
          <div className={styles.select_start}>
            <div
              onClick={controlDriver?.select}
              className={styles.gray_button_hitbox}
            >
              <div className={styles.gray_button} />
              <p className={styles.gray_button_label}>SELECT</p>
            </div>
            <div
              onClick={controlDriver?.start}
              className={styles.gray_button_hitbox}
            >
              <div className={styles.gray_button} />
              <p className={styles.gray_button_label}>START</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWrapper;
