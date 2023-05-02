const UserRepository = require("../../../../repositories/UserRepository")

class UpdateUserUseCase {
    constructor() { 
        this.userRepository = new UserRepository()
    }
    async execute({id, email, name, age}) {
        if(await this.emailAlreadyExists(email)) throw { status: 500, message: "Email já cadastrado" }
        if(!(await this.userExists(id))) throw { status: 500, message: "Usuário não existe" }
        return await this.userRepository.updateUser(id, email, name, age);
    }

    async emailAlreadyExists(email) {
        return await this.userRepository.findUserByEmail(email);
    }

    async userExists(id) {
        const user = await this.userRepository.findUserById(id)
        return !!user
    }
}

module.exports = UpdateUserUseCase