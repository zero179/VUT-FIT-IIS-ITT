import {ManagementClient} from "auth0";

export const auth0Client = new ManagementClient({
    clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: process.env.AUTH0_MANAGEMENT_AUDIENCE,
    domain: process.env.AUTH0_MANAGEMENT_DOMAIN as string
})