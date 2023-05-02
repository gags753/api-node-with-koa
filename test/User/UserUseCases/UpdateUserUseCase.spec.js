const { expect } = require('chai');
const FakeUser = require('../build/UserBuilder');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const { updateUserUseCase } = require('../../../src/modules/User/useCases/UpdateUserUseCase');
const {faker} = require('@faker-js/faker');
const { deleteUserController } = require('../../../src/modules/User/useCases/DeleteUserUseCase');

describe('updateUserUseCase', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return success when update a user', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await updateUserUseCase.execute({
        id: createdUser.dataValues.id,
        age: createdUser.dataValues.age,
        email: faker.internet.email(),
        name: createdUser.dataValues.name
    });
    expect(response).to.deep.equal([1]);
  });
  it('Should return error when the user does not exists', async() => {
    const createdUser = await createUserController.handle(fakeUser);
    await deleteUserController.handle(createdUser.dataValues.id);
    try {
        await updateUserUseCase.execute({
            id: createdUser.dataValues.id,
            age: createdUser.dataValues.age,
            email: faker.internet.email(),
            name: createdUser.dataValues.name
        });
    } catch (error) {
        expect(error).to.deep.equal({ status: 500, message: "Usuário não existe" });
    }
  })

  it('Should return error when the email is already in use', async() => {
    const createdUser = await createUserController.handle(fakeUser);
    try {
        await updateUserUseCase.execute({
            id: createdUser.dataValues.id,
            age: createdUser.dataValues.age,
            email: createdUser.dataValues.email,
            name: createdUser.dataValues.name
        });
    } catch (error) {
        expect(error).to.deep.equal({ status: 500, message: "Email já cadastrado" });
    }
  })
});
