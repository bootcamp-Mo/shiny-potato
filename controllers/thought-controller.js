const { Thought, Reaction } = require('../models/')

module.exports = {
	// get all thoughts
	async getAllThoughts(req, res) {
		try {
			const thoughts = await Thought.find()
			res.status(200).json(thoughts, { message: 'Found all thoughts' })
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Unable to find all thoughts' })
		}
	},

	//get thought by id
	async getThoughtById(req, res) {
		try {
			const thought = await Thought.findOne({ _id: req.params.thoughtId })
			if (!thought) {
				return res.status(404).send('That thought was not found')
			}
			else {
				console.log("found")
				res.status(200).json(thought);
			}
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'No thoughts were found with that id' })
		}
	},

	//create a new thought
	async createThought(req, res) {
		try {
			const newThought = await Thought.create(req.body)
			res.status(200).json(newThought)
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not create a new thought' })
		}
	},

	//update thought by id
	async updateThought(req, res) {
		try {
			const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { runValidators: true })
			if (!updatedThought) {
				throw Error;
			} else {
				res.status(201).json(updatedThought)
			}
		} catch (error) {
			res.status(403).json(
				error,
				{ message: 'You are trying to edit someone elses post' })
		}
	},

	//delete thought by id
	async deleteThought(req, res) {
		try {
			await Thought.findOneAndDelete({ _id: req.params.thoughtId })
			res.status(200).json('The thought has been deleted')
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not find a thought to delete' })
		}
	},

	//add reaction to thought by id
	async addReaction(req, res) {
		console.log('Reacting to a thought')
		try {
			const thought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $push: { reactions: [req.body] } },
				{ runValidators: true, new: true }
			)
			if (!thought) {
				return res.status(404).json({ message: 'No thought was found' })
			}
			res.status(200).json(thought)
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not react to that thought' })
		}
	},

	//delete reaction 
	async removeReaction(req, res) {
		try {
			const removedReaction = await Reaction.findByIdAndDelete(
				{ _id: req.params.reactionId },
				{ $pull: { reactions: { _id: req.params.reactionId } } },
				{ runValidators: true, new: true }
			)
			if (!removedReaction) {
				return res.status(404).json({ message: 'No reactions was moved' })
			}
			res.status(200).json('The reactions was removed from the thought')
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not find a reactions that is associated with that thought.' })
		}
	}
}

/**==============================================
 * ?                  Info
 *   
 * ? Why .find() and not .findAll()?
 * 		.findAll() is used in Sequelize not Mongoose    
 * 
 * ? $push 
 * 		update operator that appends a specified value to an array, 
 * 		used to add a new reaction to the reactions array of a specific thought. 
 * 	
 * ? $pull 
 * 		update operator that removes all instances of a value from an existing 
 * 		array.
 *
 *=============================================**/