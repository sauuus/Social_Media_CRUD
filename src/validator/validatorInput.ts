import { UpdatePostInterface } from "./../interface/postInterface";
import joi from "joi";

export const registerValidate = joi.object({
  fullname: joi
    .string()
    .label("FULLNAME")
    .min(3)
    .max(30)
    .required()
    .regex(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base":
        "{{#label}} must contain alphabetic characters only",
    }),

  email: joi.string().label("EMAIL").email().required(),

  password: joi
    .string()
    .label("PASSWORD")
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(4)
    .max(8)
    .required(),
});
export const LoginSchema = joi.object({
  email: joi.string().label("Email").email().required(),
  password: joi.string().label("Password").required(),
});
export const getPostByIdValidate = joi.object().keys({
  postId: joi.number().label("post_id").required(),
});
export const createPostValidator = joi.object({
  description: joi.string().min(3).max(500),
});
export const UpdatePostValidator = joi.object({
  postId: joi.number().required().label("post id"),
  description: joi.string().min(3).max(500),
});
export const idValidator = joi.object({
  id: joi.number().required().label("post id"),
});
export const postCommentValidator = joi.object({
  postId: joi.number().required().label("post id"),
  description: joi.string().min(3).max(500),
});
export const updateCommentValidator = joi.object({
  commentId: joi.number().required().label("comment id"),
  description: joi.string().min(3).max(500),
});
export const deleteCommentValidator = joi.object({
  id : joi.number().label("comment id").required(),
});
export const postReplyValidator = joi.object({
  postId: joi.number().required().label("reply id"),
  description: joi.string().min(3).max(500),
});
export const updateReplyValidator = joi.object({
  replyId: joi.number().required().label("reply id"),
  description: joi.string().min(3).max(500),
});
export const deleteReplyValidator = joi.object({
  id : joi.number().label("reply id").required(),
});