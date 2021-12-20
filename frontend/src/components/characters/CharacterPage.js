import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import BigCard from "../cards/BigCard";
import InteractiveButton from "../common/InteractiveButton";
import Spinner from "../common/Spinner";
import { getCharacter } from "../../redux/actions/characterActions";
import { updateFavorite } from "../../redux/actions/userActions";

const CharacterPage = ({
  getCharacter,
  characterData,
  userData,
  updateFavorite,
}) => {
  let { characterId } = useParams();

  const toggleFavorite = async (addOrRemove, done) => {
    try {
      await updateFavorite(id, addOrRemove);
    } catch (error) {
    } finally {
      done();
    }
  };

  useEffect(() => {
    getCharacter(characterId).catch((error) => {
      console.error("Loading character failed" + error);
    });
  }, []);

  // characterData && console.log(characterData);
  // userData && console.log(userData.favorites);

  if (!characterData || !userData) {
    return <Spinner />;
  }

  const { image, name, id } = characterData;
  const isFavorite = userData.favorites.includes(id);

  return (
    <div>
      <h1>{name}'s page</h1>
      <section>
        <article className="card-wrapper">
          <div className="card-image">
            <img alt={image} src={image} effect="blur" />
          </div>
          <div className="card-description">
            <h2>{name}</h2>

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
                  Remove!
                </InteractiveButton>
              </span>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

function mapStateToProps({
  characterReducer: { characterData },
  userReducer: { userData },
}) {
  return {
    characterData,
    userData,
  };
}

const mapDispatchToProps = {
  getCharacter,
  updateFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
