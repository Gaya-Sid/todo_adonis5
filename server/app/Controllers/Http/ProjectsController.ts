import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Project from 'App/Models/Project'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProjectsController {
  public async index({ auth }: HttpContextContract) {
    const { user } = await auth
    console.log(user)

    const projects = await Database.query().select('*').from('projects').where('user_id', user.id)
    return projects
  }

  public async create({ auth, request }: HttpContextContract) {
    const projectSchema = schema.create({
      title: schema.string(),
    })
    const validatedData = await request.validate({
      schema: projectSchema,
    })
    const { id } = await auth.user

    const project = await Project.create({
      title: validatedData.title,
      userId: id,
    })
    return project
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const { user } = await auth
    const { id } = params
    const project = await Project.findOrFail(id)
    // AuthorizationService.verifyPermission(project, user)

    const projectSchema = schema.create({
      title: schema.string(),
    })
    const validatedData = await request.validate({
      schema: projectSchema,
    })

    project.title = validatedData.title
    await project.save()

    return project
  }

  public async destroy({ auth, request, params }: HttpContextContract) {
    const { user } = await auth
    const { id } = params
    const project = await Project.findOrFail(id)

    await project.delete()

    return project
  }
}
