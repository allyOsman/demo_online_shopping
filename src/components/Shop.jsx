// Importing necessary data and components
import { DUMMY_PRODUCTS } from "../dummy-products.js"; // Import mock product data (not used directly in this component)
import Product from "./Product.jsx"; // Import Product component (not used directly in this component)

// Shop component that serves as a container for product listings
export default function Shop({ children }) {
  return (
    // Main shop section with ID for potential styling/selection
    <section id="shop">
      {/* Section heading */}
      <h2>Elegant Clothing For Everyone</h2>

      {/* Unordered list that will contain product items 
          The actual product items are passed as children */}
      <ul id="products">
        {children} {/* Render child components here */}
      </ul>
    </section>
  );
}
