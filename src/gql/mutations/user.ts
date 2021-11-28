import {gql} from "@apollo/client";
import {fullPersonFragment} from "../fragments/fullPersonData";

export const userGqlMutation = gql`

    ${fullPersonFragment}

    mutation UpdateUser($id: String!, $input: UserInput!) {
        updateUser(id: $id, input: $input) {
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