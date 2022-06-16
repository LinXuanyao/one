<template>
  <div>

    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">header</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link  
              class="nav-link" 
              to='/'
              exact
            >首页</nuxt-link>
          </li>

          <template v-if="user">
            <li class="nav-item">
              <nuxt-link  class="nav-link" to='/editor'>
                <i class="ion-compose"></i>&nbsp;编写文章
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link  class="nav-link" to='/settings'>
                <i class="ion-gear-a"></i>&nbsp;设置
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/profile/1'>
                <img class="user-pic" src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40" />
                {{user.username}}
              </nuxt-link>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/login'>登录</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to='/register'>注册</nuxt-link>
            </li>
          </template>

        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->

    <!-- 子路由 -->
    <nuxt-child></nuxt-child>
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">footer</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->

  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'LayoutIndex',
  computed:{
    ...mapState(['user'])
  }
    
};
</script>

<style>
</style>