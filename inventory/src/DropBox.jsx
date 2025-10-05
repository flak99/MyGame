import { useDrop } from "react-dnd";
import "./DragBox.css";
import { useState } from "react";

export function DropBox() {
  const [item, setItem] = useState([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
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

  return (
    <div ref={drop} className={isOver ? "klasa4" : "klasa3"}>
      {canDrop ? "Można dodac" : ""}
      {item.map((it, index) => (
        <div key={index} className="klasa1">
          Przeciagnij mnie{" "}
        </div>
      ))}
    </div>
  );
}
{
  /* <div key={index} className="klasa1">
  Przeciagnij mnie{" "}
</div>; */
}
