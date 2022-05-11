import { createApp } from 'vue'
import App from './App.vue'
import route from "./routes/index";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vClickOutside from "click-outside-vue3";
import VueApexCharts from "vue3-apexcharts";
import mitt from 'mitt';
import { store } from "./stores";
import Breadcrums from './components/common/Breadcrums.vue';
const emitter = mitt();

const app = createApp(App);
app.use(route);
app.use(Antd);
app.use(vClickOutside);
app.use(VueApexCharts);
app.use(store);
app.component('Breadcrums',  Breadcrums); 

// app.config.globalProperties.$filters = filters;
app.config.globalProperties.$emitter = emitter;

route.isReady().then(() => {
    app.mount('#app');
});
