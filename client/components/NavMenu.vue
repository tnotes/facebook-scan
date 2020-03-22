<template>
	<el-menu :default-active="active_index" :collapse="false">
		
		<el-menu-item index="1">
			<i class="el-icon-setting"></i>
			<el-link slot="title" :underline="false" href="/ngau-nhien">Email ngẫu nhiên</el-link>
		</el-menu-item>
		<el-menu-item index="3" >
			<i class="el-icon-document"></i>
			<el-link slot="title" :underline="false" href="/nap-danh-sach">Nạp danh sách</el-link>
		</el-menu-item>
		<el-menu-item index="2">
			<i class="el-icon-menu"></i>
			<el-link slot="title" :underline="false" href="/ket-qua">Kết quả</el-link>
		</el-menu-item>

	</el-menu>
</template>
<script>
	export default {
		props:['active_index'],
		data(){
			return {

			}
		},
		methods:{
			
		}
	}
</script>
<style scoped>

</style>