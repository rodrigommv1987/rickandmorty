import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import BigCard from "../Cards/BigCard";
import Spinner from "../common/Spinner";
import { getCharacter } from "../../redux/actions/characterActions";

const CharacterPage = ({ getCharacter, characterData, userData }) => {
  let { characterId } = useParams();

  const toggleFavorite = (addOrRemove) => {
    console.log("toggleFavorite: ", addOrRemove, id);
  };

  useEffect(() => {
    getCharacter(characterId).catch((error) => {
      console.error("Loading character failed" + error);
    });
  }, []);

  // characterData && console.log(characterData);
  // userData && console.log(userData.favorites);

  if (!characterData) {
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
                <button onClick={() => toggleFavorite(false)}>Remove!</button>
              </span>
            ) : (
              <span>
                Not in favorites.
                <button onClick={() => toggleFavorite(true)}>Add!</button>
              </span>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

function mapStateToProps({ characterReducer: { characterData, userData } }) {
  return {
    characterData,
    userData,
  };
}

const mapDispatchToProps = {
  getCharacter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
