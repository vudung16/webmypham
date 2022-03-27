import api from '../../api/admin'

export const admin = {
    namespaced: true,
    state: {
        responseTime: {},
    },
    getters: {
        dataResponseTime: state => state.responseTime,
    },
    mutations: {
        updateResponseTime(state, data) {
            state.responseTime = data
        },
    },
    actions: {
        responseTime: async function({state, rootGetters}, data = {}){
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.responseTime({
                        start_date: data.from,
                        end_date: data.to,
                    });
                    state.responseTime = res
                    resolve(res)
                } catch (error) {
                    console.log("responseTime:  ", error);
                }
            });
        },
        
    },
}