const UserRepository = require("../../../../repositories/UserRepository")

class DeleteUserUseCase {
    constructor() { 
        this.userRepository = new UserRepository()
    }
    async execute(id) {
        const res = await this.userRepository.deleteUser(id)
        if(!res) throw {status: 404, message: "usuário não encontrado"}
        return res
    }
}

module.exports = DeleteUserUseCase