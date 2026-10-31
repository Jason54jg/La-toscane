import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescript } from "./load-panier.mjs";

test("deux ajouts à la même milliseconde restent indépendants", () => {
  global.localStorage = { getItem: () => null, setItem() {} };
  global.window = { localStorage: global.localStorage };
  const { useCartStore } = loadTypescript("src/store/cartStore.ts");
  const payload = { menuItemId: "kebab", name: { fr: "Kebab", en: "Kebab" }, unitPrice: 8, quantity: 1, selection: {}, summary: "" };
  const original = Date.now;
  try {
    Date.now = () => 12345;
    useCartStore.getState().addItem(payload);
    useCartStore.getState().addItem(payload);
  } finally { Date.now = original; }
  const [first, second] = useCartStore.getState().items;
  assert.notEqual(first.id, second.id);
  useCartStore.getState().updateQuantity(first.id, 3);
  assert.equal(useCartStore.getState().items[1].quantity, 1);
  useCartStore.getState().removeItem(first.id);
  assert.equal(useCartStore.getState().items.length, 1);
  assert.equal(useCartStore.getState().items[0].id, second.id);
});
