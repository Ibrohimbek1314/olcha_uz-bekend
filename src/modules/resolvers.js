import model from './module.js'
import token from '../jwt/authToken.js'

export default {

    Mutation:{
        register: async(_, arg, {agent}) => {
            try {				
				const  user  = await model.register(arg)

				if(user) {
                    return {
						status: 200,
						message: "OK",
						user: user,
                        token: token.sign({user_id: user.user_id,  agent: agent})
					}
				} else throw new Error("ok ok")
			} catch(er) {
                console.log(er);
				return {
					status: 400,
					message: er.message,
					data: null
				}
			}
        },

        login: async(_, log, {agent}) => {
            try{
                const user_log = await model.login(log)
                console.log(user_log.user_id);
                if(user_log){
                    return{
                        status: "200",
                        message: "malades",
                        login: user_log,
                        token: token.sign({user_id: user_log[0].user_id, agent: agent})
                    }
                }else throw new Error("vapwe malades")
            }catch(er){ 
                return { 
                    status: 400,
                    message: er.message,
                    data: null
                }

            }
        },

        addProduct: async (_, args, {agent}) => {
            try{
                const addproduct = await model.addProduct(args)
                if(addproduct){
                    return{
                        status: "200",
                        message: "qoshildi",
                        products: addproduct
                    }
                }
            }catch(er){
                return{
                    status: 400,
                    message: er.message,
                    data: null
                }
            }
        },


        addOrder: async (_, {productId}, {user_id}) => {
            try{ 
                console.log("resolver", productId,user_id);
                const addorder = await model.addOrder( user_id, productId, 500)
                // console.log(addorder);
                if(addorder){
                    return{
                        status: "200",
                        message: "vapwe malades",
                        order: addorder
                    }
                }
            }catch(er) {
                return{
                    status:400,
                    message: er.message,
                    data: null

                }
            }
        }

    },



    Query: {
        categories: (_,args) => {
            return model.categories(args)
        },
        
        products: (_, product) => {
            return model.products(product)
        },  
        
        users: async (_, us) => {
            return await model.users(us)
        },

        orders: (_, order) => {
            return model.orders(order)
        },

        statistics: (_, arg) => {
            return model.statistics(arg)
        },
    },
    
    Categorie: {
        categorieId: global => global.categorie_id,
        categorieName: global => global.categorie_name,
    },

    Products:{
        productId: parent => parent.product_id,
        categorieId: parent => parent.categorie_id,
        productName: parent => parent.product_name,
        productPrice: parent => parent.product_price,
    },
    
    User: {
        userId: parent => parent.user_id,
        userRole: parent => parent.user_role,
    },
    
    Order: {
        userId: order => order.user_id,
        productId: order => order.product_id,
        totalPrice: order => order.total_price,
        isPaid: order => order.is_paid,
    },
    
    Statistica: {
        orderId: parent => parent.order_id,
        totalMoney: parent => parent.total_money,
        theMostSoldProduct: parent => parent.the_most_sold_product,
        theLeastSoldProduct: parent => parent.the_least_sold_product
    }
}
