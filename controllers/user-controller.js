const { User, Thought } = require('../models')

module.exports = {
	// get all users
	async getAllUsers(req, res) {
		try {
			const users = await User.find()
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ error: 'Could not find any users' });
		}
	},

	//get user by id
	async getUserById(req, res) {
		try {
			const user = await User.findById(req.params.userId)
			if (!user) {
				return res.status(404).json({ error: 'That user was not found' })
			}
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json(error)
		}
	},

	//create a new user
	async createUser(req, res) {
		try {
			const newUser = await User.create(req.body)
			res.status(200).json(newUser)
		} catch (error) {
			res.status(500).json({ error })
		}
	},

	//update user by id
	async updateUser(req, res) {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.userId,
				req.body,
				{ runValidators: true, new: true }
			)

			if (!updatedUser) {
				throw Error;
			} else {
				res.status(201).json(updatedUser)
			}
		} catch (error) {
			res.status(500).json({ error })
		}
	},

	//delete user by id
	async deleteUser(req, res) {
		try {
			await User.findOneAndDelete({ _id: req.params.userId })
			res.status(200).json('The user has been deleted')
		} catch (error) {
			res.status(500).json({ error })
		}
	},

	//add Friend to user by id
	async addFriend(req, res) {
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
			res.status(500).json({ error })
		}
	},

	//delete Friend 
	async deleteFriend(req, res) {
		try {
			const removedFriend = await User.findByIdAndDelete(
				{ _id: req.params.userId },
				{ $pull: { friend: { _id: req.params.userId } } },
				{ runValidators: true, new: true }
			)
			if (!removedFriend) {
				return res.status(404).json({ message: 'No friend was moved' })
			}
			res.status(200).json('The friend was removed from the user')
		} catch (error) {
			res.status(500).json({ error })
		}
	}
}


