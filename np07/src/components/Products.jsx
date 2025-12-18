import { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api/home";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const handleAddToCart = async (productId) => {
    const response = await addToCart(productId);
    if (response) {
      alert("Product added to cart!");
    }
  };

  const trimmedName = (name) =>
    name.length > 40 ? name.slice(0, 40) + "..." : name;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={product.ProductId}>
            <div className="minimal-card">
              <div className="img-wrap">
                <img
                  src={`http://durgeshk-001-site1.anytempurl.com/${product.ImageUrl}`}
                  alt={product.ProductName}
                />
              </div>

              <div className="text-center px-3 pb-4">
                <p className="product-name">
                  {trimmedName(product.ProductName)}
                </p>

                <p className="price">${product.Price}</p>

                <button
                  className="btn btn-outline-dark btn-sm mt-2"
                  onClick={() => handleAddToCart(product.ProductId)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
