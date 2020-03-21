<template>
	<el-form ref="formData" :rules="rules" :model="formData"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="medium">
		<el-form-item justify="left">
			<TableData :listEmail="list_email"/>
		</el-form-item>
		
		<el-form-item prop="list" label="Nhập danh sách Email (mỗi email 1 dòng)" label-width="auto" size="medium" :inline-message="false" show-message>
			<el-input v-model="formData.list" type="textarea" :rows="20" :autosize="false" placeholder="username@example.com"></el-input>
		</el-form-item>

		<el-form-item align="center">
			<el-button type="primary" @click="onSubmit" :loading="loading" size="medium">Nạp</el-button>
		</el-form-item>
	</el-form>
</template>
<script>
	import TableData from '~/components/ListEmail.vue';
	export default {
		components:{TableData},
		data(){
			return {
				list_email:[],
				formData:{
					list:''
				},
				rules:{
					list:[{required:true,message:'Bạn phải nhập ít nhất 1 Email.',trigger:'blur'}]
				},
				loading:false
			}
		},
		created:async function(){
			let {data} = await this.$axios.get('/api/email');
			
			this.list_email = data;
		},
		methods:{
			onSubmit(){
				let _ = this;
				this.$refs['formData'].validate(async (valid)=>{
					if(!valid) return false;
					_.loading = true;
					let split_email = _.formData.list.split('\n');
					let list_email = split_email.filter(e=>e.includes('@'));
					if(list_email.length === 0) return false;
					for(let email of list_email){
						let {data} = await this.$axios.post('/api/email',{email});
						this.$message({
							message:'Đã nạp thành công '+email,
							type:'success'
						});
						_.list_email.push({email});
						_.formData.list = _.formData.list.replace(email,'');
						_.loading = false;
					}
					
				})
			}
		}
	}
</script>
<style scoped>

</style>