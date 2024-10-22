import { initServer } from "./app";

async function init () {
    const app = await initServer()
    await new Promise<void>((resolve) =>
        app.listen({ port: 4000 }, resolve),
      );
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

init()