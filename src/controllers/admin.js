import User from '../models/User'
import _data from '../middleware/data'

class AdminController {
    async getUsers(ctx) {
        const perPage = 2
        const page = ctx.params.page || 1

        try {
            const users = await User.find({})
                .select('-password')
                .skip(perPage * page - perPage)
                .limit(perPage)

            if (users.length <= 0) return ctx.throw(422, 'No users found!')

            const totalItems = await User.countDocuments({})

            return (ctx.body = {
                totalItems: totalItems,
                perPage: perPage,
                users: users,
            })
        } catch (error) {
            return ctx.throw(422, error)
        }
    }

    async getUser(ctx) {
        try {
            const user = await User.findById({ _id: ctx.params.id }).select({
                profile: 1,
                email: 1,
                createdAt: 1,
                role: 1,
                avatar: 1,
                settings: 1,
                createdAt: 1,
            })

            if (!user) return ctx.throw(422, 'No user found!')

            return (ctx.body = user)
        } catch (error) {
            return ctx.throw(422, error)
        }
    }

    async updateSettings(ctx) {
        const userId = ctx.params.id
        const userData = ctx.request.body
        const obj = {
            settings: {
                newUser: userData.newUser,
                newQuote: userData.newQuote,
            },
        }

        try {
            const user = await User.findByIdAndUpdate(userId, obj, {
                new: true,
            })

            if (!user) ctx.throw(422, 'Could not update user settings')

            const settingId = process.env.SETTING_ID

            if (user && settingId) {
                const settingsObject = {
                    settingId: settingId,
                    newUser: userData.newUser,
                    newQuote: userData.newQuote,
                }

                // Update local settings file
                _data.update('settings', settingId, settingsObject, function(
                    err
                ) {
                    if (!err) {
                        console.log('Success!')
                    } else {
                        console.log('Could not save file data')
                    }
                })
            }

            return (ctx.body = user.userToJSON())
        } catch (error) {
            return ctx.throw(422, error)
        }
    }
}

export default AdminController
