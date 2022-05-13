<template>
    <div class="update-voucher">
        <VoucherCreate :type="'edit'" />
    </div>
</template>
<script>
import VoucherCreate from './create.vue'
export default {
    name: "VoucherUpdate",
    components: {
        VoucherCreate
    }
}
</script>