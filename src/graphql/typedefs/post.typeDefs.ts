export const postTypeDefs = `#graphql

type Post{
    id:Int
    userId: Int
    description: String
    likeCount: Int
    isLiked: Boolean
    reaction: ReactionEnum
    comments: [Comment]
   
}
type User{
    fullname: String!
    email: String!

}
type Comment{
    description: String
    reaction: ReactionEnum
    replies: [Reply]

}
type Reply{
    description: String
    reaction: ReactionEnum

}
enum ReactionEnum{
    LOVE
    LIKE
}

input GetAllPostInput{
    user: Int!
    token: String!
}
input UpdatePostInput{
    description: String!,
    postId: Int!,
}
input UploadPostInput{
    description: String!,
}

type Response{
    status_code:Int
    message: String
}

type Query{
    
    getAllPosts:[Post]
    getPostById(id:Int!):Post
#     getMyPosts: [Post]
}

type Mutation{
    createPost(input: UploadPostInput): Post
    updatePost(input: UpdatePostInput): Response
    deletePost(id:Int!):Response
}
 `;
