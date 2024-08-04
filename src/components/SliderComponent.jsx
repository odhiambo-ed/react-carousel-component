import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./SliderComponent.css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

function SliderComponent({ url, page = 2, limit = 10 }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState(0)

  async function fetchImages(getUrl) {
    try {
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      console.log(data);

      if (data) {
        setImages(data);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchImages(url);
  }, [url]);

  function handlePrevious() {
    setCurrentImage(currentImage == 0 ? currentImage.length - 1 : currentImage - 1)
  }

  function handleNext() {
    setCurrentImage(currentImage == currentImage.length - 1 ? currentImage == 0 : currentImage + 1)
  }
  

  return (
    <div className="hero">
      {error && <p>{error}</p>}
      {/* Render images or a message if there are no images */}
      <IoIosArrowDropleftCircle onClick={handlePrevious} className="arrow left-arrow" />
      {images.length > 0 ? (
        images.map((image, index) => (
          <img
            key={image.id}
            src={image.download_url}
            alt={image.author}
            className={currentImage == index ? `current__image` : `hide__me`}
          />
        ))
      ) : (
        <p>No images found</p>
      )}
      <IoIosArrowDroprightCircle onClick={handleNext} className="arrow right-arrow" />
      <span className="indicator-container">
        {images && images.length > 0
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentImage == index ? `indicators` : `inactive__indicators`
                }
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}

SliderComponent.propTypes = {
  url: PropTypes.string.isRequired,
  page: PropTypes.number,
  limit: PropTypes.number,
};

export default SliderComponent;