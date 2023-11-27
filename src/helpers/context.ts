import { UserInterface } from "../interface";
import { authenticate } from "./auth";

export interface MyContext {
  user?: UserInterface | null;
  token?: string | undefined;
}
export async function Context({ req }: { req: any }) {
  try {
    if (req.headers.authorization) {
      const { token, user } = await authenticate(req.headers.authorization);

      return { token, user };
    }
    return {};
  } catch (error) {
    throw error;
  }
}
