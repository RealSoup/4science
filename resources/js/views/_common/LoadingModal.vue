<template>
    <div class="rs_modal" :class="classObject">
        <!-- <div class="overlay" @click="$emit('close-modal')"></div> -->
		<div class="overlay"></div>
        <div class="rs_modal-card">
			<b-img :src="`${s3url}common/logo/logo_loading.gif`" />
            <!-- <div class="cssload-container">
            	<div class="cssload-circle-1">
            		<div class="cssload-circle-2">
            			<div class="cssload-circle-3">
            				<div class="cssload-circle-4">
            					<div class="cssload-circle-5">
            						<div class="cssload-circle-6">
            							<div class="cssload-circle-7">
            								<div class="cssload-circle-8">
            								</div>
            							</div>
            						</div>
            					</div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div> -->
            <div class="slot"><slot /></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['position'],
    computed: {
        classObject: function () {
            return {
                'position-absolute': this.position == 'absolute',
                'position-fixed': isEmpty(this.position)
            }
        }
    }


};
</script>
<style lang="css" scoped>
/* Modal */
.rs_modal,
.overlay { width:100%; height:100%; left: 0; top: 0; }
.rs_modal { z-index:1050; }
.rs_modal .overlay { position:absolute; opacity:0.65; background-color:#FFF; }
.rs_modal .rs_modal-card { position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); }
.rs_modal .rs_modal-card .slot { margin-top:0.4rem; padding:.4rem 1rem; color:#999; /*background-color:#333;*/ border-radius:10px; font-weight:900; text-align:center; font-size:1.2rem; }


/* https://icons8.com/cssload/en/spinners */
.cssload-container { width: 117px; margin: 0 auto; }
.cssload-circle-1 { height: 117px; width: 117px; background: rgb(97,46,141); }
.cssload-circle-2 { height: 97px; width: 97px; background: rgb(194,34,134); }
.cssload-circle-3 { height: 78px; width: 78px; background: rgb(234,34,94); }
.cssload-circle-4 { height: 58px; width: 58px; background: rgb(237,91,53); }
.cssload-circle-5 { height: 39px; width: 39px; background: rgb(245,181,46); }
.cssload-circle-6 { height: 19px; width: 19px; background: rgb(129,197,64); }
.cssload-circle-7 { height: 10px; width: 10px; background: rgb(0,163,150); }
.cssload-circle-8 { height: 5px; width: 5px; background: rgb(22,116,188); }
.cssload-circle-1, .cssload-circle-2, .cssload-circle-3, .cssload-circle-4,
.cssload-circle-5, .cssload-circle-6, .cssload-circle-7, .cssload-circle-8 {
	border-bottom: none;
	border-radius: 50%;
		-o-border-radius: 50%;
		-ms-border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
	box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
		-o-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
		-ms-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
		-webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
		-moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
	animation-name: cssload-spin;
		-o-animation-name: cssload-spin;
		-ms-animation-name: cssload-spin;
		-webkit-animation-name: cssload-spin;
		-moz-animation-name: cssload-spin;
	animation-duration: 4600ms;
		-o-animation-duration: 4600ms;
		-ms-animation-duration: 4600ms;
		-webkit-animation-duration: 4600ms;
		-moz-animation-duration: 4600ms;
	animation-iteration-count: infinite;
		-o-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
	animation-timing-function: linear;
		-o-animation-timing-function: linear;
		-ms-animation-timing-function: linear;
		-webkit-animation-timing-function: linear;
		-moz-animation-timing-function: linear;
}

@keyframes cssload-spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

@-o-keyframes cssload-spin {
	from { -o-transform: rotate(0deg); }
	to { -o-transform: rotate(360deg); }
}

@-ms-keyframes cssload-spin {
	from { -ms-transform: rotate(0deg); }
	to { -ms-transform: rotate(360deg); }
}

@-webkit-keyframes cssload-spin {
	from { -webkit-transform: rotate(0deg); }
	to { -webkit-transform: rotate(360deg); }
}

@-moz-keyframes cssload-spin {
	from { -moz-transform: rotate(0deg); }
	to { -moz-transform: rotate(360deg); }
}
</style>
<!-- position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); -->
