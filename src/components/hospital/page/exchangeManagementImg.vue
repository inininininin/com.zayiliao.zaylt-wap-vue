<template>
	<div class="exchangeAddImg">
		<div class="topNav" :style="{'padding-top':$store.state.paddingTop}">
			<div class="leftImg" @click="goBackFn"  id="navback">
				<img src="../../../assets/image/shape@3x.png" alt="">
			</div>
			<div class="centerTitle">
				<h3>新增商品</h3>
			</div>
			<div class="right" >
				<button :class="imgUrl? 'buttonColorOver' : 'buttonColorNow'" @click="submitFn">完成</button>
			</div>
		</div>
		<div class="zhangwei"></div>
		<div class="addImg" v-model="exchangeAdd" :style="{'padding-top':$store.state.paddingTop}">
			<div class="addImgButton" v-show="imgUrl? false : true">
				<img src="../../../assets/image/append@2x.png" alt="">
				<span>请添加照片</span>
			</div>
			<img v-bind:src="imgUrl" alt="">
			<input type="file" class="upload" ref="inputer" accept="image/png,image/jpeg,image/gif,image/jpg"
			    multiple @change="addImg($event)"/>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import qs from 'qs';
import { Toast } from 'vant';
export default {
	name: 'exchangeAddImg',
	data () {
		return {
			commodity : [],
			imgUrl : '',
			exchangeAdd : {},
			query:''
		}
	},
	computed:{
		...mapGetters(['account']),
	},
	components:{

	},
	created(){
		// var heightRexg = /^[0-9]*/g
		//var topHeight = this.topHeight.match(heightRexg)
		//this.height = parseInt(topHeight.join())
		//
	},
   mounted() {
		// if(window.plus){
		// 	//plus.navigator.setStatusBarBackground("#ffffff");
		// 	plus.navigator.setStatusBarStyle("dark")
		// }
		// this.exchangeAdd = JSON.parse(this.$route.query.exchangeAdd)
	},
	activated() {
		if(this.query != JSON.stringify(this.$route.query)){
			this.query = JSON.stringify(this.$route.query);
			if(window.plus){
				//plus.navigator.setStatusBarBackground("#ffffff");
				plus.navigator.setStatusBarStyle("dark")
			}
			this.exchangeAdd = JSON.parse(this.$route.query.exchangeAdd)
		}
	},
	methods: {
		//回退方法
		goBackFn(){
			this.$router.go(-1)
			// this.$router.push({ path : '/hospital/hospital_exchangeManagementAdd',query : {item : this.commodity}});
			// exchangeManagementAdd
		},
		//添加图片
		addImg(_fileLIst){
			var file = _fileLIst.target.files[0]
			// 
			if(file.type.indexOf('image') > -1){
				let formData = new FormData();
				formData.append('file', file)
				this.$axios.post('/other/fileupload?cover&duration',formData,{headers: {'Content-Type': 'multipart/form-data'
				}}).then(res =>{
					// this.imageUpload.push({name:file.name,url:res.data.data.url})
					// this.$set(this.exchangeAdd,'cover',res.data.data.url);
					this.imgUrl = res.data.data.url
					this.exchangeAdd.cover = this.imgUrl;
					this.exchangeAdd.show = false;
					
				}).catch(err =>{
					
				})
			 }else{
				Dialog({ message: '请选择图片' });
				return false;
			}
		},
		submitFn(){
			if(this.imgUrl != ''){
				this.$axios.post('/c2/commodity/itemadd',qs.stringify({
					hospitalId : this.$store.state.hospital.login.hospital.hospitalId,
					name : this.exchangeAdd.name,
					cover : this.exchangeAdd.cover,
					intro : this.exchangeAdd.intro,
					stock: this.exchangeAdd.stock,
					payExchangepoint : this.exchangeAdd.payExchangepoint,
				})).then(res  =>{
					res.data.code? Toast.fail(res.data.codeMsg) : this.successFn();
					
				}).catch(err =>{
					
				})
			}else{
				Toast.fail('请先添加图片');
			}
		},
		successFn(){
			Toast.success('操作成功');
			  this.exchangeAdd = {
				path : '/hospital/',
				payExchangepoint : 0,
				stock : 0,
				intro : '',
				cover : '',
				show : true,
			  }
			let inx = []
			// console.log(this.$vnode.parent.componentInstance.cache)
			for(let i  in  this.$vnode.parent.componentInstance.cache){
				let a =/exchangeAddImg/g.test(this.$vnode.parent.componentInstance.cache[i].tag)
				let b= /exchangeAdd/g.test(this.$vnode.parent.componentInstance.cache[i].tag)
				if(a||b){inx.push(i)}
			}
			let  historyCache = this.$vnode.parent.componentInstance.cache;
			for(let a=0;a<inx.length;a++){
				console.log(inx[a])
				delete this.$vnode.parent.componentInstance.cache[inx[a]]
			}
			// console.log(inx)
			// console.log(this.$vnode.parent.componentInstance.cache)
			this.$router.go(-2)
		}
	},
}
</script>

<style scoped>
.exchangeAddImg{
	width: 100%;
	height: 100%;
}
.topNav{
	width: 100%;
	height: .47rem;
	margin-bottom: .15rem;
	background-color: #FFFFFF;
	border-bottom: 1px solid #D8D8D8;
	position: fixed;
	top:0;
	z-index: 9999;
}
.zhangwei{
	width: 100%;
	height: .62rem;
}
.leftImg{
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.leftImg img{
	width: .09rem;
	height: .15rem;
	line-height: .47rem;
	padding-left: .16rem;
}
.centerTitle{
	width: 64%;
	text-align: center;
	height: .47rem;
	line-height: .47rem;
	float:left;
}
.centerTitle h3{
	font-size: .16rem;
	font-weight: bolder;
}
.right{
	width: 18%;
	height: .47rem;
	line-height: .47rem;
	float:right;
	text-align: right;
}
.right button{
	width: .56rem;
	height: .3rem;
	line-height: .3rem;
	text-align: center;
	border: none;
	border-radius: .03rem;
	margin-right: .22rem;
	font-size: .14rem;
}
.buttonColorNow{
	color: #999999;
	background-color: #E5E5E5;
}
.buttonColorOver{
	color: #FFFFFF;
	background-color: #2B77EF;
}
.addImg{
	width: 3.25rem;
	height:84%;
	line-height: 88%;
	margin: 0rem auto;
	overflow: hidden;
	text-align: center;
	position: relative;
}
.addImg>img{
	width: 100%;
}
.addImgButton{
	display: block;
	text-align: center;
	padding-top: 50%;
	line-height: 70%;
	width: 100%;
}
.addImgButton img{
	height: .3rem;
	width: .3rem;
}
.addImgButton span{
	display: block;
	color: #666666;
	margin-top: .12rem;
}
.upload{
	opacity: 0;
	width: 100%;
	height:100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
