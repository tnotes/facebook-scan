<template>
  <el-container>
    <el-header>
      <el-menu
      :default-active="active_index"

      mode="horizontal"

      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item align="right" index="1">
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


     <nuxt class="container"/>


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
      if(this.$route.path === '/')  this.active_index = "1";
      if(this.$route.path === '/nap-danh-sach') this.active_index = '3';
      if(this.$route.path === '/ket-qua') this.active_index = '2';
      
    }
  }
</script>
<style scoped>

</style>
