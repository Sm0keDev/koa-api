import Router from 'koa-router'
import jwt from '../middleware/jwt'
import logger from '../logs/log'

import QuoteController from '../controllers/quote'

const router = new Router()
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET })

//Initial controller once for all routes
const quoteController = new QuoteController()

router.get('/api/v1/admin/quotes/:page', jwtMiddleware, async (ctx, next) => {
    await quoteController.getQuotes(ctx)
})

router.get('/api/v1/admin/quote/:id', jwtMiddleware, async (ctx, next) => {
    await quoteController.getQuote(ctx)
})

export default router
