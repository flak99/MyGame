import "./App.css";
import "./dragBox.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ShowItems } from "./items";
import { DragBox } from "./DragBox";
import { DropBox } from "./DropBox";
import { DropBox2 } from "./DropBox2";
import { DragBox2 } from "./DragBox2";

export function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <DragBox></DragBox>
        <DropBox></DropBox>
      </DndProvider>
    </>
  );
}

//  <div className="base">
//           <div className="contianer">
//             <p>Inventory</p>
//             <div className="ItemsArray">{<ShowItems />}</div>
//           </div>
//           <div className="contianer">
//             <p>Active Items</p>
//             <div className="ItemsArray "></div>
//           </div>
//         </div>
