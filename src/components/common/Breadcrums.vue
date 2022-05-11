<template>
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="Title" :breadcrumb="{ props: { routes } }"
        sub-title="This is a subtitle" />
</template>
<script>
export default {
    data() {
        return {
            routes: [
                {
                    path: '/admin/voucher/create',
                    breadcrumbName: 'First-level Menu',
                },
                {
                    path: 'first',
                    breadcrumbName: 'Second-level Menu',
                },
                {
                    path: 'second',
                    breadcrumbName: 'Third-level Menu',
                },
            ],
        };
    },
};
</script>