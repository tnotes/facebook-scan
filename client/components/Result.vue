<template>
	
	<el-table :data="data.filter(data => !search || data.email.toLowerCase().includes(search.toLowerCase()))"
		height="500" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
		<el-table-column type="index" label="STT" align="left" :sortable="false" :fixed="false" width="180"/>
		<el-table-column label="Email" prop="email" align="left" :sortable="false" :fixed="false" width="180"/>
		<el-table-column align="right">
			<template slot-scope="scope">
				<el-tag type="success" :closable="false" effect="light" size="medium" :disable-transitions="false">Success</el-tag>
			</template>
		</el-table-column>
		<el-table-column align="center">
			<template slot-scope="scope">
				<el-popconfirm title="Bạn có chắc chắn muốn xóa?" confirmButtonText='OK' @onConfirm="AgreeRemove(scope.$index, scope.row)" cancelButtonText='Hủy' icon="el-icon-info" iconColor="red">
					<el-button slot="reference" round size="mini" type="danger" icon="el-icon-delete"></el-button>
				</el-popconfirm>


			</template>
		</el-table-column>


	</el-table>
	
</template>
<script>
	
	export default {
		props:['data'],
		data(){
			return {
				search:'',
				pagination:1
			}
		},
		methods:{
			async AgreeRemove(index,row){
				let {data} = await this.$axios.delete('/api/result/'+row.id);
				return this.data = this.data.filter(({id})=> row.id !== id);
			},
			
			
		}
	}
</script>
<style scoped>

</style>