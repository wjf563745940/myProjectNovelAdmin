<template>
<div class="manger-contain">
  <el-row><div> <el-button @click="loginout">退出</el-button></div></el-row>
<el-row class="main-content">
  <el-col :span="4">
    <div class="grid-content bg-purple">
        <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
            <el-submenu index="1">
              <template slot="title">小说管理</template>
              <el-menu-item-group title="分组一">

                <el-menu-item v-bind:index="index" index="1-1" v-for="(item ,index) in novelMangerMenu" @click="gorouter(index)">{{item.name}}</el-menu-item>

              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">导航二

            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div></el-col>
  <el-col :span="20">
  <div class="grid-content bg-purple-light page-content">
        <router-view></router-view>
  </div></el-col>
</el-row>
  </div>

</template>

<script>
export default {
  name: 'app',
  data(){
return {
  novelMangerMenu:[{name:"小说清单",url:"/manger/novelList"},
  {name:"小说主站",url:"/manger/home"},
  {name:"申报的清单",url:"/manger/novelListApply"},
  ]
}
  },
  methods: {
      gorouter:function(index){
        console.log(index)
        this.$router.push(this.novelMangerMenu[index].url);
      },
      loginout:function(){
      let that=this;
      axiosUtil.loginout().then(function(data){
      if(data.data.errorCode===0){
      that.$router.push('/login');
      }
      })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
body{
  margin: 0;
}
.main-content{
  background: #324157;
}
.page-content{
      margin-top: 0px;
    padding: 0px;
    background-color: #fff;
}
@media (min-width: 980px){
    .page-content {
      padding-left: 5px;
    margin-top: 0px;
    min-height: 760px;
}
}

</style>
