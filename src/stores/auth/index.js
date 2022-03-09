import api from '../../api/auth'
export const auth = {
    namespaced: true,
    state: {
        user: "",
        myId: "",
        
    },
    getters: {
        user: state => state.user,
        myId: state => state.myId,
        
    },
    mutations: {
        updateUser(state, key) {
            state.user = key;
        },
        updateMyId(state, key) {
            state.myId = key
        },
    },
    actions: {
        getMyInfo: async function ({state,getters}) {
            // data.type = 'chatbox';
            return new Promise(async (resolve, reject) => {
                try {
                    let res = await api.authUser();
                    state.user = res;
                    state.myId = res.id;

                    resolve(res);
                } catch (e) {
                    console.log("getMyInfo:  ", e);
                    reject(e);
                }
            });
        },
    },
}