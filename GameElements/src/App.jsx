import "./App.css";
import "./Sklep/Styles/ShopEq.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserInventory } from "./DnD - Inventory/Inventory";
import { ShopEQ } from "./Sklep/ShopEQ";
import { useState } from "react";
import { GameBoard } from "./assets/GameBoard/GameBoard";

export function App() {
  const [inventrySlots, setIventroySlots] = useState([
    { id: 1, name: "Miecz", atak: 50, obrona: 0, magia: 30 },
    { id: 2, name: "Hełm", atak: 0, obrona: 60, magia: 90 },
    { id: 3, name: "Tarcza", atak: 20, obrona: 40, magia: 0 },
    { id: 4, name: null },
    { id: 5, name: null },
  ]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <GameBoard />
        <ShopEQ inventory={inventrySlots} setInventory={setIventroySlots} />
        <UserInventory
          inventory={inventrySlots}
          setInventory={setIventroySlots}
        />
      </DndProvider>
    </>
  );
}
