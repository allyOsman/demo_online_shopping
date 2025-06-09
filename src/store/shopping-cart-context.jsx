// Import necessary React hooks and dummy data
import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

/**
 * Creates the CartContext with default values.
 * This provides better IDE autocompletion and serves as documentation
 * for what the context will contain.
 */
export const CartContext = createContext({
  items: [], // Array to hold cart items (each item has id, name, price, quantity)
  addItemToCart: () => {}, // Function to add items to cart (accepts product id)
  updateItemQuantity: () => {}, // Function to update item quantities (accepts product id and amount)
});

/**
 * Reducer function to manage shopping cart state.
 * Handles two action types:
 * - ADD_ITEM: Adds a new item or increments quantity of existing item
 * - UPDATE_ITEM: Updates the quantity of an existing item (can remove if quantity <= 0)
 * @param {Object} state - Current state of the shopping cart
 * @param {Object} action - Action object containing type and payload
 * @returns {Object} - New state after applying the action
 */
function shoppingCartReducer(state, action) {
  // Handle ADD_ITEM action
  if (action.type === "ADD_ITEM") {
    // Create a copy of current items array (immutable update)
    const updatedItems = [...state.items];

    // Check if item already exists in cart
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      // If item exists, create a new object with incremented quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If new item, find product details from dummy data and add to cart
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1, // Initialize quantity to 1 for new items
      });
    }

    // Return new state with updated items array
    return {
      ...state,
      items: updatedItems,
    };
  }

  // Handle UPDATE_ITEM action
  if (action.type === "UPDATE_ITEM") {
    // Create a copy of current items array (immutable update)
    const updatedItems = [...state.items];

    // Find index of item to update
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    // Create copy of item to update
    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    // Update quantity by amount (can be positive or negative)
    updatedItem.quantity += action.payload.amount;

    // If quantity drops to 0 or below, remove item from cart
    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      // Otherwise update the item in the array
      updatedItems[updatedItemIndex] = updatedItem;
    }

    // Return new state with updated items array
    return {
      ...state,
      items: updatedItems,
    };
  }

  // Return current state if action type doesn't match
  return state;
}

/**
 * CartContextProvider component that manages cart state and provides
 * context to all child components.
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped
 * @returns {ReactElement} - Context Provider wrapping children
 */
export default function CartContextProvider({ children }) {
  // Initialize useReducer with shoppingCartReducer and initial empty state
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [], // Initialize with empty items array
    }
  );

  /**
   * Handler function to add items to cart.
   * Dispatches ADD_ITEM action to the reducer.
   * @param {string} id - The ID of the product to add
   */
  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  /**
   * Handler function to update item quantity in cart.
   * Dispatches UPDATE_ITEM action to the reducer.
   * @param {string} productId - The ID of the product to update
   * @param {number} amount - The amount to change the quantity by (can be positive or negative)
   */
  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        productId,
        amount,
      },
    });
  }

  // Context value object containing current state and handler functions
  const ctxValue = {
    items: shoppingCartState.items, // Current cart items
    addItemToCart: handleAddItemToCart, // Function to add items
    updateItemQuantity: handleUpdateCartItemQuantity, // Function to update quantities
  };

  // Provide the context to all child components
  return (
    <CartContext.Provider value={ctxValue}>
      {children} {/* Render all child components */}
    </CartContext.Provider>
  );
}
