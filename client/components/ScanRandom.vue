<template>
	<el-table :default-sort = "{prop: 'index', order: 'ascending'}" :data="listEmailRandom" height="650" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">
		<el-table-column type="index" prop="index" label="STT" align="left" :sortable="false" :fixed="false" width="60"/>
		<el-table-column label="Email" prop="email" align="left" :sortable="false" :fixed="false" width="200"/>
		<el-table-column align="right" width="120">
			
			<template slot-scope="scope">
				<el-button :type="valid_email(scope.row)" icon="" :plain="true" :round="false" :circle="false" :autofocus="false" size="small" disabled>{{valid_status(scope.row)}}</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
	export default {
		props:['listEmailRandom'],

		methods:{
			valid_email(row){
				if(row.success === true){
					return 'success'
				}else if(row.success === false){
					return 'danger'
				}else{
					return 'primary'
				}
			},
			valid_diabled(row){
				return row.success !== undefined
			},

			valid_status(row){
				if(row.success === true){
					return 'Chấp thuận'
				}else if(row.success === false){
					return 'Từ chối'
				}else{
					return 'Chưa quét'
				}
			}
		}
	}
</script>
<style scoped>

</style>