import { useDrag } from "react-dnd";
import "./dragBox.css";

export function DragBox2() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    collect: (monitor) => ({
      isDraging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview}>
      <div ref={drag}>
        <div className="klasa1"> Przeciągnij mnie 2 </div>
      </div>
    </div>
  );
}
