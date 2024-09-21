import { IncomingMessage, ServerResponse } from "node:http";

export const middleware = [
  (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url === "/") {
      res.end(
        `<!DOCTYPE html>
          <html>
          <head>
              <title>GraphQL API</title>
          </head>
          <body style="text-align: center; margin-top: 20px;">
          <a href="/graphql" style="display: block; background-color: black; color: white; border-radius: 23px; text-decoration:none;border:2px solid black; padding: 20px; width:500px; margin-left:auto;margin-right:auto;">
              <h1>Welcome to my GraphQL Server</h1>
              <p>This server is designed for Home Decor App's Backend API by </p>
              <h1>Subhan Shoukat</h1>
              <h2>Click here to view the API</h2>
              </a>
          </body>
          </html>`
      );
    } else {
      next();
    }
  },
];
