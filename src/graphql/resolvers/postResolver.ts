import { MyContext } from "../../helpers";
import { GraphQLResolveInfo } from "graphql";
import { Post, userModel, Comment } from "../../models";
import { createPostValidator, UpdatePostValidator } from "../../validator";
import {
  GetAllPostInterface,
  PostLikeInterface,
  PostInterface,
} from "../../interface";
import { status } from "../../helpers/status_code";
import { PostService } from "../../service";
import { idValidator } from "../../validator/validatorInput";

export const postResolver = {
  Query: {
    getAllPosts: async (
      parent: ParentNode,
      args: undefined,
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header Missing");
        }
        

        const allPost = await new PostService(Post).findAll({user_id: context.user.id});
        return allPost;
      } catch (error) {
        throw new Error(`Error while retrieving all posts: ${error}`);
      }
    },
    getPostById: async (
      parent: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        const { id } = args;
        const post = await Post.findOne({ where: { id } });
        return post;
      } catch (error) {
        console.log(`User not found ${error}`);
      }
    },
  },
  Post: {
    // user: async (Post: PostInterface) => await userModel.findByPk(Post.userId),
    comments: async (post: PostInterface) =>
      await Comment.findAll({ where: { postId: post.id } }),
  },
  Mutation: {
    createPost: async (
      parent: ParentNode,
      args: { input: { description: string } },
      context: MyContext
    ) => {
      try {
        if (!context.user) {
          throw new Error("Authorization header Misiing");
        }
        const { error } = createPostValidator.validate(args.input);
        if (error) throw error;

        const { description } = args.input;

        const newPost = await new PostService(Post).create({
          description,
          userId: context.user.id,
          isLiked: true,
        });
        // if (newPost) {
        //   newPost.dataValues.isLiked = true;
        //   dataValue.push(newPost.dataValues);
        // } else {
        //   id[i].dataValues.is_liked = false;
        //   dataValue.push(id[i].dataValues);
        // }

        // return dataValue;

        return newPost;
      } catch (error) {
        console.error("Error adding new post: ", error);
        return error;
      }
    },
    updatePost: async (
      parent: ParentNode,
      args: { input: { description: string; postId: number } },
      context: MyContext
    ) => {
      try {
        if (!context.user) throw new Error("Authorization header is required");

        const { error } = UpdatePostValidator.validate(args.input);
        if (error) throw error;

        const { description, postId } = args.input;
        // await Post.update(
        //   { description },
        //   {
        //     where: {
        //       id: postId,
        //     },
        //   }
        // );
        let updatePost = await new PostService(Post).update(
          { id: postId }, // Condition for which post to update
          { description } // Updated values
        );
        return {
          status_code: status.success.okay,
          message: `Post with id ${postId} is updated successfully`,
        };
      } catch (error) {
        console.log(`Error while updating post: ${error}`);
        throw new Error(`Error while updating the post: ${error}`);
      }
    },
    deletePost: async (
      parent: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        if (!context.user) throw new Error("Authorization header is required");
        const { id } = args;
        const { error } = idValidator.validate({ id });
        if (error) throw error;
        // const post = await new PostService(Post).findOne({id})
        // console.log(post)

        const deletedPost = await new PostService(Post).delete({
          id,
          userId: context.user.id,
        });
        console.log(deletedPost);

        if (!deletedPost)
          throw new Error(` you cannot delete this post
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
