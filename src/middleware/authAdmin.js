export default async function auth({ next, router, store }) {
    if (localStorage.getItem('token')) {
        return next();
    } else {
        await store.dispatch('auth/getMyInfo')
        .then(() => {
            console.log('abc');
            if(store.state.auth.user.role === 2) {
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