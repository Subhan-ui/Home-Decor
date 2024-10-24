import "reflect-metadata";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { createSchema } from "./schema";
import jwt from "jsonwebtoken";
import { middleware } from "./lib/middleware";
import { costLimitPlugin } from '@escape.tech/graphql-armor-cost-limit'
import { maxAliasesPlugin } from '@escape.tech/graphql-armor-max-aliases'
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth'
import { maxDirectivesPlugin } from '@escape.tech/graphql-armor-max-directives'
import { maxTokensPlugin } from '@escape.tech/graphql-armor-max-tokens'

const prisma = new PrismaClient();
const loggedUser = (req: YogaInitialContext) => {
  const token = req.request.headers.get("authorization");

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.APP_SECRET as string);
  } catch (error) {
    return error;
  }
}

async function startServer() {
  const schema = await createSchema();

  const yoga = createYoga({
    maskedErrors:false,
    plugins: [
      costLimitPlugin(),
      maxTokensPlugin(),
      maxDepthPlugin(),
      maxDirectivesPlugin(),
      maxAliasesPlugin()
    ],
    schema,
    context: (req: YogaInitialContext) => {
      return {
        prisma,
        me: loggedUser(req),
      };
    },
  });

  const server = createServer(yoga);
  server.on("request", (req: IncomingMessage, res: ServerResponse) => {
    middleware.forEach((fn) => fn(req, res, () => {}));
  });
  const PORT = process.env.PORT || 4000;

  server.listen(PORT, ()=>{
    return 'server started'
  });
}

startServer().catch((error) => {
  return error;
});


