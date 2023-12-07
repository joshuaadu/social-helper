import * as Joi from "joi";

export const createInstagramPostSchema = Joi.object({
  authorId: Joi.string().required(),
  imageUrl: Joi.string().required(),
  caption: Joi.string().required(),
});

export const createPostSchema = Joi.object({
  authorId: Joi.string().required(),
  content: Joi.string().required(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  authorId: Joi.number(),
});

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  provider: Joi.string(),
  providerId: Joi.string(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
});

export const validate = (schema: Joi.ObjectSchema, payload: any) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw error;
  }
  return value;
};
