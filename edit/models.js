const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const EditSchema = mongoose.Schema({
	textId: { type: mongoose.Schema.Types.ObjectId, ref: 'Text' },
	authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	authorName: String,
	editorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	editorName: String,
	editorComment: String,
	title: String,
	body: String,
	dateCreated: Date,
	comments: [{
		author: String,
		body: String,
		uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		rating: Number
	}]
})

const Edit = mongoose.model('Edit', EditSchema)

module.exports = { Edit }