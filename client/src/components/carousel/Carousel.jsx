import { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel() {
  const [index, setIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1765607124/3_meeyvs.jpg",
    "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1765607113/1_s973gs.webp",
    "https://res.cloudinary.com/dxqt7tfgl/image/upload/v1765612790/bridal1_mo73oz.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <div
        className="carousel-wrapper"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div className="carousel-item" key={i}>
            <img src={img} className="carousel-img" alt="banner" />

            {i === 0 && (
              <div className="carousel-content">
                <p className="offer">exclusive offer -10% off this week</p>
                <h1 className="title">Wedding Rings</h1>
                <span className="subtitle">
                  Indian Special wedding rings for couples.
                </span>
                <p className="price-text">
                  starting at <span className="price">Rs. 14,999</span>
                </p>
                <a href="#" className="btn">
                  Shop Now
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <span key={i} className="dot" onClick={() => setIndex(i)}></span>
        ))}
      </div>

      <button
        className="next-btn"
        onClick={() => setIndex((index + 1) % images.length)}
      >
        ❯
      </button>
    </div>
  );
}

export default Carousel;
