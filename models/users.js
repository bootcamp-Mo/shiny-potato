const mongoose = require('mongoose');

const UserSchema = new Schema({
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
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Thought'
		}
	],
	friend: [
		{
			type: mongoose.Schema.Types.ObjectId,
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
	});

const User = model('User', UserSchema);

module.exports = User;