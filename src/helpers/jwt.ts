import "dotenv/config";
import jwt from "jsonwebtoken";

export const getJwtToken = (id: number, email: string) => {
  const jwtSecret = process.env.JWT_SECRET_KEY!;
  const expiresIn = "3d";

  const payload = {
    id,
    email,
  };

  const signedToken = jwt.sign(payload, jwtSecret, { expiresIn });

  return {
    token: signedToken,
    expiresIn,
  };
};
