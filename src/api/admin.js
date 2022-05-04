import axios from "axios";

export default {
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
    }
}