import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const SmallCard = ({ character, isFavorite }) => {
  const { image, id, name } = character;
  return (
    <article className="card-wrapper">
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
    </article>
  );
};

export default SmallCard;
