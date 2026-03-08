import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '94ac25cf53c29f5dfe3d74b03e6a43a5e32f9c28', queries,  });
export default client;
  