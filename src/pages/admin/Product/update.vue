<template>
    <div class="update-product">
        <ProductCreate :type="'edit'" />
    </div>
</template>
<script>
import ProductCreate from './create.vue'
export default {
    name: "ProductUpdate",
    components: {
        ProductCreate
    }
}
</script>