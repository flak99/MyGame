import { useDrag } from "react-dnd";
import data from "./db.json";

function DragItems({ item }) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "BOX",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div ref={drag} className="item-look">
        {item.name}
      </div>
    </div>
  );
}

export function DraggableItems() {
  return (
    <div className="cont-item">
      {data.map((item) => (
        <DragItems key={item.id} item={item}></DragItems>
      ))}
    </div>
  );
}
