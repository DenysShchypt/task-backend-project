import express from "express";
import { ctrlWrapper, validateBody } from "../../decorators/index.js" 
import { addColumn, patchColumn, deleteColumn } from "../../controllers/columns/index.js";
import { isValidId, authenticate, isEmptyBody } from '../../middlewares/index.js'
import {schemaAddColumn, schemaUpdateColumn} from "../../models/columnsSchema.js"

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.post('/', isEmptyBody, validateBody(schemaAddColumn), ctrlWrapper(addColumn));

columnsRouter.patch('/:columnId', isValidId, isEmptyBody, validateBody(schemaUpdateColumn), ctrlWrapper(patchColumn));

columnsRouter.delete('/:columnId', isValidId, ctrlWrapper(deleteColumn));


export default columnsRouter;