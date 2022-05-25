<template>
    <div style="text-align: center;">
        <img src="../../../assets/images/not-found.jpg" alt=""><br>
        <a-button style="background: #d82e4d; color: #ffffff" @click="redirect">Quay lại trang chủ</a-button>
    </div>
</template>
<script>
export default {
    methods: {
        redirect() {
            this.$router.push({name: 'Home'});
        }
    }
}
</script>