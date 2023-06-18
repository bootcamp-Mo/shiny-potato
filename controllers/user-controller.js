const { User, Friend } = require('../models')

module.exports = {
	// get all users
	async getAllUser(req, res) {
		try {
			const users = await User.find()
			res.status(200).json(users, { message: 'Found all users' })
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Unable to find all users' })
		}
	},

	//get user by id
	async getUserById(req, res) {
		try {
			const user = await User.findOne({ _id: req.params.userId })
			if (!user) {
				return res.status(404).send('That user was not found')
			}
			else {
				console.log("found")
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'No users were found with that id' })
		}
	},

	//create a new user
	async createUser(req, res) {
		try {
			const newUser = await User.create(req.body)
			res.status(200).json(newUser)
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not create a new user' })
		}
	},

	//update user by id
	async updateUser(req, res) {
		try {
			const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { runValidators: true })
			if (!updatedUser) {
				throw Error;
			} else {
				res.status(201).json(updatedUser)
			}
		} catch (error) {
			res.status(403).json(
				error,
				{ message: 'You are trying to edit someone elses post' })
		}
	},

	//delete user by id
	async deleteUser(req, res) {
		try {
			await User.findOneAndDelete({ _id: req.params.userId })
			res.status(200).json('The user has been deleted')
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not find a user to delete' })
		}
	},

	//add Friend to user by id
	async addFriendToUser(req, res) {
		console.log('Find a friend for the user')
		try {
			const user = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $push: { Friend: [req.body] } },
				{ runValidators: true, new: true }
			)
			if (!user) {
				return res.status(404).json({ message: 'No user was found' })
			}
			res.status(200).json(user)
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'No friend was added to user' })
		}
	},

	//delete Friend 
	async removeFriendFromUser(req, res) {
		try {
			const removedFriend = await Friend.findByIdAndDelete(
				{ _id: req.params.friendId },
				{ $pull: { friend: { _id: req.params.friendId } } },
				{ runValidators: true, new: true }
			)
			if (!removedFriend) {
				return res.status(404).json({ message: 'No friend was moved' })
			}
			res.status(200).json('The friend was removed from the user')
		} catch (error) {
			res.status(500).json(
				error,
				{ message: 'Could not find a friend that is associated with that user.' })
		}
	}
}
