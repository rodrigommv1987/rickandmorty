import { connect } from "react-redux";

import { getCharactersPage } from "../../redux/actions/characterActions";

const CharacterLoadMore = ({ pagesData: { next }, getCharactersPage }) => {
  if (!next) return null;

  return (
    <div className="pages-nav">
      <button onClick={() => getCharactersPage(next)}>
        Load more characters!
      </button>
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
