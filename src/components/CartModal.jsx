// Import React hooks and utilities
import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";  // For portal-based rendering
import Cart from "./Cart.jsx";  // Cart component to display inside modal

// Modal component with forwarded ref for parent control
const CartModal = forwardRef(function Modal({ title, actions }, ref) {
  // Ref to access the native dialog DOM element
  const dialog = useRef();

  // Expose custom methods to parent via ref
  useImperativeHandle(ref, () => {
    return {
      // Method to open the modal
      open: () => {
        dialog.current.showModal();  // Native dialog API
      },
    };
  });

  // Render modal using React portal to ensure proper positioning in DOM
  return createPortal(
    // Native dialog element with modal styling
    <dialog id="modal" ref={dialog}>
      {/* Modal title */}
      <h2>{title}</h2>
      
      {/* Cart component with all cart items */}
      <Cart />
      
      {/* Form with dialog method enables native close behavior */}
      <form method="dialog" id="modal-actions">
        {/* Actions passed from parent (Close/Checkout buttons) */}
        {actions}
      </form>
    </dialog>,
    // Portal target element in the DOM
    document.getElementById("modal")
  );
});

export default CartModal;