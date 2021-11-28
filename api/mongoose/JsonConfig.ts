import {model, models, Schema} from "mongoose";
import {IJsonConfig} from "../../models/JsonConfig";

const jsonConfig = new Schema<IJsonConfig>({
    id: String,
    userId: String,
    json: Buffer
})

export default models.JsonConfig || model('JsonConfig', jsonConfig)