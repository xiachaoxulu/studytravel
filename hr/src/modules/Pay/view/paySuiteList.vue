<template>
    <!--  -->
    <div class="com-col-m1-left ui-panel">
        <div class="com-menuList">
            <div class="_title">{{valid? '启用中工资套' : '所有工资套'}}</div>
            <div class="_suitelist">
                <ui-scrollview>
                    <ul>
                        <li v-for="suite in state.paySuiteList" v-if="valid ? ( suite.valid==1 ? true : false ) : true" class="_suiteListItem {{$index==suiteIndex ? 'active' :''}}" @click="selectThisSuite($index)"><span class="_suiteItemName">{{suite.suiteName}}</span><i class="material-icons">chevron_right</i></li>
                    </ul>
                </ui-scrollview>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import store from '../store'
export default {
    props:{
        valid:{
            type:Boolean,
            default:''
        }
    },
    data(){
        return {
            state:store.state,
            suiteIndex:0,
            // suiteList:[],
            // $index:-1,
        }
    },
    attached(){
    },
    methods:{
        selectThisSuite(index){
            this.suiteIndex = index;
            this.$emit('selectsuite',index)
        },
        refresh(suiteID){

            this.state.paySuiteList.forEach((item,index)=>{

                if(item.ID===suiteID){
                    this.suiteIndex = index;
                    return false;
                }

            })

            // console.log(this.state.paySuiteList,this.suiteIndex)
        }
    }
}
</script>
<style scoped>
._title{
    text-indent: 20px;
}
._suitelist{
    position: absolute;
    width:100%;
    top:30px;
    bottom:0px;
}
._suiteItemName{
    display: inline-block;
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
