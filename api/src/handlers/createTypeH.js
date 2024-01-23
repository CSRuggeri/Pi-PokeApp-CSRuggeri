const createType = require('../controllers/createTypes');

const createTypeHandler = async (req, res) => {
  const { name } = req.params;

  const { status, result } = await createType(name);

  return res.status(status).json(result);
};

module.exports = createTypeHandler;