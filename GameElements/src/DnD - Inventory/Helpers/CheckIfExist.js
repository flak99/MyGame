export function itmeExists(slots, itemName) {
  return slots.some((slot) => slot.name === itemName);
}
