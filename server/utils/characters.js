import { URL } from "url";

/**
 * extracts a subset of the full RM_API payload
 * @param {Object} data
 * @returns {Object}
 */
export const extractCharactersData = (data) => {
  const {
    info: { prev, next },
    results,
  } = data;
  const pages = getPrevNextPageNumber(prev, next);

  return {
    pages,
    characters: results.map(({ id, name, image }) => ({ id, name, image })),
  };
};

/**
 * extract the corresponding page number from prev and next.
 * returns the page number or null for each param
 * @param {String | null} prev
 * @param {String | null} next
 * @returns {Object}
 */
const getPrevNextPageNumber = (prev, next) => {
  const pages = { prev, next };
  if (prev) {
    pages.prev = +new URL(prev).searchParams.get("page");
  }
  if (next) {
    pages.next = +new URL(next).searchParams.get("page");
  }

  return pages;
};
