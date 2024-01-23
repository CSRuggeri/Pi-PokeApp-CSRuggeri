const {Router} = require ("express")
const {getTypesHandler} = require('../handlers/typesH');// Corrige "handllers" a "handlers"
const createTypeHandler = require("../handlers/createTypeH")
const typeRouter = Router(); // Importa correctamente el objeto Router
 
typeRouter.post("/new/:name", createTypeHandler);

typeRouter.get('/', getTypesHandler);

module.exports = typeRouter;