/* 
    Nuxt.js的配置文件
*/
module.exports = {
    router:{
        // 路由链接高亮
        linkActiveClass: 'active',

        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
            routes.splice(0)

            routes.push(...[
                {
                    path:'/', // 自定义, 把访问'/layout'变成了 '/'
                    component:resolve(__dirname,'pages/layout/'),
                    children:[
                        {
                            name: 'home',
                            path:'', // 默认子路由
                            component:resolve(__dirname,'pages/home/')
                        },
                        {
                            name: 'login',
                            path:'/login',
                            component:resolve(__dirname,'pages/login/')
                        },
                        {
                            name: 'register',
                            path:'/register',
                            component:resolve(__dirname,'pages/login/')
                        },
                        {
                            name: 'profile',
                            path: '/profile/:username',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                },
            ])
        }
    },

    // 注册插件
    plugins:[
        '~/plugins/request.js',
        '~/plugins/day.js',
    ],

    server:{
        // host:'0.0.0.0', // 项目上线
        host:'localhost', // 只能用于本机访问
        port:3000,
    }

}