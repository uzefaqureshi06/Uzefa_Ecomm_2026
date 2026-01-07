import { useEffect, useState } from "react";
import "./InstaGallery.css";
import { FaPlay } from "react-icons/fa";
import Loader from "../loader/Loader.jsx";

const galleryData = [
  {
    type: "video",
    src: "https://res.cloudinary.com/dxqt7tfgl/video/upload/v1765805635/4_v0_wnwudp.mp4",
    shape: "portrait",
  },
  {
    type: "image",
    src: "https://i.pinimg.com/736x/fb/61/a0/fb61a0f52ca68a60bc66d30fbb7dd5b1.jpg",
    shape: "square",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxqt7tfgl/video/upload/v1765805576/8_v0_xv87ii.mp4",
    shape: "square",
  },
  {
    type: "image",
    src: "https://i.pinimg.com/1200x/0f/7a/4d/0f7a4d1ad17f68694a41056aaf78be21.jpg",
    shape: "portrait",
  },
  {
    type: "image",
    src: "https://roschic.com/cdn/shop/files/ef1064237456ca5a5816e11519fc5806_600x.jpg?v=1750499835",
    shape: "portrait",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dxqt7tfgl/video/upload/v1765805087/3_v0_3_udypkz.mp4",
    shape: "portrait",
  },
  {
    type: "image",
    src: "https://www.warasibe.com/cdn/shop/files/f610cd04b65c856a01c5c93c7315703e.jpg?v=1758019442",
    shape: "square",
  },
  {
    type: "image",
    src: "https://img.fantaskycdn.com/af074218448f120253849068da07c27b_720x.jpeg",
    shape: "square",
  },
];

function InstagramGallery() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading (API / media preload)
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* 🔥 FULL PAGE LOADER */
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="insta-section">
      <h2 className="insta-title">Follow Us on Instagram</h2>

      <div className="insta-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="insta-card skeleton insta-skeleton"
              ></div>
            ))
          : galleryData.map((item, index) => (
              <div key={index} className={`insta-card ${item.shape}`}>
                {item.type === "image" ? (
                  <img src={item.src} alt="instagram post" />
                ) : (
                  <>
                    <video src={item.src} muted loop autoPlay playsInline />
                    <div className="play-icon">
                      <FaPlay />
                    </div>
                  </>
                )}
              </div>
            ))}
      </div>
    </section>
  );
}

export default InstagramGallery;
