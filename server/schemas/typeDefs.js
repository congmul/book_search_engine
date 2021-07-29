const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]!
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!        
    }

    # Query : Entry Point to access GraphQL
    type Query {
        me: User
    }

    type Mutation {
        # Set up mutations to handle creating a user or logging into a profile and return Auth type
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(userId: String!, bookData: BookInput!): User
        removeBook(userId: ID! userBookId: ID!): User
    }
`


module.exports = typeDefs;