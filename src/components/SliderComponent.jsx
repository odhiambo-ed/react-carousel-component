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

  return (
    <div className="hero">
      {error && <p>{error}</p>}
      {/* Render images or a message if there are no images */}
      <IoIosArrowDropleftCircle />
      {images.length > 0 ? (
        images.map((image) => (
          <img key={image.id} src={image.download_url} alt={image.author} />
        ))
      ) : (
        <p>No images found</p>
      )}
      <IoIosArrowDroprightCircle />
    </div>
  );
}

SliderComponent.propTypes = {
  url: PropTypes.string.isRequired,
  page: PropTypes.number,
  limit: PropTypes.number,
};

export default SliderComponent;