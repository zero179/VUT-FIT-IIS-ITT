import {AuthenticationError} from "apollo-server-micro";
import Context from "../graphql/context";

export const requireAuthenticated = (ctx: Context) => {
    if (!ctx.userId || !ctx.roles) {
        throw new AuthenticationError("Unauthenticated")
    }
}