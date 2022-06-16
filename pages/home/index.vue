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
              <li class="nav-item">
                <a class="nav-link disabled" href="">你的 Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">全部 Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html">
                <img src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"
              /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>如何构建规模如此庞大的网络应用程序</h1>
              <p>这是该帖子的描述</p>
              <span>更多...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href="profile.html">
                <img src="https://p1.music.126.net/ZoBSIeyLHfEG58ZYdN97KA==/109951166369986824.jpg?param=40y40"
              /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                如何构建规模如此庞大的网络应用程序2
              </h1>
              <p>这是该帖子的描述</p>
              <span>更多...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>热搜 Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>