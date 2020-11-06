import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request }: HttpContextContract) {
    const { email, password } = request.all()

    const user = await User.create({
      email,
      password,
      username: email,
    })
    return user
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
