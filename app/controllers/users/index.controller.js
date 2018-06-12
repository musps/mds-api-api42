const { 
  returnResponse,
  returnObjToArray
} = require('./../../utils')
const UserModel = require('./../../models/UserModel')

const UsersController = {
  ping: (req, res) => {
    returnResponse(res, 200, 'pong')
  },

  list: (req, res) => {
    UserModel.find().exec()
      .then(data => {
        returnResponse(res, 200, 'users list successfully retrieved.', data)
      })
      .catch(err => {
        returnResponse(res, 500, 'Internal Server Error')
      })
  }
}

module.exports = UsersController
