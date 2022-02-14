import {gql} from 'apollo-server-express'
import {readFileSync} from 'fs'
import path from 'path'

import resolvers from './resolvers.js'
const typeDefs =readFileSync (path.join( process.cwd(), 'src', 'modules', 'schema.gql' ))


export default {    
    resolvers,
    typeDefs: gql`${typeDefs}`
}