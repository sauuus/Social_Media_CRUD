import { CommentInterface, UpdateCommentInterface } from "../../interface";
import {
  postCommentValidator,
  updateCommentValidator,
  deleteCommentValidator,
} from "../../validator";
import { MyContext } from "../../helpers";
import { Post, Comment, userModel, Reply } from "../../models";
import { CommentService } from "../../service";
import { status } from "../../helpers";

export const commentResolver = {
  Query: {
    getComments: async (parent: ParentNode, args: {}, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header missing");
        }
        let allComment = await new CommentService(Comment).findAll({user_id: context.user.id});
        return allComment;
      } catch (error) {
        throw new Error(`error whille recieving ${error}`);
      }
    },

    getCommentById: async (
      parents: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        const { id } = args;
        const comment = await Comment.findOne({ where: { id } });
        return comment;
      } catch (error) {
        console.log(`User not found ${error}`);
      }
    },
  },
  Comment: {
    // user: async (comment: CommentInterface) =>
    //   await userModel.findByPk(comment.userId),
    // post: async (comment: CommentInterface) =>
    //   await Post.findByPk(comment.postId),
    replies: async (comment: CommentInterface) =>
      await Reply.findAll({ where: { commentId: comment.id } }),
  },
  Mutation: {
    createComment: async (
      parent: ParentNode,
      args: { input: CommentInterface },
      context: MyContext
    ) => {
      try {
        if (!context.token || !context.user)
          throw new Error("Authorization header is missing");

        postCommentValidator.validate(args.input);
        const post = await Post.findByPk(args.input.postId);
        if (!post)
          throw new Error(`No post with id: ${args.input.postId} exists`);
        const newComment = await new CommentService(Comment).create({
          description: args.input.description,
          postId: args.input.postId,
          userId: context.user.id,
        });
        console.log("New comment created");
        return newComment;
      } catch (error) {
        throw new Error(`Error adding new comment: ${error}`);
      }
    },
    updateComment: async (
      parent: ParentNode,
      args: { input: UpdateCommentInterface },
      context: MyContext
    ) => {
      try {
        if (!context.token || !context.user)
          throw new Error("Authorization header is missng");

        updateCommentValidator.validate(args.input);
        const { commentId, description } = args.input;

        const comment = await new CommentService(Comment).findByPk(commentId);

        const updatedComment = await new CommentService(Comment).update(
          { commentId: args.input.commentId },
          { description: args.input.description }
        );

        if (updatedComment) {
          return {
            status_code: status.success.okay,
            message: `Comment with id ${commentId} is updated successfully`,
          };
        } else {
          return {
            status_code: status.errors.badRequest,
            message: `Comment with id ${commentId} is updated successfully`,
          };
        }
      } catch (error) {
        throw new Error(`Error adding new comment: ${error}`);
      }
    },
    deleteComment: async (
      parent: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        if (!context.user) throw new Error("Authorization header is required");
        const { id } = args;
        const { error } = deleteCommentValidator.validate({ id });
        if (error) throw error;
        // const post = await new PostService(Post).findOne({id})
        // console.log(post)

        const deletedPost = await new CommentService(Comment).delete({
          id,
          userId: context.user.id,
        });
        console.log(deletedPost);

        if (!deletedPost)
          throw new Error(` you cannot delete this post or it doesnt belongs to you
                  : ${id}`);

        return {
          status_code: status.success.okay,
          message: `Post with id ${id} is deleted successfully`,
        };
      } catch (error: any) {
        console.log(error.message);
        throw new Error(`Error while deleting the post: ${error}`);
      }
    },
  },
};
