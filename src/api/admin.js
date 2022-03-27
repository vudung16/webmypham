import axios from "axios";

export default {
    responseTime: (data) => {
        console.log(data);
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
}