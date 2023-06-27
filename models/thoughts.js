
const { Schema, model } = require('mongoose')

const ReactionSchema = require('./reaction')
const moment = require('moment')

const ThoughtSchema = new Schema(
	{
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
)

// Virtual for thought's URL
ThoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length
})
// this can not be an arrow function because arrow functions do not bind their 
// own this context, which we need to refer to the document instance.


const Thought = model('Though', ThoughtSchema)

module.exports = Thought