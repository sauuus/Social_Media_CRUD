export const likeTypeDefs = `#graphql

    type Like {
        id: Int
        userId: Int
        postId: Int
        isLiked: Boolean
        post: Post
        user: User
    }

    type Post {
        description: String
        likeCount: Int
    }
    type User {
        fullname: String
        email:String
    }
    input postLikedInput{
        postId: Int!
        reaction: ReactionEnum!
    }
    enum ReactionEnum{
        LIKE
        LOVE

    }

    type LikeResponse {
        status_code: Int
        reaction: ReactionEnum
        message: String
    }

    # type Query {
    #     # getLikedPosts: [Like]
    # }

    type Mutation {
        postToggleLike(input: postLikedInput!) : LikeResponse
    }

`;
