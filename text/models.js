const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const TextSchema = mongoose.Schema({
	title: String,
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	authorName: String,
	body: String,
	description: String,
	dateCreated: Date,
	comments: [{
		author: String,
		body: String,
		uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		rating: Number
	}]
})

const Text = mongoose.model('Text', TextSchema)

module.exports = { Text }