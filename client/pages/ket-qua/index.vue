<template>
	<el-row>
		<el-col :span="20" :offset="2">
			<el-row>
				<el-col justify="right">
					Danh sách kết quả quét THÀNH CÔNG {{count}} kết quả !

					<el-popconfirm title="Giữ lại dữ liệu sau khi tải xuống?" @onCancel="onCancel" @onConfirm="onConfirm" confirmButtonText='Đồng ý' cancelButtonText='Xóa' icon="el-icon-info" iconColor="red">

						<el-button slot="reference" style="float:right" justify="right" type="" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">Tải về {{count}} Email</el-button>
					</el-popconfirm>
					
					<el-popover placement="top-start" style="float:right;margin-right: 10px" :title="'Có '+domain.length+' domain'" trigger="click" width="240" transition="el-fade-in-linear">
						<el-table :data="domain" height="auto" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
							<el-table-column type="index" align="left" :sortable="false" :fixed="false" width="20"/>
							<el-table-column  label="Domain" prop="name" align="left" :sortable="false" :fixed="false" width="140"/>
							<el-table-column align="center" width="80"
							>
							<template slot="header" slot-scope="scope">
								
								<el-popover placement="top-start" trigger="click" title="Thêm domain" width="200" transition="el-fade-in-linear">
								    <el-input placeholder="@..." @keyup.enter.native="add_domain" v-model="domain_add_value" size="mini" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
								    <el-button slot="reference" type="primary" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Add</el-button>
								</el-popover>

							</template>
							<template slot-scope="scope">
								<el-button
								type="text"
								icon="el-icon-view"
								size="mini"
								
								@click="filterDomain(scope.$index, scope.row)"></el-button>
								<el-button
								type="text"
								icon="el-icon-error"
								size="mini"
								
								@click="handleDelete(scope.$index, scope.row)"></el-button>
							</template>
						</el-table-column>
					</el-table>
					<el-button type="default" slot="reference" icon="" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">{{title}}</el-button>
				</el-popover>


			</el-col>
		</el-row>

		<Result :data="data"/>
		<br>
		<el-pagination @current-change="loadMore" :total="count" :page-size="30" :pager-count="11" prev-text="" next-text="" :hide-on-single-page="false" background layout="prev, pager, next"></el-pagination>

	</el-col>
</el-row>
</template>
<script>
	import Result from '~/components/Result.vue';
	export default {
		components:{Result},
		data(){
			return {
				data:[],
				count:0,
				command:'',
				title:'Phân Loại',
				hold:true,
				domain:[],
				domain_add_value:'@'
			}
		},
		created:async function(){
			await this.loadDomain();
			await this.loadData();
			await this.loadCount();

		},
		methods:{
			async add_domain(){
				if(!this.domain_add_value.includes('@')) return this.$message({message:'Phải nhập đúng định dạng @name.com',type:'error'})
					let {data} = await this.$axios.post('/api/domain',{name:this.domain_add_value});
				this.domain.unshift(data);
				
			   this.$message({message:'Thêm '+this.domain_add_value+' thành công.',type:'success'});
			   this.domain_add_value = '@';

			},
			async handleDelete(index,row){
				await this.$axios.delete('/api/domain/'+row.id);
				this.domain = this.domain.filter(({id})=>id !== row.id);

				return this.$message({message:'Đã xóa '+row.name,type:'success'})
			},
			async loadDomain(){
				let {data} = await this.$axios.get('/api/domain');
				this.domain = data;
			},
			async filterDomain(index,command){
				command = command.name;
				
				if(command === 'all') {
					this.title = 'Phân Loại';
					this.command = command = '';
					
				}else{
					this.title = command;
					this.command = command;
				}
				await this.loadCount(command);
				await this.loadData();
				
				
			},
			loadCount:async function(command = ''){
				let {data} = await this.$axios.get('/api/result/count?command='+command);
				return this.count = data;
			},
			loadData:async function(pagination = 1){

				let {data} = await this.$axios.get('/api/result?limit=30&where={"email":{"contains":"'+this.command+'"}}&skip='+(30*(pagination-1)));
				return this.data = data;
			},
			
			async onCancel(){
				this.download(false);
				this.data = [];
			},
			async onConfirm(){
				this.download(true)
			},
			async loadMore(index){
				await this.loadData(parseInt(index));
			},
			




			forceFileDownload(response){
				const url = window.URL.createObjectURL(new Blob([response.data]))
				const link = document.createElement('a')
				link.href = url;
				link.setAttribute('download', 'file.txt') //or any other extension
				document.body.appendChild(link)
				link.click()
			},


			download(hold){
				this.$axios({
					method: 'post',
					url: '/api/email/download',
					data:{domain:this.command,hold},
					responseType: 'arraybuffer'
				})
				.then(response => {

					this.forceFileDownload(response)

				})
			}
		}






	}
</script>
<style scoped>

</style>