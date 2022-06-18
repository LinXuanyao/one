<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Banner</h1>
        <p>一个分享你知识的地方</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name:'home',
                    query:{
                      tab:'your_feed'
                    }
                  }"
                  class="nav-link "
                  :class="{
                    active:tab === 'your_feed'
                  }"
                >你的 Feed{{$route.query.tab}}</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  :to="{
                    name:'home',
                    query:{
                      tab:'all_feed'
                    }
                  }"
                  class="nav-link"
                  :class="{
                    active:tab === 'all_feed'
                  }"
                >全部 Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  exact
                  class="nav-link"
                  :class="{
                    active:tab === $route.query.tab
                  }"
                  :to="{
                    name:'home',
                    query:{
                      tab:'tag'
                    }
                  }"
                ># {{tag}}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview"
            v-for="(article,index) in articles" :key="index?index:article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="{
                name:'profile',
                params:{
                  username:article.author.username
                }
              }">
                <img :src="article.author.image"/>
                <!-- <img src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"/> -->
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="{
                  name:'profile',
                  params:{
                    username:article.author.username
                  }
                }">
                  {{article.author.username}}
                </nuxt-link>
                <!-- 时间 -->
                <span class="date">{{article.createdAt | dateFormater('MMM-DD,YYYY')}}</span>
                {{article.disabled}}
              </div>
              <!-- 点赞 -->
              <button 
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active:article.favorited
                }"
                @click="onFavorite(article)"
                :disabled='article.disabled'
              >
                <i class="ion-heart"></i> 
                {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link class="preview-link" 
              :to="{
                name:'article',
                params:{
                  slug:article.slug
                }
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>更多...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag:$route.query.tag,
                      tab:$route.query.tab,
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>热搜 Tags</p>

            <div class="tag-list">
              <nuxt-link
                class="tag-pill tag-default"
                v-for="tag in tags"
                :key="tag"
                :to="{
                  name: 'home',
                  query: {
                    tag:tag,
                    tab:'tag',
                  }
                }"
              >
                {{tag}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getArticles,
  getYourFeedArticles,
  addFavorite,
  deleteFavorite 
} from '../../api/article';
import { getTags } from '../../api/tag';

import {mapState} from 'vuex';

export default {
  name: "Home",

  async asyncData({query, store}) {
    // 页数
    const page = Number.parseInt(query.page || 1)
    // 每页数量
    const limit = 1

    const {tag,tab='all_feed'} = query

    const loadgetArticles = store.state.user && tab == 'your_feed'
      ? getYourFeedArticles
      : getArticles

    const {data:articleData} = await loadgetArticles({
      limit:limit, // 限制条数
      // offset:2 // 限制开始位置
      offset: (page-1) * limit,

      tag:query.tag
    })

    const { data:tagData } = await getTags()


    // 使用promise.all, 并行请求
    let promise0 = getArticles({
      limit:limit,
      offset: (page-1) * limit
    })
    let promise1 = getTags()

    const [articleRes,tagRes] = await Promise.all([
      promise0,
      promise1,
    ])

    articleData.articles.forEach((item) => {
      item.disabled = false
    })

    return {
      articles:articleData.articles,
      articlesCount:3 || articleData.articlesCount,
      page,
      limit,

      tags:tagData.tags,
      tag,

      // 标签
      tab:query.tab || 'all_feed'
    }
  },

  computed:{
    ...mapState(['user']),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    }
  },

  // 监听query参数的改变
  // 这个属性可以监听query参数的变化, 重新调用组件的(asyncData,fetch,validate,layout...)
  // watchQuery:'page', // 可以使数组/字符串
  watchQuery:['page','tag','tab'],
  // 如果想监听所有query参数, 可以设置为 watchQuery:true


  methods: {
    async onFavorite(article){
      if (!this.user) {
        alert('请先登录')
        return
      }

      article.disabled = true

      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      }else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }

      article.disabled = false
    },


  },

};
</script>

<style>
/* a.nav-link{
  color: gainsboro !important;
} */
</style>