import { useDrop } from "react-dnd";

export function DropScheme({ children, className = "", onDropItem }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "Item",
    drop: (draggingItem) => {
      // console.log("Drop " + draggingItem.name);
      if (onDropItem) onDropItem(draggingItem);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: isOver ? "lightgreen" : "" }}
    >
      {children}
    </div>
  );
}
