export default function auth({ next, router, store }) {
    if (!localStorage.getItem('token')) {
      return router.push({ name: 'Login' });
    } else {
        store.dispatch('auth/getMyInfo');
        if(store.state.auth.user.role === 2) {
            return next();
        } else {
            return router.push({ name: 'Login' });
        }
    }
  }