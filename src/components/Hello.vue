<template>
<div style="margin-top: 15px;">
  <el-input placeholder="请输入小说名称" v-model="input5">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="biquge" value="1">biquge</el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="searchNovelByName"></el-button>
  </el-input>
  <div>
    <input type="hidden" name="url" vlaue="novelurl">
    <div class="grid-content bg-purple-dark">{{novelmessage}}<span>{{novelstatus}}</span></div>
<el-button  v-if="isShownovelBtn" type="primary" @click="addNovel">添加</el-button>
<el-button type="text">更多</el-button>
</div>

</div>

</template>

<script>

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      radio: '1',
      input5:'',
      select:'',
      novelstatus:'',
      novelurl:'',
      novelmessage:'',
      isShownovelBtn:false,
    }
  },
  methods:{
    addNovel:function(){
      var that=this;
      axiosUtil.addNovel('name='+that.novelmessage+'&novelurl='+encodeURI(that.novelurl))
          .then(function (response) {
              let data=response.data
              console.log(data)
            if(data.errorCode==1){
              that.$message({
              message: data.message,
              type: 'warning',
              duration:3000
            });

            }else{
               that.$message({
          message: data.message,
          type: 'info',
          duration:3000
        });
            }    

          }).catch(function(err){
                console.log(err);
            })
    },
    searchNovelByName:function(){
      var that=this;
      if(this.input5!==""){
       axiosUtil.getNovelByName('name='+this.input5)
          .then(function (response) {
              let data=response.data.results.data
            if(data.errorCode==1){
              that.novelurl='';
              that.isShownovelBtn=false;
              that.novelmessage=data.message;
              that.novelstatus="";

            }else if(data.message.statusType){
              that.novelmessage=data.message.name;
              that.novelurl=data.message.href;
              that.novelstatus=data.message.statusName;
            }else{
               that.novelmessage=data.message.name;
              that.novelurl=data.message.href;
              that.isShownovelBtn=true;
              that.novelstatus="";
            }
          

          }).catch(function(err){
                console.log(err);
            })
      }else{
         this.$message({
          message: '请输入小说名称！',
          type: 'warning',
          duration:1500
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
