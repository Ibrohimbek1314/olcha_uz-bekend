import fetch from '../../utils/postgres.js'



const CATEGORIES = `
    select 
        *
    from categories
`
const PRODUCTS =`
    select
        product_id,
        categorie_id,
        product_name,
        product_price,
        shortDescription,
        longDescription,
        count,
        picture
    from products
    where
    case
        when $1 > 0 then product_id = $1
        else true
    end and
    case 
        when length ($2) > 0 then (
            product_name ilike concat('%', $2, '%')
        ) else true
    end
    order by product_id
    offset $3 limit $4
 
` 

const USERS = `
    select 
        user_id,
        username,
        contact,
        email,
        user_role
    from users
    where
    case
        when $1 > 0 then user_id = $1
        else true
    end and
    case
        when $2 > 0 then  (
            username ilike concat('%', $2, '%')
        ) else true
    end 
    order by user_id
    offset $3 limit $4 
`

const ORDERS = `
    select 
        *  
    from orders
`

const STATISTICS =`
    select 
        *
    from statistics
`

const LOGIN =`
        select 
            *      
        from users
        where $1 = username and password = crypt($2, password)
`   

const REGISTER =`
        insert into users (username, password, contact, email) values
        ($1, crypt($2, gen_salt('bf')), $3, $4)
        returning *
`

const AddPRODUCT = `
        insert into products (categorie_id, product_name, product_price, shortDescription, longDescription, count) values
        ($1, $2, $3, $4, $5, $6) 
        returning *
`

const AddORDER = `
        insert into orders(user_id,product_id, total_price) values
        ($1,$2,$3)
        returning *
` 


function categories () {
    return fetch(CATEGORIES)
}

function products ({ pagination: {page, limit}, search, productId}) {
    return fetch(PRODUCTS, productId, search, (page - 1) * limit, limit)
}

function users ({pagination: {page, limit}, search, userId}) {
    return fetch (USERS, userId, search, (page - 1) * limit, limit)
}

function orders () {
    return fetch (ORDERS)
}

function statistics () {
    return fetch (STATISTICS)
}

async function login ({username, password}) {
    return await fetch(LOGIN, username, password)
}

async function register ({username, password, contact, email}) {
    return await  fetch(REGISTER,  username, password, contact, email)
}

async function addProduct({categorie_id, product_name, product_price, shortDescription, longDescription, count}) {
    return await fetch(AddPRODUCT, categorie_id, product_name, product_price, shortDescription, longDescription, count)
}

async function addOrder(user_id, productId, price) {
    console.log(price);
    return await fetch(AddORDER, user_id, productId, price)
}

export default {
    products,
    categories,
    orders,
    users,
    statistics,
    login,
    register,
    addProduct,
    addOrder
}
