<template>
	<view class="content">
		<image class="logo" src="/static/logo.jpeg"></image>
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="输入超市名" />
			</view>
			<button type="default" style="margin-top: 10rpx;" @click="onEnter">进入超市</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '武汉加油'
			}
		},
		onLoad() {
			
		},
		methods: {
			onEnter(){
				uni.navigateTo({
					url:'/pages/home/home?id=222'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 600rpx;
		width: 400rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	/* .text-area {
		display: flex;
		justify-content: center;
	} */

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
