import {createStore} from 'vuex';
import {auth} from './auth/index';
import {product} from './product/index';
import {admin} from './admin/index';


export const store = createStore({
    modules: {
        auth,
        product,
        admin,
    }
});