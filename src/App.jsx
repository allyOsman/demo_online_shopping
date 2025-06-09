// Importing necessary components and data
import Header from "./components/Header.jsx";         // Header component for the application
import Shop from "./components/Shop.jsx";             // Shop component that will contain products
import Product from "./components/Product.jsx";        // Product component to display individual products
import { DUMMY_PRODUCTS } from "./dummy-products.js";  // Mock product data
import CartContextProvider from "./store/shopping-cart-context.jsx"; // Context provider for cart state management

// Main App component
function App() {
  return (
    // Wrapping the entire app with CartContextProvider to make cart state available to all child components
    <CartContextProvider>
      {/* Render the Header component */}
      <Header />
      
      {/* Render the Shop component which acts as a container for products */}
      <Shop>
        {/* Mapping through DUMMY_PRODUCTS array to render each product */}
        {DUMMY_PRODUCTS.map((product) => (
          // Each product is rendered as a list item with a unique key
          <li key={product.id}>
            {/* Product component with all product properties spread as props */}
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

// Export the App component as the default export
export default App;