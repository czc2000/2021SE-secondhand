<template>
	<div>
		<el-row class="tac">
		  <el-col :span="12">
		    <h5>默认颜色</h5>
		    <el-menu default-active="2" class="temp"  @open="handleOpen"  @close="handleClose">
		      <el-menu-item index="1">
		        <i class="el-icon-menu"></i>
		        <span slot="title">全部</span>
		      </el-menu-item>
		      <el-menu-item index="2">
		        <i class="el-icon-document"></i>
		        <span slot="title">分区1</span>
		      </el-menu-item>
		      <el-menu-item index="3">
		        <i class="el-icon-setting"></i>
		        <span slot="title">分区2</span>
		      </el-menu-item>
		      <el-menu-item index="4">
		        <i class="el-icon-setting"></i>
		        <span slot="title">分区3</span>
		      </el-menu-item>
		      <el-menu-item index="5">
		        <i class="el-icon-setting"></i>
		        <span slot="title">分区4</span>
		      </el-menu-item>
		    </el-menu>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
import Goodbox_goodshelf from "@/components/Goodbox_goodshelf";
export default {
	name: "goodsZone",
	components:{
		Goodbox_goodshelf,
	}, 
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}
</script>

<style>
</style>
