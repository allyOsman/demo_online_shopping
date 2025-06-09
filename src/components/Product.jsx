// Import React hooks and context
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

// Product component that displays individual product information
export default function Product({
  id, // Unique product identifier
  image, // Product image URL
  title, // Product name/title
  price, // Product price
  description, // Product description
}) {
  // Get addItemToCart function from cart context
  const { addItemToCart } = useContext(CartContext);

  return (
    // Product container (semantic HTML article element)
    <article className="product">
      {/* Product image with alt text for accessibility */}
      <img src={image} alt={title} />

      {/* Container for product details and actions */}
      <div className="product-content">
        {/* Product information section */}
        <div>
          {/* Product title */}
          <h3>{title}</h3>
          {/* Formatted product price */}
          <p className="product-price">${price}</p>
          {/* Product description */}
          <p>{description}</p>
        </div>

        {/* Product action buttons */}
        <p className="product-actions">
          {/* Button to add product to cart */}
          <button onClick={() => addItemToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
