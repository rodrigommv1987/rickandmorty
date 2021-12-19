/**
 * extracts a subset of the full RM_API payload
 * @param {Object} data
 * @returns {Object}
 */
export const extractCharactersData = (data) => {
  const {
    info: { next, prev },
    results,
  } = data;
  const pages = { next, prev };

  return {
    pages,
    characters: results.map(({ id, name, image }) => ({ id, name, image })),
  };
};
