export function itmeExists(slots, itemId) {
  return slots.some((slot) => slot.id === itemId && slot.name);
}
