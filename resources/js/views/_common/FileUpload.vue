<template>
    <b-container>
        <b-row @dragover="onDragover" @drop="onDrop" @click="onClick">
            <b-col class="intro" cols="12" :class="{ hide: (value&&value.length) }" :style="{ minHeight:(height-30) + 'px'}">파일을 드래그 하거나, 여기를 클릭하여 첨부</b-col>
            <input type="file" ref="fileInput" @change="onFileChange" multiple />
            
            <draggable :list="value" handle=".handle" class="col-12 imgList" @change="seqUpdate=true">
                <b-col cols="6" lg="2" v-for="(file, i) in value" :key="i">
                    <div class="ribbon ribbon-top-left" v-if="i == 0 && fi_group=='goods' && fi_kind=='goods'"><span><b-icon-star-fill /></span></div>
                    <b-button v-if="fi_group=='goods' && fi_kind=='goods'" class="handle"><b-icon-arrows-move /></b-button>
                    <b-button class="btn_del" size="sm" variant="danger" @click="handleRemove(i, $event)"><b-icon-x-square /></b-button>
                    <b-img thumbnail :src="file.path_thumb" />
                    <span>{{ file.fi_original }}</span>
                </b-col>
            </draggable>
        </b-row>
    </b-container>
</template>

<script>
import ax from '@/api/http';
import draggable from 'vuedraggable';

export default {
    name: 'FileUpload',
    components: { draggable },
    props: ['value', 'fi_group', 'fi_kind', 'is_thumb', 'height'],
    data: function () {
        return {
            seqUpdate:false,
            delete_file_goods:[],
        };
    },
    methods: {
        async addFiles (files) {
            for(let i = 0; i < files.length; i++) {
                // ✅ 확장자 검사 (대문자 포함 여부 확인)
                const ext = files[i].name.split('.').pop();
                if (/[A-Z]/.test(ext)) {
                    alert(`파일 [${files[i].name}]의 확장자가 대문자입니다.\n확장자를 소문자로 변경한 후 다시 업로드해주세요.`);
                    continue; // 추가하지 않음
                }
                
                let src = "";
                if(files[i].type.match(/image/i))
                    src = await this.readFiles(files[i]);
                else if(files[i].type=='application/pdf')
                    src = "/storage/common/file_icon_pdf.png";
                else if(files[i].type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    src = "/storage/common/file_icon_excel.png";
                else
                    src = "/storage/common/file_icon_default.png";
                    
                files[i].path_thumb = src;
                files[i].fi_original = files[i].name;
                this.value.push(files[i]);
            }
        },
        // FileReader를 통해 파일을 읽어 thumbnail 영역의 src 값으로 셋팅
        async readFiles (files) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = async (e) => {
                    resolve(e.target.result) 
                }
                reader.readAsDataURL(files)
            })
        },
        handleRemove (i, e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (this.value[i].fi_id)
                this.delete_file_goods.push(this.value[i].fi_id);
            this.value.splice(i, 1) 
        },
        onClick () { this.$refs.fileInput.click() },
        onDragover (event) { event.preventDefault(); }, // 드롭을 허용하도록 prevetDefault() 호출
        onDrop (event) { 
            event.preventDefault();// 기본 액션을 막음 (링크 열기같은 것들)
            const files = event.dataTransfer.files;
            this.addFiles(files);
        },
        onFileChange (event) {
            const files = event.target.files;
            this.addFiles(files);
        },

        async fileProcessor(fi_key) {
            const frmData = new FormData()
            frmData.append('fi_group', this.fi_group);
            frmData.append('fi_key', fi_key);
            let fi_room = 0;
            if(this.fi_group == 'goods')    fi_room = parseInt(fi_key/1000)+1;
            else                            fi_room = new Date().getFullYear();
            frmData.append('fi_room', fi_room);
            frmData.append('fi_kind', this.fi_kind);
            
            if ( !isEmpty(this.is_thumb) )          frmData.append('is_thumb', this.is_thumb);
            if ( !isEmpty(this.seqUpdate) )         frmData.append('is_change_seq', this.seqUpdate);
            if ( this.delete_file_goods.length )    frmData.append('is_delete', JSON.stringify(this.delete_file_goods));

            for (let i in this.value) {
                // this.$delete(this.value[i], 'src_thumb');
                // if(this.value[i].hasOwnProperty('fi_id'))
                //     this.value[i] = JSON.stringify(this.value[i]);
                if(!this.value[i].hasOwnProperty('fi_id'))                
                    frmData.append('file['+i+']', this.value[i]);
                else if(this.value[i].hasOwnProperty('fi_id') && this.fi_group == 'goods')
                    frmData.append('file['+i+']', JSON.stringify(this.value[i]));                
              
            }
            let upUrl = "/api/upload";
            if (this.fi_group == 'goods') upUrl = "/api/admin/shop/goods/fileUpload";
            return await ax.post(upUrl, frmData);
        }, 
    },
};
</script>

