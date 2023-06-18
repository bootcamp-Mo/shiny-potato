const { Thought, Reaction } = require('../models')

module.exports = {
	// get all thoughts
	async getAllThoughts(req, res) {
		try {
			const thoughts = await Thought.find()
			res.status(200).json(thoughts, { message: 'Found all thoughts' })
		} catch (error) {
			res.status(500).json(error, { message: 'Unable to find all thoughts' })
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
			res.status(500).json(error, { message: 'No thoughts were found with that id' })
		}
	},

	//create a new thought
	async createThought(req, res) {
		try {
			const NewThought = await Thought.create(req.body)
			res.status(200).json(NewThought)
		} catch (error) {
			res.status(500).json(error, { message: 'Could not create a new thought' })
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
		} catch (err) {
			res.status(403).json(err, { message: 'You are trying to edit someone elses post' })
		}
	},

	//delete thought by id
	async deleteThought(req, res) {
		try {
			await Thought.findOneAndDelete({ _id: req.params.thoughtId })
			res.status(200).json('The thought has been deleted')
		} catch (error) {
			res.status(500).json(error, { message: 'Could not find a thought to delete' })
		}
	},

	//add reaction to thought by id
	async addReactionToThought(req, res) {
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
			res.status(500).json(error, { message: 'Could not react to that thought' })
		}
	}
}

/**==============================================
 * ?                  Info
 *   
 * ? Why .find() and not .findAll()?
 * 		.findAll() is used in Sequelize not Mongoose    
 * 
 *  
 * 	
 * 
 *
 *=============================================**/