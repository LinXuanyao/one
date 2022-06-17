import axios from 'axios';

// 拿不到state了, 拿到也是一个函数, state
// import {state} from '../store'


export const request = axios.create({
    baseURL: 'https://api.realworld.io'
})

// 通过插件机制获取到上下文对象 {app} (也就是客户端vue实例)
export default (context) => {
    const {store,app} = context

    // 请求拦截器
    request.interceptors.request.use((config) => {

        let token = `Token ${store.state.user.token}`

        if (token) {
            config.headers.token = token
        }

        return config
    },(error) => {
        return Promise.reject(error)
    })

}


// 响应拦截器

// export default request