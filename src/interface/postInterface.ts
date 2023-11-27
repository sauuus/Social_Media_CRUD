import { Model } from "sequelize";
export interface PostInterface extends Model {
  id: number;
  description: string;
  userId: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface GetAllPostInterface {
  user: number;
  // token: String;
}

export interface UpdatePostInterface {
  postId: number;
  description: string;
}
