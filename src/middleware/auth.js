export default async function auth({ next, router, store }) {
    if (localStorage.getItem('token')) {
      await store.dispatch('auth/getMyInfo')
      return next();
    } else {
      await store.dispatch('auth/getMyInfo')
      .then(() => {
        if (store.state.auth.user.role === 1 || store.state.auth.user.role === 2) {
          store.dispatch('product/cartData', {product_id:'', quatity:''});
          return next();
        } else {
          return router.push({ name: 'Login' });
        }
      })
      .catch((err) => {
        if(err.response.status) {
            return router.push({ name: 'Login' });
        }
      })
    }
  }