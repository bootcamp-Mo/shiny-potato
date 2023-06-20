const { Thought, Reaction, User } = require('../models/')

module.exports = {
	// get all thoughts
	async getAllThoughts(req, res) {
		try {
			const thoughts = await Thought.find()
			res.status(200).json({ message: 'Found all thoughts' })
		} catch (error) {
			res.status(500).json(error)
		}
	},

	//get thought by id
	async getThoughtById(req, res) {
		try {
			const thought = await Thought.findById(req.params.thoughtId)
			if (!thought) {
				return res.status(404).json({ message: 'That thought was not found' })
			}
			res.status(200).json(thought);
		} catch (error) {
			res.status(500).json(error)
		}
	},

	//create a new thought
	async createThought(req, res) {
		try {
			const newThought = await Thought.create(req.body)

			const user = await User.findOneAndUpdate(
				{ _id: req.body.userId },
				{ $push: { thought: newThought._id } },
				{ runValidators: true, new: true }
			)
			if (!user) {
				res.status(404).json({ message: 'No user found with this id!' });
				return;
			}
			res.status(200).json(newThought)
		} catch (error) {
			res.status(500).json(error)
		}
	},

	//update thought by id
	async updateThought(req, res) {
		try {
			const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { runValidators: true })
			if (!updatedThought) {
				throw Error;
			}
			res.status(201).json(updatedThought)
		} catch (error) {
			res.status(403).json(error)
		}
	},

	//delete thought by id
	async deleteThought(req, res) {
		try {
			await Thought.findOneAndDelete({ _id: req.params.thoughtId })
			res.status(200).json('The thought has been deleted')
		} catch (error) {
			res.status(500).json(error)
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
			res.status(500).json(error)
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
			res.status(500).json(error)
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