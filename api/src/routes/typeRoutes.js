const {Router} = require ("express")
const {getTypesHandler} = require('../handlers/typesH');// Corrige "handllers" a "handlers"

const typeRouter = Router(); // Importa correctamente el objeto Router
 

typeRouter.get('/', getTypesHandler);

module.exports = typeRouter;