const CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
    constructor() {
        this.createUserUseCase = new CreateUserUseCase();
    }

    async handle({email, name, age}) {
        try {
            this.validateFields(email, name, age)
            return await this.createUserUseCase.execute({email, name, age});
        } catch (error) {
            throw error
        }
    }

    validateFields(email, name, age) {
        if(!(!!email && !!name && !!age)) {
            throw {status: 400, message: "Campo não recebido"}
        }
        if(age < 18) {
            throw {status: 422, message: "Idade mínima é de 18 anos"}
        }
    }
}

module.exports = CreateUserController