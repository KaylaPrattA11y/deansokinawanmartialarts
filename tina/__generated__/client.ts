import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'ff378dc0a37d9219a880d33205a3e8fb1b6dc7ba', queries,  });
export default client;
  