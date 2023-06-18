const router = require('express').Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	deleteFriend,
	addFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
	.route('/')
	.get(getAllUsers)
	.post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
	.route('/:id')
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

router
	.route('/:friendId')
	.param('userId', getUserById) // set userId as a param for the route handler to use in its callback function (see below). This
	// allows us to access user data from within our friendship controller functions without having
	// to pass it explicitly into each of those functions' callbacks. See line 103 onwards...
	.param('friendId', getUserById)
	.patch((req, res) => {
		console.log("PATCH request received");
	})
	.delete(deleteFriend);

router
	.route('/:userId/friends/:friendId')
	.param('userId', getUserById)
	.param('friendId', getUserById)
	.post(addFriend);


module.exports = router;