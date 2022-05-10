import axios from "axios";

export default {
    // Báo cáo
    responseTime: (data) => {
        const url = `${process.env.webmyphamapi}admin/dashboard`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    
    //Slide
    listSlide: (data) => {
        const url = `${process.env.webmyphamapi}admin/slide/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteSlide: (data) => {
        const url = `${process.env.webmyphamapi}admin/slide/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createSlide: (data) => {
        const url = `${process.env.webmyphamapi}admin/slide/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    updateSlide: (data) => {
        const url = `${process.env.webmyphamapi}admin/slide/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },

    //Category
    listCategory: (data) => {
        const url = `${process.env.webmyphamapi}admin/category/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteCategory: (data) => {
        const url = `${process.env.webmyphamapi}admin/category/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createCategory: (data) => {
        const url = `${process.env.webmyphamapi}admin/category/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    updateCategory: (data) => {
        const url = `${process.env.webmyphamapi}admin/category/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },

    //Brand
    listBrand: (data) => {
        const url = `${process.env.webmyphamapi}admin/brand/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteBrand: (data) => {
        const url = `${process.env.webmyphamapi}admin/brand/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createBrand: (data) => {
        const url = `${process.env.webmyphamapi}admin/brand/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    updateBrand: (data) => {
        const url = `${process.env.webmyphamapi}admin/brand/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },

    //Voucher
    listVoucher: (data) => {
        const url = `${process.env.webmyphamapi}admin/voucher/list?page=` + data.page;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    deleteVoucher: (data) => {
        const url = `${process.env.webmyphamapi}admin/voucher/delete`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    console.log(response);
                    if (response.data.status) {
                        resolve(response.data.data);
                    } else {
                        reject(response);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    createVoucher: (data) => {
        const url = `${process.env.webmyphamapi}admin/voucher/create`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    },
    updateVoucher: (data) => {
        const url = `${process.env.webmyphamapi}admin/voucher/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    if (response.data.status === true) {
                        resolve(response.data);
                    } else {
                        resolve(response.data);
                    }
                }).catch((response) => {
                reject(response);
            })
        });
    }
}