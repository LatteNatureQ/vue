import Vue from 'vue'
import moment from 'moment'

//定义全局过滤器
Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    /**
     * moment 接的是要过滤的原始时间
     * format 接的是你要格式化成的字符串
     */
    return moment(input).format(formatStr)
})
