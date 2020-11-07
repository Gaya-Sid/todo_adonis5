import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'
import Task from 'App/Models/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class TasksController {
  public async index({ auth, request, params }: HttpContextContract) {
    const { user } = await auth
    const { id } = params
    const project = await Project.findOrFail(id)
    // AuthorizationService.verifyPermission(project, user)
    const tasks = await Database.query().select('*').from('tasks').where('project_id', id)

    return tasks
  }

  public async create({ auth, request, params }: HttpContextContract) {
    const { user } = await auth
    const { id } = params
    const project = await Project.findOrFail(id)
    // AuthorizationService.verifyPermission(project, user)

    const taskSchema = schema.create({
      description: schema.string(),
      completed: schema.boolean.optional(),
    })
    const validatedData = await request.validate({
      schema: taskSchema,
    })

    const task = await Task.create({
      description: validatedData.description,
      completed: validatedData.completed,
      projectId: id,
    })

    return task
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ auth, params, request }: HttpContextContract) {
    const { user } = await auth

    const taskSchema = schema.create({
      description: schema.string.optional(),
      completed: schema.boolean.optional(),
    })
    const validatedData = await request.validate({
      schema: taskSchema,
    })

    const { id } = params
    const task = await Task.findOrFail(id)
    // const project = await task.project().fetch()
    // AuthorizationService.verifyPermission(project, user)
    if (validatedData.description !== undefined) {
      task.description = validatedData.description
    }

    if (validatedData.completed !== undefined) {
      task.completed = validatedData.completed
    }
    await task.save()
    return task
  }

  public async destroy({ params, auth, request }: HttpContextContract) {
    const { user } = await auth
    const { id } = params
    const task = await Task.findOrFail(id)
    // const project = await task.project().fetch();
    // AuthorizationService.verifyPermission(project, user);
    await task.delete()
    return task
  }
}
