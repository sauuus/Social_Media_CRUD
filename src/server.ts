import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  commentTypeDefs,
  likeTypeDefs,
  postTypeDefs,
  replyTypeDefs,
  userTypedefs,
} from "./graphql/typedefs";
import sequelize from "./config/database.js";
import {
  authResolver,
  commentResolver,
  postResolver,
  replyResolver,
  likeResolver,
} from "./graphql/resolvers";
import { UserInterface } from "./interface";
import { Context } from "./helpers";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

async function connectToPostgres() {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
  } catch (err) {
    console.log(err);
    console.log("there is an erorr");
  }
}
const init = async () => {
  interface MyContext {
    user?: UserInterface | null;
    token?: string | undefined;
  }
  connectToPostgres();
  console.log("Connected to postgres database");
  const server = new ApolloServer({
    typeDefs: [
      postTypeDefs,
      userTypedefs,
      commentTypeDefs,
      replyTypeDefs,
      likeTypeDefs,
    ],
    resolvers: [
      postResolver,
      authResolver,
      commentResolver,
      replyResolver,
      likeResolver,
    ],
    introspection: true,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: Context,
  });
  console.log(`🚀  Server ready at: ${url}`);
};

init();
