const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const routes = require('./routes')
const app = express()
const UserModel = require('./models/UserModel')
const {requestServerError} = require('./utils')

const config = {
  'server': {
    'uri': 'localhost',
    'port': 3031
  },
  'mongodb': {
    'isConnected': false,
    'uri': 'localhost',
    'port': 3032,
    'database': 'api42'
  }
}

const mongooseConnect = () => {
  mongoose.connect(`mongodb://${config.mongodb.uri}:${config.mongodb.port}/${config.mongodb.database}`)
  .catch(err => {
    setTimeout(() => {
      mongooseConnect()
    }, 1000)
  })
}

mongoose.connection.on('connected', () => {
  config.mongodb.isConnected = true
})

mongoose.connection.on('disconnected', () => {
  config.mongodb.isConnected = false
})

mongooseConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(helmet())

app.use(function(req, res, next) {
  if (config.mongodb.isConnected) {
    return next()
  } else {
    return requestServerError(req, res)
  }
})

app.disable('x-powered-by')

routes.config(app)

app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`)
})

module.exports = app
