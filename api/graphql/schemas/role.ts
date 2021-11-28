import {gql} from "apollo-server-micro";

const roleTypeDefs = gql`

    ################### INPUTS ####################

    input RoleInput {
        name: String!
        description: String
    }

    ################### TYPES ####################

    type Role {
        id: String!
        name: String!
        description: String
    }
`;

export default roleTypeDefs;