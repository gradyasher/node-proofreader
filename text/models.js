const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const TextSchema = mongoose.Schema({
	title: String,
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	body: String,
	dateCreated: Date,
	comments: [{
		body: String,
		uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		rating: Number
	}]
})

const Text = mongoose.model('Text', TextSchema)

module.exports = { Text }