<template>
    <div class="import-product">
        <div class="header">
            <Breadcrums :title="'Nhập kho'"></Breadcrums>
        </div>
        <div class="content-import">
            <div class="input-search">
                <a-input-search v-model:value="search" placeholder="Tìm kiếm sản phẩm" size="large" @search="onSearch">
                    <template #enterButton>
                        <a-button>Tìm kiếm</a-button>
                    </template>
                </a-input-search>
            </div>
            <div class="list-product">
                <a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="dataList">
                    <template #loadMore>
                    </template>
                    <template #renderItem="{ item }">
                        <a-list-item>
                            <template #actions>
                                <a>chọn</a>
                            </template>
                            <a-list-item-meta
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                                <template #title>
                                    <a href="https://www.antdv.com/">{{ item.name.last }}</a>
                                </template>
                                <template #avatar>
                                    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </template>
                            </a-list-item-meta>
                            <div>content</div>
                        </a-list-item>
                    </template>
                </a-list>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImportProduct',
    data() {
        return {
            search: '',
            loading: false,
            dataList: [
                {
                    gender: "female",
                    name: {
                        title: "Ms",
                        first: "Guro",
                        last: "Gjermundsen"
                    },
                    email: "guro.gjermundsen@example.com",
                    nat: "NO"
                },
                {
                    gender: "female",
                    name: {
                        title: "Ms",
                        first: "Alisa",
                        last: "Pulkkinen"
                    },
                    email: "alisa.pulkkinen@example.com",
                    nat: "FI"
                },
                {
                    gender: "male",
                    name: {
                        title: "Mr",
                        first: "Aramis",
                        last: "Martins"
                    },
                    email: "aramis.martins@example.com",
                    nat: "BR"
                },
                {
                    gender: "male",
                    name: {
                        title: "Mr",
                        first: "David",
                        last: "Williams"
                    },
                    email: "david.williams@example.com",
                    nat: "CA"
                },
                {
                    gender: "female",
                    name: {
                        title: "Mrs",
                        first: "Micha",
                        last: "Koskamp"
                    },
                    email: "micha.koskamp@example.com",
                    nat: "NL"
                }
            ],
        }
    },
    methods: {
        onSearch() {

        }
    }
}
</script>
<style lang="scss">
.content-import {
    padding: 50px 200px 0px 200px;

    .list-product {
        height: 300px;
        overflow: auto;
    }
}
</style>