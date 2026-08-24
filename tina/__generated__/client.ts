import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b7b71b150aa8a2bf7d72155fef67918b9c918ebe', queries,  });
export default client;
  