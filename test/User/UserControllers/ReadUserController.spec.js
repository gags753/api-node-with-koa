const { expect } = require('chai');
const { readUserController } = require('../../../src/modules/User/useCases/ReadUserUseCase');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const FakeUser = require('../build/UserBuilder');

describe('ReadUserController', () => {
  let fakeUser;

  beforeEach(() => {
    fakeUser = new FakeUser().buildUser();
  });

  it('should return a user when a valid id is given', async () => {
    const createdUser = await createUserController.handle(fakeUser);
    const response = await readUserController.handle(createdUser.dataValues.id);
    expect(response).to.be.an('array').that.is.not.empty;
    expect(response[0]).to.deep.include(createdUser.dataValues);
  });

  it('should return a list of users if no id is passed', async () => {
    await createUserController.handle(fakeUser);
    const response = await readUserController.handle();
    expect(response).to.be.an('array').that.is.not.empty;
  })
});
