import jsonwebtoken from 'jsonwebtoken'
import User from '../models/User'
import role from '../middleware/roles'

module.exports = (opts = {}) => {
    const secret = opts.secret

    const middleware = async function jwt(ctx, next) {
        //Grab the token
        const token = getJwtToken(ctx)
        //If there's no secret or token set, toss it out right away
        if (!secret || !token) ctx.throw(401, 'Not sufficient permissions!')

        try {
            //Try and decode the token asynchronously
            const decoded = await jsonwebtoken.verify(token, secret)
            const foundUser = await User.findById(decoded.id)
            if (!foundUser) return ctx.throw(422, 'No user found!')

            if (foundUser) {
                if (
                    role[foundUser.role].find(function(url) {
                        return (
                            url === ctx.request.url ||
                            url.substring(url.length - 1) == '*'
                        )
                    })
                ) {
                    //If it worked set the ctx.state.user parameter to the decoded token.
                    ctx.state.user = foundUser.userToJSON()
                    return next()
                } else
                    return ctx.throw(
                        402,
                        'Access Denied: You dont have correct privilege to perform this operation'
                    )
            } else {
                return ctx.throw(
                    500,
                    'Something went wrong, please try again later.'
                )
            }
        } catch (err) {
            ctx.throw(401, 'You are not authorized!')
            ctx.logout()
        }
    }

    function getJwtToken(ctx) {
        if (!ctx.header || !ctx.header.authorization) {
            return
        }

        const parts = ctx.header.authorization.split(' ')

        if (parts.length === 2) {
            const scheme = parts[0]
            const credentials = parts[1]

            if (/^Bearer$/i.test(scheme)) {
                return credentials
            }
        }
        return ctx.throw(401, 'Invalid token data!')
    }

    return middleware
}
