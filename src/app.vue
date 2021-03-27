<template>
  <el-carousel :interval="4000" type="card" height="156px" v-if="items.length>0">
    <el-carousel-item v-for="(item,index) in items" :key="index">
      <img :src="item.img" @click="openUrl(item)" onerror="javascript:this.src='static/pic-err.png'"/>
      <p>{{item.title}}</p>    
    </el-carousel-item>
  </el-carousel>
  <div class="error-info" v-else>
    <img v-if="errMsg" src="static/styleImages/tea.svg" />
    <span @click="getDatas()">{{errMsg}}</span>
  </div>  
</template>

<script>
import apiSer from 'ser/api'

export default {
  data () {
    return {
      items: [],
      errMsg: ''
    }
  },
  components: {
  },
  created(){
    apiSer.appendStyle();
    this.getDatas();
    app.linkplugin.listenRefreshWidgetData(() => {
      this.getDatas();
    });
  },
  mounted(){
  },
  methods: {
    getDatas(){
      apiSer.getCarouselList((datas) => {
        this.items = datas;
        this.errMsg = '';
      }, (errMsg) => {
        this.errMsg = errMsg;
      });
    },
    openUrl(item){
      app.linkplugin.openWindow(item.url, item.title)
    }
  }
}
</script>

<style lang="scss">
@import '~asset/common';
@import '~asset/app';
</style>
