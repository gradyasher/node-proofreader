const { Text } = require('../text/models')
const { User } = require('../users/models')
const { Edit } = require('../edit/models')

exports.postComment = async (req, res) => {
	req.body.author = await User.findOne({ _id: req.body.uid }).then(user => user.username)
	if(!req.body.isEdit) {
		await Text.findOneAndUpdate({ _id: req.params.item }, { $push: { 'comments': req.body } }, { new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
	}
	else await Edit.findOneAndUpdate({ _id: req.params.item }, { $push: { 'comments': req.body } }, { new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
}

exports.deleteComment = async (req, res) => {
	if(!req.body.isEdit) { 
		await Text.findOneAndUpdate(
			{ _id: req.params.item },
			{ $pull: { 'comments': { _id: req.params.comment } } },
			{ new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
	}
	else await Edit.findOneAndUpdate(
			{ _id: req.params.item },
			{ $pull: { 'comments': { _id: req.params.comment } } },
			{ new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
}

exports.editComment = async (req, res) => {
	if(!req.body.isEdit) {
		await Text.findOneAndUpdate(
			{ _id: req.params.item , 'comments._id': req.params.comment },
			{ $set: { 'comments.$.body': req.body.newComment } },
			{ new: true })
		.then(text => {
			res.send(text)
		})
	}
	else await Edit.findOneAndUpdate(
			{ _id: req.params.item , 'comments._id': req.params.comment },
			{ $set: { 'comments.$.body': req.body.newComment } },
			{ new: true })
		.then(text => {
			res.send(text)
		})
		.catch(err => {
			console.log(err)
		})
}