const UpdateUserUseCase = require("./UpdateUserUseCase");

class UpdateUserController {
    constructor() {
        this.updateUserUseCase = new UpdateUserUseCase();
    }

    async handle({id, email, name, age}) {
        try {
            this.validateFields(email, name, age)
            return await this.updateUserUseCase.execute({id, email, name, age});
        } catch (error) {
            throw error
        }
    }

    validateFields(email, name, age) {
        if(!(email || name || age)) {
            throw {status: 400, message: "Campos não recebidos"}
        }
        if(age < 18) {
            throw {status: 422, message: "Idade mínima é de 18 anos"}
        }
    }
}

module.exports = UpdateUserController