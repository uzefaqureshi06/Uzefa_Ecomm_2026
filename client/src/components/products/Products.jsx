import { useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/products";
import useAuthenticated from "../../hooks/useAuthenticate";
import { useNavigate } from "react-router-dom";
import { createCartProducts } from "../../redux/actions/cart";

function Products() {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthenticated();

  // ✅ Get products from Redux
  const productData = useSelector(
    (state) => state?.products?.products?.products || []
  );
  console.log(productData, "This is Product data");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 🔹 Add to Cart
  const handleAddtoCart = (productId) => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    if (productId) {
      const newProduct = {
        product: productId,
        user: user._id,
        quantity: 1,
      };
      console.log(newProduct, "This is cart product data");
      dispatch(createCartProducts(newProduct));
    }
  };

  // 🔹 Show first 2 or all
  const visibleProducts = showAll
    ? productData
    : productData?.slice(0, 4);

  return (
    <section style={{ backgroundColor: "black", padding: "40px 0" }}>
      <h1 className="cat-title">All Jewelleries</h1>

      <div className="cards-container">
        {visibleProducts?.map((product) => (
          <div className="wrapper" key={product?._id}>
            {/* FRONT */}
            <div className="card front-face">
              <img
                src={product?.frontImg}
                alt={product?.name}
              />
            </div>

            {/* BACK */}
            <div className="card back-face">
              <img
                src={product?.backImg}
                alt={product?.name}
              />

              <div className="title line-clamp-1">{product?.name}</div>
              <div className="price">₹{product?.price}</div>

              <div className="buttons">
                <button
                  className="btn cart "
                  onClick={() => handleAddtoCart(product?._id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 VIEW MORE BUTTON */}
      {productData?.length > 2 && !showAll && (
        <div className="more-btn-container">
          <button
            className="futuristic-btn"
            onClick={() => setShowAll(true)}
          >
            ✨ View More Jewellery ✨
          </button>
        </div>
      )}
    </section>
  );
}

export default Products;
