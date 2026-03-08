import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'c2ccfbfd51bf7cfd296dea63078179324819e35b', queries,  });
export default client;
  