<style lang="css" scoped>
.container { border:2px solid #D7D7D7; border-radius: 0.25rem; padding:15px; }
.container .row { cursor:pointer; margin-bottom:0; }
.container .row .intro { display:flex; justify-content:center; align-items:center; font-size:.9rem; color:#AAA; }
.container .row .intro.hide { display:none; }
.container .row input[type="file"] { display:none; }
.container .row .imgList { display:flex; flex-wrap:wrap; padding:0; }
.container .row .imgList>div { overflow:hidden; position:relative; margin-bottom:2rem; }
.container .row .imgList>div button { position:absolute; top:0; padding:0px 4px; transform:translateY(-120%); transition:transform 0.5s ease; }
.container .row .imgList>div .handle { left:50%; transform:translateX(-50%) translateY(-120%); }
.container .row .imgList>div .btn_del { right:15px; }
.container .row .imgList>div img { width:100%; height:100%; max-height:200px; object-fit:cover; border-radius:10px; }
.container .row .imgList>div>span { position:absolute; bottom:0; left:0; background:#fff; display:block; opacity:.8; width:calc(100% - 30px); transform:translateY(120%); transition: transform 0.5s ease; text-align:center; padding:5px; margin:0 15px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; border-radius:10px; }
.container .row .imgList>div:hover>span { transform:translateY(0); }
.container .row .imgList>div:hover .handle { transform:translateX(-50%) translateY(0); }
.container .row .imgList>div:hover .btn_del { transform:translateY(0); }
.container .row .imgList>div .ribbon { width:75px; height:75px; overflow:hidden; position:absolute; }
.container .row .imgList>div .ribbon::before,
.container .row .imgList>div .ribbon::after { position: absolute; z-index:1; content: ''; display: block; border: 5px solid #2980b9; }
.container .row .imgList>div .ribbon span { position: absolute; display: block; width:140px; padding:5px 0; background-color: #3498db; box-shadow: 0 5px 10px rgba(0,0,0,.1); color: #fff; font:700 13px/1 'Lato', sans-serif; text-shadow: 0 1px 1px rgba(0,0,0,.2); text-transform: uppercase; text-align: center; }
.container .row .imgList>div .ribbon-top-left { top:5px; left:5px; }
.container .row .imgList>div .ribbon-top-left::before,
.container .row .imgList>div .ribbon-top-left::after { border-top-color: transparent; border-left-color: transparent; }
.container .row .imgList>div .ribbon-top-left::before { top: 0; right: 0; }
.container .row .imgList>div .ribbon-top-left::after { bottom: 0; left: 0; }
.container .row .imgList>div .ribbon-top-left span { right:-25px; top:18px; transform: rotate(-45deg); }


@media (min-width: 992px){ .col-lg-2 { flex:0 0 200px; max-width:200px; }}
</style>