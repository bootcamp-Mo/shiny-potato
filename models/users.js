const { Schema, Types, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtual: true,
      getters: true
    },
    id: false
  }
)
UserSchema.virtual('friendsCount').get(function () {
  return this.friends.length
})
const User = model('User', UserSchema)

module.exports = User
