import { PostLikeInterface, LikeInterface } from "../../interface";
import { MyContext } from "../../helpers";
import { Like } from "../../models";
import { idValidator } from "../../validator";
import { status } from "../../helpers";
import { Post, userModel } from "../../models";
import { ReactionEnum } from "../../Enum";
export const likeResolver = {
  Query: {
    // getLikedPosts: async (
    //   parent: ParentNode,
    //   args: { input: LikeInterface },
    //   context: MyContext
    // ) => {
    //   try {
    //     if (!context.user) {
    //       throw new Error("Authorization Header Mising");
    //     }
    //     let allLikedPosts = await Like.findAll({
    //       where: { userId: context.user?.id },
    //     });
    //     if (!allLikedPosts || allLikedPosts.length === 0) {
    //       throw new Error("User has not liked any posts yet");
    //     }
    //     return allLikedPosts;
    //   } catch (error) {
    //     throw new Error(`Sorry, Couldnt like the post ${error}`);
    //   }
    // },
  },
  Like: {
    user: async (Like: LikeInterface) => await userModel.findByPk(Like.userId),
    post: async (Like: LikeInterface) => await Post.findByPk(Like.postId),
  },
  Mutation: {
    postToggleLike: async (
      parent: ParentNode,
      args: { input: PostLikeInterface },
      context: MyContext
    ) => {
      console.log(args.input);

      try {
        if (!context.token) {
          throw new Error("Authorization Header Missing");
        }
        const { postId, reaction } = args.input;
        console.log(postId, reaction);
        idValidator.validate(postId);
        const joinedPost = await Post.findByPk(postId);
        if (!joinedPost) {
          throw new Error(`No post available of ${postId} id`);
        }

        const likeExists = await Like.findOne({
          where: { postId: postId, userId: context.user?.id },
        });

        if (likeExists) {
          console.log(likeExists)
          if (likeExists.dataValues.reactionEnum === "LIKE") {
            await Like.destroy({ where: { id: likeExists.dataValues.id } });

            await joinedPost.decrement("like_count", { by: 1 });
            return {
              status_code: status.success.okay,
              reaction: ReactionEnum.LOVE,
              message: `Changed reaction to "love" for Post ${postId} `,
            };
          } else if (
            likeExists.dataValues.reactionEnum === "LOVE"
          ) {
            await Like.destroy({ where: { id: likeExists.dataValues.id } });
            // console.log("Deleted existing LIKE reaction record");
            await joinedPost.decrement("like_count", { by: 1 });
            return {
              status_code: status.success.okay,
              reaction: null, // Remove the reaction
              message: `Removed reaction for Post ${postId}`,
            };
          }
        } else {
          await Like.create({
            postId,
            userId: context.user?.id,
            reaction_enum: reaction,
          });
          await joinedPost?.increment("like_count", { by: 1 });
          return {
            status_code: status.success.okay,
            reaction,
            message: `Added reaction "${reaction}" for Post ${postId}`,
          };
        }
      } catch (error) {
        return {
          status_code: status.errors.internalServerError,
          raction: null,
          message: `An error occurred: ${error}`,
        };
      }
    },
  },
};
