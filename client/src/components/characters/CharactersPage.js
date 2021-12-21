import { motion } from "framer-motion";
import { useEffect } from "react";
import { connect } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";

import CharacterLoadMore from "./CharacterLoadMore";
import SmallCard from "../cards/SmallCard";
import Spinner from "../common/Spinner";
import {
  getCharacters,
  clearCharacters,
} from "../../redux/actions/characterActions";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

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

  return (
    <>
      <h1>Rick and Morty character list</h1>
      <section>
        {charactersData?.characters ? (
          <>
            <motion.div
              className="cards-container"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {charactersData.characters.map((character, index) => (
                <SmallCard
                  key={index}
                  character={character}
                  isFavorite={userData.favorites.includes(character.id)}
                  variants={item}
                />
              ))}
            </motion.div>
            <CharacterLoadMore pagesData={charactersData.pages} />
          </>
        ) : (
          <Spinner />
        )}
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
