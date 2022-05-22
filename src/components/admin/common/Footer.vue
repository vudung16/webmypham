<template>
    <div>
        <a-row class="footer-admin" align="middle">
            <a-col class="footer-left" :span="12">
                <div>
                    2018 © Copyright - All Rights Reserved. Theme By ManhDung
                </div>
            </a-col>
            <a-col :span="12">
                <div class="footer-right">
                    <div>
                        Hotline: <b>0386132297</b>&ensp;
                    </div>
                    <div>|</div>&ensp;
                    <div>
                        <a href="#">Hướng dẫn</a>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style lang="scss" scoped>
.footer-admin {
    .footer-right {
        display: flex;
    }
}
</style>