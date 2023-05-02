const { expect } = require('chai');
const FakeUser = require('../build/UserBuilder');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const { deleteUserUseCase } = require('../../../src/modules/User/useCases/DeleteUserUseCase');
deleteUserUseCase

describe('DeleteUserUseCase', () => {
  let fakeUser
  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return success when delete a user', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await deleteUserUseCase.execute(createdUser.dataValues.id);
    expect(response).to.deep.equal(1);
  });

  it('should return error when the user does not exists', async () => {
    try {
        const createdUser = await createUserController.handle(fakeUser);
        await deleteUserUseCase.execute(createdUser.dataValues.id);
        await deleteUserUseCase.execute(createdUser.dataValues.id);
    } catch (error) {
        expect(error).to.deep.equal({status: 404, message: "usuário não encontrado"});
    }
  });
});
