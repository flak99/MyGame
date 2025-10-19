import { DropScheme } from "./Drop";
import "./Styles/UserInvetory.css";
import "./Styles/DropView.css";
import { useState } from "react";
import { DragScheme } from "./Drag";

export function UserInventory() {
  const [inventrySlots, setIventroySlots] = useState([
    { id: 1, name: "Miecz" },
    { id: 2, name: "Hełm" },
    { id: 3, name: "Tarcza" },
    { id: 4, name: null },
    { id: 5, name: null },
  ]);

  const [userEQ, setUserEQ] = useState([
    { id: 11, name: null },
    { id: 22, name: null },
    { id: 33, name: null },
  ]);

  function renderInventory() {
    return inventrySlots.map((slot) => (
      <DropScheme
        key={`inv-${slot.id}`}
        className="inv-slot-view"
        onDropItem={handleDropToInventory}
        data={{ slotID: slot.id }}
      >
        {slot.name ? (
          <DragScheme item={{ id: slot.id, name: slot.name }}>
            {slot.name}
          </DragScheme>
        ) : (
          <div></div>
        )}
      </DropScheme>
    ));
  }
  function handleDropToInventory(item) {
    console.log(" #### Drop to Inventroy", item.name);
    //usuwanie z UserEQ
    setUserEQ((prev) =>
      prev.map((slot) => (slot.id === item.id ? { ...slot, name: null } : slot))
    );
    //dodawanie do inventory
    setIventroySlots((prev) => {
      const newInv = [...prev];
      const emptyInventoryIndex = newInv.findIndex((slot) => !slot.name);

      if (emptyInventoryIndex !== -1) {
        // tylko jeśli jest wolne miejsce, zapis ten jest poprzez to (-1)
        newInv[emptyInventoryIndex] = {
          ...newInv[emptyInventoryIndex],
          name: item.name,
        };
      } else {
        console.warn("Brak wolnego miejsca w User EQ!");
      }

      return newInv;
    });
  }
  function handleDropToUserEQ(item) {
    console.log("Drop do User EQ ", item.name);

    // Usuwanie
    setIventroySlots((prev) =>
      prev.map((slot) => (slot.id === item.id ? { ...slot, name: null } : slot))
    );

    // Aktualizacja UserEQ (dodawanie do UserEQ)
    setUserEQ((prev) => {
      const newEQ = [...prev];
      const emptyIndex = newEQ.findIndex((slot) => !slot.name);

      if (emptyIndex !== -1) {
        // tylko jeśli jest wolne miejsce, zapis ten jest poprzez to (-1)
        newEQ[emptyIndex] = {
          ...newEQ[emptyIndex],
          name: item.name,
        };
      } else {
        console.warn("Brak wolnego miejsca w User EQ!");
      }

      return newEQ;
    });
  }
  function renderUserEQ() {
    return userEQ.map((slot) => (
      <DropScheme
        key={slot.id}
        className="inv-slot-view"
        onDropItem={handleDropToUserEQ}
      >
        {slot.name ? (
          <DragScheme
            className="inv-slot-view"
            item={{ id: slot.id, name: slot.name }}
          >
            {slot.name}
          </DragScheme>
        ) : (
          <div></div>
        )}
      </DropScheme>
    ));
  }

  return (
    <div className="container">
      <div className="siatka">
        <h1>Inventory</h1>
        {renderInventory()}
        <h1>User EQ</h1>
        {renderUserEQ()}
      </div>
    </div>
  );
}
