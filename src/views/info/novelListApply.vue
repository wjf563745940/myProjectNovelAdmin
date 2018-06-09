	<template>
  <el-table
    :data="tableData2"
    
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="创建时间">
    </el-table-column>
    
     <el-table-column
      prop="allchapter"
      label="总章节">
    </el-table-column>
    <el-table-column
      prop="chaptered"
      label="已完成章节">
    </el-table-column>
    <el-table-column
      prop="progress"
      label="进度">
      index
      <template scope="scope">
       <el-progress :text-inside="true" :stroke-width="18" :percentage="tableData2[scope.$index].progress"></el-progress>
      </template>
    </el-table-column>
     <el-table-column
      prop="rule"
      label="爬取规则">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">下载</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>

<script>
//import axios from 'axios'
  export default {
    methods: {
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
       handleEdit(index, row) {
         axiosUtil.startCrawler('id='+row.id+'&partest=partest111')
          .then(function (response) {
            console.log("-----",response);
            response.data.results.forEach(function(item,i){
             var pec=item.chaptered*100/item.allchapter;
             item.progress=pec
            })
          that.tableData2=response.data.results

          }).catch(function(err){
                console.log(err);
            })
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created:function(){
      let that=this;
 axiosUtil.novelListApply()
  .then(function (response) {
    console.log("-----",response);
    response.data.results.forEach(function(item,i){
      if( item.allchapter && item.chaptered){
        var pec=item.chaptered*100/item.allchapter;
     item.progress=pec
   }else {
      item.progress=0;
      }
    })
  
  that.tableData2=response.data.results

  }).catch(function(err){
        console.log(err);
    })
    },
    data() {
      return {
        a:50,
        tableData2: []
      }
    }
  }
</script>