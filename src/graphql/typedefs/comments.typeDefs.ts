export const commentTypeDefs = `#graphql

    type Comment {
        id: Int
        description: String
        userId: Int
        # post: [Post]
        # user: User
        replies: [Reply]
        postId: Int
        # reactionEnum: ReactionEnum
    }

    type Reply{
        description: String
    }
    type Post {
        description: String
    }
    type User {
        fullname: String
    }
    # enum ReactionEnum{
    #     LIKE
    #     LOVE
    # }
    type Response {
        status_code: Int
        message: String
    }

    input PostCommentInput {
        description: String!
        postId: Int!
    }

    input UpdateCommentInput {
        description: String!
        commentId: Int!
    }

    type Query {
        getComments:[Comment]
        getCommentById(id:Int!):Comment

    }

    type Mutation {
        createComment(input: PostCommentInput!) : Comment
        updateComment(input: UpdateCommentInput!) : Response
        deleteComment(id: Int!) : Response
    }
`;
