import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const SmallCard = ({ character, isFavorite, variants }) => {
  const { image, id, name } = character;
  return (
    <motion.article className="card-wrapper card-small" variants={variants}>
      <div className="card-image">
        <LazyLoadImage alt={image} src={image} effect="blur" />
      </div>
      <div className="card-description">
        <Link
          to={`${id}`}
          className="card-name"
          aria-label={`See full ${name} details`}
        >
          <h2>{name}</h2>
        </Link>
        {isFavorite ? <span>favorite</span> : null}
      </div>
    </motion.article>
  );
};

export default SmallCard;
