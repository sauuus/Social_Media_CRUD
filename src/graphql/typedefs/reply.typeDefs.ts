
export const replyTypeDefs = `#graphql

    type Reply {
        id: Int
        description: String
        userId: Int!
        # comments: [Comment]
        # user: User
        commentId: Int
        # reaction: ReactionEnum
    }

    type Comment {
        description: String
    }
    # enum ReactionEnum{
    #     LIKE
    #     LOVE
        
    # }
    type User {
        fullname: String,
    }

    type Response {
        status_code: Int!
        message: String!
    }

    input PostReplyInput {
        description: String!
        commentId: Int!
    }

    input UpdateReplyInput {
        description: String!
        replyId: Int!
    }

    type Query {
        getReplies:[Reply]
        getReplyById(id:Int!):Reply


    }

    type Mutation {
        createReply(input: PostReplyInput!) : Reply
        updateReply(input: UpdateReplyInput!) : Response
        deleteReply(id: Int!) : Response
    }



`;
