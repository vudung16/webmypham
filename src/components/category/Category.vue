<template>
    <div class="category-left">
        <div class="brand">
            <h1>Trang điểm</h1>
            <div class="arrange">
                <div class="text">Sắp xếp:</div>
                <div class="select">
                    <a-menu v-model:selectedKeys="current" mode="horizontal">
                        <a-menu-item key="az">Tên A -> Z</a-menu-item>
                        <a-menu-item key="za">Tên Z -> A </a-menu-item>
                        <a-menu-item key="plus">Giá tăng dần </a-menu-item>
                        <a-menu-item key="reduction">Giá giảm dần </a-menu-item>
                    </a-menu>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: ['az'],
            search: {
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.arrange {
    display: flex;
    align-items: center;
    .text {
        width: 80px;
        font-size: 17px;
    }
    .select {
        width: 100%;
        .ant-menu-overflow {
            background-color: #f2f2f2;
        }
    }
}
</style>