// authenticated 已验证的

/**
 * 验证是否登录的中间件
 */
export default function ({store,redirect}) {   // redirect /riː dəˈre kt/ 重定向
    
    // 如果没有用户信息, 重定向到用户页面
    if (!store.state.user) {
        return redirect('/login')
    }
}