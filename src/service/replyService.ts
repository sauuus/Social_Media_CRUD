import { ReplyInterface,UpdateReplyInterface } from "@src/interface";
import { WhereOptions } from "sequelize";

export class ReplyService {
  constructor(public readonly reply: any) {}
  async create(input: { description: string; userId: number; commentId: number }) {
    return this.reply.create(input);
  }

  async findAll(where: WhereOptions<any>): Promise<ReplyInterface[]> {
    return this.reply.findAll({ where });
  }
  async findByPk(replyId: number): Promise<UpdateReplyInterface | null> {
    const reply = await this.reply.findByPk(replyId);

    if (!reply) {
      throw new Error(`No comment exists with id: ${replyId}`);
    }

    return reply;
  }


  async update(
    where: { replyId: number },
    updatedValues: { description: string }
  ) {
    return this.reply.update(updatedValues, {
      where: { id: where.replyId },
    });
  }

  async delete(where: { id: number; userId: number}) {
    const deletedPost = await this.reply.findOne({where})
     this.reply.destroy({
      where: { id: where.id, userId: where.userId},
    });
    return deletedPost;
  }
}
