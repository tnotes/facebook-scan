<template>
	<div>
		<el-button type="primary" @click="dialogTableVisible = true" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Xem danh sách</el-button>
		<el-dialog :title="listEmail.length+ ' email có sẵn'" :visible.sync="dialogTableVisible" :center="false" :fullscreen="false" top="15vh" width="30%">
			<el-checkbox v-model="fb_scan" label="Quét riêng liên kết FB" :border="false" :checked="false" :disabled="false"></el-checkbox>
			<el-table :data="listEmail" height="300" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
				<el-table-column type="index" label="STT" align="left" :sortable="false" :fixed="false" width="60"/>
				<el-table-column label="Email" prop="email" align="left" :sortable="false" :fixed="false" width="180"/>
				<el-table-column align="right" width="120">
					<template slot="header" slot-scope="scope">
						<el-button type="primary" icon="" :loading="loading_scan_all" @click="scanAll" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Scan All</el-button>
					</template>
					<template slot-scope="scope">
						<el-button @click="handleScan(scope.$index, scope.row)"  :type="valid_email(scope.row)" :loading="index === scope.$index" icon="" :plain="true" :round="false" :circle="false" :autofocus="false" size="small" :disabled="valid_diabled(scope.row)">{{valid_status(scope.row)}}</el-button>
					</template>
				</el-table-column>
			</el-table>
			
		</el-dialog>
	</div>
</template>
<script>
	
	export default {
		props:['listEmail'],
		data(){
			return {
				dialogTableVisible:false,
				index:null,
				loading_scan_all:false,
				fb_scan:false
			}
		},
		
		methods:{
			async Scan(email){
				let {data:{success,error}} = await this.$axios.post('/api/email/scan',{email,fb_scan:this.fb_scan});
				if(success) await this.$axios.post('/api/result',{email});
				this.listEmail = this.listEmail.map(e=>{
					if(e.email === email) e.result = success;
					return e;
				});
			},
			async scanAll(){
				this.loading_scan_all = true;
				for(let {email} of this.listEmail){
					await this.Scan(email);
				}
				this.loading_scan_all = false;

			},
			async handleScan(index,{email}){
				this.index = index;
				await this.Scan(email);
				this.index = null;
			},
			valid_email(row){
				if(row.result === true){
					return 'success'
				}else if(row.result === false){
					return 'danger'
				}else{
					return 'primary'
				}
			},
			valid_diabled(row){
				return row.result !== undefined
			},

			valid_status(row){
				if(row.result === true){
					return 'Chấp thuận'
				}else if(row.result === false){
					return 'Từ Chối'
				}else if(row.result === null){
					return 'Không hợp lệ';
				}else{
					return 'Scan'
				}
			}
			
		}
	}
</script>
<style scoped>
.el-table .failed{
	background: red;
}
.el-table .success{
	background:green;
}
</style>