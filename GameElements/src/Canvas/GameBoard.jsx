import { useEffect, useRef } from "react";
import { createGame } from "./main";

export function GameBoard() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    gameRef.current = createGame(canvasRef.current);

    return () => {
      gameRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <div className="game-wrapper">
        <canvas ref={canvasRef} />;
      </div>
    </>
  );
}
