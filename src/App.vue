<template>
    <router-view></router-view>
</template>
<script>
export default {};
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>
<style>
body {
    margin: 0;
    font-family: "Sarabun", sans-serif !important;
}
.cursor-pointer {
    cursor: pointer;
    user-select: none;
}
::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
div::-webkit-scrollbar-track {
    background: rgba(213, 213, 213, 0.3);
    opacity: 0.6;
}
div::-webkit-scrollbar-thumb {
    background: rgba(164, 164, 164, 0.5);
    opacity: 0.6;
}
</style>
