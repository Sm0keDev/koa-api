import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import UserController from '../controllers/user'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

router.get('/', async (ctx, next) => {
    ctx.body = { message: 'Hi there. ' + process.env.npm_package_version }
})

//Initial controller once for all routes
const userController = new UserController()

router.post('/api/v1/user/signup', async (ctx, next) => {
    await userController.signup(ctx)
})

router.post('/api/v1/user/login', async (ctx, next) => {
    await userController.login(ctx)
})

router.get('/api/v1/user/logout', async (ctx, next) => {
    await userController.logOut(ctx)
})

router.post('/api/v1/user/refreshAccessToken', async (ctx, next) => {
    await userController.refreshAccessToken(ctx)
})

router.post('/api/v1/user/forgot', async (ctx, next) => {
    await userController.forgot(ctx)
})

router.post('/api/v1/user/reset-password', async (ctx, next) => {
    await userController.resetPassword(ctx)
})

router.post('/api/v1/user/update-password', async (ctx, next) => {
    await userController.updatePassword(ctx)
})

router.post('/api/v1/user/account', jwtMiddleware, async (ctx, next) => {
    await userController.account(ctx)
})

router.patch('/api/v1/user/account', jwtMiddleware, async (ctx, next) => {
    await userController.updateAccount(ctx)
})

router.post('/api/v1/user/delete', jwtMiddleware, async (ctx, next) => {
    await userController.deleteUser(ctx)
})

router.post('/api/v1/quote', async (ctx, next) => {
    await userController.createQuote(ctx)
})

router.post('/api/v1/email', async (ctx, next) => {
    await userController.sendEmail(ctx)
})

export default router
