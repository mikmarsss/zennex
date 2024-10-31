const { User } = require('../models/UserModel')
const UserDTO = require('../dto/UserDTO')
const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt')

const { UserNotes } = require('../models/UserModel')

const TokenService = require('./TokenService')

class UserService {
    async registration(email, password, username) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже зарегистрирован!`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ email: email, password: hashPassword, username: username })
        const user_id = user.id
        const tokens = TokenService.generateTokens(email, user_id, username);
        await TokenService.saveToken(user_id, tokens.refreshToken);
        const userDto = new UserDTO(user)
        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден!')
        }
        const isPassEquals = await bcrypt.compareSync(password, user.password)
        if (!isPassEquals) {
            throw Error('Неверный пароль!')
        }
        const userDto = new UserDTO(user)
        const tokens = await TokenService.generateTokens(user.email, user.id, user.username)
        await TokenService.saveToken(user.id, tokens.refreshToken);
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDTO(user)
        const tokens = await TokenService.generateTokens(user.email, user.id, user.username)
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }
}

module.exports = new UserService()
//fdsf