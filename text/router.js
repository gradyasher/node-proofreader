const express = require('express')

const config = require('../config')
const bodyParser = require('body-parser')
const app = express()
const { grammar } = require('./grammar')

const {Text} = require('./models')

const textRouter = express.Router()

const jsonParser = bodyParser.json()

textRouter.get('/:uid', jsonParser, (req, res) => {
	Text.find({author: req.params.uid})
		.then(papers => {
			res.send(papers)
		})
})

textRouter.post('/', jsonParser, (req, res) => {
	// async (req,res) => {
	// 	let edited 
	// 	try {
	// 		edited = await grammar(req.body.body)
	// 	}
	// 	catch(e) {
	// 		console.log('err in grammaer', e)
	// 	}
	// 	console.log("edited", edited)
	// 	res.send(edited)
	// }
	Text.create({
		title: 'hello',
		body: 'hi there hi there34',
		author: '59caaa71e6481419a7eab7cf',
		dateCreated: Date.now(),
		comments: [],
		score: {
			upvotes: 10,
			downvotes: 5
		}
	})

	res.send({hello: 'hello'})
})




module.exports = { textRouter }