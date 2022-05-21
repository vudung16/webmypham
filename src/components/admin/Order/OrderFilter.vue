<template>
    <div>
        <div class="order-filter">
            <a-row :gutter="[15, 15]">
                <a-col :md="{ span: 24 }" :lg="{ span: 8 }">
                    <a-input-search placeholder="Tìm kiếm mã đơn hàng, tên, SĐT Khách hàng" enter-button
                        v-model="filter.textSearch" @search="(values) => onChange('keySearch', values)" />
                </a-col>

                <a-col :md="{ span: 24 }" :lg="{ span: 8 }">
                    <a-range-picker class="full-width" @change="(values) => onChange('dates', values)"
                        :format="dateFormatList" :value="[filter.startDate, filter.endDate]" valueFormat="YYYY-MM-DD"
                        :placeholder="['Từ ngày', 'Đến ngày']">
                    </a-range-picker>
                </a-col>
                <a-col :md="{ span: 12 }" :lg="{ span: 8 }">
                    <a-select placeholder="Tỉnh/ Thành phố" :allowClear="true" class="full-width" v-model="p_code"
                        @change="(value) => onChange('province', value)">
                        <a-select-option v-for="province in listProvince" :value="province.ProvinceID"
                            :key="province.ProvinceID">
                            {{ province.ProvinceName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :md="{ span: 12 }" :lg="{ span: 8 }">
                    <a-select placeholder="Quận/ Huyện" :allowClear="true" class="full-width" v-model="d_code"
                        @change="(value) => onChange('district', value)">
                        <a-select-option v-for="district in listDistrict" :value="district.DistrictID"
                            :key="district.DistrictID">
                            {{ district.DistrictName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :md="{ span: 12 }" :lg="{ span: 8 }">
                    <a-select placeholder="Phường/ Xã" :allowClear="true" class="full-width" v-model="v_code"
                        @change="(value) => onChange('village', value)">
                        <a-select-option v-for="village in listVillage" :value="village.WardCode"
                            :key="village.WardCode">
                            {{ village.WardName }}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import api from "../../../api/homewebview";
export default {
    props: ["tabStatus"],
    data() {
        return {
            dateFormatList: ["DD/MM/YYYY", "DD/MM/YY"],
            filter: {
                textSearch: "",
                startDate: "",
                endDate: "",
                d_code: '',
                p_code: '',
                v_code: '',
            },
            listProvince: [],
            listDistrict: [],
            listVillage: [],
            d_code: undefined,
            p_code: undefined,
            v_code: undefined,
        };
    },
    watch: {
        p_code: function (newValue, oldValue) {
            let params = {
                province_id: newValue
            }
            this.getDistrict(params);
        },
        d_code: function (newValue, oldValue) {
            let params = {
                district_id: newValue
            }
            this.getWard(params);
        },
    },
    mounted() {
        this.getCity();
    },
    methods: {
        onChange(fieldSearch, value) {
            if (fieldSearch === "dates") {
                const startDate = value[0];
                const endDate = value[1];
                this.filter = { ...this.filter, startDate, endDate };
            } else if (fieldSearch === "keySearch") {
                this.filter = { ...this.filter, textSearch: value };
            } else if (fieldSearch === "province") {
                this.p_code = value;
                this.filter = { ...this.filter, p_code: value };
            } else if (fieldSearch === "district") {
                this.d_code = value;
                this.filter = { ...this.filter, d_code: value, v_code: undefined };
            } else if (fieldSearch === "village") {
                this.filter = { ...this.filter, v_code: value };
            }
            this.$router.push({
                name: 'Order',
                query: { ...this.$route.query, ...this.filter,  status: this.tabStatus},
            });
        },
        async getCity() {
            // this.loading = false;
            let res = await api.getCity();
            this.listProvince = res;
            // this.loading = true;
        },

        async getDistrict(params) {
            let res = await api.getDistrict(params);
            this.listDistrict = res;
        },

        async getWard(params) {
            let res = await api.getWard(params);
            this.listVillage = res;
        },
    },
};
</script>
<style lang="scss" scoped>
.order-filter {
    .ant-select {
        width: 100% !important;
    }
}
</style>
