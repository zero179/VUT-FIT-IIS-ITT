import {CreateUserData, UpdateUserData, User, UserPage} from "auth0";
import {auth0Client} from "../auth0Client";
import {IUserInput} from "../../models/UserInput";
import {IUser} from "../../models/User";
import {IUserResponse} from "../../models/UserResponse";

const createUserData = (input: IUserInput): CreateUserData & UpdateUserData => {
    const data = {
        connection: 'Username-Password-Authentication',
        email: input.account?.email,
        given_name: input.person?.firstName,
        family_name: input.person?.lastName,
        name: input.person?.firstName + ' ' + input.person?.lastName,
        app_metadata: {
            phoneCountryPrefix: input.person?.phoneCountryPrefix,
            phoneNumber: input.person?.phoneNumber,
        }
    }

    if (input.account?.password) {
        Object.assign(data, {password: input.account.password})
    }

    return data;
};

const mapAuth0UserToGQLUser = (user: User): IUser => {
    return {
        id: user.user_id as string,
        account: {
            email: user.email as string
        },
        person: {
            firstName: user.given_name as string,
            lastName: user.family_name as string,
            phoneNumber: user.app_metadata?.phoneNumber,
            phoneCountryPrefix: user.app_metadata?.phoneCountryPrefix,
        },
    }
}

export const getUser = async (id: string) => {
    const user: User = await auth0Client.getUser({id})

    return mapAuth0UserToGQLUser(user)
}

export const getUsers = async (searchString: string, offset: number, limit: number) => {
    const userPage: UserPage = await auth0Client.getUsers({
        include_totals: true,
        page: offset / limit,
        per_page: limit,
        q: searchString
    })

    const users = userPage.users.map(u => mapAuth0UserToGQLUser(u))

    return <IUserResponse>{
        results: users,
        paging: {
            totalElements: userPage.total,
            pageNumber: offset / limit,
            pageSize: limit,
        }
    }
}

export const createUser = async (input: IUserInput) => {
    const user: User = await auth0Client.createUser(createUserData(input))

    return mapAuth0UserToGQLUser(user)
}

export const updateUser = async (id: string, input: IUserInput) => {
    const user: User = await auth0Client.updateUser({id}, createUserData(input))

    return mapAuth0UserToGQLUser(user)
}

export const deleteUser = async (id: string) => {
    try {
        await auth0Client.deleteUser({id})
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
