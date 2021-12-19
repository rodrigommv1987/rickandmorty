import React, { useEffect } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";

import SmallCard from "../Cards/SmallCard";
import { getCharacters } from "../../redux/actions/characterActions";

const CharactersPage = ({ getCharacters, charactersData, userData }) => {
  useEffect(() => {
    getCharacters().catch((error) => {
      console.error("Loading characters failed" + error);
    });
  }, []);

  charactersData && console.log(charactersData.characters);
  userData && console.log(userData);

  return (
    <>
      <h1>Rick and Morty character list</h1>
      <section>
        <div className="cards-container">
          {charactersData?.characters ? (
            charactersData?.characters?.map((character, index) => (
              <SmallCard
                key={character.id}
                character={character}
                isFavorite={userData.favorites.includes(character.id)}
              />
            ))
          ) : (
            <div>nothing to show here</div>
          )}
        </div>
      </section>
    </>
  );
};

function mapStateToProps({ characterReducer: { charactersData, userData } }) {
  return {
    charactersData,
    userData,
  };
}

const mapDispatchToProps = {
  getCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersPage);
