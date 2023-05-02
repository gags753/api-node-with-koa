const { expect } = require('chai');
const FakeUser = require('../build/UserBuilder');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const { deleteUserController } = require('../../../src/modules/User/useCases/DeleteUserUseCase');

describe('DeleteUserController', () => {
  let fakeUser
  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return success when delete a user', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await deleteUserController.handle(createdUser.dataValues.id);
    expect(response).to.deep.equal(1);
  });

  it('Should return a error when the id is missing', async () => {
    try {
        await deleteUserController.handle(undefined);
    } catch (error) {
        expect(error).to.deep.equal({status: 400, message: "Campo não recebido"});
    }
  })
});
