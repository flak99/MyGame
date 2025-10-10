import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserInventory } from "./Testowanie/Inventory";

export function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <UserInventory />
      </DndProvider>
    </>
  );
}
