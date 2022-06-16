// unauthenticated 未验证的

/**
 * 验证是否已经登录的中间件
 */
export default function ({store,redirect}) {   // redirect /riː dəˈre kt/ 重定向
    
    // 如果有用户信息, 重定向到首页
    if (store.state.user) {
        return redirect('/')
    }
}