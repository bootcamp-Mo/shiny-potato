
const { Schema, Types } = require('mongoose');
const moment = require('moment')

const ReactionSchema = new Schema({
	reactionId: {
		type: Types.ObjectId,
		default: () => new Types.ObjectId()
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280
	},
	username: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
	}
},
	{
		toJSON: {
			getters: true
		},
		id: false,
		_id: false
	}
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;

/*------------------------------------------------------------------------------------------------*/

// the use of _id: false in the ReactionSchema, is to prevents MongoDB from
//creating an automatic _id for each subdocument in reactions.
