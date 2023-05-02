const { expect } = require('chai');
const { readUserUseCase } = require('../../../src/modules/User/useCases/ReadUserUseCase');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const FakeUser = require('../build/UserBuilder');
const { deleteUserController } = require('../../../src/modules/User/useCases/DeleteUserUseCase');

describe('ReadUserUseCase', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return a user when a valid id is given', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await readUserUseCase.execute(createdUser.dataValues.id);
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response[0]).to.deep.include(createdUser.dataValues);
  });

  it('should return a list of users if no id is passed', async () => {
    await createUserController.handle(fakeUser);
    const response = await readUserUseCase.execute();
    expect(response).to.be.an('array').that.is.not.empty;
  })

  it('should return a error if the given id does not exists', async () => {
    try {
        const createdUser = await createUserController.handle(fakeUser);
        await deleteUserController.handle(createdUser.dataValues.id);
        await readUserUseCase.execute(createdUser.dataValues.id);
    } catch (error) {
        expect(error).to.deep.equal({status: 404, message: "usuário não encontrado"});
    }
  })
});
