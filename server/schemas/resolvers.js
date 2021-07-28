const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');


const resolvers = {
    Query: {
      users: async () => {
        return User.find({});
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })
      }
    },

    Mutation: {
      addUser: async (parent, {username, email, password}) =>{
        return User.create({username: username, email: email, password: password});
      },

      addBook: async (parent, { userId, authors, description, bookId, image, link, title }) => {
        // console.log(userId);
        return User.findOneAndUpdate({ _id: userId }, {$push: { savedBooks: {authors: authors, description: description, bookId:bookId, image:image, link:link, title:title}}});
      },

      removeBook: async(parent, { userId, userBookId }) =>{
        console.log(userId)
        console.log(userBookId)
        return User.updateOne(
          {_id: userId}, 
          { $pull: { savedBooks : { _id : userBookId }}},
          { new: true }
          ) 
      }
  }
}
module.exports = resolvers;