import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
  const items = [
    { itemName: "Broń", liczba: 15 },
    { itemName: "Mikstura", liczba: 20 },
    { itemName: "Tarcza", liczba: 10 },
  ];

  function ShowItems(array) {
    return array.map((e, index) => (
      <div className="element" key={index}>
        {" "}
        {e.itemName}{" "}
      </div>
    ));
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="base">
          <div className="contianer">
            <p>Inventory</p>
            <div className="ItemsArray">{ShowItems(items)}</div>
          </div>
          <div className="contianer">
            <p>Active Items</p>
            <div className="ItemsArray "></div>
          </div>
        </div>
      </DndProvider>
    </>
  );
}
