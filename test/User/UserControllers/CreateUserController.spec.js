const { expect } = require('chai');
const sinon = require('sinon');
const { createUserController } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const FakeUser = require('../build/UserBuilder');

describe('CreateUserController', () => {
  let createUserUseCase;
  let fakeUser = new FakeUser()

  beforeEach(() => {
    createUserUseCase = {
      execute: sinon.stub(),
    };
  });

  describe('handle', () => {
    it('should create a user', async () => {
      const createdUser = fakeUser.buildUser()

      createUserUseCase.execute.resolves(createdUser);

      const response = await createUserController.handle(createdUser);
    
      expect(response).to.deep.include(createdUser);
    });

    it('should throw a 400 error if email, name or age are not provided', async () => {
      const createdUser = fakeUser.buildUser();
      createdUser.age = undefined;

      try {
        await createUserController.handle(createdUser);
      } catch (error) {
        expect(error).to.deep.equal({ status: 400, message: 'Campo não recebido' });
      }
    });

    it('should throw a 422 error if age is less than 18', async () => {
      const createdUser = fakeUser.buildUser();
      createdUser.age = 16;

      try {
        await createUserController.handle(createdUser);
      } catch (error) {
        expect(error).to.deep.equal({ status: 422, message: 'Idade mínima é de 18 anos' });
      }
    });
  });
});
