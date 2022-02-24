import api from '../../api/homewebview'

export const product = {
    namespaced: true,
    state: {
        cartData: {},
    },
    getters: {
        cartData: state => state.cartData,
    },
    mutations: {
        cartData(state, data) {
            state.cartData = data
        },
    },
    actions: {
        cartData: async function({commit, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.cartData({
                        user_id: 1,
                        product_id: data.product_id,
                        quantity: data.quantity
                    });
                    commit('cartData', res);
                    resolve(res)
                } catch (error) {
                    console.log("cartData:  ", error);
                    reject(error);
                }
            });
        },
        
    },
}