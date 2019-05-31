<template>
  <el-carousel :interval="4000" type="card" height="156px">
    <el-carousel-item v-for="item in items" :key="item">
      <img :src="item.img" @click="openUrl(item.url)"/>
      <p>{{item.title}}</p>    
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [{
        img: 'static/testImage/1.jpg',
        title: '公有云厂商VS私有云厂商谁更强？',
        url: 'https://www.baidu.com'
      }, {
        img: 'static/testImage/2.jpg',
        title: '个性需求接受or拒绝，揭秘产品组和项目组的三两事',
        url: 'https://www.baidu.com'
      }, {
        img: 'static/testImage/3.jpg',
        title: '品高云入围Forrester报告，妥妥的',
        url: 'https://www.baidu.com'
      }, {
        img: 'static/testImage/4.jpg',
        title: '公安行业部的行业云探索与实践',
        url: 'https://www.baidu.com'
      }, {
        img: 'static/testImage/5.jpg',
        title: '政企行业的探索与实践',
        url: 'https://www.baidu.com'
      }, {
        img: 'static/testImage/6.jpg',
        title: '截获一份来自品高云高校客户的服务质量证明',
        url: 'https://www.baidu.com'
      }]
    }
  },
  components: {
  },
  created(){
  },
  mounted(){
  },
  methods: {
    openUrl(url){
      window.open(url);
    }
  }
}
</script>

<style lang="scss">
@import '~asset/common';
@import '~asset/app';
</style>
