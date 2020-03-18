module.exports = {
    customer: ['/api/v1/user', '/api/v1/user/account', '/api/v1/user/delete'],
    admin: [
        '/api/v1/admin',
        '/api/v1/user',
        '/api/v1/user/account',
        '/api/v1/admin/users/*',
        '/api/v1/quotes',
    ],
}
