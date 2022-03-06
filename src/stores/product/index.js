import api from '../../api/homewebview'

export const product = {
    namespaced: true,
    state: {
        cartData: {},
        categoryProduct: {},
        getCart: {},
    },
    getters: {
        cartData: state => state.cartData,
        categoryProduct: state => state.categoryProduct,
        getCart: state => state.getCart,
    },
    mutations: {
        cartData(state, data) {
            state.cartData = data
        },
        categoryProduct(state, data) {
            state.categoryProduct = data
        },
        getCart(state, data) {
            state.getCart = data
        },
    },
    actions: {
        cartData: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.cartData({
                        user_id: rootGetters['auth/user'].id,
                        product_id: data.product_id,
                        quantity: data.quantity,
                        type: data.type
                    });
                    commit('cartData', res);
                    resolve(res)
                } catch (error) {
                    console.log("cartData:  ", error);
                    reject(error);
                }
            });
        },
        categoryProduct: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.categoryProduct({
                        category_id: data.category_id,
                        brand: data.filter.brand,
                        total: data.filter.total,
                        arrange: data.arrange
                    });
                    commit('categoryProduct', res);
                    resolve(res)
                } catch (error) {
                    console.log("categoryProduct:  ", error);
                    reject(error);
                }
            });
        },

        getCart: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.getCart({
                        user_id: rootGetters['auth/user'].id,
                        status: data.status,
                    });
                    commit('getCart', res);
                    resolve(res)
                } catch (error) {
                    console.log("getCart:  ", error);
                    reject(error);
                }
            });
        },
        
    },
}