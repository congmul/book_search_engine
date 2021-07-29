const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })
      },

      users: async () => {
        return await User.find({});
      }
    },

    Mutation: {
      addUser: async (parent, {username, email, password}) =>{
        const user = await User.create(
          {username: username, email: email, password: password}, 
           // Return the newly updated object instead of the original
          { new: true }
        );

        const token = signToken(user);

        return { token, user };
      },

      login: async (parent, { email, password }) =>{
        const user = await User.findOne({ email });

        if(!user) {
          throw new AuthenticationError('No profile with this email found!');
        }

        const correctPw = await user.isCorrectPassword(password);

        if(!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }

        const token = signToken(user);
        return { token, user };
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