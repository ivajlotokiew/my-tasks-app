import { Response } from "miragejs";
import jwt_decode from "jwt-decode";

interface MyToken {
  iat: number;
  username: string;
}

export const requiresAuth = function (this: any, request: any) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode<MyToken>(encodedToken);
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ["The token is invalid. Unauthorized access error."] }
  );
};
