import InteractiveButton from "../common/InteractiveButton";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BigCard = ({ characterData, isFavorite, updateFavorite }) => {
  const { image, name, id, gender, status, species, type } = characterData;
  const facts = [
    ["Gender", gender],
    ["Status", status],
    ["Species", species],
    ["Type", type],
  ];

  const toggleFavorite = async (addOrRemove, done) => {
    try {
      await updateFavorite(id, addOrRemove);
    } catch (error) {
    } finally {
      done();
    }
  };

  return (
    <article className="card-wrapper card-big">
      <div className="card-image">
        <LazyLoadImage alt={image} src={image} effect="blur" />
      </div>
      <div className="card-description">
        <h2>{name}</h2>
        <div>
          {isFavorite ? (
            <span>
              Added to favorites.
              <InteractiveButton
                onClick={(event, done) => toggleFavorite(false, done)}
              >
                Remove!
              </InteractiveButton>
            </span>
          ) : (
            <span>
              Not in favorites.
              <InteractiveButton
                onClick={(event, done) => toggleFavorite(true, done)}
              >
                Add!
              </InteractiveButton>
            </span>
          )}
        </div>
        {facts.map(([label, fact], index) =>
          fact !== "" ? (
            <div key={index}>
              <span>
                {label}: {fact}
              </span>
            </div>
          ) : null
        )}
      </div>
    </article>
  );
};

export default BigCard;
