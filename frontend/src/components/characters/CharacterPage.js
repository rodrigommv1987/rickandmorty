import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import BigCard from "../cards/BigCard";
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

  useEffect(() => {
    getCharacter(characterId).catch((error) => {
      console.error("Loading character failed" + error);
    });
  }, []);

  if (!characterData || !userData) {
    return <Spinner />;
  }

  const { id, name } = characterData;
  const isFavorite = userData.favorites.includes(id);

  return (
    <div>
      <h1>{name}'s page</h1>
      <section>
        <BigCard
          characterData={characterData}
          isFavorite={isFavorite}
          updateFavorite={updateFavorite}
        />
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
