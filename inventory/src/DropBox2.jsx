import { useDrop } from "react-dnd";

export function DropBox2() {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ["ITEM"],
    drop: () => {
      console.log("Nie wolno dodac");
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} className={isOver ? "klasa5" : "klasa3"}>
      {canDrop ? "Można" : "Nie Można"}
    </div>
  );
}
