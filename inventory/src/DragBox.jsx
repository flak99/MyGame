import { useDrag } from "react-dnd";
import "./dragBox.css";

export function DragBox({ id, itemName }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item: { id, itemName },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      className="klasa2"
      ref={dragPreview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div ref={drag}>
        <div className="klasa1"> Przeciągnij mnie </div>
      </div>
    </div>
  );
}
