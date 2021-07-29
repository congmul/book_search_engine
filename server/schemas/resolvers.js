const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');


const resolvers = {
    Query: {
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })
      }
    },

    Mutation: {
      addUser: async (parent, {username, email, password}) =>{
        const user = await User.create({username: username, email: email, password: password});
        return user;
      },

      saveBook: async (parent, { userId, bookData }) => {
        const updatedUser = User.findOneAndUpdate(
          { _id: userId }, 
          {$push: { savedBooks: bookData }}, 
          { new: true }
        );

          return updatedUser;
      },

      removeBook: async(parent, { userId, userBookId }) =>{
        const updatedUser = User.updateOne(
          {_id: userId}, 
          { $pull: { savedBooks : { _id : userBookId }}},
          { new: true }
        ); 

          return updatedUser;
      }
  }
}
module.exports = resolvers;