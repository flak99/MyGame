import { useDrag } from "react-dnd";
import "./Styles/DragView.css";

export function DragScheme({ children, item }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "Item",
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} className={isDragging ? "dragging" : ""}>
      <div ref={drag}>{children}</div>
    </div>
  );
}
