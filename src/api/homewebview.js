import axios from 'axios';
export default {

    //Lấy slide
    getSlide: () => {
        const url = `http://127.0.0.1:2223/api/home-slide`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    //sản phẩm
    getProduct: () => {
        const url = `http://127.0.0.1:2223/api/home-product`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy sản phẩm giảm giá
    productsDiscount: () => {
        const url = `http://127.0.0.1:2223/api/product-discount`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy sản phẩm bán chạy
    productsSelling: () => {
        const url = `http://127.0.0.1:2223/api/product-selling`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    //lấy chi tiết sản phẩm
    productDetail: (data) => {
        const url = `http://127.0.0.1:2223/api/product-detail`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // lấy danh sách category đổ vào header
    getCategory: () => {
        const url = `http://127.0.0.1:2223/api/category`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // thêm vào giỏ hàng vuex
    cartData: (data) => {
        const url = `http://127.0.0.1:2223/api/add-to-cart`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    // Api vận chuyển tỉnh, thành phố

    getCity: () => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.get(url, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
            }).then((response) => {
                    resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getDistrict: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getWard: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    getService: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    shippingOrder: (data) => {
        const url = `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`;
        let config = {
            headers: {
              token: '9dd53078-7773-11ec-b18b-3a9c67615aba',
              shop_id: 2448165
            }
        }
        return new Promise((resolve, reject) => {
            axios.post(url, data, config, {
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },


    // Thanh toán

    payment: (data) => {
        const url = `http://127.0.0.1:2223/api/payment`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                resolve(response.data.data);
            }).catch((response) => {
                reject(response);
            })
        });
    },

    //lấy danh sách voucher màn thanh toán
    listVoucher: () => {
        const url = `http://127.0.0.1:2223/api/list-voucher`;
        return new Promise((resolve, reject) => {
            axios.get(url, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data.data);
                } else {
                    reject(response);
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },

    checkVoucher: (data) => {
        const url = `http://127.0.0.1:2223/api/check-voucher`;
        return new Promise((resolve, reject) => {
            axios.post(url, data, {}, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                xsrfCookieName: 'csrftoken_testtest',
                // xsrfHeaderName: 'X-CSRFToken'
            }).then((response) => {
                if (response.data.status === true) {
                    resolve(response.data);
                } else {
                    if(response.data.status === false) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                }
            }).catch((response) => {
                reject(response);
            })
        });
    },
}