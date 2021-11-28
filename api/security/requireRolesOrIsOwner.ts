import {AuthenticationError} from "apollo-server-micro";
import Context from "../graphql/context";
import {requireAuthenticated} from "./requireAuthenticated";

export const requireRolesOrIsOwner = (ctx: Context, resourceOwnerId: string, ...roles: string[]) => {
    requireAuthenticated(ctx)

    if (resourceOwnerId === ctx.userId) {
        return;
    }

    roles.forEach(role => {
        if (!ctx.roles!.includes(role)) {
            throw new AuthenticationError("No permissions")
        }
    })
}