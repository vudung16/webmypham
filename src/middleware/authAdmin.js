import axios from "axios";

export default async function auth({ from, next, router, to, store }) {
    axios.interceptors.request.use(function (config) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        return config;
    }, function (error) {
        // Do something with request error
        console.log("lỗi req");
        return Promise.reject(error);
    });
    const checkRole = function (path, permission) {
        if (path && permission) {
          if (path.includes("admin/order")) {
            return permission & 1;
          } else if (path.includes("admin/slide")) {
            return permission & 2;
          } else if (path.includes("admin/product")) {
            return permission & 4;
          } else if (path.includes("admin/voucher")) {
            return permission & 8;
          } else if (path.includes("admin/user")) {
            return permission & 16;
          } else if (path.includes("admin/brand")) {
            return permission & 32;
          } else if (path.includes("admin/category")) {
            return permission & 64;
          } else if (path.includes("admin/import")) {
            return permission & 128;
          }
        }
        return true;
    }
    if (!localStorage.getItem('token')) {
        return router.push({ name: 'Login' });
    } else {
        await store.dispatch('auth/getMyInfo')
        .then((res) => {
            if(store.state.auth.user.role === 2) {
                if (!checkRole(to.path, res.role_admin)) {
                    window.location.href = `${process.env.homePage}#/error`
                } else {
                    return next();
                }
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