import { Model } from "sequelize";

export interface ReplyInterface extends Model{
    id: number,
    userId:number,
    commentId:number,
    description:string,
}
export interface UpdateReplyInterface {
    description: string,
    replyId: number
}