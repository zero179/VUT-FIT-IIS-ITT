import {gql} from "@apollo/client";
import {fullPersonFragment} from "../fragments/fullPersonData";

export const createUserGqlMutation = gql`

    ${fullPersonFragment}

    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            account {
                email
            }
            person {
                ...FullPersonData
            }
        }
    }
`