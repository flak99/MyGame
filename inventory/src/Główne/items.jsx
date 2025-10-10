const items = [
  { itemName: "Broń", liczba: 15 },
  { itemName: "Mikstura", liczba: 20 },
  { itemName: "Tarcza", liczba: 10 },
];

export function ShowItems() {
  return items.map((e, index) => (
    <div className="element" key={index}>
      {e.itemName}
    </div>
  ));
}
