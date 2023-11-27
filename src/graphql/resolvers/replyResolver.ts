import { ReplyService } from "../../service";
import { status } from "../../helpers";
import { Reply, Comment, userModel } from "../../models";
import { MyContext } from "../../helpers";
import { ReplyInterface, UpdateReplyInterface } from "../../interface";
import {
  postReplyValidator,
  updateReplyValidator,
  deleteReplyValidator,
} from "../../validator";

export const replyResolver = {
  Query: {
    getReplies: async (parent: ParentNode, args: {}, context: MyContext) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header missing");
        }
        let allReplies = await new ReplyService(Reply).findAll({user_id: context.user.id});
        return allReplies;
      } catch (error) {
        throw new Error(`error whille recieving ${error}`);
      }
    },
    getReplyById: async (
      parents: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        const { id } = args;
        const reply = await Reply.findOne({ where: { id } });
        return reply;
      } catch (error) {
        console.log(`User not found ${error}`);
      }
    },
  },
  Reply: {
    // user: async (Reply: ReplyInterface) => await userModel.findByPk(Reply.userId),
    // comment: async (Reply: ReplyInterface) => await Comment.findByPk(Reply.commentId),
  },
  Mutation: {
    createReply: async (
      parent: ParentNode,
      args: { input: ReplyInterface },
      context: MyContext
    ) => {
      try {
        if (!context.token || !context.user)
          throw new Error("Authorization header is missing");

        postReplyValidator.validate(args.input);
        const comment = await Comment.findByPk(args.input.commentId);
        if (!comment)
          throw new Error(`No post with id: ${args.input.commentId} exists`);
        const newReply = await new ReplyService(Reply).create({
          description: args.input.description,
          commentId: args.input.commentId,
          userId: context.user.id,
        });
        console.log("New reply created");
        return newReply;
      } catch (error) {
        throw new Error(`Error adding new reply: ${error}`);
      }
    },
    updateReply: async (
      parent: ParentNode,
      args: { input: UpdateReplyInterface },
      context: MyContext
    ) => {
      try {
        if (!context.token || !context.user)
          throw new Error("Authorization header is missng");

        updateReplyValidator.validate(args.input);
        const { replyId, description } = args.input;

        const reply = await new ReplyService(Reply).findByPk(replyId);

        const updatedReply = await new ReplyService(Reply).update(
          { replyId: args.input.replyId },
          { description: args.input.description }
        );

        if (updatedReply) {
          return {
            status_code: status.success.okay,
            message: `Comment with id ${replyId} is updated successfully`,
          };
        } else {
          return {
            status_code: status.errors.badRequest,
            message: `Comment with id ${replyId} is updated successfully`,
          };
        }
      } catch (error) {
        throw new Error(`Error adding new comment: ${error}`);
      }
    },
    deleteReply: async (
      parent: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        if (!context.user) throw new Error("Authorization header is required");
        const { id } = args;
        const { error } = deleteReplyValidator.validate({ id });
        if (error) throw error;
        // const post = await new PostService(Post).findOne({id})
        // console.log(post)

        const deletedPost = await new ReplyService(Reply).delete({
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
