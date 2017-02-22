<template>
    <div class="ui-simpleUpload">
        <div class="text-center">
            <button type="button" class="btn btn-default uploadBtn" @click="selectFile" :disabled="uploading"><i class="material-icons">file_upload</i><span>选择文件</span></button>
        </div>
        <div class="uploadStatus">
            <ui-progress-linear
                class="uploadProgressbar"
                v-if="uploading"
                :show="true" type="determinate" color="primary" :value="progress"
            ></ui-progress-linear>
            <div class="uploadTip text-center">{{{uploadStatus}}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            // 进度
            progress:0,
            // file input
            fileInput:null,
            // 上传中...
            uploading:false,
        }
    },
    props:{
        // 上传接口 api.module.upload
        url:{
            type:String,
            require:true,
        },
        // 接收文件的参数,为空的时候直接上传formData
        fileparam:{
            type:String,
            default:'file'
        },
        // 附加参数
        params:{
            type:Object,
            default(){
                return {}
            }
        },
        // 完成后的回调
        complete:{
            type:Function,
            default(){}
        },

        // 上传时显示信息
        uploadingMsg:{
            type:String,
            default:'上传中'
        },
        // 上传状态信息
        uploadStatus:{
            type:String,
            default:''
        },
        // 允许的文件类型
        filetype:{
            type:String,
            default:''
        }
    },
    attached(){
        this.uploadStatus = `请上传 ${this.filetype} 类型的文件`
    },
    methods:{
        // 选择文件
        selectFile(){
            this.createFile();
            this.fileInput.click();
        },
        // 创建file input
        createFile(){
            if(this.fileInput) return;

            // create file
            this.fileInput = document.createElement('input');
            this.fileInput.setAttribute('type', 'file');
            this.fileInput.style.display = 'none';
            this.$el.appendChild(this.fileInput);

            // upload event
            this.fileInput.onchange = ()=>{
                this.uploadFile();
            }
        },
        // 删除 file input ,用于解决file第二次选择不触发onchange的问题
        removeFile(){
            this.uploading = false;
            if(!this.fileInput) return;
            this.$el.removeChild(this.fileInput);
            this.fileInput = null;
        },
        // 上传文件
        uploadFile(){

            let file = this.fileInput.files[0];

            console.log(file)

            if(!this.checkFileType(file)) return;

            let formData = new FormData();
            formData.append(this.fileparam,file);

            for( let key in this.params){
                formData.append(key,this.params[key]);
            }

            this.uploading = true;
            this.setPorgress(0);

            this.$root.Tool.ajax({
                url: this.url,
                data: formData,
                success:(data, res)=>{

                    // console.log(res)

                    setTimeout(()=>{
                        this.complete(data);
                        this.removeFile();
                        this.uploadStatus = `<span style="color:#2196f3;">上传完成，${res.data.err_msg}</span>`;
                    },500)

                },
                error:(err_msg,err_code)=>{

                    setTimeout(()=>{
                        this.uploadStatus = `<span style="color:red;">${err_msg}</span>`;
                        this.removeFile();
                    },500)

                }
            })


        },

        // 判断文件类型
        checkFileType(file){

            let fileType = file.name.split('.')[1];
            let allowTypes = this.filetype.split(',');

            if(allowTypes.length==0 || allowTypes.indexOf(fileType)>-1){
                return true;
            }else{

                this.uploadStatus = `<span style="color:red;">不能上传该类型文件，仅支持: ${this.filetype}</span>`

                this.removeFile();

                return false;
            }

        },

        // 模拟进度条
        setPorgress(progress){

            if(!this.uploading) return;

            if(progress>=100){
                this.progress = 100;
                return;
            }

            this.progress = progress+1;
            this.uploadStatus = `${this.uploadingMsg} ${this.progress}%`

            setTimeout(()=>{
                this.setPorgress(this.progress);
            },3000/100)

        }
    }
}
</script>
<style scoped>
.ui-simpleUpload{
    padding: 0 20px;
    margin-bottom: 20px;
}
.uploadBtn span{
    position: relative;
    top:-5px;
}
.uploadStatus {
    margin-top: 20px;
    font-size: 16px;
}
.uploadProgressbar {
    margin-bottom: 20px;
}
</style>
