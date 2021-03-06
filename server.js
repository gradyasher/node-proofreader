require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')

const { router: commentRouter } = require('./comments/router')
const { textRouter } = require('./text/router')
const { router: usersRouter } = require('./users')
const { router: editRouter } = require('./edit/router')
const { router: authRouter, basicStrategy, jwtStrategy } = require('./auth')

mongoose.Promise = global.Promise

const {PORT, DATABASE_URL} = require('./config')
const {User} = require('./users/models')
const {Text} = require('./text/models')

const app = express()

// Logging
app.use(morgan('common'))
app.use(bodyParser.json())

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    if (req.method === 'OPTIONS') {
        return res.send(204)
    }
    next()
});

app.use(passport.initialize())
passport.use(basicStrategy)
passport.use(jwtStrategy)

app.use('/api/text/', textRouter)
app.use('/api/comment/', commentRouter)
app.use('/api/users/', usersRouter)
app.use('/api/auth/', authRouter)
app.use('/api/edit/', editRouter)

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        return res.json({
            data: 'rosebud'
        })
    }
)

app.use('*', (req, res) => {
    return res.status(404).json({message: 'Not Found'})
})

let server

function runServer() {
    return new Promise((resolve, reject) => {
        mongoose.connect(DATABASE_URL, err => {
            if (err) {
                return reject(err)
            }
            server = app
                .listen(PORT, () => {
                    console.log(`Your app is listening on port ${PORT}`)
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect()
                    reject(err)
                })
        })
    })
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err)
                }
                resolve()
            })
        })
    })
}

if (require.main === module) {
    runServer().catch(err => console.error(err))
}

module.exports = {app, runServer, closeServer}
