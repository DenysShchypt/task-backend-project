import express from "express";
import { validateBody } from "../../decorators/index.js" 
import * as columnController from "../../controllers/columns/index.js";
import { isValidId, authenticate, isEmptyBody } from '../../middlewares/index.js'
import {schemaAddColumn, schemaUpdateColumn} from "../../models/columnsSchema.js"

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.post('/', isEmptyBody, validateBody(schemaAddColumn), columnController.addColumn);

columnsRouter.patch('/:id', isValidId, isEmptyBody, validateBody(schemaUpdateColumn), columnController.patchColumn);

columnsRouter.delete('/:id', isValidId, columnController.deleteColumn);


export default columnsRouter;