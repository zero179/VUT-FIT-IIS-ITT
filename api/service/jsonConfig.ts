import JsonConfig from "../mongoose/JsonConfig";
import {mapToModel} from "../graphql/utils";
import {IJsonConfigInput} from "../../models/JsonConfigInput";

export const getJsonConfigs = async (userId: string) => {
    const query = {};

    if (userId) {
        Object.assign(query, {userId})
    }

    return (await JsonConfig.find(query).exec()).map(r => mapToModel(r))
}

export const getJsonConfig = async (id: string) => {
    const jsonConfig = await JsonConfig.findById(id).exec()
    return mapToModel(jsonConfig);
}

export const createJsonConfig = async (input: IJsonConfigInput) => {
    const jsonConfig = new JsonConfig({...input})
    await jsonConfig.save()

    return mapToModel(jsonConfig);
}

export const updateJsonConfig = async (id: string, input: IJsonConfigInput) => {
    const jsonConfig = await JsonConfig.findByIdAndUpdate(id, {
        ...input
    }).exec()

    return mapToModel(jsonConfig);
}

export const deleteJsonConfig = async (id: string) => {
    try {
        await JsonConfig.findByIdAndDelete(id)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
