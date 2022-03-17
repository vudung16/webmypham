<template>
    <div class="pagination">
        <a-pagination v-model:current="current" :total="500" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: 1,
        }
    }
}
</script>