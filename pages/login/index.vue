<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">

          <h1 class="text-xs-center">
            {{isLogin?'Sign up':'Sign in'}}
          </h1>

          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to='/login'>Have an account?</nuxt-link>
            <nuxt-link v-else to='/register'>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- v-for 遍历对象(动态key的对象) -->
            <!-- 
              {
                "email or password" : ["is invalid","xxx"],
                "email":["has already been taken","xxx"]
              }

              key:["is invalid","xxx"]
              value:"email or password"
             -->
            <template v-for="(value,key) in errors">
              <li v-for="(message,index) in value" :key="index">
                <!-- {{key}}-{{value}} -{{message}} -->
                {{key}} {{message}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="login">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin?'Sign up':'Sign in'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user';

// 仅在客户端加载包
const Cookie = process.client?require('js-cookie'):undefined

export default {
  name:'Login',
  middleware:['unauthenticated'],

  data() {
    return {
      user:{
        username:'',
        email:'1577678850@qq.com',
        password:'123123',
      },
      errors:{
        // key1:['a1','b1'],
        // key2:['a2','b2'],
      }
    }
  },
  computed:{
    isLogin(){
      // return this.$route.path == '/login'
      return this.$route.name == 'login'
    }
  },
  methods: {

    // 登录, 是在客户端运行的
    async login(){
      const {user} = this

      try {
        const {data} = this.isLogin
          ? await login({user})
          : await register({user})

        // console.log(data);
        /* 
          保存用户登录信息, 前后端都需要共享数据状态
        */
        // 存储到容器是为了方便共享数据
        this.$store.commit('setUser',data.user)
        // 把登录状态存到cookie中(持久化), 为了防止刷新页面数据丢失
        Cookie.set('userinfo',JSON.stringify(data.user))


        // 跳转到首页
        // this.$router.push('/')
        
      } catch (err) {
        this.errors = err.response.data.errors
      }

      
      
    }
  },
};
</script>

<style>
</style>