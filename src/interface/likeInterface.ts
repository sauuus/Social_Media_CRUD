import { ReactionEnum } from "../Enum";
import { Model } from "sequelize";

export interface LikeInterface extends Model {
  id: number;
  userId: number;
  postId: number;
  reaction: ReactionEnum;
}
export interface PostLikeInterface {
  postId: number;
  reaction: ReactionEnum;
}
