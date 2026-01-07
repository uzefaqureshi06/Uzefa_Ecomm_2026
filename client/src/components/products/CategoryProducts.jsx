import { Link, useNavigate, useParams } from "react-router-dom";
import "./CategoryProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/products";
import useAuthenticated from "../../hooks/useAuthenticate";
import { ArrowBigLeft } from "lucide-react";
import { createCartProducts } from "../../redux/actions/cart";
function CategoryProducts() {
  const { categoryId } = useParams(); // get categoryId from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthenticated();
  // ✅ Get products from Redux
  const productData = useSelector(
    (state) => state?.products?.products?.products || []
  );
  console.log(productData, "This is Product Data");

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // 🔹 Filter products by categoryId
  const categoryProducts = productData.filter(
    (product) => product.category && product.category._id === categoryId
  );
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
  // 🔹 CATEGORY BANNERS (example: add more category banners here if needed)
  const banners = {
    "693d939ae12a766a49cd4345": {
      image:
        "https://www.voylla.com/cdn/shop/collections/Rings.jpg?v=1716286544",
    },
    "693d9312e12a766a49cd433d": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1765607152/2_aecpqf.jpg",
    },
    "693d93cde12a766a49cd4349": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1767412875/banners-07_copy_ilpqrh.webp",
    },
    "693d93b2e12a766a49cd4347": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1767412948/Nose_Pins_and_Nose_Rings_nc8qrd.webp",
    },
    "693d9378e12a766a49cd4343": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1767413025/gold_banner_01_zqdxem.webp",
    },
    "693d935ee12a766a49cd4341": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1767413345/1700x500-chains_aioixg.webp",
    },
    "693d9341e12a766a49cd433f": {
      image:
        "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1767413712/earrings-banner_df2mh2.jpg",
    },
  };
  const banner = banners[categoryId];

  return (
    <>
      {/* 🔥 CATEGORY BANNER */}
      {banner && (
        <div
          className="category-banner"
          style={{ backgroundImage: `url(${banner.image})` }}
        >
          <div className="overlay"></div>
        </div>
      )}

      <Link
        to="/"
        className=" !p-2 !m-2 border-2 border-[#ffd70099] rounded-lg text-white flex item-center justify-center w-[6%] gap-2 "
      >
        {" "}
        <ArrowBigLeft /> Back
      </Link>
      {/* 🔥 PRODUCTS */}
      <section className="products-section">
        <div className="cards-container">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((item) => (
              <div
                className="product-card"
                key={item._id}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();

                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const rotateX = ((y - centerY) / centerY) * 12;
                  const rotateY = ((x - centerX) / centerX) * -12;

                  card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.04)
                  `;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
                }}
              >
                <img
                  src={item?.frontImg}
                  alt={item?.name}
                  className="product-img"
                />
                <h3 className="product-title line-clamp-1">{item?.name}</h3>
                <p className="product-price flex justify-between">
                  <span className=" !p-2 rounded-3xl bg-[#ffd70099]">
                    {" "}
                    ₹{item?.price}{" "}
                  </span>
                  <span className="!p-2 rounded-3xl bg-[#ffd70099]">
                    {item?.discount} % off
                  </span>
                </p>

                <div className="buttons">
                  <button
                    onClick={() => handleAddtoCart(item?._id)}
                    className="btn cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default CategoryProducts;
