const { expect } = require('chai');
const { createUserUseCase } = require('../../../src/modules/User/useCases/CreateUserUseCase');
const FakeUser = require('../build/UserBuilder');

describe('CreateUserUseCase', () => {
    let fakeUser
    beforeEach(() => {
        fakeUser = new FakeUser().buildUser();
    });
    it('should create a new user when given valid parameters', async () => {
        const response = await createUserUseCase.execute(fakeUser);
        expect(response).to.deep.include(fakeUser);
    });

    it('should throw an error if the email is already in use', async () => {
      try {
        await createUserUseCase.execute(fakeUser);
        await createUserUseCase.execute(fakeUser);
      } catch (error) {
        expect(error).to.deep.equal({ status: 500, message: 'Email já cadastrado' });
      }
    });
});
