import React from "react";
import Carousel from "./carousel/Carousel";
import Categories from "./categories/Categories";
import Products from "./products/Products";
import FeaturesBar from "./featureBars/FeatureBars";
import InstagramGallery from "./gallery/InstaGallery";

const Home = () => {
  return (
    <>
      <Carousel />
      <Categories />
      <Products />
      <FeaturesBar />
      <InstagramGallery />
    </>
  );
};

export default Home;
