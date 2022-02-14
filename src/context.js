import  queryParser from './helpers/queryParser.js'
import Token from  './jwt/authToken.js'

export default function ({ req, res }) {
    
    const { operation,  fieldName, variables } = queryParser(req.body)
    
    if(
        fieldName == 'users' || fieldName == 'categories' ||
        fieldName == 'addOrder' || fieldName == 'deletOrder' ||
        fieldName == 'orders' 
    ) {
        let { token } = req.headers
        let { user_id,  agent } = Token.verify(token) 
        return{
            user_id
        }
    }else if(fieldName == 'register' || fieldName == 'login') {
        return {
            agent: req.headers['user-agent']
        }
    } 
    return
}