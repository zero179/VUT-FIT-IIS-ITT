import {gql} from "apollo-server-micro";

const userTypeDefs = gql`

    ################### INPUTS ####################

    input AccountInput {
        email: String
        password: String
    }

    input PersonInput {
        firstName: String!
        lastName: String!
        phoneCountryPrefix: String!
        phoneNumber: String!
    }

    input UserInput {
        account: AccountInput
        person: PersonInput
    }

    ################### TYPES ####################

    type Account {
        email: String
    }

    type Person {
        firstName: String
        lastName: String
        phoneCountryPrefix: String
        phoneNumber: String
    }

    type User {
        id: String
        account: Account
        person: Person
    }

    type Paging {
        pageSize: Int
        pageNumber: Int
        totalElements: Int
    }

    type UserResponse {
        results: [User]
        paging: Paging
    }
`;

export default userTypeDefs;