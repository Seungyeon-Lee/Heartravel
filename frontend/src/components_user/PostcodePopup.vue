<template>
	<transition name="fade">
		<div class="post_popup_wrapper">
			<div class="popup_bg" @click="hidePostPopup"></div>
			<div class="popup_post">
				<DaumPostcode :on-complete="handleAddress" width="300" :eight="600"/>
			</div>
			<button class="popup_close" @click="hidePostPopup"></button>
		</div>
	</transition>
</template>

<script>
    import DaumPostcode from "vuejs-daum-postcode"
	
    export default {
        name: "PostcodePopup",
        components: { DaumPostcode },
		methods:{
            hidePostPopup: function(){
                this.$emit('hidePostPopup');
			},
            handleAddress: function (data) {
				const code = data.zonecode;
                const address = data.address + ' ' + data.buildingName;
                this.$emit('handleAddress',address, code)
            },
		}
    }
</script>

<style scoped>
	.post_popup_wrapper{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
	}
	.popup_bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		opacity: .5;
		filter: alpha(opacity=50);
	}
	.popup_post{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -240px);
		width: 354px;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.5);
		background-color: #fff;
		z-index: 10000;
	}
	.popup_close{
		background-image: url("../../public/static/images/icon_24_close_wh.png");
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 48px;
		height: 48px;
		position: absolute;
		top: 24px;
		right: 24px;
	}

</style>
