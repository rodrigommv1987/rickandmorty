import React, { useEffect } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";

import SmallCard from "../cards/SmallCard";
import Spinner from "../common/Spinner";
import {
  getCharacters,
  clearCharacters,
} from "../../redux/actions/characterActions";

const CharactersPage = ({
  getCharacters,
  charactersData,
  userData,
  clearCharacters,
}) => {
  useEffect(() => {
    getCharacters().catch((error) => {
      console.error("Loading characters failed in CharactersPage: ", error);
    });
    return () => {
      clearCharacters();
    };
  }, []);

  // charactersData && console.log(charactersData);
  // userData && console.log(userData);

  return (
    <>
      <h1>Rick and Morty character list</h1>
      <section>
        <div className="cards-container">
          {charactersData?.characters ? (
            <>
              {charactersData?.characters?.map((character, index) => (
                <SmallCard
                  key={character.id}
                  character={character}
                  isFavorite={userData.favorites.includes(character.id)}
                />
              ))}
              <CharacterNavigation pagesData={charactersData.pages} />
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </>
  );
};

const CharacterNavigation = ({ pagesData: { prev, next } }) => {
  console.log("prev vale: ", prev);
  console.log("next vale: ", next);
  return (
    <div className="pages-nav">
      <button>Prev</button>
      <button>Next</button>
    </div>
  );
};

function mapStateToProps({
  characterReducer: { charactersData },
  userReducer: { userData },
}) {
  return {
    charactersData,
    userData,
  };
}

const mapDispatchToProps = {
  getCharacters,
  clearCharacters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharactersPage);
