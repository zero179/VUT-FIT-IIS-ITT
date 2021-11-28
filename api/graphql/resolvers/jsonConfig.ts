import Context from "../context";
import {
    createJsonConfig,
    deleteJsonConfig,
    getJsonConfig,
    getJsonConfigs,
    updateJsonConfig
} from "../../service/jsonConfig";
import {requireRoles} from "../../security/requireRoles";
import {requireRolesOrIsOwner} from "../../security/requireRolesOrIsOwner";
import {IJsonConfig} from "../../../models/JsonConfig";
import {IJsonConfigInput} from "../../../models/JsonConfigInput";

const jsonConfigResolvers = {
    Query: {
        getJsonConfigs: async (_: any, {userId}: { userId: string }, ctx: Context) => {
            requireRolesOrIsOwner(ctx, userId, 'ADMIN')
            return await getJsonConfigs(userId)
        },
        getJsonConfig: async (_: any, {id}: { id: string }, ctx: Context) => {
            const jsonConfig: IJsonConfig = await getJsonConfig(id)
            requireRolesOrIsOwner(ctx, jsonConfig.userId, 'ADMIN')
        },
    },
    Mutation: {
        createJsonConfig: async (_: any, {input}: { input: IJsonConfigInput }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await createJsonConfig(input)
        },
        updateJsonConfig: async (_: any, {id, input}: { id: string, input: IJsonConfigInput }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await updateJsonConfig(id, input)
        },
        deleteJsonConfig: async (_: any, {id}: { id: string }, ctx: Context) => {
            requireRoles(ctx, 'ADMIN')
            return await deleteJsonConfig(id)
        },
    }
}


export default jsonConfigResolvers