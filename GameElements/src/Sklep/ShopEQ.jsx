import { useState } from "react";
import "./Styles/ShopEQ.css";
import { DropScheme } from "../DnD - Inventory/Drop";
import { DragScheme } from "../DnD - Inventory/Drag";

export function ShopEQ({ inventory, setInventory }) {
  alert(
    "Popraw dzialanie duplication bug oraz usuwanie z SHOP/USEREQ/Invenory ;)"
  );
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

    setInventory((prev) =>
      prev.map((slot) =>
        slot.id === item.id
          ? { ...slot, name: null, atak: 0, obrona: 0, magia: 0 }
          : slot
      )
    );

    setShopSlots((prev) => {
      // Specjalnie nie ma fuckji ItemExist, aby mogly sie duplikowac itemy do sprzedazy
      // duplication bug nie bedzie wystepowal, poniewwaz user inventory bedzei item usuwany

      const newShop = [...prev];
      const emptyShopIndex = newShop.findIndex((slot) => !slot.name);

      if (emptyShopIndex !== -1) {
        newShop[emptyShopIndex] = {
          ...newShop[emptyShopIndex],
          ...item,
        };
      } else {
        console.warn("Brak wolnego miejsca w Shop");
      }
      return newShop;
    });
  }

  function SubmitItems() {
    const tempTable = [];
    shopSlots.forEach((e) => {
      if (e.name) {
        tempTable.push(e.name);
      }
    });

    alert(tempTable);
  }

  return (
    <div className="container-shop">
      <div className="siatka-shop">{renderShopSlots()}</div>
      <button className="sell-btn" onClick={() => SubmitItems()}>
        Zamknij
      </button>
    </div>
  );
}
