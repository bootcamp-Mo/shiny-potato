const { Schema, model, get } = require('mongoose');

const ReactionSchema = require('./Reaction');
const moment = require('moment')

const ThoughtSchema = new Schema({
	thoughtText: {
		type: String,
		require: true,
		minlength: 1,
		maxlength: 280
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
	},
	username: {
		type: String,
		require: true
	},
	reactions: [ReactionSchema],
},
	{
		toJSON: {
			virtual: true,
			getters: true
		},
		id: false
	}
);

const Thought = model('Though', ThoughtSchema);

module.exports = Thought;