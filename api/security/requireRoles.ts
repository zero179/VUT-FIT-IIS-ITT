import {AuthenticationError} from "apollo-server-micro";
import Context from "../graphql/context";
import {requireAuthenticated} from "./requireAuthenticated";

export const requireRoles = (ctx: Context, ...roles: string[]) => {
    requireAuthenticated(ctx)

    roles.forEach(role => {
        if (!ctx.roles!.includes(role)) {
            throw new AuthenticationError("No permissions")
        }
    })
}