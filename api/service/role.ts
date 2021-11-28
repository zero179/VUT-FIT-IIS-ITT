import {auth0Client} from "../auth0Client";
import {IRole} from "../../models/Role";

export const getRoles = async (offset: number, limit: number) => {
    return await auth0Client.getRoles({
        page: offset / limit,
        per_page: limit
    })
}

export const getRole = async (id: string) => {
    return await auth0Client.getRole({id})
}

export const createRole = async (input: IRole) => {
    return await auth0Client.createRole(input)
}

export const updateRole = async (id: string, input: IRole) => {
    return await auth0Client.updateRole({id}, input)
}

export const deleteRole = async (id: string) => {
    return await auth0Client.deleteRole({id})
}
