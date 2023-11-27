import { Model } from "sequelize";

export interface CommentInterface extends Model{
    id: number,
    postId:number,
    description:string,
    userId:number,
}

export interface UpdateCommentInterface {
    description: string,
    commentId: number
}