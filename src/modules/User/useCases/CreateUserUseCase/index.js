const CreateUserController = require("./CreateUserController");
const CreateUserUseCase = require("./CreateUserUseCase");

const createUserUseCase = new CreateUserUseCase();
const createUserController = new CreateUserController();

module.exports = { createUserUseCase, createUserController }