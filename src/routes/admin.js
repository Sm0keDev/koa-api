import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import AdminController from '../controllers/admin'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

//Initial controller once for all routes
const adminController = new AdminController()

router.get('/api/v1/admin/users/:page', jwtMiddleware, async (ctx, next) => {
    await adminController.getUsers(ctx)
})

router.get('/api/v1/admin/user/:id', jwtMiddleware, async (ctx, next) => {
    await adminController.getUser(ctx)
})

router.patch('/api/v1/admin/settings/:id', jwtMiddleware, async (ctx, next) => {
    await adminController.updateSettings(ctx)
})

export default router
