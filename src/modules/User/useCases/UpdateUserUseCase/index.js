const UpdateUserController = require('./UpdateUserController')
const UpdateUserUseCase = require('./UpdateUserUseCase')

const updateUserController = new UpdateUserController()
const updateUserUseCase = new UpdateUserUseCase()

module.exports = { updateUserController, updateUserUseCase }