import {gql} from "apollo-server-micro";

const jsonConfigTypeDefs = gql`

    ################### INPUTS ####################

    input JsonConfigInput {
        userId: String,
        json: String
    }

    ################### TYPES ####################

    type JsonConfig {
        userId: String,
        json: String
    }
`;

export default jsonConfigTypeDefs;