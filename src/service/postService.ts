import { PostInterface } from "../interface";
import { WhereOptions } from "sequelize";
export class PostService {
  constructor(public readonly post: any) {}

  async create(input: {
    description: string;
    userId: number;
    isLiked: boolean;
  }) {
    return this.post.create(input);
  }

  async findAll(where: WhereOptions<any>): Promise<PostInterface[]> {
    return this.post.findAll({ where });
  }

  async update(where: { id: number }, updatedValues: { description: string }) {
    return this.post.update(updatedValues, {
      where: { id: where.id },
    });
  }
  async findOne(where: { id: number }): Promise<PostInterface> {
    return this.post.findOne({ where });
  }
  async delete(where: { id: number; userId: number }) {
    const deletedPost = await this.post.findOne({ where });
    this.post.destroy({
      where: { id: where.id, userId: where.userId },
    });
    return deletedPost;
  }
}
