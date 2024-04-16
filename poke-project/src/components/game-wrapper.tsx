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

// UUDDLRLRBA

const GameWrapper: React.FC<GameWrapperProps> = ({
  children,
  controlDriver,
}) => {
  const [callstack, setCallstack] = React.useState<string>("");
  const [easterEgg, setEasterEgg] = React.useState<boolean>(false);

  function handleEasterEgg(stack: string) {
    console.log(stack);
    console.log(stack.endsWith("UUDDLRLRBA"));
    if (stack.endsWith("UUDDLRLRBA")) {
      setEasterEgg(true);
      setCallstack("");
    }
  }

  const updateCallstack = useCallback(
    (append: string) => {
      const next = callstack + append;
      setCallstack(next);
      handleEasterEgg(next);
    },
    [callstack]
  );

  function up() {
    updateCallstack("U");
    controlDriver?.up?.();
  }

  function down() {
    updateCallstack("D");
    controlDriver?.down?.();
  }

  function left() {
    updateCallstack("L");
    controlDriver?.left?.();
  }

  function right() {
    updateCallstack("R");
    controlDriver?.right?.();
  }

  function a() {
    updateCallstack("A");
    controlDriver?.a?.();
  }

  function b() {
    updateCallstack("B");
    controlDriver?.b?.();
  }

  function select() {
    updateCallstack("S");
    controlDriver?.select?.();
  }

  function start() {
    updateCallstack("S");
    controlDriver?.start?.();
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          return up();
        case "ArrowDown":
          return down();

        case "ArrowLeft":
          return left();
        case "ArrowRight":
          return right();
        case "a":
          return a();
        case "b":
          return b();
        case "Enter":
          return start();
        case "Shift":
          return select();
      }
    },
    [controlDriver, updateCallstack]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (easterEgg) {
      const audio = new Audio("outputfile.mp3");
      audio.play();
    }
  }, [easterEgg]);

  return (
    <div className={styles.gameboy}>
      <div className={styles.display}>
        {easterEgg ? (
          <img
            width="100%"
            height="100%"
            src="https://media1.tenor.com/m/3uKrlh92ZVUAAAAd/mapache-pedro-mapache.gif"
          />
        ) : (
          children
        )}
      </div>
      {/* The controls will go here */}
      <div className={styles.controls}>
        <div className={styles.controls_top}>
          <div className={styles.d_pad}>
            <div className={styles.empty} />
            <div className={styles.filled_vertical} onClick={up} />
            <div className={styles.empty} />

            <div className={styles.filled_horizontal} onClick={left} />
            <div className={styles.filled_horizontal} onClick={right} />

            <div className={styles.filled_vertical} onClick={down} />
            <div className={styles.empty} />
            <div className={styles.empty} />
          </div>

          <div className={styles.a_and_b}>
            <div className={styles.red_button_hitbox} onClick={b}>
              <div className={styles.red_button} />
              <p className={styles.red_button_label}>B</p>
            </div>
            <div className={styles.red_button_hitbox} onClick={a}>
              <div className={styles.red_button} />
              <p className={styles.red_button_label} onClick={a}>
                A
              </p>
            </div>
          </div>
        </div>
        <div className={styles.controls_bottom}>
          <div className={styles.select_start}>
            <div onClick={select} className={styles.gray_button_hitbox}>
              <div className={styles.gray_button} />
              <p className={styles.gray_button_label}>SELECT</p>
            </div>
            <div onClick={start} className={styles.gray_button_hitbox}>
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
