const jwt = require('jsonwebtoken')

module.exports.sign = async (user) => {
    const JWT_SECRET = process.env.JWT_SIGN_SECRET
    return new Promise((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email
        }, JWT_SECRET, (err, token) => {
            if (err)
                return reject(err)
            return resolve(token)
        })
    })
}

module.exports.decode = async (token) => {
    const JWT_SECRET = process.env.JWT_SIGN_SECRET
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err)
                return reject(err)
            return resolve(decoded)
        })
    })
}