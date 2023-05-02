const UserRepository = require("../../../../repositories/UserRepository")

class ReadUserUseCase {
    constructor() { 
        this.userRepository = new UserRepository()
    }
    async execute(id) {
        let user = []
        if(id) {
            user.push(await this.userRepository.findUserById(id))
        } else {
            user.push(await this.userRepository.findAllUsers())
        }
        if(!(!!user)) {
            throw {status: 404, message: "usuário não encontrado"}
        }
        return user
    }
}

module.exports = ReadUserUseCase