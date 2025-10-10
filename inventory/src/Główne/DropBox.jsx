import { useDrop } from "react-dnd";
import "./DragBox.css";
import { useState } from "react";
import { DraggableItems } from "./DragItems";

export function DropBox() {
  const [item, setItem] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item) => {
      // To jest włąsiwość, któa m ow co ma sie estac
      // po dropowanie
      console.log("huraa", item);
      setItem((prev) => [...prev, item]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  function ShowDragedItems() {
    return item.map((it, index) => (
      <div key={index} className="klasa1">
        {it.name}
      </div>
    ));
  }

  // ***************************************
  return (
    <div ref={drop} className={isOver ? "klasa4" : "klasa3"}>
      {canDrop ? "Można dodac" : ""}
      {ShowDragedItems()}
    </div>
  );
}
