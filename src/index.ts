import "reflect-metadata";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { createSchema } from "./schema";
import jwt from "jsonwebtoken";
import {IncomingMessage} from 'http';

const prisma = new PrismaClient();
// const loggedUser = (req: IncomingMessage) => {
//   const authHeader = req.headers['authorization'];
//   const xAuthTokenHeader = req.headers['x-auth-token'];

//   let token;

//   // Check for Bearer token in the 'authorization' header
//   if (authHeader) {
//     token = authHeader; // Get the token after 'Bearer '
//   } 

//   console.log("Token:", token);
//   if (token) {
//     try {
//       return jwt.verify(token, process.env.APP_SECRET as string);
//     } catch (error) {
//       return ("Session Expired");
//     }
//   }
// };

async function startServer() {
  const schema = await createSchema();

  const yoga = createYoga({
    schema,
    context: (req: IncomingMessage) => ({
      prisma,
      // me: loggedUser(req),
    }),
  });

  const server = createServer(yoga);
  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
