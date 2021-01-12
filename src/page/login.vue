<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>高校工资管理系统登录</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="change()" class="submit_btn">注册</el-button>
                    </el-form-item>
				</el-form>
<!--				<p class="tip">温馨提示：</p>-->
<!--				<p class="tip">未登录过的新用户，自动注册</p>-->
<!--				<p class="tip">注册过的用户可凭账号密码登录</p>-->
	  		</section>
        </transition>

            <transition name="form-fade" mode="in-out">
            <section class="form_contianer2" v-show="showRegister">
                <div class="manage_tip2">
                    <p>高校工资管理系统注册</p>
                </div>
                <el-form :model="registerForm"  :rules="rules" ref="registerForm">
                    <el-form-item prop="username">
                        <el-input v-model="registerForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码"  v-model="registerForm.password"></el-input>
                    </el-form-item>

                    <el-form-item prop="name">
                        <el-input v-model="registerForm.name" placeholder="姓名"></el-input>
                    </el-form-item>

                    <el-form-item prop="gender">
<!--                        <el-input v-model="registerForm.gender" placeholder="性别"><span>dsfsf</span></el-input>-->
                        <el-radio v-model="registerForm.gender" label="1">男</el-radio>
                        <el-radio v-model="registerForm.gender" label="2">女</el-radio>
                    </el-form-item>

                    <el-form-item prop="cardId">
                        <el-input v-model="registerForm.cardId" placeholder="银行卡号"></el-input>
                    </el-form-item>

                    <el-form-item prop="birthday">
                        <el-date-picker class="date"
                            v-model="registerForm.birthday"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('registerForm')" class="submit_btn">注册</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="change()" class="submit_btn">登录</el-button>
                    </el-form-item>

                </el-form>
                <!--				<p class="tip">温馨提示：</p>-->
                <!--				<p class="tip">未登录过的新用户，自动注册</p>-->
                <!--				<p class="tip">注册过的用户可凭账号密码登录</p>-->
            </section>

	  	</transition>
  	</div>
</template>

<script>
	import {register,login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
                registerForm: {
                    username: '',
                    password: '',
                    gender:'',
                    cardId:'',
                    birthday:'',
                    name:'',
                    address:'',
                    id_card_num:'',
                    native_place:'',
                    folk:'',
                    education:'',
                    major:'',
                    zip_code:'',
                    phone_num:''
                },
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
                    cardId:[
                        { required: true, message: '请输入银行卡号', trigger: 'blur' }
                    ],
                    birthday:[
                        { required: true, message: '请输入出生日期' }
                    ],
                    name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
				},
				showLogin: false,
                showRegister: true,
			}
		},
		mounted(){
			this.showLogin = true;
			this.showRegister = false;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {

	        change()
            {
                this.showLogin=!this.showLogin;
                this.showRegister=!this.showRegister;
            },


			...mapActions(['getAdminData']),
			async submitForm(formName) {
	            console.log(this.$refs[formName])
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
                        let res
					    if(formName==="loginForm"){
						    res = await login({username: this.loginForm.username, password: this.loginForm.password})

                        }
                        else{
                                console.log("23112321312321321")
                            res = await register({username: this.registerForm.username,
                                password: this.registerForm.password
                                ,gender: this.registerForm.gender
                                ,name:this.registerForm.name
                                ,birthday: this.registerForm.birthday
                                ,cardId:this.registerForm.cardId
                            })
                        }

						if (res.status === 1&&formName==="loginForm") {

                            this.$store.dispatch("userLogin", true);
                            //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
                            //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
                            localStorage.setItem("Flag", "isLogin");

							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });



							this.$router.push('manage')
						}else if(formName==="loginForm"){
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
                            this.$notify.error({
                                title: '错误',
                                message: '请输入正确的用户名密码',
                                offset: 100
                            });
                            return false;
						}else if(res.status === 1)
                        {
                            this.$message({
                                type: 'success',
                                message: '注册成功'
                            });
                            this.$router.push('manage')
                        }else {

                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }

					} else {
						this.$notify.error({
							title: '错误',
							message: '注册失败',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 30px;
			color: #fff;
		}
	}

    .date{
        width: 320px;
    }
    .manage_tip2{
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p{
            font-size: 30px;
            color: #fff;
        }
    }
    .form_contianer2{
        .wh(320px, 450px);
        .ctp(320px, 410px);
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        .submit_btn{
            width: 100%;
            font-size: 16px;
        }
    }
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
