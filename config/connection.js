const mongoose = require('mongoose');


const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api';

mongoose.connect(connectionString).catch(error => console.error('Error connecting to MongoDB', error))

module.exports = mongoose.connection



/**==============================================
 * ?                  Info
 *   
 *   rabbit hole - 
 * 
 *   No More Deprecation Warning Options
 * 		useNewUrlParser, useUnifiedTopology, useFindAndModify, and 
 * 		useCreateIndex are no longer supported options. Mongoose 6 always 
 * 		behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex 
 * 		are true, and useFindAndModify is false. Please remove these options 
 * 		from your code.
 * 	
 * 	No longer necessary:
 * 
		mongoose.set('useFindAndModify', false);
		
		await mongoose.connect('mongodb:;//127.0.0.1:27017/test', {
		useNewUrlParser: true, // <-- no longer necessary
		useUnifiedTopology: true // <-- no longer necessary
		});
 *
 *=============================================**/