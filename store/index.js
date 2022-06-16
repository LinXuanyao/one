const cookieparser = process.server?require('cookieparser'):undefined

// 在服务器渲染期间运行都是同一个实例
// 为了防止数据冲突, 务必把 state 定义成函数. 返回数据对象
export const state = () => {
    // 每次都是创建一个新的对象
    return {
        // 当前登录用户的登录信息
        user:null
    }
}

export const mutations = {
    setUser(state,data){
        state.user = data
    }
}

export const actions = {

    // nuxt中, 特殊的action方法, 这个action会在服务端渲染期间自动调用
    // 作用: 初始化容器数据, 传递数据给客户端使用
    nuxtServerInit({commit},{req}){
        let user = null

        // 如果请求头中有cookie
        if (req.headers.cookie) {
            // 客户端在请求网站时, 会自动携带cookie
            // 在服务端中,使用cookieparser把cookie转为字符串
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                // 把cookie中的字符串, 变为js对象
                user = JSON.parse(parsed.userinfo)
                // console.log(user);
            } catch (err) {
                // console.log(err);
            }
        }

        // 提交到 mutation中修改状态
        commit('setUser',user)
    }
}
