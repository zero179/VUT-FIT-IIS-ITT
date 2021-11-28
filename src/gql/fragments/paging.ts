import {gql} from "@apollo/client";

export const pagingFragment = gql`
    fragment PagingData on Paging {
        pageSize
        pageNumber
        totalElements
    }
`