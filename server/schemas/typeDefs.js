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
        users: [User]
        user(userId: ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        saveBook(bookData: BookInput!): User
        removeBook(userId: ID! userBookId: ID!): User
    }
`


module.exports = typeDefs;