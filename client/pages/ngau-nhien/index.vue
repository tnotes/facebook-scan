<template>
	<el-row>
		<el-col :span="12" :offset="6">
			<el-switch @change="turn" v-model="turnon"></el-switch>
	    	
	    	<ScanRandom :listEmailRandom="listEmail"/>
	   
	</el-col>
</el-row>
</template>
<script>
	import ScanRandom from '~/components/ScanRandom.vue';
	export default {
		components:{ScanRandom},
		data(){
			return {
				listEmail:[],
				turnon:false
			}
		},
		created:async function(){
			await Promise.all[this.getStatus(),this.getEmail()];
		},
		mounted:async function(){
			let _ = this;
			setInterval(async function(){
				let {data} = await _.$axios.get('/api/scan');
				_.listEmail = data;
			},1000)
		},
		methods:{
			async getEmail(){
				let {data} = await this.$axios.get('/api/scan');
				return this.listEmail = data;
			},
			async getStatus(){
				let {data} = await this.$axios.get('/api/status');
				return this.turnon = data[0].status;
			},
			async turn(){
				await this.$axios.post('/api/email/autoscan',{turnon:this.turnon});	
			}
		}
	}
</script>