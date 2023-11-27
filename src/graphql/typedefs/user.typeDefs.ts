import { Like } from "../../models/like";
import { ReactionEnum } from "../../Enum/index";

export const userTypedefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    id: Int
    fullname: String
    email: String
    password: String
    post: [Post]
  
  }

  type Post {
    # reaction: ReactionEnum
    description: String
    comments: [Comment]
  }


  # enum ReactionEnum{
  #   Like
  #   LOVE
  # }
  type Comment {
    # reaction: ReactionEnum
    description: String
    replies: [Reply]
  }

  type Reply  {
    description: String
    # reaction: ReactionEnum
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  input RegisterInput{
    fullname: String
    email: String
    password: String
  }
  input LoginInput{
    email:String
    password:String
  }
 
  type LoginResponse{
        email: String
        status_code: Int
        token: String
        message: String
        expiresIn:String
  }
  type registrationResponse{
    fullname: String
    email: String
  }
  type Query {
    user(id: Int!): User
    users: [User]
    # userPosts(id:Int!,userId:Int!): [Post] 
    

  }
  type Mutation{
    registerUser(registerInput:RegisterInput):registrationResponse
    loginUser(loginInput:LoginInput):LoginResponse
  }
`;
