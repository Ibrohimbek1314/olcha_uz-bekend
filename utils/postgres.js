import pg  from 'pg'

const  pool = new pg.Pool({
    host: process.env.PG_HOST,
    user:process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE,
    port:process.env.PG_PORT,
})

async function model (query, ...params){
    const client = await pool.connect()
    try{
        const { rows } = await client.query(query, params.length ? params: null)
        return rows 
    } catch (error){
        console.log(error)
    } finally{
        client.release()
    }
}

export default model 