<template>
    <div class="voucher-create">
        <div class="header">
            <Breadcrums :title="'abc'">
                <div>
                    abc
                </div>
            </Breadcrums>
        </div>
        <div class="create">
            <a-form ref="formRef" :model="formState">
                <div class="txt-code">
                    <label for="code"> Mã Voucher<span style="color:red">*</span></label>
                </div>
                <a-form-item ref="code" name="code">
                    <a-input v-model:value="formState.code" />
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "VoucherCreate",
    data() {
        return {
            formState: {
                code: '',
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.voucher-create {
    .create {
        max-width: 1100px;
        margin: 0 auto;
    }
}
</style>