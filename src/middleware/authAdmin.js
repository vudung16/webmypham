export default async function auth({ next, router, store }) {
    if (!localStorage.getItem('token')) {
      return router.push({ name: 'Login' });
    } else {
        await store.dispatch('auth/getMyInfo');
        if(store.state.auth.user.role === 2) {
            return next();
        } else {
            return router.push({ name: 'Login' });
        }
    }
  }