const DeleteUserController = require("./DeleteUserController");
const DeleteUserUseCase = require("./DeleteUserUseCase");

const deleteUserUseCase = new DeleteUserUseCase();
const deleteUserController = new DeleteUserController();

module.exports = { deleteUserUseCase, deleteUserController }