const UserRepository = require("../../../../repositories/UserRepository")

class UpdateUserUseCase {
    constructor() { 
        this.userRepository = new UserRepository()
    }
    async execute({id, email, name, age}) {
        console.log()
        if(await this.emailAlreadyExists(email)) throw { status: 500, message: "Email já cadastrado" }
        if(!await this.userExists(id)) throw { status: 500, message: "Usuário não existe" }
        console.log('use case')
        return await this.userRepository.updateUser(id, email, name, age);
    }

    async emailAlreadyExists(email) {
        return await this.userRepository.findUserByEmail(email);
    }

    async userExists(id) {
        const user = await this.userRepository.findUserById(id)
        console.log(!!user)
        return !!user
    }
}

module.exports = UpdateUserUseCase