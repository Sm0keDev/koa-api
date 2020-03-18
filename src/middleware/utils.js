import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import crypto from 'crypto'

var utils = {}

const transport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SENDGRID_USER_NAME,
        pass: process.env.SENDGRID_PASSWORD,
    },
})

const htmlstring = txt => {
    return txt.replace(/(\r\n|\n|\r)/gm, '<br>')
}

const emailTo = process.env.EMAIL_TO
const companyName = process.env.COMPANY_NAME
const companyEmail = process.env.COMPANY_EMAIL
const companyUrl = process.env.COMPANY_URL
const companyTagline = process.env.COMPANY_TAG_LINE
const companyAddress = process.env.COMPANY_ADDRESS

utils.sendNewUserEmail = email => {
    email =
        typeof email == 'string' &&
        email.trim().length > 0 &&
        email.trim().length <= 60
            ? email.trim()
            : false
    if (email) {
        const payload = {
            from: companyName + ' ' + '<' + companyEmail + '>',
            to: emailTo,
            subject: 'New user was has been created at ' + companyName,
            html: `<h1>New user was created</h1><br><p>Email: ${email}</p>`,
        }
        transport.sendMail(payload, error => {
            if (error) {
                return console.log(
                    'Oops could not send email, please try again later.'
                )
            }
            console.log('Email sent!')
        })
    }
}

utils.sendEmailForgotPassword = function(email, token, host) {
    if (email && token && host) {
        const title = 'Reset Password'
        const buttonTitle = 'Reset Password'
        const buttonLink = `${host}/#/reset/${token}`
        const content = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\ Please click on the button below to complete the process.\ If you did not request this, please ignore this email and your password will remain unchanged.`
        var payload = {
            to: email,
            from: companyName + ' ' + '<' + companyEmail + '>',
            subject: `Password reset from ${companyName}`,
            template: 'reset-password',
            context: {
                companyName: companyName,
                companyUrl: companyUrl,
                companyTagline: companyTagline,
                companyAddress: companyAddress,
                title: title,
                content: htmlstring(content),
                buttonTitle: buttonTitle,
                buttonLink: buttonLink,
            },
        }
        // pass handlebar options to send full html/hbs template email
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: 'src/views/partials',
                layoutsDir: 'src/views/layouts',
                defaultLayout: '',
            },
            viewPath: 'src/views/emails',
            extName: '.hbs',
        }
        transport.use('compile', hbs(handlebarOptions))
        transport.sendMail(payload, function(error, info) {
            if (error) {
                console.log(
                    'Oops could not send email, please try again later.'
                )
            } else {
                return console.log('Email sent!')
            }
        })
    }
}

utils.sendEmailQuote = function(name, email, tel, site, msg, reason) {
    // Validate parameters
    name =
        typeof name == 'string' &&
        name.trim().length > 0 &&
        name.trim().length <= 60
            ? name.trim()
            : false
    email =
        typeof email == 'string' &&
        email.trim().length > 0 &&
        email.trim().length <= 60
            ? email.trim()
            : false
    msg =
        typeof msg == 'string' &&
        msg.trim().length > 0 &&
        msg.trim().length <= 1600
            ? msg.trim()
            : false

    if (name && email && msg) {
        // Configure the request payload
        var payload = {
            from: name + ' ' + '<' + email + '>',
            to: emailTo,
            subject: 'From: ' + name + ' - ' + 'Reason: ' + reason,
            tel: tel,
            site: site,
            html: 'NEW QUOTE: ' + '<br><br>' + msg,
        }
        transport.sendMail(payload, function(error) {
            if (error) {
                console.log(
                    'Oops could not send email, please try again later.'
                )
            } else {
                console.log('Email sent!')
            }
        })
    }
}

utils.sendEmail = function(name, email, tel, site, msg, reason) {
    // Validate parameters
    msg =
        typeof msg == 'string' &&
        msg.trim().length > 0 &&
        msg.trim().length <= 1600
            ? msg.trim()
            : false
    email =
        typeof email == 'string' &&
        email.trim().length > 0 &&
        email.trim().length <= 60
            ? email.trim()
            : false

    if (email && msg) {
        // Configure the request payload for mail with template
        const mailOptions = {
            from: name + ' ' + '<' + email + '>',
            to: emailTo,
            subject: 'From: ' + name + ' - ' + 'Reason: ' + reason,
            // template name
            template: 'contact-form',
            context: {
                companyName: companyName,
                companyUrl: companyUrl,
                tel: tel,
                name: name,
                msg: msg,
                email: email,
                site: site,
            },
        }

        // pass handlebar options to send full html/hbs template email
        const handlebarOptions = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: 'src/views/partials',
                layoutsDir: 'src/views/layouts',
                defaultLayout: '',
            },
            viewPath: 'src/views/emails',
            extName: '.hbs',
        }
        transport.use('compile', hbs(handlebarOptions))

        transport.sendMail(mailOptions, function(error) {
            if (error) {
                console.log(
                    'Oops email could not be sent. Please try again later'
                )
            } else {
                console.log('Email sent!')
            }
        })
    }
}

utils.gravatar = email => {
    const size = 200
    if (!email) return `https://gravatar.com/avatar/?s=${size}&d-mp`
    const md5 = crypto
        .createHash('md5')
        .update(email)
        .digest('hex')
    return `https://gravatar.com/avatar/${md5}?S=${size}&d=mp`
}

utils.parseJsonToObject = str => {
    try {
        const obj = JSON.parse(str)
        return obj
    } catch (error) {
        return {}
    }
}

utils.gravatar = email => {
    const size = 200
    if (!email) return `https://gravatar.com/avatar/?s=${size}%d=mp`
    const md5 = crypto
        .createHash('md5')
        .update(email)
        .digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=mp`
}

module.exports = utils
