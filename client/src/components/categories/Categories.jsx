import { useNavigate } from "react-router-dom";
import "./Categories.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../../redux/actions/category";

function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get category data from Redux
  const catData = useSelector((state) => state?.category); // make sure categories array exists
  // console.log(catData, "This is category Data");

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <section className="categories">
      <h2 className="cat-title">Discover Our Collections</h2>

      <div className="cat-wrapper">
        {catData && catData.length > 0 ? (
          catData.map((category) => (
            <div
              key={category._id}
              className="cat-item"
              onClick={() => navigate(`/category/${category._id}`)}
            >
              <img src={category.image} alt={category.name} />
              <p>{category.name}</p>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </section>
  );
}

export default Categories;
