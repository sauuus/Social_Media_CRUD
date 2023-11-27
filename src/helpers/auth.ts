import jwt from "jsonwebtoken";
import "dotenv/config";
import { GraphQLError } from "graphql";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

export async function authenticate(bearerToken: string) {
  try {
    const token = bearerToken.split("Bearer ")[1]; //This line splits the bearerToken string to extract the
    // actual JWT token. It assumes that the token is in the format
    // "Bearer [actual_token]", and it retrieves the [actual_token] part.
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET_KEY);
        if (user) {
          return {
            user,
            token,
          };
        }
        throw new GraphQLError("User not found!");
   
      } catch (error: any) {
        console.error("Token verification error:", error.message);
        throw new Error("Invalid Token");
      }
    }
    throw new Error("Authorization token must be 'Bearer [token]'");
  } catch (error) {
    throw new Error("Error: " + error);
  }
}

// this code is meant to be used in an authentication
// process for GraphQL requests. It verifies JWT tokens, handles various error cases, and returns user information along with the token if authentication is successful.
// If authentication fails, it throws specific errors with appropriate messages and extensions.
