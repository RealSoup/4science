<template>
    <div>
        <div class="layout root">
            <b-row>
                <b-col><img :src="s3url+'outlet/logo.png'" /></b-col>
                
                <b-col v-b-toggle.pipette>
                    <img :src="s3url+'outlet/list01.png'" />
                    <div>피펫관</div>
                </b-col>
                <b-col v-b-toggle.measure>
                    <img :src="s3url+'outlet/list02.png'" />
                    <div>환경측정기관</div>
                </b-col>
                <b-col v-b-toggle.tweezer>
                    <img :src="s3url+'outlet/list03.png'" />
                    <div>트위져관</div>
                </b-col>
                <b-col v-b-toggle.hotplate>
                    <img :src="s3url+'outlet/list04.png'" />
                    <div>핫플레이트관</div>
                </b-col>
                <b-col v-b-toggle.meter>
                    <img :src="s3url+'outlet/list05.png'" />
                    <div>광파워미터관</div>
                </b-col>
            </b-row>
        </div>
        
        <div class="sub">
            <b-row class="layout">
                <b-col><img :src="s3url+'outlet/title.png'" /></b-col>

                <b-col>
                    <b-collapse id="pipette" accordion="outlet">
                        <div class="section">
                            <div class="flex_wrap">
                                <b>브랜드별</b>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1289' }}" ><img :src="s3url+'outlet/pipette/thermo.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1287' }}" ><img :src="s3url+'outlet/pipette/witeg.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1282' }}" ><img :src="s3url+'outlet/pipette/gilson.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1284' }}" ><img :src="s3url+'outlet/pipette/eppen.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1288' }}" ><img :src="s3url+'outlet/pipette/axygen.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1283' }}" ><img :src="s3url+'outlet/pipette/sartorius.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1285' }}" ><img :src="s3url+'outlet/pipette/socorex.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'27', ca02:'1278', ca03:'1281', ca04:'1294' }}" ><img :src="s3url+'outlet/pipette/etc.png'" /></b-link>
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="flex_wrap">
                                <b>종류별</b>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'01'}}" >싱글피펫</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'02'}}" >멀티피펫</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'03'}}" >피펫에이드</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'04'}}" >전자피펫</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'05'}}" >팁</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'pipette', group:'06'}}" >거치대 / 스타트키트</b-link>
                            </div>
                        </div>
                    </b-collapse>
                </b-col>

                <b-col>
                    <b-collapse id="measure" accordion="outlet">
                        <div class="section">
                            <div class="flex_wrap">
                                <b>종류별</b>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'700' }}" >종합환경측정기</b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'701' }}" >미세먼지측정기</b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'702' }}" >수질측정기</b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'703' }}" >소음측정기</b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'704' }}" >온습도계</b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'25', ca02:'699', ca03:'705' }}" >기타측정기</b-link>
                            </div>
                        </div>
                        <div class="frame">1<br />1<br />1<br />1<br /></div>
                        <!-- 알수 없는 이유로 콜렙스가 내려오는 속도가 이상하다 -->
                        <!-- 내용물을 채워 높이를 높여줬떠니 정상속도를 나타낸다 -->
                    </b-collapse>
                </b-col>

                <b-col>
                    <b-collapse id="tweezer" accordion="outlet">
                        <div class="section">
                            <div class="flex_wrap">
                                <b>용도별</b>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmfl'}}" ><img :src="s3url+'outlet/tweezer/t01.png'" /><span>Flat tip tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmwf'}}" ><img :src="s3url+'outlet/tweezer/t02.png'" /><span>Wafer tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmfi'}}" ><img :src="s3url+'outlet/tweezer/t03.png'" /><span>Fine tip tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmtf'}}" ><img :src="s3url+'outlet/tweezer/t04.png'" /><span>Teflon& coating tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmra'}}" ><img :src="s3url+'outlet/tweezer/t05.png'" /><span>Reverse action tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmfb'}}" ><img :src="s3url+'outlet/tweezer/t06.png'" /><span>Fiber tip tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmpt'}}" ><img :src="s3url+'outlet/tweezer/t07.png'" /><span>Plastic tweezer</span></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'tweezer', group:'tmvc'}}" ><img :src="s3url+'outlet/tweezer/t08.png'" /><span>Vacuum tweezer</span></b-link>
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="flex_wrap">
                                <b>브랜드별</b>
                                <b-link :to="{name: 'goods_index', query: { mode:'maker', keyword:'Ideal-tek' }}" ><img :src="s3url+'outlet/tweezer/ideal-tek.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { mode:'maker', keyword:'rubis' }}" ><img :src="s3url+'outlet/tweezer/rubis.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { mode:'maker', keyword:'SIPEL' }}" ><img :src="s3url+'outlet/tweezer/sipel.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { mode:'maker', keyword:'Techni-tool' }}" ><img :src="s3url+'outlet/tweezer/techni.png'" /></b-link>
                                <b-link :to="{name: 'goods_index', query: { ca01:'33', ca02:'5618', ca03:'5670' }}" >기타 브랜드</b-link>
                            </div>
                        </div>
                    </b-collapse>
                </b-col>

                <b-col>
                    <b-collapse id="hotplate" accordion="outlet">
                        <div class="section">
                            <div class="flex_wrap">
                                <b>브랜드별</b>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'IKA'}}" ><img :src="s3url+'outlet/hotplate/ika.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'AS ONE'}}" ><img :src="s3url+'outlet/hotplate/asone.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'대한과학'}}" ><img :src="s3url+'outlet/hotplate/daihan.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'Lab companion'}}" ><img :src="s3url+'outlet/hotplate/jeiotech.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'Global Lab'}}" ><img :src="s3url+'outlet/hotplate/globallab.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'Corning'}}" ><img :src="s3url+'outlet/hotplate/corning.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'미성과학기기'}}" ><img :src="s3url+'outlet/hotplate/mtops.png'" /></b-link>
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="flex_wrap">
                                <b>종류별</b>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'01'}}" >온도별</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'02'}}" >사이즈별</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'03'}}" >기능별</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'hotplate', group:'04'}}" >HOTPLATE & Stirrer</b-link>
                            </div>
                        </div>
                    </b-collapse>
                </b-col>

                <b-col>
                    <b-collapse id="meter" accordion="outlet">
                        <div class="section">
                            <div class="flex_wrap">
                                <b>브랜드별</b>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'01'}}" ><img :src="s3url+'outlet/meter/ophir.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'02'}}" ><img :src="s3url+'outlet/meter/thorlabs.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'03'}}" ><img :src="s3url+'outlet/meter/newport.png'" /></b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'04'}}" ><img :src="s3url+'outlet/meter/powerenergy.png'" /> Power/Energy</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'05'}}" ><img :src="s3url+'outlet/meter/photodiode.png'" /> Photodiode</b-link>
                                <b-link :to="{name: 'outlet_index', params: {type:'meter', group:'04'}}" ><img :src="s3url+'outlet/meter/thermal.png'" /> Thermal</b-link>
                            </div>
                        </div>
                    </b-collapse>
                </b-col>
            </b-row>
        </div>
        
    </div>
    
