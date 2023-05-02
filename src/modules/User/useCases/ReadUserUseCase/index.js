const ReadUserController = require("./ReadUserController");
const ReadUserUseCase = require("./ReadUserUseCase");

const readUserUseCase = new ReadUserUseCase();
const readUserController = new ReadUserController();

module.exports = { readUserUseCase, readUserController }