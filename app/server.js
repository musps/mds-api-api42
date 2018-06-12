const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const routes = require('./routes')
const app = express()
const UserModel = require('./models/UserModel')

const config = {
  'server': {
    'uri': 'localhost',
    'port': 3031
  },
  'mongodb': {
    'uri': 'localhost',
    'port': 3032,
    'database': 'api42'
  }
}

mongoose.connect(`mongodb://${config.mongodb.uri}:${config.mongodb.port}/${config.mongodb.database}`)
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection opened')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(helmet())
app.disable('x-powered-by')

routes.config(app)

app.listen(config.server.port, () => {
  console.log(`listening on ${config.server.port}`)
})

module.exports = app
