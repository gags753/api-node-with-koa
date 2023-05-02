const UserModel = require("../models/User");

class UserRepository {
    async findUserByEmail(email) {
        const res = await UserModel.findOne({
            where: {email}
        })
        return res
    }

    async findUserById(id) {
        return await UserModel.findOne({
            where: {id}
        })
    }

    async findAllUsers() {
        return await UserModel.findAll()
    }

    async createUser(email, name, age) {
        return await UserModel.create({
            email, name, age
        })
    }

    async updateUser(id, email, name, age) {
        return await UserModel.update(
            {
                email, name, age
            },
            { where: {id} }
        )
    }

    async deleteUser(id) {
        return await UserModel.destroy(
            {
                where: {id}
            }
        )
    }
}

module.exports = UserRepository