import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const componentMounted = useRef(true); // Use useRef instead of useState for componentMounted

  useEffect(() => {
    componentMounted.current = true;
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        if (componentMounted.current) {
          setProducts(response.data);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      componentMounted.current = false; // Set to false when the component unmounts
    };
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
