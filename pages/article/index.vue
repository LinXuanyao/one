<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <article-meta :article='article'/>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body"></div>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article='article'/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">

          <ArticleComments :article='article'/>

          <!-- <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArticle} from '../../api/article';
import ArticleMeta from './components/article-meta.vue';
import ArticleComments from './components/article-comments.vue';

import MarkdownIt from 'markdown-it';

export default {
  name: "ArticleIndex",
  components:{
    ArticleMeta,
    ArticleComments
  },
  async asyncData({params}) {
    const {data} = await getArticle(params.slug)
    const {article} = data

    // 创建渲染器
    const md = new MarkdownIt()
    article.body = md.render(article.body)

    return {
      article:data.article
    }
  },

  head(){
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description'
        }
      ]
    }
  }
};
</script>

<style>
</style>
