'use strict'

require('dotenv').config()

import mongoose from 'mongoose'
import Quote from '../models/Quote'
import User from '../models/User'
import data from '../seed/data'

class DB {
    constructor() {
        this.quotes = data.quotes
        this.users = data.users
        this.models = [User, Quote]
    }

    async cleanDb() {
        for (let model of this.models) {
            await model.deleteMany({}, () => {})
        }
    }

    async pushDataToDb() {
        await this.quotes.forEach(async quote => {
            await new Quote(quote).save(() => {})
        })

        await this.users.forEach(async user => {
            await new User(user).save(() => {})
        })

        console.log('Database Populated!')
    }

    async seedDb() {
        await this.cleanDb()
        await this.pushDataToDb()
    }
}

const dbUri = process.env.DB_URI
mongoose
    .connect(dbUri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        const db = new DB()
        await db.seedDb()
        console.log('You can close connection now!')
    })
    .catch(err => console.log(err))
