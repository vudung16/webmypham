import api from '../../api/homewebview'

export const product = {
    namespaced: true,
    state: {
        cartData: {},
        categoryProduct: {},
    },
    getters: {
        cartData: state => state.cartData,
        categoryProduct: state => state.categoryProduct,
    },
    mutations: {
        cartData(state, data) {
            state.cartData = data
        },
        categoryProduct(state, data) {
            state.categoryProduct = data
        },
    },
    actions: {
        cartData: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.cartData({
                        user_id: 1,
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
        
    },
}