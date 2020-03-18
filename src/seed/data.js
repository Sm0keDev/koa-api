const mongoose = require('mongoose')

const user1 = mongoose.Types.ObjectId()
const user2 = mongoose.Types.ObjectId()
const user3 = mongoose.Types.ObjectId()
const user4 = mongoose.Types.ObjectId()
const user5 = mongoose.Types.ObjectId()
const user6 = mongoose.Types.ObjectId()
const user7 = mongoose.Types.ObjectId()
const user8 = mongoose.Types.ObjectId()
const user9 = mongoose.Types.ObjectId()
const user10 = mongoose.Types.ObjectId()
const user11 = mongoose.Types.ObjectId()
const user12 = mongoose.Types.ObjectId()
const user13 = mongoose.Types.ObjectId()
const user14 = mongoose.Types.ObjectId()
const user15 = mongoose.Types.ObjectId()
const user16 = mongoose.Types.ObjectId()
const user17 = mongoose.Types.ObjectId()
const user18 = mongoose.Types.ObjectId()
const user19 = mongoose.Types.ObjectId()
const user20 = mongoose.Types.ObjectId()

const quote1 = mongoose.Types.ObjectId()
const quote2 = mongoose.Types.ObjectId()
const quote3 = mongoose.Types.ObjectId()
const quote4 = mongoose.Types.ObjectId()
const quote5 = mongoose.Types.ObjectId()
const quote6 = mongoose.Types.ObjectId()

module.exports = {
    users: [
        {
            _id: user1,
            email: 'me@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'admin',
            profile: {
                name: 'David',
                location: 'Santa Ana, CA',
                gender: 'Male',
                website: '',
            },
            settings: {
                newUser: false,
                newQuote: false,
            },
        },
        {
            _id: user2,
            email: 'me2@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'David',
                location: 'Santa Ana, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user3,
            email: 'me3@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'David',
                location: 'Santa Ana, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user4,
            email: 'me4@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'David',
                location: 'Santa Ana, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user5,
            email: 'me5@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Memem',
                location: 'Culver City, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user6,
            email: 'me6@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Saul G.',
                location: 'San Diego, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user7,
            email: 'me7@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Lucky One',
                location: 'Las Brisas, CA',
                gender: 'Female',
                website: '',
            },
        },
        {
            _id: user8,
            email: 'me8@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Maximus',
                location: 'San Jose, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user9,
            email: 'me9@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Tom Tim',
                location: 'El Pito, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user10,
            email: 'me10@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Lin Jhon',
                location: 'San Diego, CA',
                gender: 'Female',
                website: '',
            },
        },
        {
            _id: user11,
            email: 'me11@me.com',
            avatar:
                'https://gravatar.com/avatar/6d4ab0cdad42f7d63074fa6d76073545?s=200&d=robohash&r=x',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Arthur G',
                location: 'Cupertino, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user12,
            email: 'me12@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Aida Lina',
                location: 'Feliz City, CA',
                gender: 'Female',
                website: '',
            },
        },
        {
            _id: user13,
            email: 'me13@me.com',
            avatar:
                'https://gravatar.com/avatar/6d4ab0cdad42f7d63074fa6d76073545?s=200&d=robohash&r=x',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'King Arthur',
                location: 'Cupertino, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user14,
            email: 'me14@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Lindador G',
                location: 'Phoenix, AZ',
                gender: 'Female',
                website: '',
            },
        },
        {
            _id: user15,
            email: 'me15@me.com',
            avatar:
                'https://gravatar.com/avatar/6d4ab0cdad42f7d63074fa6d76073545?s=200&d=robohash&r=x',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Strophie Lyn',
                location: 'Quito, EQ',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user16,
            email: 'me16@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Blanco Nieve',
                location: 'North Pole, QB',
                gender: 'Female',
                website: '',
            },
        },
        {
            _id: user17,
            email: 'me17@me.com',
            avatar:
                'https://gravatar.com/avatar/6d4ab0cdad42f7d63074fa6d76073545?s=200&d=robohash&r=x',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Kentucky Ho',
                location: 'China, EQ',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user18,
            email: 'me18@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Franck S.',
                location: 'North Hills, CA',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user19,
            email: 'me19@me.com',
            avatar:
                'https://gravatar.com/avatar/6d4ab0cdad42f7d63074fa6d76073545?s=200&d=robohash&r=x',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Francis II',
                location: 'New Mexico, NM',
                gender: 'Male',
                website: '',
            },
        },
        {
            _id: user20,
            email: 'me20@me.com',
            avatar:
                'https://robohash.org/6d4ab0cdad42f7d63074fa6d76073545?set=set3&bgset=&size=200x200',
            password: 'Password#1',
            role: 'customer',
            profile: {
                name: 'Twenty',
                location: 'Twenty Hills, KL',
                gender: 'Female',
                website: '',
            },
        },
    ],
    quotes: [
        {
            _id: quote1,
            name: 'Bratislava',
            email: 'email1@email.com',
            tel: '818-555-1111',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
        {
            _id: quote2,
            name: 'Monica L',
            email: 'email2@email.com',
            tel: '818-555-2222',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
        {
            _id: quote3,
            name: 'Bristol M',
            email: 'email3@email.com',
            tel: '818-555-3333',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
        {
            _id: quote4,
            name: 'Jose M',
            email: 'email4@email.com',
            tel: '818-555-4444',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
        {
            _id: quote5,
            name: 'Luck Joe',
            email: 'email5@email.com',
            tel: '818-555-5555',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
        {
            _id: quote6,
            name: 'Team LA',
            email: 'email6@email.com',
            tel: '818-555-6666',
            site: 'mysite.com',
            msg:
                'Some description of this event. I dont know what to talk about',
        },
    ],
}
