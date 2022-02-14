import jwt from  'jsonwebtoken'

export default {
    sign: (payload) => jwt.sign(payload, "SECRET_KEY"),
    verify: (token) => jwt.verify(token, "SECRET_KEY") 
}