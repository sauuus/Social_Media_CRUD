import { CommentInterface,UpdateCommentInterface } from "@src/interface";
import { WhereOptions } from "sequelize";
export class CommentService {
  constructor(public readonly comment: any) {}

  async create(input: { description: string; userId: number; postId: number }) {
    return this.comment.create(input);
  }

  async findAll(where: WhereOptions<any>): Promise<CommentInterface[]> {
    return this.comment.findAll({ where });
  }
  async findByPk(commentId: number): Promise<UpdateCommentInterface | null> {
    const comment = await this.comment.findByPk(commentId);

    if (!comment) {
      throw new Error(`No comment exists with id: ${commentId}`);
    }

    return comment;
  }


  async update(
    where: { commentId: number },
    updatedValues: { description: string }
  ) {
    return this.comment.update(updatedValues, {
      where: { id: where.commentId },
    });
  }

  async delete(where: { id: number; userId: number}) {
    const deletedPost = await this.comment.findOne({where})
     this.comment.destroy({
      where: { id: where.id, userId: where.userId},
    });
    return deletedPost;
  }
}
