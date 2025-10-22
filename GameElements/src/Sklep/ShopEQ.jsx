import { useState } from "react";
import "./Styles/ShopEQ.css";
import { DropScheme } from "../DnD - Inventory/Drop";
import { DragScheme } from "../DnD - Inventory/Drag";

export function ShopEQ() {
  const [shopSlots, setShopSlots] = useState([
    { id: 1, name: null },
    { id: 2, name: null },
    { id: 3, name: null },
    { id: 4, name: null },
    { id: 5, name: null },
    { id: 6, name: null },
    { id: 7, name: null },
    { id: 8, name: null },
  ]);

  function renderShopSlots() {
    return shopSlots.map((slot, index) => {
      return (
        <DropScheme
          key={`shop-${index}`}
          className="inv-slot-view"
          onDropItem={handleDropToShop}
        >
          {slot.id ? <DragScheme> {slot.name}</DragScheme> : <div></div>}
        </DropScheme>
      );
    });
  }

  function handleDropToShop(item) {
    console.log("Drop-shop ", item);
  }

  return (
    <div className="container-shop">
      <div className="siatka-shop">{renderShopSlots()}</div>
      <button className="sell-btn">Zamknij</button>
    </div>
  );
}
