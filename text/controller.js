const { Text } = require('./models')
const { Edit } = require('../edit/models')

exports.saveTextToApi = (req, res) => {
	Text.create({
		title: req.body.title,
		body: req.body.body,
		authorId: req.body.authorId,
		authorName: req.body.authorName,
		dateCreated: Date.now(),
		comments: []
	})
	.then(text => {
		res.send(text)
	})
}

exports.getText = (req, res) => {
	Text.find({ authorId: req.params.uid })
		.then(texts => {
			res.send(texts)
		})
}

exports.deleteText = async (req, res) => {
	await Text.remove({ _id: req.params.id })
	Text.find({ authorId: req.params.uid })
		.then(texts => {
			res.send(texts)
		})
}

exports.getEdits = (req, res) => {
	Edit.find({ textId: req.params.id })
		.then(edits => {
			res.send(edits)
		})
}