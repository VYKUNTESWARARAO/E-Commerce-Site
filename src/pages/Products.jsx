import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Footer, Navbar } from "../components";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const Loading = () => (
    <div className="row">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="col-md-3 mb-4">
          <Skeleton height={300} />
        </div>
      ))}
    </div>
  );

  const ShowProducts = () => (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className="card">
            <img
              className="card-img-top"
              src={product.image}
              alt={product.title}
              height="250px"
            />
            <div className="card-body">
              <h5 className="card-title">
                {product.title.substring(0, 15)}...
              </h5>
              <p className="card-text">${product.price}</p>
              <Link to={`/product/${product.id}`} className="btn btn-dark">
                View Details
              </Link>
              <button
                className="btn btn-outline-dark mt-2"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">{loading ? <Loading /> : <ShowProducts />}</div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
