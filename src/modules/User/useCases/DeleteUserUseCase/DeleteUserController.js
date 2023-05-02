const DeleteUserUseCase = require("./DeleteUserUseCase");

class DeleteUserController {
    constructor() {
        this.deleteUserUseCase = new DeleteUserUseCase();
    }

    async handle(id) {
        try {
            this.validateFields(id)
            return await this.deleteUserUseCase.execute(id);
        } catch (error) {
            throw error
        }
    }

    validateFields(id) {
        if(!id) {
            throw {status: 400, message: "Campo não recebido"}
        }
    }
}

module.exports = DeleteUserController