</template>

<script>

export default {
    components: {
       
    },
}
</script>

<style lang="css" scoped>
div .row { padding-left:70px; margin:auto; }
.root .row { padding-top:92px; align-items:flex-end; }
.root .row .col:not(:first-child) { margin-bottom:2rem; }
.sub { background:#0094EA; }
.sub .row { height:350px; }

.row .col { padding:0; }
.row .col:first-child { flex-basis:314px; max-width:314px; }
.row .col:not(:first-child) { text-align:center; flex-basis:200px; max-width:200px; margin-bottom:2rem; }
.row .col:nth-child(2) { margin-left:4rem; }
.row .col div { font-weight:bold; color:#6F6F6F; }

.sub .row .col { }
.sub .row .col:first-child { padding-top:18px; }
.sub .row .col .collapse { height:100%; max-height:262.5px; position:relative; }
.sub .row .col:nth-child(3) .collapse,
.sub .row .col:nth-child(6) .collapse { max-height:132px; }
.sub .row .col .collapse::before { content:' '; background:#fff; width:4px; height:100%; top:0; position:absolute; left:50%; transform:translateX(-50%); } 
.sub .row .col .collapse .section { display:inline-block; background:#fff; border-radius:58px; position:absolute; left:0; z-index:2; overflow:hidden; transition: all .4s; }
.sub .row .col .collapse .section:first-child { top:25%; transform:translateY(-25%); } 
.sub .row .col .collapse .section:nth-child(2) { bottom:0%; }
    
.sub .row .col:nth-child(3) .collapse .section:first-child,
.sub .row .col:nth-child(6) .collapse .section:first-child { top:33%; transform:none; }
.sub .row .col .collapse .frame { height:132px; }

.sub .row .col .collapse .section .flex_wrap { height:88px; display:flex; align-items:center; overflow:hidden; max-width:200px; transition: all .5s; }
.sub .row .col .collapse .section:hover .flex_wrap { transform:translateX(-170px); margin-right:-140px; max-width:1362px; }
.sub .row .col #tweezer .section:first-child:hover { left:-533px; }
.sub .row .col #tweezer .section:nth-child(2):hover { left:-275px; }
.sub .row .col #hotplate .section:first-child:hover { left:-693px; }
.sub .row .col #hotplate .section:nth-child(2):hover { left:-140px; }
.sub .row .col #meter .section:first-child:hover { left:-592px; }
.sub .row .col .collapse .section .flex_wrap b { min-width:200px; display:inline-block; color:#0094EA; font-weight:900; font-size:1.5rem; }
.sub .row .col .collapse .section .flex_wrap a { transform:scale(1); transition:transform .2s; margin:0 1rem; white-space:nowrap; }
.sub .row .col .collapse .section .flex_wrap a:hover { transform:scale(1.3); }

.sub .row .col #tweezer .section:first-child .flex_wrap a img { border:3px solid #AFAFAF; border-radius:50%; max-width:54px; }
.sub .row .col #tweezer .section:first-child .flex_wrap a { display:flex; align-items:center; color:#AFAFAF; }
.sub .row .col #tweezer .section:first-child .flex_wrap a span { color:#AFAFAF; white-space:normal; line-height:1; }
    

</style>
