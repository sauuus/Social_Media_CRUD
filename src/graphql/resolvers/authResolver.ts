import { LoginSchema, registerValidate } from "../../validator/validatorInput";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import { UserInterface } from "../../interface/userInterface.js";
import {
  UserLoginInterface,
  InputUserInterface,
  PostInterface,
} from "../../interface";
import { MyContext, status } from "../../helpers";
import { getJwtToken } from "../../helpers";
import { Like, Post, userModel, Reply } from "../../models";

export const authResolver = {
  Query: {
    users: async (
      parent: ParentNode,
      args: { input: InputUserInterface },
      context: MyContext
    ) => {
      try {
        const allUsers = await userModel.findAll();
        return allUsers;
      } catch (error) {
        console.log(`Error while retrieving all users: ${error}`);
      }
    },
    user: async (
      parent: ParentNode,
      args: { id: number },
      context: MyContext
    ) => {
      try {
        const { id } = args;
        const user = await userModel.findOne({ where: { id } });
        return user;
      } catch (error) {
        console.log(`User not found ${error}`);
      }
    },

    // userPosts: async (
    //   parent: ParentNode,
    //   args: { id:number, userId: number },
    //   context: MyContext
    // ) => {
    //   try {

    //     if (!context.user) {
    //       throw new Error("Authorization header Missing");
    //     }
    //     const { id, userId } = args;

    //     // Assuming you have a way to retrieve posts from your database or data source
    //     // You should replace this with your actual database query
    //     const userPosts = await Post.findAll({
    //       where: {
    //         id,       // Filter by post ID
    //         userId,   // Filter by user ID
    //       },
    //     });

    //     return userPosts;
    //   } catch (error) {
    //     throw new Error("error");
    //   }
    // },
  },
  User: {
    post: async (user: UserInterface) =>
      await Post.findAll({ where: { userId: user.id } }),
    // reply: async (user: UserInterface) =>
    //   await Reply.findAll({ where: { userId: user.id } }),
  },
  Mutation: {
    registerUser: async (_: any, args: { registerInput: UserInterface }) => {
      const {
        registerInput: { fullname, email, password },
      } = args;
      const { error } = registerValidate.validate(args.registerInput);
      if (error) throw error;
      const user = await userModel.findOne({ where: { email } });
      if (user) {
        throw new GraphQLError("the user already exist");
      } else {
        try {
          const otp = Math.floor(100000 + Math.random() * 900000); //generating random otp of 6 digits
          const encryptedPassword = await bcrypt.hash(password, 10); //hash the users password with salt factor 10

          const newUser = await userModel.create({
            fullname,
            email,
            password: encryptedPassword,
          });

          return newUser;
        } catch (error) {
          throw new GraphQLError("no new user");
        }
      }
    },
    loginUser: async (
      parent: any,
      args: { loginInput: UserLoginInterface }
    ) => {
      try {
        const { error } = LoginSchema.validate(args.loginInput);
        if (error) throw error;

        const { email, password } = args.loginInput;
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
          throw new GraphQLError("no user found with provided email");
        }
        const isAuthorized = await bcrypt.compare(
          password,
          user?.dataValues.password
        );

        if (!isAuthorized) {
          return {
            status_code: status.errors.badRequest,
            message: `Incorrect password`,
          };
        }

        const { token, expiresIn } = getJwtToken(
          user?.dataValues.id,
          user?.dataValues.email
        );
        const status_code = 200;
        const message = "Login Successful";
        // const email = user.dataValues.email;

        return { token, status_code, message, expiresIn, email };
      } catch (error) {
        return {
          status_code: status.errors.internalServerError,
          message: `error ${error}`,
        };
      }
    },
  },
};
