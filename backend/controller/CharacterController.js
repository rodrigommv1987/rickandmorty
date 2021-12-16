const characterController = (API) => {
  const getAllCharacters = async (req, res) => {
    try {
      const characters = await API.getCharacters();

      res.status(200);
      return res.json(characters);
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong while fetching characters",
      });
    }
  }
  const getCharacter = async function (req, res) {
    const { id } = req.params;

    if (isNaN(+id)) {
      res.status(400);
      return res.json({
        success: false,
        msg: "Invalid character id",
      });
    }

    try {
      const character = await API.getCharacter(+id);

      if (character.status === 404) {
        res.status(404);
        return res.json({
          success: false,
          msg: "Character not found",
        });
      }

      res.status(200);
      return res.json(character);
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong while fetching the character",
      });
    }
  }
  const getPage = async function (req, res) {
    const { number } = req.params;

    if (isNaN(+number)) {
      res.status(400);
      return res.json({
        success: false,
        msg: "Invalid page number",
      });
    }

    try {
      const characters = await API.getCharacters({ page: +number });

      if (characters.status === 404) {
        res.status(404);
        return res.json({
          success: false,
          msg: "Page not found",
        });
      }

      res.status(200);
      return res.json(characters);
    } catch (error) {
      console.log(error);
      res.status(500);
      return res.json({
        success: false,
        msg: "Something went wrong while fetching the page",
      });
    }
  }

  return {
    getAllCharacters,
    getCharacter,
    getPage
  }
}

export default characterController;