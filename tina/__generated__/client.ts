import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '7b0455f54324428c60e5e5acc0d5267703539248', queries,  });
export default client;
  