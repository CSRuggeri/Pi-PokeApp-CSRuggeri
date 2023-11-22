const { getTypesDb } = require("../controllers/getTypes");

const getTypesHandler = async (req, res) => {
  try {
    const response = await getTypesDb();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Cambio "error" a "message"
  }
};

module.exports = {
  getTypesHandler,
};
