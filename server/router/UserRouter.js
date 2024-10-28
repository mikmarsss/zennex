const UserController = require('../controller/UserController');

const Router = require('express').Router;
const router = new Router()
/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *             required:
 *               - email
 *               - password
 *               - username
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The access token for the user.
 *                 refreshToken:
 *                   type: string
 *                   description: The refresh token for the user.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The email of the user.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 */
router.use('/registration', UserController.registration)
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The email of the user.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.use('/login', UserController.login)
/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The refresh token of the user.
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.use('/logout', UserController.logout)
/**
 * @swagger
 * /user/refresh:
 *   get:
 *     summary: Refresh user token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         schema:
 *           type: string
 *         required: true
 *         description: The refresh token of the user.
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The new access token for the user.
 *                 refreshToken:
 *                   type: string
 *                   description: The new refresh token for the user.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the user.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The email of the user.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.use('/refresh', UserController.refresh)

module.exports = router