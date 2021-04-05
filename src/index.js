const { ApolloServer, gql } = require("apollo-server");

//Toda request é POST;
//Toda request bate no MESMO endpoint(/graphql);
//Isso é feito através de query ou mutation. QUERY = GET  / Mutation = (POST/PUT/DELETE);
//Scalar TYpes -> String, Int, Boolean, Float and ID;

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  {
    _id: String(Math.random),
    name: "Filipe",
    email: "filipe@teste.com",
    active: true,
  },
  {
    _id: String(Math.random),
    name: "Filipe2",
    email: "filipe2@teste.com",
    active: true,
  },
  {
    _id: String(Math.random),
    name: "Filipe3",
    email: "filipe3@teste.com",
    active: false,
  },
];

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    },
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at ${url}`));
