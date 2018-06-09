<template>
	
<div class="contain">
	<div class="login-logo">
			<p>NOVELMANGER</p>
	</div>
		<el-card class="box-card">
		  <div >
		    	<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		    		<el-form-item label="用户名" prop="username">
				    <el-input type="text" v-model="ruleForm2.username" auto-complete="on"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="pass">
				    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPass">
				    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				    <el-button @click="resetForm('ruleForm2')">重置</el-button>
				  </el-form-item>
				</el-form>
		  </div>
</el-card>
</div>
</template>
<script>
export default{
	data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
          	console.log(this.$refs)
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateUsername=(rule,value,callback)=>{
      	if (value === '') {
          callback(new Error('请输入名称'));
        } else{
        	 callback();
        }
      }
      return {
        ruleForm2: {
        	username:'',	
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username:[{ validator: validateUsername, trigger: 'blur' }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let that=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('name', this.ruleForm2.username);
            formData.append('password', this.ruleForm2.pass);
            axiosUtil.register({name:this.ruleForm2.username,password:this.ruleForm2.pass}).then(function(data){

                console.log("------------",data);
                if(data.data.errorCode===0){
                    that.$router.push("/manger/home");
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}

</script>	
<style scope>
html ,body{
height: 100%;
background-color: #444
}
#app ,.contain{
	
	 
}
.login-logo{
	    width: 247px;
    margin: 0 auto;
    margin-top: 60px;
    padding: 15px;
    text-align: center;
    color:#fff;
}
	.contain{
	
	}
	.box-card {
    width: 480px;
    margin: 0 auto;
  }
</style>