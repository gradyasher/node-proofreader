const {Text} = require('../text/models')

exports.postComment = async (req, res) => {
	Text.findOneAndUpdate({ _id: req.params.userItem }, { $push: { 'comments': req.body } }, { new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
}

exports.deleteComment = async (req, res) => {
	Text.findOneAndUpdate(
		{ _id: req.params.userItem},
		{ $pull: { 'comments': { _id: req.params.commentId } } },
		{ new: true })
	.then(text => {
		res.send(text)
	})
	.catch(err => {
		console.log(err)
	})
}