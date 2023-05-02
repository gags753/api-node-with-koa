//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const app = require('./app')
const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server runing at http://localhost:${PORT}`)
  console.log(`access the swagger in the following link http://localhost:${PORT}/api`)
})

// //rota simples pra testar se o servidor está online
// router.get('/', async (ctx) => {
//   ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
// });

// //Uma rota de exemplo simples aqui.
// //As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
// router.get('/users', async (ctx) => {
//     ctx.status = 200;
//     ctx.body = {total:0, count: 0, rows:[]}
// });

// koa
//   .use(router.routes())
//   .use(router.allowedMethods());

// const server = koa.listen(PORT);

// module.exports = server;