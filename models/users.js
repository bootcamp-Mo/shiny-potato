const { Schema, Types, model } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
			name: String,
			unique: true,
			required: true,
			trim: true,
		},
		email: {
			name: String,
			unique: true,
			required: true,
			match: [/.+\@.+\..+/, 'Please enter a valid e-mail address']
		},
		thought: [
			{
				type: Types.ObjectId,
				ref: 'Thought'
			}
		],
		friend: [
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
);
UserSchema.virtual('FriendCount').get(function () {
	return this.friend.length;
})
const User = model('User', UserSchema);

module.exports = User;