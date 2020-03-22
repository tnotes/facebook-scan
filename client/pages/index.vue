<template>
	<el-row>
		<el-col :span="6" :offset="9">
			<center>
				<el-image style="max-height: 300px" :src="img[Math.floor(Math.random() * img.length)]" fit="cover">
					
				</el-image>
			</center>
			<br><br>
			<center>Đào email đã liên kết với Facebook nhưng Chưa đăng kí trên Hotmail</center>

			<br>
			<br>
			<el-input placeholder="Mật khẩu phần mềm" v-model="password" size="medium" clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
			<br><br>
			<center>
				<el-button @click="login" type="primary" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="medium" :disabled="false">Login</el-button>
			</center>
		</el-col>
	</el-row>

	
</template>
<script>
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	};
	
	export default {
		layout:'login',
		data(){
			return {
				loading_status:false,
				img:['/fb.jpeg'],
				password:''
			}
		},
		mounted:async function(){
			await this.check_login();
		},
		methods:{
			async login(){
				setCookie('password',this.password,30);
				return location.reload()
			},
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
				if(status) {
					return this.$router.push('ngau-nhien') ;
				}else{
					return this.$router.push('/')
				}
			}
		},

	}
</script>