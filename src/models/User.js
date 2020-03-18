import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    role: { type: String, default: 'customer' },
    password: {
        type: String,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{8,50})$/,
        ],
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerified: { type: Boolean, default: false },
    google: String,
    avatar: String,
    profile: {
        name: { type: String, default: '' },
        gender: { type: String, default: '' },
        location: { type: String, default: '' },
        website: {
            type: String,
            default: '',
            match: [
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
            ],
        },
        picture: { type: String, default: '' },
    },
    settings: {
        newUser: { type: Boolean, default: false },
        newQuote: { type: Boolean, default: false },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, sallt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, sallt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

//Every user have acces to this methods
userSchema.methods = {
    comparePassword(rawPassword) {
        return bcrypt.compare(rawPassword, this.password)
    },
}

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            email: this.email,
            id: this._id,
            role: this.role,
            xsrfToken: process.env.XSRF_TOKEN,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME }
    )
}

userSchema.methods.userToJSON = function() {
    if (this.role === 'admin') {
        return {
            user: {
                _id: this._id,
                role: this.role,
                avatar: this.avatar,
                email: this.email,
                memberSince: this.createdAt,
                emailVerified: this.emailVerified,
                profile: this.profile,
                createdAt: this.createdAt,
                settings: this.settings,
            },
        }
    }
    return {
        user: {
            _id: this._id,
            role: this.role,
            avatar: this.avatar,
            email: this.email,
            memberSince: this.createdAt,
            emailVerified: this.emailVerified,
            profile: this.profile,
            createdAt: this.createdAt,
        },
    }
}

userSchema.methods.toAuthJSON = function() {
    if (this.role === 'admin') {
        return {
            user: {
                _id: this._id,
                role: this.role,
                avatar: this.avatar,
                email: this.email,
                memberSince: this.createdAt,
                emailVerified: this.emailVerified,
                profile: this.profile,
                settings: this.settings,
            },
            token: this.generateJWT(),
        }
    }
    return {
        user: {
            _id: this._id,
            role: this.role,
            avatar: this.avatar,
            email: this.email,
            memberSince: this.createdAt,
            emailVerified: this.emailVerified,
            profile: this.profile,
        },
        token: this.generateJWT(),
    }
}

userSchema.plugin(uniqueValidator, { message: 'is already in used' })

export default mongoose.model('User', userSchema)
