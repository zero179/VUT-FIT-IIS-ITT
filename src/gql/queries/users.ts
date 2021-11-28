import {gql} from "@apollo/client";
import {fullPersonFragment} from "../fragments/fullPersonData";
import {pagingFragment} from "../fragments/paging";

export const usersGqlQuery = gql`

    ${fullPersonFragment}
    ${pagingFragment}

    query GetUsers($searchText: String, $offset: Int!, $limit: Int!) {
        getUsers(searchText: $searchText, offset: $offset, limit: $limit) {
            results {
                id
                account {
                    email
                }
                person {
                    ...FullPersonData
                }
            }
            paging {
                ...PagingData
            }
        }
    }
`