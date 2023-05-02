const ReadUserUseCase = require("./ReadUserUseCase");

class ReadUserController {
    constructor() {
        this.readUserUseCase = new ReadUserUseCase();
    }

    async handle(id) {
        try {
            return await this.readUserUseCase.execute(id);
        } catch (error) {
            throw error
        }
    }
}

module.exports = ReadUserController