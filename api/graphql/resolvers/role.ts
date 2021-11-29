import Context from "../context";
import {IRole as Role} from "../../../models/Role";
import {createRole, deleteRole, getRole, getRoles, updateRole} from "../../service/role";
import {requireRoles} from "../../security/requireRoles";

const roleResolvers = {
    Query: {
        getRoles: async (_: any, {offset, limit}: { offset: number, limit: number }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await getRoles(offset, limit)
        },
        getRole: async (_: any, {id}: { id: string }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await getRole(id)
        },
    },
    Mutation: {
        createRole: async (_: any, {input}: { input: Role }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await createRole(input)
        },
        updateRole: async (_: any, {id, input}: { id: string, input: Role }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await updateRole(id, input)
        },
        deleteRole: async (_: any, {id}: { id: string }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await deleteRole(id)
        },
    }
}


export default roleResolvers