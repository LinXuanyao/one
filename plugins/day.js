import Vue from 'vue';
import dayjs from 'dayjs';

// {{ 表达式 | 过滤器 }}
Vue.filter('dateFormater',function (value,format='YYYY-MM-DD') { 
    return dayjs(value).format(format);
})