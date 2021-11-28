import {ApolloServer, gql} from "apollo-server-micro";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {GraphQLError} from "graphql";
import Cors from "micro-cors"
import {IncomingMessage, ServerResponse} from "http";
import * as mongoose from "mongoose";
import Context from "../../api/graphql/context";
import userTypeDefs from "../../api/graphql/schemas/user";
import userResolvers from "../../api/graphql/resolvers/user";
import roleTypeDefs from "../../api/graphql/schemas/role";
import roleResolvers from "../../api/graphql/resolvers/role";
import {getSession} from "@auth0/nextjs-auth0";
import jsonConfigTypeDefs from "../../api/graphql/schemas/jsonConfig";
import jsonConfigResolvers from "../../api/graphql/resolvers/jsonConfig";

export const config = {
    api: {
        bodyParser: false,
    },
};

const cors = Cors()

const rootTypeDefs = gql`
    type Query {
        getRole(id: String!): Role
        getRoles(offset: Int!, limit: Int!): [Role]

        getUser(id: String!): User
        getUsers(searchText: String, offset: Int!, limit: Int!): UserResponse

        getJsonConfig(id: String!): JsonConfig
        getJsonConfigs: [JsonConfig]
    }

    type Mutation {
        createRole(input: RoleInput!): Role
        updateRole(id: String!, input: RoleInput!): Role
        deleteRole(id: String!, input: RoleInput!): Role

        createUser(input: UserInput!): User
        updateUser(id: String!, input: UserInput!): User
        deleteUser(id: String!, input: UserInput!): User

        createJsonConfig(input: JsonConfigInput!): JsonConfig
        updateJsonConfig(id: String!, input: JsonConfigInput!): JsonConfig
        deleteJsonConfig(id: String!): Boolean
    }

    schema {
        query: Query,
        mutation: Mutation,
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs, roleTypeDefs, userTypeDefs, jsonConfigTypeDefs],
    resolvers: [roleResolvers, userResolvers, jsonConfigResolvers],
})

const server = new ApolloServer({
    schema,
    context: ({req, res}) => {
        const session = getSession(req, res)

        return <Context>{
            userId: session?.user.sub,
            roles: session?.user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        }
    },
    formatError(error: GraphQLError) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(error);
        }
        return error;
    }
})

const startServer = server.start()
const connectMongo = mongoose.connect(process.env.MONGO_DB_URI as string)

export default cors(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }

    await connectMongo
    await startServer
    await server.createHandler({
        path: '/api/graphql'
    })(req, res)
})
