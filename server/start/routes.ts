/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('auth/register', 'UsersController.register')
  Route.post('auth/login', 'UsersController.login')

  // Route.get('projects', 'ProjectController.index').middleware('auth')
  // Route.post('projects', 'ProjectController.create').middleware('auth')
  // Route.delete('projects/:id', 'ProjectController.destroy').middleware('auth')
  // Route.patch('projects/:id', 'ProjectController.update').middleware('auth')

  // Route.get("projects/:id/tasks", "TaskController.index").middleware("auth");
  // Route.post("projects/:id/tasks", "TaskController.create").middleware("auth");
  // Route.delete("tasks/:id", "TaskController.destroy").middleware("auth");
  // Route.patch("tasks/:id", "TaskController.update").middleware("auth");
}).prefix('api')
