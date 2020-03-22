<template>
  <el-container>
    <el-header>
      <el-menu
      :default-active="active_index"

      mode="horizontal"

      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <img style="width: 50px" src="https://i.pinimg.com/originals/fb/9f/87/fb9f87120d35c58598bfd0a972b7e5d7.png">
        Facebook Account
      </el-menu-item>
      


    </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
     <NavMenu :active_index="active_index"/>
   </el-aside>
   <el-main>



     <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />


   </el-main>
 </el-container>
</el-container>
</template>
<script>
  import NavMenu from '~/components/NavMenu.vue';
  export default {
    components:{NavMenu},
    data(){
      return {
        active_index:"",
      }
    },

    created:async function(){
      
      if(this.$route.path === '/ngau-nhien')  this.active_index = "1";
      if(this.$route.path === '/nap-danh-sach') this.active_index = '3';
      if(this.$route.path === '/ket-qua') this.active_index = '2';
      
    },
    mounted:async function(){
      await this.check_login();
    },
    methods:{
      check_login:async function(){
        function getCookie(cname) {
          var name = cname + "=";
          var decodedCookie = decodeURIComponent(document.cookie);
          var ca = decodedCookie.split(';');
          for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        };
        let {data:{status}} = await this.$axios.get('/api/account/login?password='+getCookie('password'));
        if(!status) {
          return this.$router.push('/')
        }
      }
    }
  }
</script>
<style scoped>
