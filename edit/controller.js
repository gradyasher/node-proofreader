const { Text } = require('../text/models')
const { User } = require('../users/models')
const { Edit } = require('../edit/models')

exports.createEdit = async (req,res) => {
	Edit.create({
		textId: req.body.textId,
		title: req.body.title,
		body: req.body.body,
		authorId: req.body.authorId,
		authorName: req.body.authorName,
		editorId: req.body.editorId,
		editorName: req.body.editorName,
		editorComment: req.body.editorComment,
		dateCreated: Date.now(),
		comments: []
	})
	.then(text => {
		res.send(text)
	})
}

exports.getUserEdits = (req, res) => {
	Edit.find({ editorId: req.params.uid })
		.then(texts => {
			res.send(texts)
		})
}

exports.getAllEdits = async(req, res) => {
	await Edit.find({ textId: { $in : req.body.textIds } })
		.then(edits => {
			res.send(edits)
		})
}

exports.deleteEdit = async(req, res) => {
	await Edit.remove({ _id: req.params.id })
	Edit.find({ authorId: req.params.uid })
		.then(edits => {
			res.send(edits)
		})
} 