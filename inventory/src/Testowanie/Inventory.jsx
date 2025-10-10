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

  const [userEQ, setUserEQ] = useState([]);

  function renderInventory() {
    return inventrySlots.map((slot) => (
      <DropScheme
        key={slot.id}
        className="inv-slot-view"
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

  function handleDropToUserEQ(item) {
    console.log("Drop do User EQ ", item.name);

    // Usuwanie
    setIventroySlots((prev) =>
      prev.map((slot) => (slot.id === item.id ? { ...slot, name: null } : slot))
    );

    // Aktualizacja UserEQ (dodawanie do UserEQ)
    setUserEQ((prev) => [...prev, item]);
  }

  function renderUserEQ() {
    return userEQ.map((item, index) => (
      <DragScheme key={index} className="inv-slot-view">
        {item.name}
      </DragScheme>
    ));
  }

  return (
    <div className="container">
      <div className="siatka">
        <h1>Inventory</h1>
        {renderInventory()}
        <h1>User EQ</h1>
        <DropScheme className="inv-slot-view" onDropItem={handleDropToUserEQ}>
          {renderUserEQ()}
        </DropScheme>
      </div>
    </div>
  );
}
