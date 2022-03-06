import api from '../../api/auth'
export const auth = {
    namespaced: true,
    state: {
        user: "",
        
    },
    getters: {
        user: state => state.user,
        
    },
    mutations: {
        updateUser(state, key) {
            state.user = key;
        },
    },
    actions: {
        getMyInfo: async function ({state,getters}) {
            // data.type = 'chatbox';
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.authUser();
                    state.user = res;

                    resolve(res);
                } catch (e) {
                    console.log("getMyInfo:  ", e);
                    reject(e);
                }
            });
        },
    },
}