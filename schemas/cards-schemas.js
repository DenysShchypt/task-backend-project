import Joi from "joi";

export const cardAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `the "title" field is missing`,
    }),
    description: Joi.string().allow(''),
    priority: Joi.string().valid("without", "low", "medium", "high"),
    deadline: Joi.date().iso(),
    column: Joi.string().required().messages({
        "any.required": `the "column" field is missing`,
    }),
});

export const cardUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string().allow(''),
    priority: Joi.string().valid("without", "low", "medium", "high"),
    deadline: Joi.date().iso(),
});
