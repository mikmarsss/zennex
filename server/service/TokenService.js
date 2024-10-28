const jwt = require('jsonwebtoken')
const { Token } = require('../models/TokenModel')


class TokenService {
    generateTokens(email, id, username) {
        const accessToken = jwt.sign({ email, id, username }, process.env.SECRETKEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign({ email, id, username }, process.env.SECRETKEY, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRETKEY)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRETKEY)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(user_id, refreshToken) {
        const tokenData = await Token.findOne({ where: { user_id: user_id } })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({ user_id: user_id, refreshToken: refreshToken })
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refreshToken: refreshToken } })
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken: refreshToken } })
        return tokenData;
    }
}

module.exports = new TokenService()