// cartUtils.js
export const calculateCartTotals = (foodList, quantities) => {
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);

  const Subtotal = cartItems.reduce(
    (acc, food) => acc + food.price * quantities[food.id],
    0
  );
  const Shipping = Subtotal === 0 ? 0.0 : 10;
  const tax = Subtotal * 0.1;
  const total = Subtotal + Shipping + tax;

  const totalItems = cartItems.reduce(
    (acc, food) => acc + quantities[food.id],
    0
  );

  return { Subtotal, Shipping, tax, total, totalItems };
};
