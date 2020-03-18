import Quote from '../models/Quote'

class QuoteController {
    async getQuotes(ctx) {
        const perPage = 2
        const page = ctx.params.page || 1

        try {
            const quotes = await Quote.find({})
                .skip(perPage * page - perPage)
                .limit(perPage)

            if (quotes.length <= 0) return ctx.throw(422, 'No quotes found!')

            const totalItems = await Quote.countDocuments({})

            ctx.body = {
                totalItems: totalItems,
                perPage: perPage,
                quotes: quotes,
            }
        } catch (error) {
            ctx.throw(422, error)
        }
    }

    async getQuote(ctx) {
        const quoteId = ctx.params.id
        if (!quoteId) return ctx.throw(422, 'Ivalid data received!')

        try {
            const quote = await Quote.findById(quoteId)
            ctx.body = quote
        } catch (error) {
            ctx.throw(422, error)
        }
    }
}

export default QuoteController
