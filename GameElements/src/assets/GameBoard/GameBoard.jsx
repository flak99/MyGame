import { useEffect, useRef } from "react";
import "./Styles/GameBoard.css";

export function GameBoard() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // rysowanie tła mapy
    ctx.fillStyle = "#3a565aff";

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // przykładowe elementy mapy
    // Shop
    ctx.fillStyle = "red";
    ctx.fillRect(300, 100, 64, 64);
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Sklep", 300, 95);

    // Gracz (startowa pozycja)
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 32, 32);
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Gracz", 50, 45);
  }, []);

  return (
    <div className="map-container">
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
}
