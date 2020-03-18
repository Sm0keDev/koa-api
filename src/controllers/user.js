import rand from 'randexp'
import bcrypt from 'bcrypt'
import User from '../models/User'
import Quote from '../models/Quote'
import utils from '../middleware/utils'
import _data from '../middleware/data'

class UserController {
    async signup(ctx) {
        const email = ctx.request.body.email
        const password = ctx.request.body.password
        const passwordConfirmation = ctx.request.body.passwordConfirmation
        const avatar = utils.gravatar(email)

        const obj = {
            email,
            password,
            passwordConfirmation,
            avatar,
        }

        if (password !== passwordConfirmation) {
            ctx.throw(422, 'Password is not the same as confirmation password')
        }

        try {
            const user = await new User(obj).save()
            const settingId = process.env.SETTING_ID
            const notificaion = process.env.SEND_MAIL

            if (user) {
                // Here we are checking admin settings
                // to see if we send the new user email
                // this is store in data/settings directory
                _data.read('settings', settingId, function(err, checkData) {
                    if (
                        !err &&
                        checkData &&
                        checkData.newUser === true &&
                        notificaion === 'yes'
                    ) {
                        utils.sendNewUserEmail(email)
                    }
                })
                return (ctx.body = user.toAuthJSON())
            }
        } catch (error) {
            ctx.throw(422, error)
        }
    }

    async login(ctx) {
        const request = ctx.request.body

        if (!request.email || !request.password) {
            ctx.throw(404, 'INVALID_DATA')
        }
        try {
            const foundUser = await User.findOne({ email: request.email })
            // check if user exits or if new password matches current password

            if (
                !foundUser ||
                !(await foundUser.comparePassword(request.password))
            ) {
                ctx.throw(404, 'Email or password is invalid')
            }
            ctx.body = foundUser.toAuthJSON()
        } catch (error) {
            ctx.throw(422, error)
        }
    }

    async logOut(ctx) {
        ctx.logout()
    }

    async forgot(ctx) {
        const email = ctx.request.body.email
        const host = process.env.REQUEST_HOST
        const token = new rand(/[a-zA-Z0-9_-]{64,64}/).gen()
        const notificaion = process.env.SEND_MAIL
        const reseExpiration = Date.now() + 3600000 // 1 hour

        if (!email || !host || !token) {
            ctx.throw(404, 'INVALID_DATA')
        }

        let resetData = {
            passwordResetToken: token,
            passwordResetExpires: reseExpiration,
        }

        try {
            const result = await User.findOneAndUpdate(
                { email: email },
                resetData
            )
            if (result && notificaion === 'yes') {
                utils.sendEmailForgotPassword(email, token, host)
            }
            if (result && !result.message)
                return (ctx.body = (200, { message: 'email was sent' }))
        } catch (error) {
            ctx.throw(400, 'INVALID_DATA')
        }
    }

    async resetPassword(ctx) {
        const passwordResetToken = ctx.request.body.passwordResetToken
        let password = ctx.request.body.password

        let foundUser = await User.findOne({
            passwordResetToken: passwordResetToken,
        })
        if (!foundUser)
            return ctx.throw(
                422,
                'Password reset token is invalid or has expired.'
            )

        password = await bcrypt.hash(password, 10)
        let userObj = {
            password: password,
            passwordResetToken: null,
            passwordResetExpires: null,
        }

        try {
            const updatedUser = await User.findOneAndUpdate(
                { passwordResetToken: passwordResetToken },
                userObj
            )
            if (!updatedUser)
                return ctx.throw(
                    422,
                    'Something went wrong, please try again later.'
                )
            ctx.body = { message: 'SUCCESS' }
        } catch (error) {
            ctx.throw(422, 'Password reset token is invalid or has expired.')
        }
    }

    async updatePassword(ctx) {
        const userId = ctx.request.body.id
        const passwordConfirmation = ctx.request.body.passwordConfirmation
        let password = ctx.request.body.password

        if (passwordConfirmation !== password)
            ctx.throw(422, 'Password and password confirmation did not match!')

        password = await bcrypt.hash(password, 10)
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { password: password }
            )
            ctx.body = 'Success!'
        } catch (error) {
            ctx.throw(422, 'Unable to update your password, please try again!')
        }
    }

    // this is call when browser is refresh on the frontend - it resends the user data
    async account(ctx) {
        ctx.body = ctx.state.user
    }

    async updateAccount(ctx) {
        const userId = ctx.request.body.id
        const userData = ctx.request.body

        if (userData.email) {
            userData.avatar = utils.gravatar(userData.email)
        }

        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                userData,
                { new: true }
            )
            ctx.body = updatedUser.userToJSON()
        } catch (error) {
            ctx.throw(422, 'Update profile fail!')
        }
    }

    async deleteUser(ctx) {
        const userId = ctx.request.body.id
        console.log(userId)

        const deleteUser = await User.deleteOne({ _id: userId })

        if (!deleteUser)
            ctx.throw(422, 'Oops something went wrong, please try again.')

        ctx.body = 'Success!'
    }

    async createQuote(ctx) {
        const data = ctx.request.body
        const quote = new Quote(data)

        const name = data.name
        const email = data.email
        const tel = data.tel || ''
        const site = data.site
        const msg = data.msg
        const reason = 'New Quote'

        try {
            const savedQuote = await quote.save()
            if (!savedQuote)
                return ctx.throw(
                    422,
                    'Quote could not be send. Please try again later.'
                )

            if (savedQuote) {
                utils.sendEmailQuote(name, email, tel, site, msg, reason)
            }
            ctx.body = 'Success!'
        } catch (error) {
            ctx.throw(422, error)
        }
    }

    async sendEmail(ctx) {
        const data = ctx.request.body

        const name = data.name
        const email = data.email
        const tel = data.tel
        const site = data.site
        const msg = data.msg
        const reason = 'New Email'

        utils.sendEmail(name, email, tel, site, msg, reason, function(err) {
            if (err)
                return console.log(
                    'Oops email could not be sent, please try again later.'
                )
            console.log('Email sent!')
        })
        ctx.body = 'Email was sent!'
    }
}

export default UserController
