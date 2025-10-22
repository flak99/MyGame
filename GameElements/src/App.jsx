import "./App.css";
import "./Sklep/Styles/ShopEq.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserInventory } from "./DnD - Inventory/Inventory";
import { ShopEQ } from "./Sklep/ShopEQ";
import { useState } from "react";

export function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ShopEQ />
        <UserInventory />
      </DndProvider>
    </>
  );
}
