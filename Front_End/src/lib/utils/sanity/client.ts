import { createClient } from "@sanity/client"

export const client = createClient({
    projectId: "tg3ixu9i",
    dataset: "production",
    apiVersion: "2024-09-01",
   // Set to `true` for production environments
    useCdn: false,
})