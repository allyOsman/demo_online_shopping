// Import React hooks and dependencies
import { useRef, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";
import CartModal from "./CartModal.jsx";

export default function Header() {
  // Create a ref to interact with the CartModal component
  const modal = useRef();

  // Access cart items from context
  const { items } = useContext(CartContext);

  // Calculate number of items in cart
  const cartQuantity = items.length;

  // Handler function to open the cart modal
  function handleOpenCartClick() {
    modal.current.open();
  }

  // Default modal actions (just Close button)
  let modalActions = <button>Close</button>;

  // If cart has items, add Checkout button to modal actions
  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      {/* Cart modal with forwarded ref and configuration */}
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}  // Dynamic actions based on cart content
      />
      
      {/* Main header section */}
      <header id="main-header">
        {/* Logo and title container */}
        <div id="main-title">
          {/* Site logo */}
          <img src="logo.png" alt="Elegant model" />
          {/* Main heading */}
          <h1>Elegant Context</h1>
        </div>
        
        {/* Cart button with item count */}
        <p>
          <button onClick={handleOpenCartClick}>
            Cart ({cartQuantity})  {/* Display current cart quantity */}
          </button>
        </p>
      </header>
    </>
  );
}