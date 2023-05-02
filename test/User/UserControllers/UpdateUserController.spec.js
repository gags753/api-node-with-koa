const { expect } = require('chai');
const FakeUser = require('../build/UserBuilder');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const { updateUserController } = require('../../../src/modules/User/useCases/UpdateUserUseCase');
const {faker} = require('@faker-js/faker')

describe('UpdateUserController', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return success when update a user', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await updateUserController.handle({
        id: createdUser.dataValues.id,
        age: createdUser.dataValues.age,
        email: faker.internet.email(),
        name: createdUser.dataValues.name
    });
    expect(response).to.deep.equal([1]);
  });
  
  it('Should return error when a parameter is missing', async() => {
    const createdUser = await createUserController.handle(fakeUser);
    try {
        await updateUserController.handle({
            id: createdUser.dataValues.id,
        });
    } catch (error) {
        expect(error).to.deep.equal({ status: 400, message: 'Campos não recebidos' });
    }
  })

  it('Should return error when the value of the parameter age is lower then 18', async() => {
    const createdUser = await createUserController.handle(fakeUser);
    try {
        await updateUserController.handle({
            id: createdUser.dataValues.id,
            age: 17
        });
    } catch (error) {
        expect(error).to.deep.equal({status: 422, message: "Idade mínima é de 18 anos"});
    }
  })
});
