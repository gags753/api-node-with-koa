const UserRepository = require("../../../../repositories/UserRepository")

class CreateUserUseCase {
    constructor() { 
        this.userRepository = new UserRepository()
    }
    async execute({email, name, age}) {
        if(await this.emailAlreadyExists(email)) throw { status: 500, message: "Email já cadastrado" }
        return await this.userRepository.createUser(email, name, age);
    }

    async emailAlreadyExists(email) {
        return await this.userRepository.findUserByEmail(email);
    }
}

module.exports = CreateUserUseCase