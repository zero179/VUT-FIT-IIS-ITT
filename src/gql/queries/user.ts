import {gql} from "@apollo/client";
import {fullPersonFragment} from "../fragments/fullPersonData";

export const userGqlQuery = gql`

    ${fullPersonFragment}

    query GetUser($id: String!) {
        getUser(id: $id) {
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