// Import necessary React hooks and dummy data
import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

// Create CartContext with default values for better IDE autocompletion
export const CartContext = createContext({
  items: [],                      // Array to hold cart items
  addItemToCart: () => {},        // Function to add items to cart
  updateItemQuantity: () => {},   // Function to update item quantities
});

// Context Provider component that will wrap the application
export default function CartContextProvider({ children }) {
  // State to manage shopping cart items
  const [shoppingCart, setShoppingCart] = useState({
    items: [],  // Initialize with empty items array
  });

  // Handler to add items to cart
  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      // Create a copy of current items array
      const updatedItems = [...prevShoppingCart.items];

      // Check if item already exists in cart
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        // If item exists, increment quantity
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If new item, find product details and add to cart
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,  // Initialize quantity to 1
        });
      }

      return {
        items: updatedItems,  // Return updated items array
      };
    });
  }

  // Handler to update item quantity (can increment or decrement)
  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      // Create a copy of current items array
      const updatedItems = [...prevShoppingCart.items];
      
      // Find index of item to update
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      // Create copy of item to update
      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      // Update quantity by amount (can be positive or negative)
      updatedItem.quantity += amount;

      // If quantity drops to 0 or below, remove item from cart
      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        // Otherwise update the item in the array
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,  // Return updated items array
      };
    });
  }

  // Context value object containing state and handlers
  const ctxValue = {
    items: shoppingCart.items,              // Current cart items
    addItemToCart: handleAddItemToCart,     // Add item function
    updateItemQuantity: handleUpdateCartItemQuantity,  // Update quantity function
  };

  // Provide the context to child components
  return (
    <CartContext.Provider value={ctxValue}>
      {children}  {/* Render child components */}
    </CartContext.Provider>
  );
}