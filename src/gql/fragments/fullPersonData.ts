import {gql} from "@apollo/client";

export const fullPersonFragment = gql`

    fragment FullPersonData on Person {
        firstName
        lastName
        phoneCountryPrefix
        phoneNumber
    }
`