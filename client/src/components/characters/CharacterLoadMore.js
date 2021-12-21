import { connect } from "react-redux";

import { getCharactersPage } from "../../redux/actions/characterActions";
import InteractiveButton from "../common/InteractiveButton";

const CharacterLoadMore = ({ pagesData: { next }, getCharactersPage }) => {
  if (!next) return null;

  const handleClick = async (event, done) => {
    try {
      await getCharactersPage(next);
    } catch (error) {
    } finally {
      done();
    }
  };

  return (
    <div className="cards-actions">
      <InteractiveButton onClick={handleClick}>
        Load more characters!
      </InteractiveButton>
    </div>
  );
};

function mapStateToProps({ characterReducer: { charactersData } }) {
  return {
    charactersData,
  };
}

const mapDispatchToProps = {
  getCharactersPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterLoadMore);
