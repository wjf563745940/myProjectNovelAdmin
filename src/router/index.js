// import Vue from 'vue'
// import Router from 'vue-router'
// import Hello from '@/components/Hello'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: Hello
//     }
//   ]
// })

const routes = [
//信息列表
{
  path: '/index',
  name: 'amdinindex',
  component: resolve => {
    require(['@/views/info/novelList.vue'], resolve)
  },
    // children: [
    //   {path: 'detail',component: resolve=>{
    //     require(['views/info/infoDetail.vue'],resolve)
    //   }}
    // ]
},
{
  path: '/',
  name: 'index',
  redirect:'/manger/home'
   //component: require('@/components/Hello')
},
{
  path: '/login',
  name: 'login',

    component: resolve => {
    require(['@/views/admin/login.vue'], resolve)
  },
},
{
  path: '/register',
  name: 'register',

    component: resolve => {
    require(['@/views/admin/register.vue'], resolve)
  },
},
{
  path: '/manger',
  name: 'manger',
  component:resolve=>{
      require(['@/views/manger.vue'], resolve)
  },
  children: [
      {path: 'novelList',component: resolve=>{
        require(['views/info/novelList.vue'],resolve)
      }},
       {path: 'home', component: require('@/components/Hello')
     },
       {
        path:'novelListApply',
        name:'novelListApply',
       component:resolve=>{ 
       require(['views/info/novelListApply.vue'],resolve)}
       }
    ]
},
]
export default routes

