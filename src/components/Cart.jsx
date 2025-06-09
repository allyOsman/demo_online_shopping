// Import React hooks and context
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  // Access cart state and functions from context
  const { items, updateItemQuantity } = useContext(CartContext);

  // Calculate total price by summing all items (price * quantity)
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0 // Initial accumulator value
  );

  // Format total price to 2 decimal places with dollar sign
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {/* Show empty cart message if no items */}
      {items.length === 0 && <p>No items in cart!</p>}

      {/* Render cart items if cart is not empty */}
      {items.length > 0 && (
        <ul id="cart-items">
          {/* Map through each item in cart */}
          {items.map((item) => {
            // Format individual item price
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  {/* Display item name and price */}
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  {/* Decrement quantity button */}
                  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  {/* Display current quantity */}
                  <span>{item.quantity}</span>
                  {/* Increment quantity button */}
                  <button onClick={() => updateItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Display cart total at the bottom */}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
