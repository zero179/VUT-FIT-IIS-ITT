import Context from "../context";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../../service/user";
import {requireRoles} from "../../security/requireRoles";
import {requireRolesOrIsOwner} from "../../security/requireRolesOrIsOwner";
import {IUserInput} from "../../../models/UserInput";

const userResolvers = {
    Query: {
        getUser: async (_: any, {id}: { id: string }, ctx: Context) => {
            requireRolesOrIsOwner(ctx, id, 'ADMIN')

            return await getUser(id)
        },
        getUsers: async (_: any, {
            searchString,
            offset,
            limit
        }: { searchString: string, offset: number, limit: number }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')

            return await getUsers(searchString, offset, limit)
        },
    },
    Mutation: {
        createUser: async (_: any, {input}: { input: IUserInput }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')

            return await createUser(input)
        },
        updateUser: async (_: any, {id, input}: { id: string, input: IUserInput }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')

            return await updateUser(id, input)
        },
        deleteUser: async (_: any, {id}: { id: string }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')

            return await deleteUser(id)
        },
    }
}


export default userResolvers