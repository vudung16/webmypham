<template>
    <div>
        Vui lòng chờ ...
    </div>
</template>
<script>
export default {
    name: 'LoginFacebook',
    created() {
        this.login();
    },
    methods: {
        login() {
            localStorage.setItem('token', this.$route.query.token);
            this.$router.push('/');
        }
    }
}
</script>