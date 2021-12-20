import React, { useEffect } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";

import CharacterLoadMore from "./CharacterLoadMore";
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

  // charactersData &&
  //   console.log("CharactersPage charactersData: ", charactersData);
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
              <CharacterLoadMore pagesData={charactersData.pages} />
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </>
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
