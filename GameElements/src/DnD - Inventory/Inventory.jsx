import { DropScheme } from "./Drop";
import "./Styles/UserInvetory.css";
import "./Styles/DropView.css";
import { useState } from "react";
import { DragScheme } from "./Drag";
import { itmeExists } from "./Helpers/CheckIfExist";
import { Player } from "./Player";

export function UserInventory() {
  const [userEQ, setUserEQ] = useState([
    { id: 11, name: null, atak: 0, obrona: 0, magia: 0 },
    { id: 22, name: null, atak: 0, obrona: 0, magia: 0 },
    { id: 33, name: null, atak: 0, obrona: 0, magia: 0 },
  ]);

  const [inventrySlots, setIventroySlots] = useState([
    { id: 1, name: "Miecz", atak: 50, obrona: 0, magia: 30 },
    { id: 2, name: "Hełm", atak: 0, obrona: 60, magia: 90 },
    { id: 3, name: "Tarcza", atak: 20, obrona: 40, magia: 0 },
    { id: 4, name: null },
    { id: 5, name: null },
  ]);
  const [stats, setStats] = useState({ atak: 30, obrona: 20, magia: 0 });

  function renderInventory() {
    return inventrySlots.map((slot) => (
      <DropScheme
        key={`inv-${slot.id}`}
        className="inv-slot-view"
        onDropItem={handleDropToInventory}
        data={{ slotID: slot.id }}
      >
        {slot.name ? (
          <DragScheme item={{ ...slot }}>{slot.name}</DragScheme>
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
      prev.map((slot) =>
        slot.id === item.id
          ? { ...slot, name: null, atak: 0, obrona: 0, magia: 0 }
          : slot
      )
    );
    //dodawanie do inventory
    setIventroySlots((prev) => {
      if (itmeExists(prev, item.name)) return prev;

      const newInv = [...prev];
      const emptyInventoryIndex = newInv.findIndex((slot) => !slot.name);

      if (emptyInventoryIndex !== -1) {
        // tylko jeśli jest wolne miejsce, zapis ten jest poprzez to (-1)
        newInv[emptyInventoryIndex] = {
          ...newInv[emptyInventoryIndex],
          ...item,
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
      prev.map((slot) =>
        slot.id === item.id
          ? { ...slot, name: null, atak: 0, obrona: 0, magia: 0 }
          : slot
      )
    );

    // Aktualizacja UserEQ (dodawanie do UserEQ)
    setUserEQ((prev) => {
      // sprawdzamnie czy (e) juz istnieje
      if (itmeExists(prev, item.name)) return prev;

      const newEQ = [...prev];
      const emptyIndex = newEQ.findIndex((slot) => !slot.name);

      if (emptyIndex !== -1) {
        // tylko jeśli jest wolne miejsce, zapis ten jest poprzez to (-1)
        newEQ[emptyIndex] = {
          ...newEQ[emptyIndex],
          ...item,
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
          <DragScheme className="inv-slot-view" item={{ ...slot }}>
            {slot.name}
          </DragScheme>
        ) : (
          <div></div>
        )}
      </DropScheme>
    ));
  }

  return (
    <div className="container-inv">
      <Player stats={stats} activeItems={userEQ}></Player>
      <div className="siatka">{renderUserEQ()}</div>
      <div className="siatka">{renderInventory()}</div>
    </div>
  );
}
