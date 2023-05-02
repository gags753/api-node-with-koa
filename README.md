# practical-test

## Instruções iniciais
 - Instale as dependências com o seguinte comando
```bash
npm install
```
- Inicie o serviço:
```bash
npm run dev
```
 - Acesse o swagger da aplicação no seguinte [link](http://localhost:3333/api) e teste os 4 endpoints da aplicação, caso prefira, é possível testar em algum terminal
 com os exemplos a seguir
 ## Cenários de teste
 ### Create user
 #### Cenário de sucesso
  - No terminal, execute o seguinte comando, substituindo a palavra [string] pelo valor a sua preferência
  ```bash
  curl -X 'POST' \
  'http://localhost:3333/user/create-user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string",
  "name": "string",
  "age": 18
}'
  ```
 - Deve ser retornada a seguinte resposta:
 ```json
 Usuário cadastrado com sucesso
 ```
#### Cenário de falha
##### Campo não recebido
 - No terminal, insira o seguinte comando
 ```bash
 curl -X 'POST' \
  'http://localhost:3333/user/create-user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string2",
  
  "age": 18
}'
```
 - Deverá ser retornada a seguinte resposta
 ```json
 {
  "status": 400,
  "message": "Campo não recebido"
}
```
 - Isso ocorre porque não foram passados todos os parâmetros solicitados
 ##### Idade mínima
  - No terminal, execute o seguinte comando
  ```bash
  curl -X 'POST' \
  'http://localhost:3333/user/create-user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string3",
  "name": "string",
  "age": 17
}'
```
 - Deverá ser retornada a seguinte resposta
 ```json
 {
  "status": 422,
  "message": "Idade mínima é de 18 anos"
}
```
 - Isso ocorre porque a idade mínima é de 18 anos
 ##### Email já cadastrado
 - No terminal, execute o seguinte comando duas vezes, com os mesmos valores
 ```bash
 curl -X 'POST' \
  'http://localhost:3333/user/create-user' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "string3",
  "name": "string",
  "age": 18
}'
```
 - Na segunda execução, deverá ser retornada a seguinte resposta
 ```json
 {
  "status": 500,
  "message": "Email já cadastrado"
}
```
### Read user
#### Cenários de sucesso
##### Ler um usuário
- No terminal, execute o seguinte comando
```bash
curl -X 'GET' \
  'http://localhost:3333/user/read-user?id=1' \
  -H 'accept: application/json'
```
 - Deverá ser retornada a seguinte resposta
 ```json
 [
  {
    "id": 1,
    "email": "string3",
    "name": "string",
    "age": 18,
    "createdAt": "2023-05-02T03:39:13.091Z",
    "updatedAt": "2023-05-02T03:39:13.091Z"
  }
]
```
##### Ler lista de usuários
 - Para retornar uma lista de usuários, basta executar o mesmo endpoint sem enviar nenhum parâmetro, como no exemplo a seguir
 ```bash
 curl -X 'GET' \
  'http://localhost:3333/user/read-user' \
  -H 'accept: application/json'
```
 - Deverá ser retornada uma resposta semelhante ao exemplo a seguir
 ```json
 [
  [
    {
      "id": 1,
      "email": "string3",
      "name": "string",
      "age": 18,
      "createdAt": "2023-05-02T03:39:13.091Z",
      "updatedAt": "2023-05-02T03:39:13.091Z"
    },
    {
      "id": 2,
      "email": "teste",
      "name": "teste@email.com",
      "age": 20,
      "createdAt": "2023-05-02T03:45:53.572Z",
      "updatedAt": "2023-05-02T03:45:53.572Z"
    }
  ]
]
```
#### Cenário de falha
##### Usuário não encontrado
 - No terminal, execute o seguinte comando
```bash
curl -X 'GET' \
  'http://localhost:3333/user/read-user?id=500' \
  -H 'accept: application/json'
```
 - Deve ser retornada resposta semelhante a seguinte
```json
{
  "status": 404,
  "message": "usuário não encontrado"
}
```
### Update user
#### Cenário de sucesso
##### Atualizar usuário
 - No terminal execute o seguinte comando, inserindo um id válido e se atentando a usar um email que não existe na base de dados
```bash
curl -X 'PATCH' \
  'http://localhost:3333/user/update-user?id=1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "atualizado",
  "name": "novo_email@email.com",
  "age": 25
}'
```
 - Deverá ser retornada a seguinte resposta
 ```json
 Usuário atualizado com sucesso
 ```
 #### Cenários de falha
 ##### Campos não recebidos
  - No terminal, execute o seguinte comando
 ```bash
 curl -X 'PATCH' \
  'http://localhost:3333/user/update-user?id=1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{}'
 ```
  - Deve ser retornada a seguinte resposta
  ```json
  {
  "status": 400,
  "message": "Campos não recebidos"
}
```
##### Idade mínima é de 18 anos
 - No terminal, execute o seguinte comando
```bash
curl -X 'PATCH' \
  'http://localhost:3333/user/update-user?id=1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "atualizado",
  "name": "novo_email2@email.com",
  "age": 10
}'
```
 - Deve ser retornada a seguinte resposta
 ```json
 {
  "status": 422,
  "message": "Idade mínima é de 18 anos"
}
```
##### Email já cadastrado
 - No terminal, execute o seguinte comando
 ```bash
 curl -X 'PATCH' \
  'http://localhost:3333/user/update-user?id=1' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "atualizado",
  "name": "novo_email2@email.com",
  "age": 18
}'
```
 - Deve ser retornada a seguinte resposta
 ```json
 {
  "status": 500,
  "message": "Email já cadastrado"
}
```
##### Usuário não existe
 - No terminal, execute o seguinte comando
```bash
curl -X 'PATCH' \
  'http://localhost:3333/user/update-user?id=500' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "atualizado22",
  "name": "teste2",
  "age": 18
}'
```
 - Deve ser retornada a seguinte resposta
 ```json
 {
  "status": 500,
  "message": "Usuário não existe"
}
```
### Delete user
#### Cenário de sucesso
##### Deletar usuário
 - No terminal, execute o seguinte comando
 ```bash
 curl -X 'DELETE' \
  'http://localhost:3333/user/delete-user?id=1' \
  -H 'accept: application/json'
```
 - Deverá ser retornada a seguinte resposta
```json
Usuário removido
```
#### Cenário de falha
##### Usuário não encontrado
 - No terminal, execute o seguinte comando
 ```bash
 curl -X 'DELETE' \
  'http://localhost:3333/user/delete-user?id=1' \
  -H 'accept: application/json'
```
 - Deverá ser retornada a seguinte resposta
```json
{
  "status": 404,
  "message": "usuário não encontrado"
}
```

## Testes unitários
 - No terminal, execute o seguinte comando
 ```bash
 npm run test
 ```
  - Deverá ser retornada resposta semelhante a seguinte
 ```bash
 CreateUserController
    handle
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Joshua.Ward79@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
      √ should create a user (67ms)
      √ should throw a 400 error if email, name or age are not provided
      √ should throw a 422 error if age is less than 18

  DeleteUserController
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Britney88@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): DELETE FROM `users` WHERE `id` = 19
    √ should return success when delete a user (43ms)
    √ Should return a error when the id is missing

  ReadUserController
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Jailyn31@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 20;
    √ should return a user when a valid id is given
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Miller_Mosciski64@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user`;
    √ should return a list of users if no id is passed

  UpdateUserController
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Felton_Gibson45@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Rafael.Thiel96@hotmail.com';
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 22;
Executing (default): UPDATE `users` SET `email`=$1,`name`=$2,`age`=$3,`updatedAt`=$4 WHERE `id` = $5
    √ should return success when update a user (53ms)
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Corrine_Deckow47@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
    √ Should return error when a parameter is missing
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Adah17@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
    √ Should return error when the value of the parameter age is lower then 18

  CreateUserUseCase
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Milford_Waters@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
    √ should create a new user when given valid parameters
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Jayce_Friesen40@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Jayce_Friesen40@gmail.com';
    √ should throw an error if the email is already in use

  DeleteUserUseCase
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Roselyn59@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): DELETE FROM `users` WHERE `id` = 27
    √ should return success when delete a user
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Breanne.Koelpin43@hotmail.com';       
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): DELETE FROM `users` WHERE `id` = 28
Executing (default): DELETE FROM `users` WHERE `id` = 28
    √ should return error when the user does not exists

  ReadUserUseCase
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Bobby_Bruen80@yahoo.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 29;
    √ should return a user when a valid id is given
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Clyde.Ruecker@gmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user`;
    √ should return a list of users if no id is passed
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Dorris_Murray31@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): DELETE FROM `users` WHERE `id` = 31
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 31;
    √ should return a error if the given id does not exists

  updateUserUseCase
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Annamae66@yahoo.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Kendall33@yahoo.com';
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 32;
Executing (default): UPDATE `users` SET `email`=$1,`name`=$2,`age`=$3,`updatedAt`=$4 WHERE `id` = $5
    √ should return success when update a user (41ms)
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Adolphus_Morissette@hotmail.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): DELETE FROM `users` WHERE `id` = 33
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Stephan.Bashirian66@gmail.com';
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`id` = 33;
    √ Should return error when the user does not exists
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Avery_Nicolas@yahoo.com';
Executing (default): INSERT INTO `users` (`id`,`email`,`name`,`age`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4,$5);
Executing (default): SELECT `id`, `email`, `name`, `age`, `createdAt`, `updatedAt` FROM `users` AS `user` WHERE `user`.`email` = 'Avery_Nicolas@yahoo.com';
    √ Should return error when the email is already in use


  20 passing (638ms)
```
