const {faker} = require('@faker-js/faker')

class FakeUser {
    buildUser() {
        const user = {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            age: faker.datatype.number({min: 18})
        }
        return user
    }
}

module.exports = FakeUser