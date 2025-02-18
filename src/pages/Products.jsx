import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const componentMounted = useRef(true); // useRef to preserve the value across renders

  useEffect(() => {
    // To fetch data when the component is mounted
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.example.com/products");
        if (componentMounted.current) {
          setProducts(response.data); // Set the data only if the component is still mounted
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    // Cleanup to avoid setting state on an unmounted component
    return () => {
      componentMounted.current = false;
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.length > 0 ? (
          products.map((product) => <li key={product.id}>{product.name}</li>)
        ) : (
          <li>No products available</li>
        )}
      </ul>
    </div>
  );
};

export default Products;
