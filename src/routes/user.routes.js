const Router = require('koa-router');
const { createUserController } = require('../modules/User/useCases/CreateUserUseCase');
const { readUserController } = require('../modules/User/useCases/ReadUserUseCase');
const { updateUserController } = require('../modules/User/useCases/UpdateUserUseCase');
const { deleteUserController } = require('../modules/User/useCases/DeleteUserUseCase');

const router = new Router();

router.post('/create-user', async (ctx, next) => {
  try {
    const { email, name, age } = ctx.request.body
    await createUserController.handle({email, name, age})
    ctx.status = 201
    ctx.body = "Usuário cadastrado com sucesso"
  } catch (error) {
    const status = error.status
    const message = error.message
    ctx.status = status
    ctx.response.body = {
      status,
      message
    }
  }
});

router.get('/read-user', async (ctx, next) => {
  try {
    const { id } = ctx.query
    const user = await readUserController.handle(id)
    ctx.status = 200
    ctx.body = user
  } catch (error) {
    const status = error.status
    const message = error.message
    ctx.status = status
    ctx.response.body = {
      status,
      message
    }
  }
})

router.patch('/update-user', async (ctx, next) => {
  try {
    const { email, name, age } = ctx.request.body
    const { id } = ctx.query
    await updateUserController.handle({id, email, name, age})
    ctx.status = 200
    ctx.body = "Usuário atualizado com sucesso"
  } catch (error) {
    const status = error.status
    const message = error.message
    ctx.status = status
    ctx.response.body = {
      status,
      message
    }
  }
})

router.delete('/delete-user', async (ctx, next) => {
  try {
    const { id } = ctx.query
    await deleteUserController.handle(id)
    ctx.status = 200
    ctx.body = "Usuário removido"
  } catch (error) {
    const status = error.status
    const message = error.message
    ctx.status = status
    ctx.response.body = {
      status,
      message
    }
  }
})

module.exports = router.routes();
